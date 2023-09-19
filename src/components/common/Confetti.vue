<template>
    <div />
</template>

<script lang="ts" setup>
import confetti from 'canvas-confetti';
import {watch} from 'vue';

const props = defineProps({
    watchedValue: {
        type: String,
        default: '',
    },
    trigger: {
        type: String,
        default: 'Tim Rocks',
    },
});

watch(
    () => props.watchedValue,
    (newValue: string) => {
        if (newValue === props.trigger) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: {y: 1},
            });
        }
    },
);
</script>
