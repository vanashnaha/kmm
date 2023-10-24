import { RuntimeConfig } from 'nuxt/schema';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@invictus.codes/nuxt-vuetify',
    "@pinia/nuxt",
    "@nuxt/image",
    '@nuxtjs/tailwindcss'
  ],
  css: [
  ],

  pinia: {
    autoImports: [
      "defineStore",
      "storeToRefs",
    ],
  },

  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      //treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: true,
      autoImport: true,
      useVuetifyLabs: true,
    }
  },
  imports: {
    dirs: ["./stores", "./types"],
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  runtimeConfig: {
    public: {
      firebaseClient: JSON.parse(process.env.FIREBASE_CLIENT as string)
    }
  }
})