// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "nuxt-toast",
  ],

  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_APP_API_URL || "http://localhost:8080/",
      timeout: parseInt(process.env.NUXT_PUBLIC_APP_TIMEOUT || "5000"),
    },
  },
  vite: {
    assetsInclude: ["**/*.xlsx"],
    // plugins: [tailwindcss()],
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { charset: 'utf-8' }
      ]
    }
  }
});
