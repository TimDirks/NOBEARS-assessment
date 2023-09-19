<template>
    <div>
        Filter Option {{ filter.meta.label }}

        <div>
            <div
                v-for="bucket in sortedBuckets"
                :key="`${filter.meta.pname}-bucket-${bucket.position}`"
            >
                {{ bucket.key }} ({{ bucket.doc_count }})
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {IBucket, IFilter} from '@/types/Filter';
import {PropType, computed} from 'vue';

const props = defineProps({
    filter: {
        type: Object as PropType<IFilter>,
        required: true,
    },
});

const sortedBuckets = computed(() => {
    const {buckets} = props.filter;

    return buckets.sort((bucketA: IBucket, bucketB: IBucket) => bucketB.position - bucketA.position);
});
</script>
