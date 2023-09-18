/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{js,vue,ts}',
        './src/layouts/**/*.vue',
        './src/pages/**/*.vue',
        './src/plugins/**/*.{js,ts}',
        './src/app.vue',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'hero-banner': 'url(\'@/assets/img/iceland-banner.jpg\')',
            },
            fontFamily: {
                body: ['Roboto Mono', 'sans-serif'],
                title: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
