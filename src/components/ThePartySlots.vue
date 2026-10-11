<script setup>
import {
    getJobImgByName,
    TankStrs,
    HealerStrs,
    DpsStrs,
} from '@/constants';

const props = defineProps({
    slots: {
        type: Object,
        required: true,
    },
});

function parseJobTxt(data) {
    const { job_id } = data;
    if (job_id.length > 1) return job_id.length;
}
</script>

<template>
    <div class="party">
        <div
            v-for="(slot, index) in slots"
            :key="index"
            v-show="slot.job && slot.job !== null"
            :title="slot._jobCN"
            class="slot"
            :data-job="slot.job"
            :data-filled="slot.filled"
            :data-job-id="slot.job_id"
            :class="{
                filled: slot.filled,
                dps:
                    slot.job &&
                    DpsStrs.some((item) => slot.job.indexOf(item) > -1),
                tank:
                    slot.job &&
                    TankStrs.some((item) => slot.job.indexOf(item) > -1),
                healer:
                    slot.job &&
                    HealerStrs.some((item) => slot.job.indexOf(item) > -1),
            }"
            :style="
                slot.job_id.length <= 1
                    ? {
                          backgroundImage: `url(${getJobImgByName(slot.job, slot.filled)})`,
                      }
                    : {}
            ">
            {{ parseJobTxt(slot) || '' }}
        </div>
    </div>
</template>

<style scoped>
.party {
    display: flex;
    height: 100%;
    align-items: center;
}
.slot {
    --var-slot-size: 32px;
    --color-default: #868180;
    --color-tank: #455fc8;
    --color-healer: #457937;
    --color-dps: #813b3c;

    width: var(--var-slot-size);
    height: var(--var-slot-size);
    margin-right: 2px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: help;
    color: #bbb;
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center center;
    background-color: var(--color-default);
    border: 1px solid #bbc6ce;

    &.filled {
        background-color: rgba(0, 0, 0, 0) !important;
        background-size: cover;
        border: none;
    }
    &.tank {
        background-color: var(--color-tank);
    }
    &.healer {
        background-color: var(--color-healer);
    }
    &.dps {
        background-color: var(--color-dps);
    }
    &.tank.healer {
        background: linear-gradient(
            to bottom,
            var(--color-tank) 0%,
            var(--color-tank) 50%,
            var(--color-healer) 50%
        );
    }
    &.tank.dps {
        background: linear-gradient(
            to bottom,
            var(--color-tank) 0%,
            var(--color-tank) 50%,
            var(--color-dps) 50%
        );
    }
    &.healer.dps {
        background: linear-gradient(
            to bottom,
            var(--color-healer) 0%,
            var(--color-healer) 50%,
            var(--color-dps) 50%
        );
    }
    &.tank.healer.dps {
        background: linear-gradient(
            to bottom,
            var(--color-tank) 0%,
            var(--color-tank) 33%,
            var(--color-healer) 33%,
            var(--color-healer) 66%,
            var(--color-dps) 66%
        );
    }
}
.total {
    margin-left: 4px;
}
</style>
