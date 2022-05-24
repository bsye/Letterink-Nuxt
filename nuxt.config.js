export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "letterink-nuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/craft.js", "~/plugins/preview.client.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "nuxt-graphql-request",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxt/http',
    "@nuxtjs/i18n",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  i18n: {
    // skipSettingLocaleOnNavigate: true,
    straetegy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      // {
      //   code: "it",
      //   name: "Italiano",
      //   iso: "it-IT",
      //   file: "it.js",
      // },
      {
        code: "en",
        name: "English",
        iso: "en-US",
        file: "en.js",
      },
    ],
    lazy: true,
    langDir: "./assets/translations/",
    parsePages: false,
    // vuex: {
    //   moduleName: "i18n",
    //   syncRouteParams: true,
    // },
  },

  graphql: {
    clients: {
      default: {
        endpoint: process.env.BASE_API,
        mode: "cors",
      },
    },
  },

  privateRuntimeConfig: {
    craftApiUrl: process.env.BASE_API,
    craftAuthToken: process.env.CRAFT_AUTH_TOKEN,
  },

  publicRuntimeConfig: {
    livePreview: process.env.LIVE_PREVIEW === "true",
    craftApiUrl:
      process.env.LIVE_PREVIEW === "true" ? process.env.BASE_API : "",
    craftAuthToken:
      process.env.LIVE_PREVIEW === "true" ? process.env.CRAFT_AUTH_TOKEN : "",
  },
};
