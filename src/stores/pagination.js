import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useListStore } from './list';

const pageSizeKey = 'ff14pf_pageSize';
const startPage = 1;
const defaultPageSize = 10;
const minPageSize = 5;
const maxPageSize = 50;

export const usePaginationStore = defineStore('pagination', () => {
    const currentPage = ref(startPage);
    const pageSize = ref(
        localStorage.getItem(pageSizeKey)
            ? parseInt(localStorage.getItem(pageSizeKey))
            : defaultPageSize,
    );
    const total = ref(0);

    function setPage(page) {
        currentPage.value = page;
    }
    function setPageSize(size) {
        size = parseInt(size);
        if (isNaN(size)) {
            size = defaultPageSize;
        }
        if (size < minPageSize) {
            size = minPageSize;
        }
        if (size > maxPageSize) {
            size = maxPageSize;
        }
        pageSize.value = size;
        localStorage.setItem(pageSizeKey, size);
        reset();
    }
    function setTotal(count) {
        total.value = count;
    }
    function reset() {
        setPage(1);
        setTotal(0);
        useListStore().getList();
    }
    function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--;
            useListStore().getList();
        }
        return currentPage.value;
    }
    function nextPage() {
        if (currentPage.value < Math.ceil(total.value / pageSize.value)) {
            currentPage.value++;
            useListStore().getList();
        }
        return currentPage.value;
    }

    return {
        currentPage,
        pageSize,
        total,
        setPage,
        setPageSize,
        setTotal,
        reset,
        prevPage,
        nextPage,
    };
});
