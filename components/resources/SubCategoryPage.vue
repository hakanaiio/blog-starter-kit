<template>
    <div v-if="category && subcategory">
        <ResourceLayout
            :category="category"
            :subcategory="subcategory"
            :subcategory-id="subcategoryId"
            :items="subcategoryItems"
            :related-subcategories="relatedSubcategories"
        />
    </div>
    <div v-else class="not-found">
        <h1>Not Found</h1>
        <p>The category or subcategory you're looking for doesn't exist.</p>
        <NuxtLink to="/all" class="back-link">
            View all resources
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import ResourceLayout from '~/components/resources/ResourceLayout.vue'
// Get the category and subcategory IDs from the route
const route = useRoute()
const categoryId = route.params.categoryId as string
const subcategoryId = route.params.subcategoryId as string

// Fetch data using our composable
const { getCategoryById, getItemsBySubcategoryId } = useResources()
const category = getCategoryById(categoryId)
const subcategory = category
    ? category.subcategories.find(sub => sub.id === subcategoryId)
    : undefined

// Get items in this subcategory
const subcategoryItems = computed(() => {
    if (!category || !subcategory) return []
    return getItemsBySubcategoryId(categoryId, subcategoryId)
})

// Get related subcategories (other subcategories in the same category)
const relatedSubcategories = computed(() => {
    if (!category || !subcategory) return []
    return category.subcategories.filter(sub => sub.id !== subcategoryId)
})
</script>

<style scoped>
.not-found {
  @apply max-w-xl mx-auto py-24 px-6 text-center;
}

.back-link {
  @apply inline-block mt-6 text-indigo-600 hover:text-indigo-800 font-medium;
}
</style>