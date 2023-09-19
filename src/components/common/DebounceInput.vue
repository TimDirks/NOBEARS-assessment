<template>
    <input
        class="rounded border px-4 py-2 transition-colors focus:border-black focus:outline-0"
        type="text"
        :value="mValue"
        @input="onUpdateModelValue($event.target.value)"
    >
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';

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
