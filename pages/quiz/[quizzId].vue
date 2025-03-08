<template>
    <div class="c-main">
        <LandingHeader />
        <main class="pt-48 c-main">
            <div class="">
                <ResourceQuizz :category="quizId" />
            </div>
        </main>
        <LandingFooter />
    </div>
</template>
<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import ResourceQuizz from '~/components/resources/ResourceQuizz.vue'


const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = `${config.public.baseUrl}${route.path}`

const quizId = route.params.quizzId

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
