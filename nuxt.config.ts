const url = process.env.BASE_URL || 'https://blog-starter-kit.hakanai.io'

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
    name: 'Hakanai - blog starter kit',
    indexable: false
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ]
  },


  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-security',
  ],

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

      name: 'Hakanai',

    },
  },

  tailwindcss: {
    config: {
      content: ['./pages/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}'],
    },
  },

  nitro: {
    routeRules: {
      '/quizz': { redirect: '/quiz/cms' }
    }
  },

  css: ['~/assets/css/style.scss'],

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})