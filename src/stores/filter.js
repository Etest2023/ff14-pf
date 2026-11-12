import { ref } from 'vue';
import { defineStore } from 'pinia';
import { usePaginationStore } from './pagination.js';

const filterKey = 'ff14pf_filter';
const ls = localStorage.getItem(filterKey) || '';

// 搜索词同步到地址栏，并据此维护浏览器历史记录
const SEARCH_PARAM = 'keyword';
const SEARCH_STATE_KEY = 'ff14pfSearch';

function getUrlKeyword() {
    return new URL(location.href).searchParams.get(SEARCH_PARAM) || '';
}

function syncKeywordUrl(k) {
    const url = new URL(location.href);
    const current = url.searchParams.get(SEARCH_PARAM) || '';
    if (current === k) return;

    if (k) {
        url.searchParams.set(SEARCH_PARAM, k);
        if (current) {
            history.replaceState(history.state, '', url);
        } else {
            history.pushState(
                { ...history.state, [SEARCH_STATE_KEY]: true },
                '',
                url,
            );
        }
    } else {
        url.searchParams.delete(SEARCH_PARAM);
        if (history.state?.[SEARCH_STATE_KEY]) {
            history.back();
        } else {
            history.replaceState(history.state, '', url);
        }
    }
}

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
        syncKeywordUrl('');
        lsData[1] = c;
        localStorage.setItem(filterKey, lsData.join(','));
        usePaginationStore().reset();
    }
    // 首次加载时，地址栏的搜索参数优先作为搜索词
    const keyword = ref(getUrlKeyword());
    function setKeyword(k) {
        keyword.value = k;
        syncKeywordUrl(k);
        usePaginationStore().reset();
    }

    // 浏览器前进/后退时，以地址栏参数为准更新搜索词
    window.addEventListener('popstate', () => {
        const k = getUrlKeyword();
        if (k === keyword.value) return;
        keyword.value = k;
        usePaginationStore().reset();
    });

    return {
        datacenter,
        category,
        keyword,
        setDatacenter,
        setCategory,
        setKeyword,
    };
});
