<template>
    <JobsList
        class="mb-8"
        :jobs="paginated.hits"
    />

    <PaginationControls
        :current-page="paginated.currentPage"
        :total-pages="paginated.totalPages"
        @go-to-page="goToPage"
        @next-page="nextPage"
        @previous-page="prevPage"
    />
</template>

<script lang="ts" setup>
import JobsList from '@/components/jobs/List.vue';
import {JobsService} from '@/services/JobsService';
import PaginationControls from '@/components/common/PaginationControls.vue';

const {goToPage, nextPage, paginated, prevPage} = usePaginate(
    new JobsService,
);

await goToPage(1);
</script>
