<template>
    <div class="c-main ">
        <LandingHeader />
        <main class="pt-28 c-main">
            <CategoryPage />
        </main>
        <LandingFooter />
    </div>
</template>
<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import CategoryPage from '~/components/resources/CategoryPage.vue'


const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = `${config.public.baseUrl}${route.path}`
const categoryId = route.params.categoryId as string

const { getCategoryById } = useResources()
const category = getCategoryById(categoryId)
const title = `Best ${category?.name} solutions for Content Creators`
const description = `Best ${category?.name} solutions for Content Creators: ${category?.description}`

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
