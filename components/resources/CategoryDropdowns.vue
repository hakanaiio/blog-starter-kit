<template>
    <div class="category-dropdowns mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <details v-for="category in allCategories" :key="category.id" class="dropdown">
                <summary tabindex="0" role="button" class="btn btn-lg w-full justify-between">
                    <div class="flex items-center">
                        <component :is="getCategoryIcon(category.id)" class="w-5 h-5 mr-2" />
                        {{ category.name }}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <ul tabindex="0" class="dropdown-content z-[100] mt-1 menu p-2 shadow rounded bg-base-100 w-full">
                    <li>
                        <NuxtLink :to="`/${category.id}`" class="font-medium">
                            All {{ category.name }}
                        </NuxtLink>
                    </li>
                    <li v-for="subcategory in category.subcategories" :key="subcategory.id">
                        <NuxtLink :to="`/${category.id}/${subcategory.id}`">
                            {{ subcategory.name }}
                            <span class="badge badge-sm">{{ subcategory.itemRefs.length }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </details>
        </div>
    </div>
</template>
<script setup lang="ts">
import {DocumentDuplicateIcon, ServerIcon, UserGroupIcon, WrenchScrewdriverIcon} from '@heroicons/vue/24/outline'

const { getAllCategories } = useResources()
const allCategories = getAllCategories()

const iconMap = {
    cms: DocumentDuplicateIcon,
    hosting: ServerIcon,
    tools: WrenchScrewdriverIcon,
    community: UserGroupIcon
}

const getCategoryIcon = (categoryId: string) => {
    return iconMap[categoryId] || DocumentDuplicateIcon
}
</script>