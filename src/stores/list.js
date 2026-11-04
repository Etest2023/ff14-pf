import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getDetail as getDetailApi, getList as getListApi } from '@/apis.js';
import { useFilterStore } from '@/stores/filter.js';
import { usePaginationStore } from '@/stores/pagination.js';

export const useListStore = defineStore('list', () => {
    const list = ref([]);
    const isLoading = ref(false);
    // 已请求 / 请求中的详情 id，避免重复请求
    const detailLoadedIds = new Set();
    const detailLoadingIds = new Set();

    function getList() {
        const filterStore = useFilterStore();
        const pagination = usePaginationStore();
        isLoading.value = true;
        detailLoadedIds.clear();
        detailLoadingIds.clear();
        return getListApi({
            page: pagination.currentPage,
            pageSize: pagination.pageSize,
            datacenter: filterStore.datacenter,
            category: filterStore.category,
            search: filterStore.keyword,
        })
            .then((res) => {
                if (!res) return;
                if (res.data) {
                    list.value = res.data;
                }
                if (res.pagination) {
                    pagination.setTotal(res.pagination.total);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    // 按需加载单项详情，由列表项的可见性触发
    function getDetail(id) {
        if (detailLoadedIds.has(id) || detailLoadingIds.has(id)) return;
        detailLoadingIds.add(id);
        return getDetailApi(id)
            .then((detail) => {
                if (!detail || detail.error) return;
                const index = list.value.findIndex((item) => item.id === id);
                if (index > -1) {
                    list.value[index] = detail;
                    detailLoadedIds.add(id);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                detailLoadingIds.delete(id);
            });
    }

    return { list, isLoading, getList, getDetail };
});
