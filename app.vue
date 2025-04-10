<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
const devEnv = process.env.NODE_ENV === 'development'
const prodBlogtallySiteId = process.env.BLOGTALLY_SITE_ID 
const config = useRuntimeConfig()
useDropdownOutsideClick()

if (devEnv) {
    useHead(() => ({
        script: [
            {
                src: 'https://tracker.blogtally.com/blogtally.min.js',
                id: 'blogtallyjs',
                defer: true,
                async: true,
                'data-endpoint' : 'http://localhost:8080/api/collect',
                'data-link-tracking' : 'true',
                'data-site': 'ff2e86e6-4d96-4a66-b9e8-405184ed328a',
                type: 'text/javascript',
            },
        ],
    }))
} else {
    useHead(() => ({
        script: [
            {
                src: 'https://tracker.blogtally.com/blogtally.min.js',
                id: 'blogtallyjs',
                defer: true,
                async: true,
                'data-link-tracking': 'true',
                'data-site': prodBlogtallySiteId,
                type: 'text/javascript',
            },
        ],
    }))
}


useHead({
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
    ],
})

useSeoMeta({
    ogImage: `${config.public.baseUrl}/images/og_index.png`,
    ogImageAlt: 'Hakanai',
    ogSiteName: 'Hakanai'

})

</script>

