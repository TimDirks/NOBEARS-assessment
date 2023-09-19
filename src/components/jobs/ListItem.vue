<template>
    <div class="relative overflow-hidden rounded border px-8 py-6">
        <div class="font-title text-2xl">
            {{ job.title }}
        </div>

        <div class="mb-4 line-clamp-1 text-gray-500">
            {{ job.subtitle }}
        </div>

        <div class="mb-4 line-clamp-2">
            {{ job.intro }}
        </div>

        <div class="flex gap-4">
            <div>
                <span class="text-gray-500">
                    Location:
                </span>

                {{ job.location.place }}
            </div>

            <div>
                <span class="text-gray-500">
                    Categories:
                </span>

                {{ job.category.join(', ') }}
            </div>
        </div>

        <div
            v-if="job.label"
            class="absolute right-0 top-0 bg-orange-500 px-4 py-2 text-sm capitalize text-white"
        >
            {{ job.label }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import {Job} from '@/services/JobsService';
import {PropType} from 'vue';

defineProps({
    job: {
        type: Object as PropType<Job>,
        required: true,
    },
});
</script>
