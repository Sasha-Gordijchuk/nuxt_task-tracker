// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxt/fonts"],
  fonts: {
    families: [{ name: "montserrat", provider: "google" }],
  },
  css: ["~/assets/scss/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_variables" as *;
            @use "~/assets/scss/_mixins" as *;
          `,
        }
      },
    },
  },
});