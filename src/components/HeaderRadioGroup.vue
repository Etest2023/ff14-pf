<script setup>
import { categoryMap, getCategoryImgByName } from '@/constants';

const props = defineProps({
    data: {
        type: String,
        required: true,
    },
});

defineEmits(['setData']);

const RadioGroup = Object.keys(categoryMap);

const RadioGroupObj = RadioGroup.map((item) => ({
    key: item,
    image: getCategoryImgByName(item),
}));
</script>

<template>
    <div class="radio-group">
        <div
            v-for="item in RadioGroupObj"
            :key="item.key"
            :for="item.key"
            :title="categoryMap[item.key]"
            class="radio-item"
            :class="{
                selected: props.data === item.key,
                plain: item.key === 'None',
            }"
            @mousedown.prevent="$emit('setData', item.key)">
            <img v-if="item.image" :src="item.image" alt="任务图标" />
            <div v-else class="txt">{{ categoryMap[item.key] }}</div>
            <input
                type="radio"
                name="radio"
                :value="item.key"
                :checked="props.data === item.key" />
        </div>
    </div>
</template>
<style scoped>
.radio-group {
    display: flex;
    align-items: center;
}
.radio-item {
    --var-checkbox-size: 10px;

    margin-right: 4px;
    position: relative;
    display: flex;
    align-items: center;
    opacity: 0.6;
    cursor: pointer;

    img {
        display: block;
        width: var(--var-header-icon-size);
        height: var(--var-header-icon-size);
    }
    input {
        display: none;
    }
    &::after {
        position: absolute;
        bottom: 1px;
        left: 1px;
        content: '';
        display: block;
        width: var(--var-checkbox-size);
        height: var(--var-checkbox-size);
        background-image: url('@icons/checkbox.png');
        background-size: cover;
        background-position: 0 0;
        background-repeat: no-repeat;
        z-index: 2;
    }
}
.selected {
    opacity: 1;

    &:not(.plain)::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        display: block;
        width: var(--var-header-icon-size);
        height: var(--var-header-icon-size);
        background-image: url('@icons/cover.webp');
        background-size: cover;
        background-position: 0 0;
        background-repeat: no-repeat;
        z-index: 1;
    }
    &::after {
        background-position: calc(var(--var-checkbox-size) * -1) 0;
    }
}

.plain {
}
.txt {
    padding: 0 8px;
    color: var(--color-filter-plain);
    font-size: 14px;
    line-height: 32px;
    border-radius: 6px;
    background-color: var(--color-filter-plain-bg);
}
</style>
