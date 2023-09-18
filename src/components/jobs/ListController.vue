<template>
    <JobsList :jobs="paginated" />
</template>

<script lang="ts" setup>
import JobsList from '@/components/jobs/List.vue';
import {JobsService} from '@/services/JobsService';

const {paginated, paginate} = usePaginate(
    new JobsService,
);

await paginate();
</script>
