<script setup>
const {data} = defineProps({
    data: {
        type: String,
        required: true,
    },
})

defineEmits(['setData'])
</script>

<template>
    <div class="keyword-ct">
        <input id="keyword" type="text" placeholder="搜索关键词" :value="data" @change="$emit('setData', $event.target.value)"
    </div>
</template>
<style scoped>
.keyword-ct {
    padding-left: 32px;
    display: flex;
    justify-content: flex-end;

    input {
        display: block;
        box-sizing: border-box;
        width: 240px;
        height: 32px;
        padding: 0 8px;
        border-radius: 8px;
        border: 1px solid #ddd;
        outline: none;
        font-size: 14px;
        opacity: 0.5;
        background-image: var(--svg-search);
        background-position: center right 8px;
        background-size: 1rem auto;
        background-repeat: no-repeat;

        &:focus {
            opacity: 1;
        }
    }
}
</style>
