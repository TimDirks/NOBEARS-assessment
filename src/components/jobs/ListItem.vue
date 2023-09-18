<template>
    <li class="border">
        This is Job: {{ job.title }}
    </li>
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
