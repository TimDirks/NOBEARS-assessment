<template>
    <div>
        Aggregation Options

        <div class="space-y-4">
            <Filter
                v-for="option in aggregationOption"
                :key="`aggregation-${option.name}`"
                :filter="option.filter"
                :model-value="mValue[option.filter.meta.pname]"
                @update:model-value="onUpdateModelValue($event, option.filter.meta.pname)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {PropType, computed, ref, watch} from 'vue';
import Filter from '@/components/common/Filter.vue';
import {IAggregation} from '@/types/Aggregation';

const props = defineProps({
    aggregation: {
        type: Object as PropType<IAggregation>,
        required: true,
    },
    modelValue: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
    },
});

const emit = defineEmits<{(e: 'update:modelValue', v: Record<string, any>)}>();

const mValue = ref<Record<string, any>>({});

watch(
    () => props.modelValue,
    v => mValue.value = {...v},
    {immediate: true},
);

const aggregationOption = computed(() => {
    return Object.entries(props.aggregation)
        .map(([key, value]) => ({
            name: key,
            filter: value,
        }));
});

const onUpdateModelValue = (updatedValue: any, filterKey: string) => {
    mValue.value[filterKey] = updatedValue;

    emit('update:modelValue', mValue.value);
};
</script>
