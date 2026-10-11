<script setup>
import HeaderSelector from './HeaderSelector.vue';
import HeaderRadioGroup from './HeaderRadioGroup.vue';
import HeaderInput from './HeaderInput.vue';
import { storeToRefs } from 'pinia';
import { useFilterStore } from '@/stores/filter.js';
const filterStore = useFilterStore();
const { datacenter, category, keyword } = storeToRefs(filterStore);
const { setDatacenter, setCategory, setKeyword } = filterStore;
</script>

<template>
    <header>
        <div class="wrapper">
            <h1 class="title">FF14招募板</h1>
            <div class="filter">
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
.filter {
    display: flex;
    align-items: center;
}
</style>
