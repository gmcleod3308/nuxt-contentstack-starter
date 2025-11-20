export default defineNuxtConfig({
  app: {
      head: {
          htmlAttrs: {
              lang: "en",
          },
          meta: [
              { charset: "utf-8" },
              {
                  name: "viewport",
                  content: "width=device-width, initial-scale=1",
              },
              { name: "format-detection", content: "telephone=no" },
              { name: "msapplication-TileColor", content: "#074582" },
              { name: "theme-color", content: "#ffffff" },
          ],
          script: [
              {
                  src: "https://kit.fontawesome.com/18a9bbb99c.js",
                  crossorigin: "anonymous",
                  defer: true,
              },
          ],
      },
      layoutTransition: { name: "fade", mode: "out-in" },
  },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/main.css"
  ],

runtimeConfig: {
    contentstack: {
        apiKey: process.env.CONTENTSTACK_API_KEY,
        deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
        environment: process.env.CONTENTSTACK_ENVIRONMENT,
        region: process.env.CONTENTSTACK_REGION || 'US'
    }
},

  vite: {
      build: {
          minify: "esbuild",
          terserOptions: {
              compress: true,
              mangle: true,
          },
      },
      logLevel: "silent",
  },

  devtools: {
      enabled: true,
      timeline: {
          enabled: true,
      },
  },

  compatibilityDate: "2024-12-02"
})