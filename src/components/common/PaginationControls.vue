<template>
    <div class="grid grid-cols-3 justify-items-center">
        <Btn
            class="w-32"
            :disabled="!canGoPrevious"
            @click="$emit('previous-page')"
        >
            Previous
        </Btn>

        <div class="space-x-2">
            <Btn
                v-for="page in paginationButtons"
                :key="`pagination-button-${page}`"
                :class="{'bg-gray-100 font-bold': page === currentPage}"
                @click="$emit('go-to-page', page)"
            >
                {{ page }}
            </Btn>
        </div>

        <Btn
            class="w-32"
            :disabled="!canGoNext"
            @click="$emit('next-page')"
        >
            Next
        </Btn>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    // How many page buttons should be shown either side of the current page button.
    pageRange: {
        type: Number,
        default: 2,
    },
    totalPages: {
        type: Number,
        required: true,
    },
});


defineEmits<{
    (event: 'go-to-page', page: number): void;
    (event: 'next-page'): void;
    (event: 'previous-page'): void;
}>();

const canGoNext = computed(() => props.currentPage < props.totalPages);
const canGoPrevious = computed(() => props.currentPage > 1);

// Computed to get which pagination buttons should be displayed.
const paginationButtons = computed(() => {
    const pageButtons = [];

    for (let index = props.currentPage - props.pageRange; index <= props.currentPage + props.pageRange; index++) {
        if (index > 0 && index <= props.totalPages) {
            pageButtons.push(index);
        }
    }

    return pageButtons;
});
</script>
