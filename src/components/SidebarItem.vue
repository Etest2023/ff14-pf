<script setup>
import { computed } from 'vue';
import { useFilterStore } from '@/stores/filter.js';
import { useTrackStore } from '@/stores/track.js';
import { categoryMap, getCategoryImgByName } from '@/constants.js';
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

function mayExpired(date) {
    return new Date() - new Date(date) > 60 * 1000;
}

function setKeyword(keyword) {
    useFilterStore().setKeyword(keyword);
}
function removeTrack(id) {
    useTrackStore().removeTrack(id);
}
</script>

<template>
    <div class="item">
        <div class="row base">
            <div class="duty-name">
                <img
                    v-if="showCategory"
                    :src="categoryImg"
                    :alt="categoryMap[data.category]" />
                <div
                    class="title"
                    :class="{ rtl: data.category !== 'Guildhests' }"
                    :title="data.duty"
                    @click="setKeyword(data.duty)">
                    {{ data.duty }}
                </div>
            </div>
            <div class="player-name">
                <span title="点击作为搜索词" @click="setKeyword(data.name)">{{
                    data.name
                }}</span
                >@{{ data.home_world }}
            </div>
        </div>
        <div class="row desc" :title="data.description">
            <TheDescTags :data="data" />
            {{ data.description }}
        </div>
        <div class="row">
            <div class="party">
                <ThePartySlots
                    v-if="data.slots && data.slots.length > 0"
                    :slots="data.slots" />
            </div>
            <div class="min-level">
                品级：{{ data.min_item_level > 0 ? data.min_item_level : '无' }}
            </div>
        </div>
        <div class="row">
            <div class="time">
                <span v-if="data.isExpired" class="expired">招募已失效</span>
                <template v-else>
                    {{ data._timeLeft }} /&nbsp;<span
                        :class="{ expired: mayExpired(data.updated_at) }"
                        :title="
                            mayExpired(data.updated_at)
                                ? '招募可能已失效'
                                : false
                        "
                        >{{ data._updateBefore }}</span
                    >
                    &nbsp;&nbsp;<slot></slot>
                </template>
            </div>
            <div class="btn-area">
                <div class="btn delete" @click="removeTrack(data.id)"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item {
    padding: 8px;
}
.duty-name {
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;

    img {
        margin-right: 4px;
        width: 24px;
        height: 24px;
    }
    .title {
        height: 32px;
        line-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        white-space: nowrap;
        font-size: 16px;
        font-weight: bold;

        &.rtl {
            direction: rtl;
        }
    }
}
.player-name {
    flex: 0 0 auto;
    margin-left: 8px;
}
.title,
.player-name span {
    color: var(--color-title);
    cursor: pointer;
    &:hover {
        color: var(--color-title-hover);
    }
}
.row {
    position: relative;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:last-of-type {
        margin-bottom: 0;
    }
}
.desc {
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    font-size: 14px;
    cursor: help;
}
.time {
    display: flex;
    align-items: center;

    .expired {
        color: #d33;
    }
}
.btn-area {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    .btn {
        width: 20px;
        height: 20px;
        background-image: url('@icons/add&delete.png');
        background-size: cover;
        background-position: -100% 0;
        cursor: pointer;
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }
}
.refresh {
    margin-left: 4px;
}
</style>
