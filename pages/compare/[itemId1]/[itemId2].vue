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

// Définition pour le SEO
useHead({
    title: 'Comparaison de ressources',
    meta: [
        { name: 'description', content: 'Comparez deux ressources pour choisir celle qui correspond le mieux à vos besoins.' }
    ]
})

const route = useRoute()
const { getItemById } = useResources()
const item1 = getItemById(route.params.itemId1 as string)
const item2 = getItemById(route.params.itemId2 as string)

if (item1 && item2) {
    useHead({
        title: `${item1.name} vs ${item2.name} - Comparaison détaillée`,
        meta: [
            {
                name: 'description',
                content: `Comparaison détaillée entre ${item1.name} et ${item2.name}. Découvrez les différences de fonctionnalités, prix et avantages pour faire le meilleur choix.`
            }
        ]
    })
}
</script>