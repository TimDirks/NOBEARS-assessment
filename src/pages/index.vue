<template>
    <div>
        <button
            class="border px-4 py-2"
            @click="getJobs"
        >
            Fetch Jobs
        </button>

        <JobList :jobs="items" />
    </div>
</template>

<script lang="ts" setup>
import JobList from '@/components/jobs/List.vue';
import {Jobs} from '@/services/JobsService';
import {ref} from 'vue';

const jobs = new Jobs();
const items = ref([]);

const getJobs = async() => {
    const {hits} = await jobs.get(
        {
            aggs: true,
        },
        'POST',
    );

    items.value = hits;
};
</script>
