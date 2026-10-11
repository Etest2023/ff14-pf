<script setup>
import { computed } from 'vue';
const images = import.meta.glob('@areas/*.png', {
    import: 'default',
    eager: true,
});
const imageKeys = Object.keys(images);
const imageNames = imageKeys.map((key) => key.split('/').pop().split('.')[0]);

const areaList = ['陆行鸟', '莫古力', '猫小胖', '豆豆柴', '陸行鳥'];
const obj = areaList.map((item) => ({
    title: item,
    image:
        images[imageKeys[imageNames.indexOf(item)]] ||
        (item === '陸行鳥'
            ? images[imageKeys[imageNames.indexOf('陆行鸟')]]
            : ''),
}));

const { data } = defineProps({
    data: {
        type: String,
        required: true,
    },
});
defineEmits(['setData']);
const selected = computed(() => {
    return obj.find((item) => item.title === data) || obj[0];
});
</script>

<template>
    <div class="selector-ct">
        <div class="selector-value">
            <img :src="selected.image" :alt="selected.title" />
            {{ selected.title }}
        </div>
        <div class="selector-list">
            <div
                v-for="item in obj"
                :key="item.title"
                class="item"
                :class="{ selected: selected.title === item.title }"
                @click="$emit('setData', item.title)">
                <img :src="item.image" :alt="item.title" />
                {{ item.title }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.selector-ct {
    position: relative;
    width: 120px;
    padding-right: 16px;

    .selector-value {
        display: flex;
        align-items: center;
    }
    .selector-list {
        padding: 4px 0;
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: -8px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    &:hover {
        .selector-list {
            display: flex;
        }
    }
    .item {
        padding: 4px 16px 4px 8px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &.selected {
            color: var(--color-text-highlight);
        }
        &:hover {
            background-color: #ddd;
        }
    }
    img {
        width: 40px;
        height: 40px;
    }
}
</style>
