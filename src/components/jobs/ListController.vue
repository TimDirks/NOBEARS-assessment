<template>
    <div class="grid grid-cols-4">
        <FilterGroup
            v-model="params.f"
            :aggregation="paginated.aggregations"
        />

        <div class="col-span-3">
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
        </div>
    </div>
</template>

<script lang="ts" setup>
import FilterGroup from '@/components/common/FilterGroup.vue';
import JobsList from '@/components/jobs/List.vue';
import {JobsService} from '@/services/JobsService';
import PaginationControls from '@/components/common/PaginationControls.vue';

const {goToPage, nextPage, paginated, params, prevPage} = usePaginate(
    new JobsService,
);

await goToPage(1);
</script>
