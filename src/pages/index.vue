<template>
    <div>
        <Hero />

        This is the homepage

        <div class="text-center text-xl">
            Tim's assessment!
        </div>

        <button
            class="border px-4 py-2"
            @click="getJobs"
        >
            Fetch API
        </button>

        {{ result }}
    </div>
</template>

<script lang="ts" setup>
import Hero from '@/components/common/Hero.vue';
import {Job} from '@/services/JobService';
import {ref} from 'vue';

const result = ref();

const getJobs = async() => {
    const jobs = new Job();

    // result.value = await jobs.fetch();
    result.value = await jobs.get(
        {
            aggs: true,
        },
        'POST',
    );
};
</script>
