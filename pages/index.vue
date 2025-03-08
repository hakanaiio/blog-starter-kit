<template>
    <div class="c-main">
        <LandingHeader />
        <main class="pt-28 c-main">
            <div class="pt-48">
                <ResourceHero />
            </div>

            <div class="mt-48">
                <ResourceIcons />
            </div>

            <div class="mt-64">
                <ResourceCategories />
            </div>

            <div class="mt-48">
                <ResourceQuizzCTA />
            </div>

            <div class="mt-48">
                <ResourceAllCategoriesAndSubCategories />
            </div>
        </main>
        <LandingFooter />
    </div>
</template>
<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import ResourceHero from '~/components/resources/ResourceHero.vue'
import ResourceCategories from '~/components/resources/ResourceCategories.vue'
import ResourceAllCategoriesAndSubCategories from '~/components/resources/ResourceAllCategoriesAndSubCategories.vue'
import ResourceIcons from '~/components/resources/ResourceIcons.vue'
import ResourceQuizzCTA from '~/components/resources/ResourceQuizzCTA.vue'


const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = `${config.public.baseUrl}${route.path}`

const description = 'The Blogger starter kit is a collection of resources to help you start your blog.'
const title = 'Blogger starter kit'

useSeoMeta({
    title: title,
    canonical: fullUrl,
    twitterTitle: title,
    ogTitle: title,

    description: description,
    ogDescription: description,
    ogType: 'website',
    ogUrl: fullUrl,
})

</script>
