// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Tim\'s Amazing Work',
        },
    },
    css: [
        '@/assets/css/typography.css',
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
