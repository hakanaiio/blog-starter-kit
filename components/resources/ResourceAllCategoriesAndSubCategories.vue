<template>
    <div class="categories-container">
        <div class="categories-list mb-20">
            <!-- Loop through each category -->
            <div class="category-section">
                <div class="category-header">
                    <HeartSolidIcon class="category-icon-preferred" />
                    <h2 class="category-title">
                        What we use at Hakanai
                    </h2>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-white">
                    <ResourceCard
                        v-for="item in itemsIUse"
                        :key="item.id"
                        :item="item"
                    />
                </div>
            </div>
        </div>


        <!-- Section title -->
        <h1 class="section-title">
            All Categories
        </h1>

        <!-- Main container with all categories -->
        <div class="categories-list">
            <!-- Loop through each category -->

            <div v-for="category in categories" :key="category.id" class="category-section">
                <!-- Category header with icon and title -->
                <div class="category-header">
                    <component :is="getCategoryIcon(category.id)" class="category-icon" />
                    <h2 class="category-title">
                        {{ category.name }}
                    </h2>
                </div>

                <!-- Grid of subcategories -->
                <div class="subcategories-grid">
                    <div
                        v-for="subcategory in category.subcategories"
                        :key="subcategory.id"
                        class="subcategory-card"
                        @click="navigateToSubcategory(category.id, subcategory.id)"
                    >
                        <div class="subcategory-content">
                            <h3 class="subcategory-title">
                                {{ subcategory.name }}
                            </h3>
                            <p class="subcategory-description">
                                {{ subcategory.description }}
                            </p>
                        </div>

                        <div class="subcategory-footer">
                            <span class="subcategory-items-count">
                                {{ subcategory.itemRefs.length }} resources
                            </span>
                            <ChevronRightIcon class="subcategory-arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ChevronRightIcon,
    DocumentDuplicateIcon,
    ServerIcon,
    UserGroupIcon,
    WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'
import {HeartIcon as HeartSolidIcon} from '@heroicons/vue/24/solid'
import ResourceCard from '~/components/resources/ResourceCard.vue'

const { getAllCategories, whatIUse } = useResources()
const categories: Category[] = getAllCategories()

const itemsIUse = whatIUse()

const iconMap = {
    cms: DocumentDuplicateIcon,
    hosting: ServerIcon,
    tools: WrenchScrewdriverIcon,
    community: UserGroupIcon,
}

const getCategoryIcon = (categoryId: string) => {
    return iconMap[categoryId] || DocumentDuplicateIcon
}

const navigateToSubcategory = (categoryId: string, subcategoryId: string) => {
    navigateTo(`/${categoryId}/${subcategoryId}`)
}
</script>

<style scoped lang="scss">
.categories-container {
  @apply max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8;
}

.section-title {
  @apply text-4xl font-bold text-center text-gray-900 mb-12;
}

.categories-list {
  @apply space-y-16;
}

.category-section {
  @apply space-y-6;
}

.category-header {
  @apply flex items-center space-x-3 mb-6;
}

.category-icon-preferred {
  @apply w-8 h-8 text-red-400;
}

.category-icon {
  @apply w-8 h-8 text-slate-600;
}

.category-title {
  @apply text-3xl font-bold text-gray-900;
}

.subcategories-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6;
}

.subcategory-card {
  @apply bg-white rounded-xl shadow-sm border border-gray-100 p-6
  hover:shadow-md transition-shadow duration-200 cursor-pointer
  flex flex-col justify-between;
  min-height: 180px;
}

.subcategory-title {
  @apply text-xl font-semibold text-gray-900 mb-2;
}

.subcategory-description {
  @apply text-gray-600 text-sm;
}

.subcategory-footer {
  @apply flex justify-between items-center mt-4 pt-3 border-t border-gray-100;
}

.subcategory-items-count {
  @apply text-sm text-gray-500;
}

.subcategory-arrow {
  @apply w-5 h-5 text-slate-500;
}
</style>