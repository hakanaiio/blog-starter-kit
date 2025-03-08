const url = process.env.BASE_URL || 'https://resources.blogtally.com'

export default defineNuxtConfig({

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  site: {
    url,
    name: 'BlogTally - blog starter kit',
    indexable: true
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ]
  },


  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', '@nuxt/content', 'nuxt-security'],

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

  nitro: {
    routeRules: {
      '/quizz': { redirect: '/quiz/cms' }
    }
  },

  css: ['~/assets/css/style.css'],

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})