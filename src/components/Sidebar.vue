<script setup>
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useTrackStore } from '@/stores/track.js';
import SidebarItem from './SidebarItem.vue';

const trackStore = useTrackStore();
const { trackIds, trackList } = storeToRefs(trackStore);
const { refreshList, refreshById } = trackStore;

const delay = 10;
const counter = ref(delay);
const isLoading = ref(false);
const isLoadingIdsCache = ref([]);
let timer = null;

watch(
    trackIds,
    (newVal) => {
        if (!newVal || newVal.length === 0) {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        } else {
            if (!timer) resetTimer();
        }
    },
    { deep: true },
);

onMounted(() => {
    if (trackIds.value.length) refreshAll();
});

async function refreshAll() {
    if (isLoading.value || trackIds.value.length === 0) return;
    isLoading.value = true;
    isLoadingIdsCache.value = trackIds.value.concat([0]);
    try {
        if (document.visibilityState === 'visible') {
            await refreshList();
        }

        if (document.visibilityState === 'hidden') {
            const eventHanlder = () => {
                if (document.visibilityState === 'visible') {
                    resetTimer();
                    document.removeEventListener(
                        'visibilitychange',
                        eventHanlder,
                    );
                }
            };
            document.addEventListener('visibilitychange', eventHanlder);
        } else {
            resetTimer();
        }
    } catch (error) {
    } finally {
        isLoading.value = false;
        isLoadingIdsCache.value = [];
    }
}

function resetTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    counter.value = delay;
    timer = setInterval(() => {
        counter.value--;
        if (counter.value <= 0) {
            clearInterval(timer);
            timer = null;
            refreshAll();
        }
    }, 1000);
}

async function refreshSingle(id) {
    if (isLoading.value) return;
    if (isLoadingIdsCache.value.includes(id)) return;
    isLoadingIdsCache.value.push(id);
    try {
        await refreshById(id);
    } catch (error) {
    } finally {
        isLoadingIdsCache.value = isLoadingIdsCache.value.filter(
            (item) => item !== id,
        );
    }
}
</script>

<template>
    <aside>
        <div class="sidebar">
            <div class="header">
                <div class="title">关注的招募</div>
                <div class="right" v-if="trackIds.length">
                    <div class="timer">
                        {{ isLoading ? '正在刷新' : `${counter} 秒后刷新` }}
                    </div>
                    <div
                        class="btn refresh"
                        :class="{ loading: isLoading }"
                        @click="refreshAll()"></div>
                </div>
            </div>
            <div class="list" v-if="trackIds.length">
                <div v-for="item in trackList" :key="item.id" class="item">
                    <SidebarItem :data="item">
                        <div
                            class="btn refresh"
                            :class="{
                                loading: isLoadingIdsCache.includes(item.id),
                            }"
                            @click="refreshSingle(item.id)"></div>
                    </SidebarItem>
                </div>
            </div>
            <div class="tip" v-else>
                点击
                <div class="btn add"></div>
                添加关注的招募
            </div>
        </div>
    </aside>
</template>

<style scoped>
aside {
    position: fixed;
    top: var(--var-header-height);
    left: 0;
    right: 0;
    bottom: 60px;
    margin: 0 auto;
    max-width: var(--max-width);
    pointer-events: none;
}

.sidebar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--sidebar-width);
    border-left: 1px solid var(--color-header-border);
    background-color: var(--color-background);
    z-index: 10;
    pointer-events: all;
    overflow: auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px 0;
    border-bottom: 1px dashed var(--color-header-border);

    .right {
        display: flex;
        align-items: center;
        .timer {
            font-size: 14px;
            margin-right: 8px;
        }
    }
}

:deep(.item:nth-of-type(2n)) {
    background-color: var(--color-background-alt);
}

.tip {
    margin-top: 20px;
    text-align: center;
    line-height: 24px;
    .btn.add {
        margin: 0 4px;
        width: 20px;
        height: 20px;
        vertical-align: text-bottom;
        background-image: url('@icons/add&delete.png');
        opacity: 0.5;
    }
}

.btn {
    display: inline-block;
    background-size: cover;
    background-position: 0;
}
.btn.refresh {
    cursor: pointer;
    width: 16px;
    height: 16px;
    background-color: currentColor;

    -webkit-mask-image: var(--svg-refresh);
    mask-image: var(--svg-refresh);
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;

    &.loading {
        cursor: not-allowed;
        animation: rotate 1s linear infinite;
    }

    &:not(.loading):hover {
        background-color: var(--color-title-hover);
    }
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
