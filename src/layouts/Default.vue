<template>
    <main class="font-body">
        <Hero />

        <div class="container mx-auto">
            <slot />
        </div>
    </main>
</template>

<script lang="ts" setup>
import Hero from '@/components/common/Hero.vue';
</script>
