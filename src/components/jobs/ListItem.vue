<template>
    <div class="relative rounded border p-8">
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
