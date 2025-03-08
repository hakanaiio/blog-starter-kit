<template>
    <section
        class="relative mx-4 md:mx-auto flex w-full max-w-7xl flex-col items-center justify-center md:px-8 md:pb-8 bg-albescent-white-100
    rounded-xl shadow"
    >
        <div class="relative w-full text-white py-10 text-center">
            <h2 class="font-bold text-3xl md:text-5xl tracking-tight drop-shadow-2xl text-slate-700">
                What will you find here ?
            </h2>
        </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div v-for="category in categories" :key="category.id" class="card-resources">
                <div>
                    <div class="flex items-center justify-center mb-4">
                        <component :is="getCategoryIcon(category.id)" class="w-6 h-6 text-black mr-4" />
                        <h3 class="text-3xl font-black text-black">
                            {{ category.name }}
                        </h3>
                    </div><p class="text-lg mb-6 text-gray-700">
                        {{ category.description }}
                    </p>
                </div>
                <NuxtLink :to="`/${category.id}`">
                    <button role="button" aria-label="Click to explore all cms" class="btn">
                        {{ category.cta }}
                    </button>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import {DocumentDuplicateIcon, ServerIcon, UserGroupIcon, WrenchScrewdriverIcon} from '@heroicons/vue/24/outline'

const iconMap = {
    cms: DocumentDuplicateIcon,
    hosting: ServerIcon,
    tools: WrenchScrewdriverIcon,
    community: UserGroupIcon
}
const getCategoryIcon = (categoryId: string) => {
    return iconMap[categoryId] || DocumentDuplicateIcon
}

const { getAllCategories } = useResources()
const categories: Category[] = getAllCategories()


</script>
<style scoped lang="scss">
.card-resources {
  @apply bg-albescent-white-50 border-black border-y-2 md:border-y-2 md:border-x-2 px-6 py-10 flex flex-col justify-between items-center text-center md:rounded-2xl;
}
</style>