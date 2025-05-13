// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  routeRules: {
    "/api/auth/**": { proxy: `${process.env.API_AUTH}/api/auth/**` },
    "/api/users/**": { proxy: `${process.env.API_AUTH}/api/users/**` },
    "/api/teams/**": { proxy: `${process.env.API_AUTH}/api/teams/**` },
    "/api/invite-users/**": {
      proxy: `${process.env.API_AUTH}/api/invite-users/**`,
    },
    "/api/admin/**": { proxy: `${process.env.API_AUTH}/api/admin/**` },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/app.css"],

  nitro: {
    externals: {
      inline: ["@heroicons/vue/24/outline", "@heroicons/vue/24/solid"],
    },
  },

  modules: ["@nuxt/image"],

  imports: {
    dirs: ["components", "composables", "plugins"],
    autoImport: true,
  },

  runtimeConfig: {
    public: {
      cookieConfig: {
        domain: (process.env.DOMAIN as string) || "localhost",
        secure: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
});
