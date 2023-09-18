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

        <div
            v-for="item in items"
            :key="item.slug"
        >
            {{ item.title }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import Hero from '@/components/common/Hero.vue';
import {Jobs} from '@/services/JobsService';
import {ref} from 'vue';

const jobs = new Jobs();
const items = ref();

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
