// FF14招募板 Service Worker
// 策略：接口请求直接走网络不缓存；其余同源 GET 资源缓存优先（stale-while-revalidate），
// 即优先返回缓存，同时在后台更新缓存，保证下次加载拿到新版本
// 更新缓存版本号可强制全量刷新（如缓存策略变更时）
const CACHE_NAME = 'ff14pf-v1';
const API_ORIGIN = 'https://xivpf.littlenightmare.top';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key)),
                ),
            )
            .then(() => self.clients.claim()),
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    // 接口请求：不缓存，直接走网络
    if (url.origin === API_ORIGIN) return;
    // 跨域资源（如 CDN）：不处理
    if (url.origin !== self.location.origin) return;

    // 缓存优先 + 后台更新
    event.respondWith(
        caches.match(request).then((cached) => {
            const fetched = fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches
                            .open(CACHE_NAME)
                            .then((cache) => cache.put(request, clone));
                    }
                    return response;
                })
                // 网络失败时回退缓存（离线可用）
                .catch(() => cached);
            return cached || fetched;
        }),
    );
});
