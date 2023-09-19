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

                <Btn
                    :disabled="!hasFiltersActive"
                    @click="reset"
                >
                    Reset filters
                </Btn>
            </div>

            <div
                v-if="state.loading"
                class="my-12 text-center"
            >
                <Spinner class="inline-block" />
            </div>

            <div
                v-if="state.error"
                class="mt-12 italic text-red-500"
            >
                Something went wrong! Please don't sue me, I'm merely a website.
            </div>

            <div :class="{invisible: !state.success}">
                <div class="mb-4 flex items-end">
                    <div class="grow font-title text-4xl">
                        Vacancies
                    </div>

                    <div class="text-sm text-gray-500">
                        {{ paginated.total }} matches found
                    </div>
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

        <ClientOnly>
            <Confetti :watched-value="params.q" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import {computed, watch} from 'vue';
import Confetti from '@/components/common/Confetti.vue';
import DebounceInput from '@/components/common/DebounceInput.vue';
import FilterGroup from '@/components/common/FilterGroup.vue';
import JobsList from '@/components/jobs/List.vue';
import {JobsService} from '@/services/JobsService';
import PaginationControls from '@/components/common/PaginationControls.vue';
import Spinner from '@/components/common/Spinner.vue';
// import confetti from 'canvas-confetti';

const {
    goToPage,
    nextPage,
    paginated,
    params,
    prevPage,
    reset,
    state,
} = usePaginate(
    new JobsService,
    getRouteQueryParams(),
);

await goToPage(1);

// setTimeout(() => {
//     confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: {y: 0.6},
//     });
// }, 1000);

const hasFiltersActive = computed(() => {
    const hasActiveAggregation = Object.entries(params.value.f)
        .find(([, value]) => value.length) !== undefined;

    return hasActiveAggregation
        || !!params.value.q;
});

watch(
    [
        () => params.value.q,
        () => params.value.f,
    ],
    () => {
        // Only the query and filters need to be pushed to the route query.
        setRouteQueryParams({
            q: params.value.q,
            f: params.value.f,
        });
    },
    {
        deep: true,
    },
);
</script>
