<template>
    <div class="relative bg-hero-banner bg-cover bg-center">
        <div class="absolute inset-0 bg-black opacity-50" />

        <div class="relative pb-8 text-white">
            <div class="mb-8 flex divide-x bg-black/50">
                <div class="flex-1 p-4">
                    Imagine a logo
                </div>

                <div
                    v-for="navItem in navItems"
                    :key="navItem.title"
                    class="p-4"
                >
                    {{ navItem.title }}
                </div>
            </div>

            <div class="container mx-auto">
                <div class="w-2/3 font-title text-6xl">
                    This is some filler content to flesh out the hero component
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const navItems = [
    {
        link: '#',
        title: 'Imagine',
    },
    {
        link: '#',
        title: 'Usefull',
    },
    {
        link: '#',
        title: 'Links',
    },
    {
        link: '#',
        title: 'Here',
    },
];
</script>
