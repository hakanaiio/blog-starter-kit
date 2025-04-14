<template>
    <div class="c-main ">
        <LandingHeader />
        <main class="pt-28 c-main">
            <Compare :item1="item1" :item2="item2" />
        </main>
        <LandingFooter />
    </div>
</template>

<script setup lang="ts">
import Compare from '~/components/resources/Compare.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import LandingHeader from '~/components/landing/LandingHeader.vue'

useHead({
    title: 'Resource comparison',
    meta: [
        { name: 'description', content: 'Compare two resources to find the best one for you.' },
    ]
})

const route = useRoute()
const { getItemById } = useResources()
const item1 = getItemById(route.params.itemId1 as string)
const item2 = getItemById(route.params.itemId2 as string)

if (item1 && item2) {
    useHead({
        title: `${item1.name} vs ${item2.name} - Detailed comparison`,
        meta: [
            {
                name: 'description',
                content: `Detailed comparison between ${item1.name} and ${item2.name}. Discover the features, pricing, and alternatives of both resources to make an informed decision.`,
            }
        ]
    })
}
</script>