<script setup>
import { computed } from 'vue';
import { getCategoryImgByName } from '@/constants';
import { useFilterStore } from '@/stores/filter.js';
import { useTrackStore } from '@/stores/track.js';
import ThePartySlots from './ThePartySlots.vue';
import TheDescTags from './TheDescTags.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

const showCategory = computed(() => {
    return props.data.category && props.data.category !== 'None';
});
const categoryImg = computed(() => {
    return getCategoryImgByName(props.data.category);
});

function setKeyword(keyword) {
    useFilterStore().setKeyword(keyword);
}

const trackStore = useTrackStore();
const isTracked = computed(() => {
    return trackStore.trackIds.includes(props.data.id);
});
function addTrack(id, data) {
    trackStore.addTrack(id, data);
}
</script>

<template>
    <div
        class="grid-item"
        :class="{ 'show-category': showCategory }"
        :data-id="data.id">
        <div class="img">
            <img :src="categoryImg" alt="" />
        </div>
        <div class="rows">
            <div class="row info">
                <div class="col title">
                    <span :title="data.duty" @click="setKeyword(data.duty)">{{
                        data.duty
                    }}</span>
                </div>
                <div class="col">
                    <div class="party-wrap">
                        <ThePartySlots
                            v-if="data.slots && data.slots.length > 0"
                            :slots="data.slots" />
                    </div>
                </div>
                <div class="col">
                    {{ data.min_item_level > 0 ? data.min_item_level : '无' }}
                </div>
                <div class="col name">
                    <span
                        title="点击作为搜索词"
                        @click="setKeyword(data.name)"
                        >{{ data.name }}</span
                    >
                    @ {{ data.home_world }}
                </div>
                <div class="col" v-once>
                    {{ data._timeLeft }} / {{ data._updateBefore }}
                </div>
                <div class="btn-area" v-if="!isTracked">
                    <div class="btn add" @click="addTrack(data.id, data)"></div>
                </div>
            </div>
            <p class="row desc">
                <TheDescTags :data="data" />
                {{ data.description }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.grid-item {
    position: relative;
}
.img {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 28px;
    height: 28px;
    display: none;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.show-category {
    .img {
        display: block;
    }
    .title {
        padding-left: 40px;
    }
}

.info {
    position: relative;
    display: grid;
    height: 40px;
    line-height: 40px;
    grid-template-columns: var(--var-grid-template-columns);
}
.col {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.party-wrap {
    height: 100%;
}
.title {
    padding-left: 8px;
    font-size: 18px;
    span {
        font-weight: bold;
    }
}
.title,
.name {
    span {
        cursor: pointer;
        color: var(--color-title);
        &:hover {
            color: var(--color-title-hover);
        }
    }
}
.desc {
    padding-left: 8px;
    font-size: 14px;
    line-height: 20px;
    padding-bottom: 8px;
    word-break: break-word;
}
.btn-area {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    .btn {
        width: 20px;
        height: 20px;
        background-image: url('@icons/add&delete.png');
        background-size: cover;
        background-position: 0;
        cursor: pointer;
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }
}

@media (max-width: 768px) {
    .btn-area {
        display: none;
    }
    .grid-item {
        padding: 8px;
    }
    .info {
        display: flex;
        flex-wrap: wrap;
        height: auto;
        line-height: 24px;
        row-gap: 6px;
        align-items: center;
    }
    /* 第一行：任务名 */
    .title {
        order: 1;
        flex: 0 0 100%;
        min-width: 0;
        font-size: 20px;
        line-height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /* 第二行：招募人（左） + 时间（右），两端对齐 */
    .name {
        order: 2;
        flex: 1 1 auto;
        min-width: 0;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .col:nth-child(5) {
        order: 3;
        flex: 0 0 auto;
        min-width: 0;
        text-align: right;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /* 第三行：职能（左） + 平均品级（右），两端对齐 */
    .party-wrap {
        height: 32px;
        min-width: 270px;
    }
    .col:nth-child(2) {
        order: 4;
        flex: 0 0 auto;
        min-width: 0;
        overflow: visible;
        white-space: normal;
    }
    :deep(.party) {
        height: auto;
    }
    :deep(.slot) {
        flex-shrink: 0;
    }
    .col:nth-child(3) {
        order: 5;
        flex: 1 1 0;
        min-width: 0;
        text-align: right;
        white-space: nowrap;
    }
    .desc {
        padding-left: 0;
        padding-top: 6px;
        line-height: 20px;
    }
}
</style>
