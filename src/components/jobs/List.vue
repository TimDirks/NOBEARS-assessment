<template>
    <ol>
        <JobListItem
            v-for="job of jobs"
            :key="job.slug"
            :job="job"
        />
    </ol>
</template>

<script lang="ts" setup>
import {Job} from '@/services/JobsService';
import JobListItem from '@/components/jobs/ListItem.vue';
import {PropType} from 'vue';

defineProps({
    jobs: {
        type: Array as PropType<Job[]>,
        required: true,
    },
});
</script>
