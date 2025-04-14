<template>
    <div class="c-main ">
        <LandingHeader />
        <main class="pt-28 c-main">
            <AllCategoryPage />

            <div class="mt-28">
                <ResourceQuizzCTA />
            </div>
        </main>
        <LandingFooter />
    </div>
</template>
<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import AllCategoryPage from '~/components/resources/AllCategoryPage.vue'
import ResourceQuizzCTA from '~/components/resources/ResourceQuizzCTA.vue'


const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = `${config.public.baseUrl}${route.path}`

const description = 'All the resources you need to start your blog.'
const title = 'Blogger starter kit - All resources'

useHead({
    link: [
        {
            rel: 'canonical',
            href: fullUrl
        }
    ]
})

useSeoMeta({
    title: title,
    twitterTitle: title,
    ogTitle: title,

    description: description,
    ogDescription: description,
    ogType: 'website',
    ogUrl: fullUrl,
})

</script>
