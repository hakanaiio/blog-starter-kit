<template>
    <div class="c-main ">
        <LandingHeader />
        <main class="pt-28 c-main">
            <ItemPage />
        </main>
        <LandingFooter />
    </div>
</template>
<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import ItemPage from '~/components/resources/ItemPage.vue'


const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = `${config.public.baseUrl}${route.path}`

const itemId = route.params.itemId as string
const { getItemById } = useResources()
const item = getItemById(itemId)

const title = item?.name + ' Review: Features, Pricing & Alternatives'
const description = 'Best tool for content creators: ' +  item?.description

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
