module.exports = {
  content: [
    `components/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
    `app.vue` // For Nuxt 3, but good to have for future proofing if config is copied
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
