// @ts-ignore 
// https://nuxt.com/docs/api/configuration/nuxt-config
/* eslint-disable no-undef */

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxtjs/eslint-module", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "nuxt-icon", "@nuxtjs/google-fonts"],
  colorMode: {
    preference: "light", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
    classSuffix: "",
  },
  googleFonts: {
    families: {
      // Poppins: {
      //   wght: [100, 400, 700]
      // }
      Poppins: true
    }
  },
  routeRules: {
    "/dashboard/**": { ssr: false },
    "/login": { ssr: false }
  },
  eslint: {},
});
