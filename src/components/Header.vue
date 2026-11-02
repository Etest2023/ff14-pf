<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import HeaderSelector from './HeaderSelector.vue';
import HeaderRadioGroup from './HeaderRadioGroup.vue';
import HeaderInput from './HeaderInput.vue';
import { storeToRefs } from 'pinia';
import { useFilterStore } from '@/stores/filter.js';
const filterStore = useFilterStore();
const { datacenter, category, keyword } = storeToRefs(filterStore);
const { setDatacenter, setCategory, setKeyword } = filterStore;

const showFilter = ref(false);
const filterRef = ref(null);
function toggleFilter(e) {
    e.stopPropagation();
    showFilter.value = !showFilter.value;
}
function closeFilter() {
    showFilter.value = false;
}
function onDocClick(e) {
    if (filterRef.value && !filterRef.value.contains(e.target)) {
        closeFilter();
    }
}
onMounted(() => {
    document.addEventListener('click', onDocClick);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', onDocClick);
});
</script>

<template>
    <header>
        <div class="wrapper">
            <h1 class="title">FF14招募板</h1>
            <div class="mobile-toggle" @click="toggleFilter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </div>
            <div ref="filterRef" class="filter" :class="{ open: showFilter }" @click.stop>
                <HeaderSelector :data="datacenter" @setData="setDatacenter" />
                <HeaderRadioGroup :data="category" @setData="setCategory" />
                <HeaderInput :data="keyword" @setData="setKeyword" />
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--var-header-height);
    z-index: 100;
    border-bottom: 1px solid var(--color-header-border);
    background-color: var(--color-header-background);
}
.wrapper {
    display: flex;
    max-width: var(--max-width);
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
    align-items: center;
    justify-content: space-between;
}
.title {
    font-size: var(--var-title-size);
}
.mobile-toggle {
    display: none;
}
.filter {
    display: flex;
    align-items: center;
}

@media (max-width: 768px) {
    .wrapper {
        padding: 0 12px;
    }
    .mobile-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        cursor: pointer;
        color: var(--color-title);
    }
    .filter {
        position: absolute;
        top: var(--var-header-height);
        left: 0;
        right: 0;
        display: none;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 12px;
        background-color: var(--color-header-background);
        border-bottom: 1px solid var(--color-header-border);
        z-index: 99;
    }
    .filter.open {
        display: flex;
    }
}
</style>
