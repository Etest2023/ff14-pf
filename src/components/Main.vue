<script setup>
import { onMounted, computed } from 'vue';
import MainItem from './MainItem.vue';
import MainFooter from './MainFooter.vue';
import { useListStore } from '@/stores/list.js';

const listStore = useListStore();
onMounted(() => {
    listStore.getList();
});
const MainList = computed(() => {
    return listStore.list;
});
const MainListLoading = computed(() => {
    return listStore.isLoading;
});
</script>

<template>
    <main>
        <div class="grid-header">
            <div class="col center">任务</div>
            <div class="col">职能</div>
            <div class="col">平均品级</div>
            <div class="col">招募人</div>
            <div class="col">招募剩余 / 更新时间</div>
        </div>
        <div v-if="MainListLoading" class="loading">正在加载...</div>
        <div v-else class="grid-items">
            <MainItem v-for="item in MainList" :key="item.id" :data="item" />
            <p class="items-end">
                {{ MainList.length === 0 ? '暂无数据' : '到底了' }}
            </p>
        </div>
        <footer>
            <MainFooter />
        </footer>
    </main>
</template>

<style scoped>
main {
    padding-top: var(--var-header-height);
    padding-left: var(--main-padding-h);
    padding-right: var(--main-padding-right);
    padding-bottom: 60px;
}
.grid-header {
    padding-top: 8px;
    display: grid;
    grid-template-columns: var(--var-grid-template-columns);
    align-items: center;
    border-bottom: 1px dashed var(--color-header-border);
}
.loading {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
:deep(.grid-item:nth-of-type(2n)) {
    background-color: var(--color-background-alt);
}
.center {
    text-align: center;
}
.items-end {
    margin: 20px;
    text-align: center;
}
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1;
    border-top: 1px solid var(--color-header-border);
    background-color: var(--color-header-background);
}
</style>
