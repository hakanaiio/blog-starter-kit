<template>
    <div class="resources-container">
        <!-- Fil d'Ariane -->
        <!-- Breadcrumb -->
        <nav v-if="showBreadcrumb" class="flex px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-albescent-white-100/40" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-slate-600">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Blogger starter kit
                    </NuxtLink>
                </li>
                <li class="inline-flex items-center">
                    <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <NuxtLink to="/all" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-slate-600">
                        All resources
                    </NuxtLink>
                </li>

                <li v-if="category">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <template v-if="subcategory">
                            <NuxtLink :to="`/${category.id}`" class="ms-1 text-sm font-medium text-gray-700 hover:text-slate-600 md:ms-2">
                                {{ category.name }}
                            </NuxtLink>
                        </template>
                        <template v-else>
                            <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2">{{ category.name }}</span>
                        </template>
                    </div>
                </li>

                <li v-if="subcategory" aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2">{{ subcategory.name }}</span>
                    </div>
                </li>
            </ol>
        </nav>

        <div v-if="category" class="category-header">
            <component :is="getCategoryIcon(category.id)" class="category-icon" />
            <div class="category-header-content">
                <h1 class="category-title">
                    {{ category.name }}
                </h1>
                <p class="category-description">
                    {{ category.description }}
                </p>

                <div v-if="category.hasQuizz" class="cms-quiz-cta">
                    <div class="cms-quiz-card">
                        <div class="cms-quiz-content">
                            <h3 class="cms-quiz-title">
                                Not sure where to start?
                            </h3>
                            <p class="cms-quiz-description">
                                Take our quiz to find the perfect <span class="capitalize">{{ category.name }}</span> for your blog.
                            </p>
                        </div>
                        <NuxtLink :to="`/quiz/${category.id}`" class="cms-quiz-button">
                            Take the quiz
                        </NuxtLink>
                    </div>
                </div>
                <div v-if="subcategory?.hasQuizz" class="cms-quiz-cta">
                    <div class="cms-quiz-card">
                        <div class="cms-quiz-content">
                            <h3 class="cms-quiz-title">
                                Not sure where to start?
                            </h3>
                            <p class="cms-quiz-description">
                                Take our quiz to find the perfect <span class="capitalize">{{ subcategory.name }}</span> for your blog.
                            </p>
                        </div>
                        <NuxtLink :to="`/quiz/${subcategory.id}`" class="cms-quiz-button">
                            Take the quiz
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="pageTitle" class="page-header">
            <h1 class="page-title">
                {{ pageTitle }}
            </h1>
            <p v-if="pageDescription" class="page-description">
                {{ pageDescription }}
            </p>
        </div>

        <!-- Categories Dropdowns -->
        <CategoryDropdowns />


        <!-- Navigation de sous-catégories (en liens) -->
        <div v-if="category && category.subcategories.length > 0" class="subcategories-nav">
            <NuxtLink
                :to="`/${category.id}`"
                class="subcategory-link"
                :class="{ 'active': !subcategoryId }"
            >
                All
            </NuxtLink>
            <NuxtLink
                v-for="subcat in category.subcategories"
                :key="subcat.id"
                :to="`/${category.id}/${subcat.id}`"
                class="subcategory-link"
                :class="{ 'active': subcategoryId === subcat.id }"
            >
                {{ subcat.name }}
            </NuxtLink>
        </div>

        <!-- Description de sous-catégorie si pertinent -->
        <div v-if="subcategory?.description && !subcategory?.contentSlug" class="subcategory-description">
            {{ subcategory.description }}
        </div>
        <div
            v-if="subcategory?.contentSlug"
            class="subcategory-description prose prose-h2:text-slate-700
                max-w-none prose-a:!text-slate-700 prose-a:!no-underline prose-p:text-slate-700
                prose-li:text-slate-700 prose-headings:text-slate-900"
        >
            <ContentDoc :path="`/resources/${subcategory.contentSlug}`" />
        </div>



        <!-- Grille de ressources -->
        <div v-if="items.length > 0" class="resources-count">
            <p><span class="font-semibold">{{ items.length }}</span> resources found</p>
        </div>
        <div class="resources-grid">
            <div v-if="items.length === 0" class="no-resources">
                <p>No resources found.</p>
                <NuxtLink v-if="category" :to="`/${category.id}`" class="back-link">
                    View all {{ category.name }} resources
                </NuxtLink>
                <NuxtLink v-else to="/all" class="back-link">
                    View all resources
                </NuxtLink>
            </div>

            <template v-else>
                <ResourceCard
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    :show-categories="showCategories"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import {DocumentDuplicateIcon, ServerIcon, UserGroupIcon, WrenchScrewdriverIcon} from '@heroicons/vue/24/outline'
import ResourceCard from '~/components/resources/ResourceCard.vue'
import {ContentDoc} from '#components'
import CategoryDropdowns from '~/components/resources/CategoryDropdowns.vue'

const { getAllCategories } = useResources()
interface Props {
    // Breadcrumb control
    showBreadcrumb?: boolean;

    // Core data props
    items: ResourceItem[];
    category?: Category;
    subcategory?: Subcategory;
    subcategoryId?: string;

    // For "all resources" view
    pageTitle?: string;
    pageDescription?: string;
    showCategories?: boolean;

    // Related subcategories (for subcategory view)
    relatedSubcategories?: Subcategory[];
}

withDefaults(defineProps<Props>(), {
    showBreadcrumb: true,
    pageTitle: undefined,
    pageDescription: undefined,
    category: undefined,
    subcategory: undefined,
    subcategoryId: undefined,
    showCategories: false,
    relatedSubcategories: () => []
})

const allCategories = getAllCategories()

// Map category IDs to their respective icons
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

<style scoped lang="scss">
.resources-container {
  @apply max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8;
}

.breadcrumb {
  @apply flex items-center space-x-2 text-sm mb-8;
}

.breadcrumb-link {
  @apply text-slate-600 hover:text-slate-800;
}

.breadcrumb-separator {
  @apply text-gray-400;
}

.breadcrumb-current {
  @apply text-gray-500 font-medium;
}

.category-header {
  @apply flex items-start space-x-6 mb-12;
}

.category-icon {
  @apply w-16 h-16 text-slate-600 flex-shrink-0;
}

.category-header-content {
  @apply flex-grow;
}

.category-title {
  @apply text-4xl font-bold text-gray-900 mb-4;
}

.category-description {
  @apply text-xl text-gray-600 max-w-3xl;
}

.page-header {
  @apply text-center mb-12;
}

.page-title {
  @apply text-4xl font-bold text-gray-900 mb-4;
}

.page-description {
  @apply text-xl text-gray-600 max-w-3xl mx-auto;
}

.subcategories-nav {
  @apply flex flex-wrap gap-2 border-b border-gray-200 mb-8 pb-2 overflow-x-auto;
}

.subcategory-link {
  @apply px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
  whitespace-nowrap;

  &:not(.active) {
    @apply text-gray-600 hover:bg-gray-100;
  }

  &.active {
    @apply bg-slate-100 text-slate-800;
  }
}

.subcategory-description {
  @apply text-gray-600 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100;
}

.resources-count {
  @apply text-gray-500 mb-6;
}

.resources-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8 mb-16;
}

.no-resources {
  @apply col-span-full text-center py-16 text-gray-500;
}

.back-link {
  @apply inline-block mt-4 text-slate-600 hover:text-slate-800 font-medium;
}

.related-subcategories {
  @apply mt-16;
}

.related-title {
  @apply text-2xl font-bold text-gray-900 mb-6;
}

.related-subcategories-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6;
}

.related-subcategory-card {
  @apply bg-white rounded-xl border border-gray-100 shadow-sm p-6
  hover:shadow-md transition-shadow duration-200 flex flex-col h-full;
}

.related-subcategory-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.related-subcategory-description {
  @apply text-gray-600 text-sm mb-4 flex-grow;
}

.related-subcategory-count {
  @apply text-xs text-slate-600 font-medium;
}

.cms-quiz-cta {
  @apply mt-6;
}

.cms-quiz-card {
  @apply flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm;
}

.cms-quiz-content {
  @apply mb-4 md:mb-0;
}

.cms-quiz-title {
  @apply text-xl font-bold text-gray-800 mb-1;
}

.cms-quiz-description {
  @apply text-gray-600;
}

.cms-quiz-button {
  @apply px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 whitespace-nowrap;
}

/* Pour les écrans mobiles, vous pourriez vouloir ajuster le style */
@media (max-width: 768px) {
  .cms-quiz-card {
    @apply text-center;
  }
}
</style>