<template>
    <div class="rounded-lg border border-gray-300 py-2">
        <div class="mx-4 mb-2 text-lg font-bold">
            {{ filter.meta.label }}
        </div>

        <div class="mb-2 space-y-1">
            <FilterOption
                v-for="bucket in shownBuckets"
                :key="`${filter.meta.pname}-bucket-${bucket.position}`"
                :bucket="bucket"
                :checked="isChecked(bucket.key)"
                class="mx-2"
                @change="onUpdateModelValue(bucket.key)"
            />
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
import {PropType, computed, ref, watch} from 'vue';
import FilterOption from '@/components/common/FilterOption.vue';

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
    modelValue: {
        type: Array as PropType<string[]>,
        default: () => ([]),
    },
});

const emit = defineEmits<{(e: 'update:modelValue', v: string[])}>();

const mValue = ref<string[]>([]);

watch(
    () => props.modelValue,
    v => mValue.value = [...v],
    {immediate: true},
);

const isChecked = (bucketKey: string) => mValue.value.includes(bucketKey);

const onUpdateModelValue = (bucketKey: string) => {
    const index = mValue.value.indexOf(bucketKey);

    if (index === -1) {
        mValue.value.push(bucketKey);
    } else {
        mValue.value.splice(index, 1);
    }

    emit('update:modelValue', mValue.value);
};

const sortedBuckets = computed(() => {
    const {buckets} = props.filter;

    return buckets
        .filter((bucket: IBucket) => bucket.position != null)
        .sort((bucketA: IBucket, bucketB: IBucket) => bucketA.position - bucketB.position);
});

const shownBuckets = computed(() => {
    return showMore.value
        ? sortedBuckets.value
        : sortedBuckets.value.slice(0, props.minFiltersShown);
});

const canShowMore = computed(() => {
    return sortedBuckets.value.length > props.minFiltersShown;
});

const toggleShowMore = () => {
    showMore.value = !showMore.value;
};
</script>
