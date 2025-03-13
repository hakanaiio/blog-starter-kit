<template>
    <div v-if="item" class="resource-detail-container">
        <!-- Fil d'Ariane -->
        <nav class="flex px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-albescent-white-100/40" aria-label="Breadcrumb">
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

                <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2">{{ item.name }}</span>
                    </div>
                </li>
            </ol>
        </nav>

        <!-- En-tête de ressource -->
        <div class="resource-header">
            <div class="resource-logo-container">
                <img
                    v-if="item.logo"
                    :src="item.logo"
                    :alt="`${item.name} logo`"
                    class="resource-logo"
                >
                <Icon v-else-if="item.icon" :icon="item.icon" class="resource-logo" />
                <div v-else class="resource-logo-placeholder">
                    {{ getInitials(item.name) }}
                </div>
            </div>

            <div class="resource-header-content">
                <h1 class="resource-title">
                    {{ item.name }}
                </h1>
                <p class="resource-subtitle">
                    {{ item.description }}
                </p>

                <!-- Catégories de cette ressource -->
                <div class="resource-categories">
                    <div v-for="(location, index) in resourceLocations" :key="index" class="resource-category">
                        <NuxtLink
                            :to="`/${location.category.id}/${location.subcategory.id}`"
                            class="resource-category-badge"
                        >
                            {{ location.subcategory.name }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div class="content-section">
                <div
                    v-if="longDescription"
                    class="prose prose-h2:text-slate-700
                max-w-none prose-a:!text-slate-700 prose-a:!no-underline prose-p:text-slate-700
                prose-li:text-slate-700 prose-headings:text-slate-900"
                >
                    <ContentDoc :path="`/resources/${item.contentSlug}`" />
                </div>
            </div>

            <div class="content-section">
                <h2 class="section-title">
                    Summary
                </h2>

                <div class="resource-tags">
                    <span
                        v-for="tag in item.tags"
                        :key="tag"
                        class="resource-tag"
                    >
                        {{ tag }}
                    </span>
                </div>

                <div class="pros-cons-grid">
                    <div class="pros-container">
                        <h3 class="pros-cons-title">
                            Pros
                        </h3>
                        <ul class="pros-list">
                            <li v-for="(pro, index) in item.pros" :key="index" class="pro-item">
                                {{ pro }}
                            </li>
                        </ul>
                    </div>

                    <div class="cons-container">
                        <h3 class="pros-cons-title">
                            Cons
                        </h3>
                        <ul class="cons-list">
                            <li v-for="(con, index) in item.cons" :key="index" class="con-item">
                                {{ con }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Tarification -->
            <div v-if="item.pricing" class="content-section pricing-section">
                <h2 class="section-title">
                    Pricing
                </h2>
                <p class="pricing-text">
                    {{ item.pricing }}
                </p>
            </div>

            <FeatureTable
                v-if="item.features && item.features.length > 0"
                :features="item.features"
                :item-id="item.id"
            />

            <div class="content-section actions">
                <NuxtLink
                    :to="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="resource-btn-primary"
                >
                    <span>Discover {{ item.name }}</span>
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </NuxtLink>
            </div>
        </div>

        <!-- Contenu de l'onglet Alternatives -->
        <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-8">
            <h2 class="section-title mb-6">
                Alternatives to {{ item.name }} 👇
            </h2>
            <p class="alternatives-intro">
                Looking for alternatives to {{ item.name }}? Explore our selection of solutions and find the perfect tool for you.
            </p>

            <div class="alternatives-grid">
                <div v-for="alternative in alternatives" :key="alternative.id" class="alternative-card">
                    <div class="alternative-card-header">
                        <div class="alternative-logo-container">
                            <NuxtLink :to="`/item/${alternative.id}`">
                                <img
                                    v-if="alternative.logo"
                                    :src="alternative.logo"
                                    :alt="`${alternative.name} logo`"
                                    class="resource-logo"
                                >
                                <Icon v-else-if="alternative.icon" :icon="alternative.icon" class="resource-logo" />
                                <div v-else class="resource-logo-placeholder">
                                    {{ getInitials(alternative.name) }}
                                </div>
                            </NuxtLink>
                        </div>

                        <div class="alternative-header-content">
                            <NuxtLink :to="`/item/${alternative.id}`">
                                <h3 class="alternative-title">
                                    {{ alternative.name }}
                                </h3>
                                <p class="alternative-subtitle">
                                    {{ alternative.description }}
                                </p>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="alternative-description">
                        <NuxtLink :to="`/item/${alternative.id}`">
                            {{ alternative.description }}
                        </NuxtLink>
                    </div>



                    <div class="alternative-footer">
                        <span v-for="category in getCategories(alternative)" :key="category" class="alternative-category">
                            {{ category }}
                        </span>
                        <div class="alternative-actions">
                            <NuxtLink
                                :to="`/compare/${item.id}/${alternative.id}`"
                                rel="noopener noreferrer"
                                class="alternative-external-link"
                            >
                                {{ item.name }} vs {{ alternative.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="not-found">
        <h1>Ressource non trouvée</h1>
        <p>La ressource que vous recherchez n'existe pas.</p>
        <NuxtLink to="/" class="back-link">
            Voir toutes les ressources
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import {ContentDoc} from '#components'
import {Icon} from '@iconify/vue'
import FeatureTable from '~/components/resources/FeatureTable.vue'

const route = useRoute()
const itemId = route.params.itemId as string

const { getItemById, getSubcategoriesContainingItem } = useResources()
const item = getItemById(itemId)

const longDescription = computed(() => {
    return item?.contentSlug
})

const resourceLocations = computed(() => {
    if (!item) return []
    return getSubcategoriesContainingItem(item.id)
})

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
}

const alternatives = computed(() => {
    if (!item) return []

    const locations = resourceLocations.value

    const similarItems = new Map<string, ResourceItem>()

    locations.forEach(location => {
        location.subcategory.itemRefs.forEach(refId => {
            if (refId !== item.id) {
                const similarItem = getItemById(refId)
                if (similarItem) {
                    similarItems.set(similarItem.id, similarItem)
                }
            }
        })
    })

    return Array.from(similarItems.values())
})

const getCategories = (item: ResourceItem) => {
    const locations = getSubcategoriesContainingItem(item.id)
    return locations.map(location => location.subcategory.name)
}
</script>

<style scoped lang="scss">
.resource-detail-container {
  @apply max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8;
}

.resource-header {
  @apply flex flex-col md:flex-row items-start md:items-center mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100;
}

.resource-logo-container {
  @apply mb-4 md:mb-0 md:mr-6 flex-shrink-0;
}

.resource-logo, .resource-logo-placeholder {
  @apply w-16 h-16 rounded-lg flex items-center justify-center;
}

.resource-logo-placeholder {
  @apply bg-slate-100 text-slate-800 font-bold text-lg;
}

.resource-header-content {
  @apply flex-grow;
}

.resource-title {
  @apply text-3xl font-bold text-gray-900 mb-2;
}

.resource-subtitle {
  @apply text-xl text-gray-600 mb-4;
}

.resource-categories {
  @apply flex flex-wrap gap-2;
}

.resource-category-badge {
  @apply text-sm bg-slate-100 text-slate-800 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors;
}

.resource-actions {
  @apply mt-6 md:mt-0 md:ml-6 flex-shrink-0 self-stretch flex flex-col justify-center;
}

.resource-btn-primary {
  @apply inline-flex items-center px-6 py-3 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors;
}

.tabs-container {
  @apply flex border-b border-gray-200 mb-8;
}

.tab-button {
  @apply px-6 py-3 text-gray-600 font-medium hover:text-gray-900 border-b-2 border-transparent transition-colors;

  &.active {
    @apply text-slate-600 border-slate-600;
  }
}

.tab-content {
  @apply bg-white p-8 rounded-xl shadow-sm border border-gray-100;
}

.content-section {
  @apply last:mb-0;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 mb-3;
}

.content-text {
  @apply text-gray-700 leading-relaxed;
}

.pros-cons-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.pros-cons-title {
  @apply text-xl font-semibold mb-4;
}

.pros-list, .cons-list {
  @apply space-y-2;
}

.pro-item, .con-item {
  @apply flex items-start;

  &::before {
    @apply mr-2 mt-1 flex-shrink-0;
  }
}

.pro-item::before {
  content: "✓";
  @apply text-green-500;
}

.con-item::before {
  content: "✕";
  @apply text-red-500;
}

.actions {
  @apply flex justify-center items-center mt-8;
}

.pricing-section {
  @apply bg-gray-50 p-6 rounded-lg mt-4;
}

.pricing-text {
  @apply text-gray-700;
}

.alternatives-intro {
  @apply text-gray-700 mb-8 max-w-3xl;
}

.alternatives-grid {
  @apply grid grid-cols-1 gap-6;
}

.alternative-card {
  @apply bg-white p-6 rounded-xl shadow-sm border border-gray-100;
}

.alternative-card-header {
  @apply flex items-start space-x-4 mb-4;
}

.alternative-logo-container {
  @apply flex-shrink-0;
}

.alternative-logo, .alternative-logo-placeholder {
  @apply w-12 h-12 rounded-lg flex items-center justify-center;
}

.alternative-logo-placeholder {
  @apply bg-slate-100 text-slate-800 font-bold text-sm;
}

.alternative-header-content {
  @apply flex-grow;
}

.alternative-title {
  @apply text-xl font-semibold text-gray-900 mb-1;
}

.alternative-subtitle {
  @apply text-gray-600 text-sm;
}

.alternative-description {
  @apply text-gray-700 mb-4;
}

.alternative-footer {
  @apply border-t border-gray-100 pt-4 flex flex-wrap justify-between items-center;
}

.alternative-category {
  @apply text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2 mb-2;
}

.alternative-actions {
  @apply flex flex-wrap gap-4 mt-2;
}

.alternative-details-link {
  @apply text-slate-600 hover:text-slate-800 text-sm font-medium;
}

.alternative-external-link {
  @apply inline-flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium;
}

.not-found {
  @apply max-w-xl mx-auto py-24 px-6 text-center;
}

.back-link {
  @apply inline-block mt-6 text-slate-600 hover:text-slate-800 font-medium;
}
.resource-tags {
  @apply flex flex-wrap gap-2 mb-4;
}

.resource-tag {
  @apply text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full;
}

.status-positive {
  @apply bg-green-100 text-green-800;
}

.status-negative {
  @apply bg-red-100 text-red-800;
}

.status-partial {
  @apply bg-yellow-100 text-yellow-800;
}

.status-neutral {
  @apply bg-blue-100 text-blue-800;
}

</style>