<template>
    <input
        class="rounded-full border px-4 py-2"
        type="text"
        :value="mValue"
        @input="onUpdateModelValue"
    >
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {clearTimeout} from 'node:timers';

const debouncedEmit = ref();

const props = defineProps({
    debounceDelay: {
        type: Number,
        default: 300,
    },
    modelValue: {
        type: String,
        required: true,
    },
});

const emit = defineEmits<{(e: 'update:modelValue', v?: string)}>();

const mValue = ref<string>();

watch(
    () => props.modelValue,
    v => mValue.value = v,
    {immediate: true},
);

const onUpdateModelValue = (newValue: string) => {
    mValue.value = newValue;

    clearTimeout(debouncedEmit.value);

    debouncedEmit.value = setTimeout(() => {
        emit('update:modelValue', mValue.value);
    }, props.debounceDelay);
};
</script>
