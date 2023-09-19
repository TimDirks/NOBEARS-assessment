<template>
    <div class="grid grid-cols-4 gap-4">
        <FilterGroup
            v-model="params.f"
            :aggregation="paginated.aggregations"
        />

        <div class="col-span-3">
            <div
                v-if="state.loading"
                class="my-12 text-center"
            >
                <Spinner class="inline-block" />
            </div>

            <div :class="{invisible: state.loading}">
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
    </div>
</template>

<script lang="ts" setup>
import FilterGroup from '@/components/common/FilterGroup.vue';
import JobsList from '@/components/jobs/List.vue';
import {JobsService} from '@/services/JobsService';
import PaginationControls from '@/components/common/PaginationControls.vue';
import Spinner from '@/components/common/Spinner.vue';

const {goToPage, nextPage, paginated, params, prevPage, state} = usePaginate(
    new JobsService,
);

await goToPage(1);
</script>
