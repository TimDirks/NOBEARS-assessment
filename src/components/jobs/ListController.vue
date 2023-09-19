<template>
    <button @click="nextPage">Paginate more</button>

    <JobsList :jobs="paginated.hits" />
</template>

<script lang="ts" setup>
import JobsList from '@/components/jobs/List.vue';
import {JobsService} from '@/services/JobsService';

const {paginated, nextPage} = usePaginate(
    new JobsService,
);

await nextPage();
</script>
