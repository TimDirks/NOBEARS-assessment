<template>
    <div class="rounded-lg border border-gray-300 py-2">
        <div class="mx-4 mb-2 text-lg font-bold">
            {{ filter.meta.label }}
        </div>

        <div class="mb-2 space-y-1">
            <div
                v-for="bucket in sortedBuckets"
                :key="`${filter.meta.pname}-bucket-${bucket.position}`"
                class="mx-2 flex rounded px-2 transition-colors hover:bg-gray-100"
            >
                <input
                    :id="`${filter.meta.pname}-${bucket.key}`"
                    class="me-2 w-4 cursor-pointer"
                    type="checkbox"
                >

                <label
                    class="flex grow cursor-pointer items-center justify-between"
                    :for="`${filter.meta.pname}-${bucket.key}`"
                >
                    {{ bucket.key }}

                    <span class="ms-auto text-xs text-gray-500">
                        ({{ bucket.doc_count }})
                    </span>
                </label>
            </div>
        </div>

        <div
            v-if="canShowMore"
            class="mx-4 inline-block cursor-pointer text-red-600 transition-colors hover:text-red-900 hover:underline"
            @click="toggleShowMore"
        >
            {{ showMore ? 'Show less' : 'Show more' }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import {IBucket, IFilter} from '@/types/Filter';
import {PropType, computed, ref} from 'vue';

const showMore = ref<boolean>(false);

const props = defineProps({
    filter: {
        type: Object as PropType<IFilter>,
        required: true,
    },
    minFiltersShown: {
        type: Number,
        default: 5,
    },
});

const canShowMore = computed(() => props.filter.buckets.length > props.minFiltersShown);

const sortedBuckets = computed(() => {
    const {buckets} = props.filter;

    const sortedBuckets = buckets.sort((bucketA: IBucket, bucketB: IBucket) => bucketA.position - bucketB.position);

    return showMore.value
        ? sortedBuckets
        : sortedBuckets.slice(0, props.minFiltersShown);
});

const toggleShowMore = () => {
    showMore.value = !showMore.value;
};
</script>
