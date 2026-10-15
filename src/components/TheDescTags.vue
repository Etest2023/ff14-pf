<script setup>
import { strToCN } from '@/constants';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});
</script>
<template>
    <template v-if="data">
        <span
            class="tag objective"
            v-if="data.objective && data.objective !== 'NONE' && strToCN[data.objective]"
            :class="data.objective"
            >[{{ strToCN[data.objective] }}]</span
        >
        <span
            class="tag conditions"
            v-if="data.conditions && data.conditions !== 'NONE' && strToCN[data.conditions]"
            :class="data.conditions"
            >[{{ strToCN[data.conditions] }}]</span
        >
        <span class="tag limit" v-if="data.is_one_player_per_job"
            >[职业不重复]</span
        >
    </template>
</template>
<style scoped>
.PRACTICE {
    color: rgb(17, 158, 96);
}
.DUTY_COMPLETION {
    color: rgb(21, 168, 197);
}
.LOOT {
    color: rgb(213, 121, 12);
}
</style>
