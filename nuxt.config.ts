// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@/assets/css/main.css',
    ],
    devtools: {
        enabled: true,
    },
    modules: [
        '@nuxtjs/eslint-module',
    ],
    postcss: {
        plugins: {
            autoprefixer: {},
            tailwindcss: {},
        },
    },
    runtimeConfig: {
        public: {
            apiEndpoint: '',
        },
    },
    srcDir: 'src',
});
