const url = process.env.BASE_URL || 'https://blogtally.com/resources'

export default defineNuxtConfig({

  app: {
    baseURL: '/resources',
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/sitemap', '@nuxt/content', 'nuxt-security'],

  security: {
    rateLimiter: false,
    requestSizeLimiter: false,
    headers: {
      contentSecurityPolicy: {
        'img-src': ['\'self\'', 'https:']
      }
    }
  },

  runtimeConfig: {
    public: {
      baseUrl: url,

      name: 'BlogTally',

    },
  },

  css: ['~/assets/css/style.css'],

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})