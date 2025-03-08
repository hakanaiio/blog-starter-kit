<template>
    <div v-if="category">
        <ResourceLayout
            :category="category"
            :items="categoryItems"
        />
    </div>
    <div v-else class="category-not-found">
        <h1>Category not found</h1>
        <p>The category you're looking for doesn't exist.</p>
        <NuxtLink to="/all" class="back-link">
            View all resources
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import ResourceLayout from '~/components/resources/ResourceLayout.vue'

const route = useRoute()
const categoryId = route.params.categoryId as string

// Fetch data using our composable
const { getCategoryById, getItemById } = useResources()
const category = getCategoryById(categoryId)

// Computed property to get all items in this category
const categoryItems = computed(() => {
    if (!category) return []

    // Collect all unique item IDs from all subcategories
    const allItemIds = new Set<string>()
    category.subcategories.forEach(subcategory => {
        subcategory.itemRefs.forEach(itemId => {
            allItemIds.add(itemId)
        })
    })

    // Convert Set to array and map to actual items
    return Array.from(allItemIds)
        .map(itemId => getItemById(itemId))
        .filter((item): item is ResourceItem => item !== undefined)
})
</script>

<style scoped>
.category-not-found {
  @apply max-w-xl mx-auto py-24 px-6 text-center;
}

.back-link {
  @apply inline-block mt-6 text-indigo-600 hover:text-indigo-800 font-medium;
}
</style>