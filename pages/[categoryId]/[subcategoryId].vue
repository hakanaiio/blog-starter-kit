<template>
    <div class="c-main ">
        <LandingHeader />
        <main class="pt-28 c-main">
            <SubCategoryPage />
        </main>
        <LandingFooter />
    </div>
</template>
<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import SubCategoryPage from '~/components/resources/SubCategoryPage.vue'


const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = `${config.public.baseUrl}${route.path}`
const categoryId = route.params.categoryId as string
const subcategoryId = route.params.subcategoryId as string

// Fetch data using our composable
const { getCategoryById } = useResources()
const category = getCategoryById(categoryId)
const subcategory = category
    ? category.subcategories.find(sub => sub.id === subcategoryId)
    : undefined

const title = `Best ${subcategory?.name} solutions for Content Creators`
const description = `Best ${subcategory?.name} solutions for Content Creators: ${subcategory?.description}`

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
