import { ref } from 'vue';
import { defineStore } from 'pinia';
import { usePaginationStore } from './pagination.js';

const filterKey = 'ff14pf_filter';
const ls = localStorage.getItem(filterKey) || '';

export const useFilterStore = defineStore('filter', () => {
    const lsData = ls.split(',') || [];
    const datacenter = ref(lsData[0] || '陆行鸟');
    function setDatacenter(dc) {
        datacenter.value = dc;
        lsData[0] = dc;
        localStorage.setItem(filterKey, lsData.join(','));
        usePaginationStore().reset();
    }
    const category = ref(lsData[1] || 'HighEndDuty');
    function setCategory(c) {
        category.value = c;
        // 切换分类时，重置大部分筛选条件
        keyword.value = '';
        lsData[1] = c;
        localStorage.setItem(filterKey, lsData.join(','));
        usePaginationStore().reset();
    }
    const keyword = ref('');
    function setKeyword(k) {
        keyword.value = k;
        usePaginationStore().reset();
    }

    return {
        datacenter,
        category,
        keyword,
        setDatacenter,
        setCategory,
        setKeyword,
    };
});
