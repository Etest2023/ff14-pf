import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getDetail as getDetailApi, getList as getListApi } from '@/apis.js';
import { useFilterStore } from '@/stores/filter.js';
import { usePaginationStore } from '@/stores/pagination.js';

export const useListStore = defineStore('list', () => {
    const list = ref([]);
    const isLoading = ref(false);

    function getList() {
        const filterStore = useFilterStore();
        const pagination = usePaginationStore();
        isLoading.value = true;
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
                    list.value.forEach((item, index) => {
                        getDetailApi(item.id).then((detail) => {
                            if (!detail) return;
                            if (detail.error) return;
                            list.value[index] = detail;
                        });
                    });
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
    return { list, isLoading, getList };
});
