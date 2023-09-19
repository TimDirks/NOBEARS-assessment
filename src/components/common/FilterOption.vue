<template>
    <div class="flex rounded px-2 transition-colors hover:bg-gray-100">
        <input
            :id="`filter-option-${bucket.key}`"
            :checked="checked"
            class="me-2 w-4 cursor-pointer"
            type="checkbox"
            :value="bucket.key"
            @change="$emit('change', bucket.key)"
        >

        <label
            class="flex grow cursor-pointer items-center justify-between"
            :for="`filter-option-${bucket.key}`"
        >
            {{ bucket.key }}

            <span class="ms-auto text-xs text-gray-500">
                ({{ bucket.doc_count }})
            </span>
        </label>
    </div>
</template>

<script lang="ts" setup>
import {IBucket} from '@/types/Filter';
import {PropType} from 'vue';

defineProps({
    bucket: {
        type: Object as PropType<IBucket>,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
});

defineEmits<{(e: 'change', v: string)}>();
</script>
