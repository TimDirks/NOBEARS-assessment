<template>
    <JobsList :jobs="items" />
</template>

<script lang="ts" setup>
import JobsList from '@/components/jobs/List.vue';
import {Params} from '@/services/Service';
import {PropType} from 'vue';

defineProps({
    defaultParams: {
        type: Object as PropType<Params>,
        default: () => ({} as Params),
    },
});

const items = [];
</script>
