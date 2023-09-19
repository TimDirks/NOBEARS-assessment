<template>
    <div>
        Aggregation Options

        <div>
            <Filter
                v-for="option in aggregationOption"
                :key="`aggregation-${option.name}`"
                :filter="option.filter"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import Filter from '@/components/common/Filter.vue';
import {IAggregation} from '@/types/Aggregation';

const props = defineProps({
    aggregation: {
        type: Object as PropType<IAggregation>,
        required: true,
    },
});

const aggregationOption = computed(() => {
    return Object.entries(props.aggregation)
        .map(([key, value]) => ({
            name: key,
            filter: value,
        }));
});
</script>
