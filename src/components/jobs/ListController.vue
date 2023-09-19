<template>
    <div class="grid grid-cols-4 gap-4">
        <FilterGroup
            v-model="params.f"
            :aggregation="paginated.aggregations"
        />

        <div class="col-span-3">
            <div class="mb-8 flex gap-x-4">
                <DebounceInput
                    v-model="params.q"
                    class="grow"
                    placeholder="Search on Job Title or keyword..."
                />

                <Btn @click="reset">
                    Reset filters
                </Btn>
            </div>

            <div
                v-if="state.loading"
                class="my-12 text-center"
            >
                <Spinner class="inline-block" />
            </div>

            <div :class="{invisible: state.loading}">
                <div class="mb-4 font-title text-4xl">
                    Vacancies
                </div>

                <div v-show="paginated.hits.length">
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

                <div
                    v-if="!paginated.hits.length"
                    class="italic"
                >
                    We couldn't find any results matching your search criteria.
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import DebounceInput from '@/components/common/DebounceInput.vue';
import FilterGroup from '@/components/common/FilterGroup.vue';
import JobsList from '@/components/jobs/List.vue';
import {JobsService} from '@/services/JobsService';
import PaginationControls from '@/components/common/PaginationControls.vue';
import Spinner from '@/components/common/Spinner.vue';

const {goToPage, nextPage, paginated, params, prevPage, reset, state} = usePaginate(
    new JobsService,
);

await goToPage(1);
</script>
