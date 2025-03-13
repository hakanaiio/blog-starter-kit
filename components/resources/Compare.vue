<template>
    <div class="comparison-container">
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
                    <span class="ms-1 text-sm font-medium text-gray-700 md:ms-2">Comparison</span>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2">{{ item1?.name }} vs {{ item2?.name }}</span>
                    </div>
                </li>
            </ol>
        </nav>

        <CategoryDropdowns />

        <div v-if="item1 && item2" class="comparison-content">
            <h1 class="comparison-title">
                {{ item1.name }} vs {{ item2.name }}
            </h1>
            <p class="comparison-subtitle">
                Compare {{ item1.name }} and {{ item2.name }} to find the best tool for your needs.
            </p>

            <div class="header-comparison">
                <div class="product-header">
                    <div class="product-logo-container">
                        <img v-if="item1.logo" :src="item1.logo" :alt="`${item1.name} logo`" class="product-logo">
                        <Icon v-else-if="item1.icon" :icon="item1.icon" class="product-logo" />
                        <div v-else class="product-logo-placeholder">
                            {{ getInitials(item1.name) }}
                        </div>
                    </div>
                    <div class="product-info">
                        <h2 class="product-name">
                            {{ item1.name }}
                        </h2>
                        <p class="product-description">
                            {{ item1.description }}
                        </p>
                        <NuxtLink :to="`/item/${item1.id}`" class="product-details-link">
                            See all details
                        </NuxtLink>
                    </div>
                </div>

                <div class="vs-divider">
                    <span class="vs-text">VS</span>
                </div>

                <div class="product-header">
                    <div class="product-logo-container">
                        <img v-if="item2.logo" :src="item2.logo" :alt="`${item2.name} logo`" class="product-logo">
                        <Icon v-else-if="item2.icon" :icon="item2.icon" class="product-logo" />
                        <div v-else class="product-logo-placeholder">
                            {{ getInitials(item2.name) }}
                        </div>
                    </div>
                    <div class="product-info">
                        <h2 class="product-name">
                            {{ item2.name }}
                        </h2>
                        <p class="product-description">
                            {{ item2.description }}
                        </p>
                        <NuxtLink :to="`/item/${item2.id}`" class="product-details-link">
                            See all details
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Tableau quick info -->
            <div class="quick-comparison mt-8">
                <h2 class="section-title">
                    Quick overview
                </h2>
                <div class="quick-comparison-grid">
                    <div class="quick-comparison-item">
                        <h3 class="quick-comparison-label">
                            Pricing
                        </h3>
                        <div class="quick-comparison-values">
                            <div class="quick-value">
                                {{ item1.pricing || 'Not specified' }}
                            </div>
                            <div class="quick-value">
                                {{ item2.pricing || 'Not specified' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pros & Cons -->
            <div class="pros-cons-comparison mt-8">
                <h2 class="section-title">
                    Pros & Cons
                </h2>
                <div class="pros-cons-grid">
                    <div class="pros-cons-column">
                        <h3 class="product-column-title">
                            {{ item1.name }}
                        </h3>
                        <div class="pros-container">
                            <h4 class="pros-cons-title">
                                Pros
                            </h4>
                            <ul class="pros-list">
                                <li v-for="(pro, index) in item1.pros || []" :key="index" class="pro-item">
                                    {{ pro }}
                                </li>
                                <li v-if="!item1.pros || item1.pros.length === 0" class="no-data">
                                    No pros specified
                                </li>
                            </ul>
                        </div>
                        <div class="cons-container">
                            <h4 class="pros-cons-title">
                                Cons
                            </h4>
                            <ul class="cons-list">
                                <li v-for="(con, index) in item1.cons || []" :key="index" class="con-item">
                                    {{ con }}
                                </li>
                                <li v-if="!item1.cons || item1.cons.length === 0" class="no-data">
                                    No cons specified
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="pros-cons-column">
                        <h3 class="product-column-title">
                            {{ item2.name }}
                        </h3>
                        <div class="pros-container">
                            <h4 class="pros-cons-title">
                                Pros
                            </h4>
                            <ul class="pros-list">
                                <li v-for="(pro, index) in item2.pros || []" :key="index" class="pro-item">
                                    {{ pro }}
                                </li>
                                <li v-if="!item2.pros || item2.pros.length === 0" class="no-data">
                                    No pros specified
                                </li>
                            </ul>
                        </div>
                        <div class="cons-container">
                            <h4 class="pros-cons-title">
                                Cons
                            </h4>
                            <ul class="cons-list">
                                <li v-for="(con, index) in item2.cons || []" :key="index" class="con-item">
                                    {{ con }}
                                </li>
                                <li v-if="!item2.cons || item2.cons.length === 0" class="no-data">
                                    No cons specified
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tableau des fonctionnalités -->
            <div v-if="mergedFeatures.length > 0" class="features-comparison mt-8">
                <h2 class="section-title">
                    Features comparison
                </h2>

                <div v-if="categories.length > 0" class="features-tabs">
                    <button
                        class="feature-tab-button"
                        :class="{ 'active': selectedCategory === 'all' }"
                        @click="selectedCategory = 'all'"
                    >
                        All Features
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category.id"
                        class="feature-tab-button"
                        :class="{ 'active': selectedCategory === category.id }"
                        @click="selectedCategory = category.id"
                    >
                        {{ category.name }}
                    </button>
                </div>

                <div v-if="mergedFeatures.length > 0" class="features-comparison-table">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="feature-header">
                                    Feature
                                </th>
                                <th class=" feature-header text-center">
                                    {{ item1.name }}
                                </th>
                                <th class="feature-header text-center">
                                    {{ item2.name }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="selectedCategory === 'all'">
                                <template v-for="(category, categoryIndex) in categories" :key="'cat-' + categoryIndex">
                                    <tr class="feature-group-header">
                                        <td colspan="3" class="feature-group-name">
                                            {{ category.name }}
                                        </td>
                                    </tr>
                                    <tr v-for="feature in getFilteredFeatures(category)" :key="feature.key" class="feature-row">
                                        <td class="feature-name">
                                            {{ feature.key }}
                                        </td>
                                        <td class="feature-value text-center">
                                            <div class="feature-status" :class="getStatusClass(getFeatureValue(item1, feature.key))">
                                                {{ getFeatureValue(item1, feature.key) }}
                                            </div>
                                            <span v-if="getFeatureComment(item1, feature.key)" class="feature-comment">
                                                {{ getFeatureComment(item1, feature.key) }}
                                            </span>
                                        </td>
                                        <td class="feature-value text-center">
                                            <div class="feature-status" :class="getStatusClass(getFeatureValue(item2, feature.key))">
                                                {{ getFeatureValue(item2, feature.key) }}
                                            </div>
                                            <span v-if="getFeatureComment(item2, feature.key)" class="feature-comment">
                                                {{ getFeatureComment(item2, feature.key) }}
                                            </span>
                                        </td>
                                    </tr>
                                </template>

                                <!-- Features sans catégorie -->
                                <template v-if="uncategorizedFeatures.length > 0">
                                    <tr class="feature-group-header">
                                        <td colspan="3" class="feature-group-name">
                                            Other Features
                                        </td>
                                    </tr>
                                    <tr v-for="feature in uncategorizedFeatures" :key="feature.key" class="feature-row">
                                        <td class="feature-name">
                                            {{ feature.key }}
                                        </td>
                                        <td class="feature-value text-center">
                                            <div class="feature-status" :class="getStatusClass(getFeatureValue(item1, feature.key))">
                                                {{ getFeatureValue(item1, feature.key) }}
                                            </div>
                                            <span v-if="getFeatureComment(item1, feature.key)" class="feature-comment">
                                                {{ getFeatureComment(item1, feature.key) }}
                                            </span>
                                        </td>
                                        <td class="feature-value text-center">
                                            <div class="feature-status" :class="getStatusClass(getFeatureValue(item2, feature.key))">
                                                {{ getFeatureValue(item2, feature.key) }}
                                            </div>
                                            <span v-if="getFeatureComment(item2, feature.key)" class="feature-comment">
                                                {{ getFeatureComment(item2, feature.key) }}
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                            </template>

                            <!-- Affichage filtré par catégorie -->
                            <template v-else>
                                <tr v-for="feature in filteredFeaturesByCategory" :key="feature.key" class="feature-row">
                                    <td class="feature-name">
                                        {{ feature.key }}
                                    </td>
                                    <td class="feature-value text-center">
                                        <div class="feature-status" :class="getStatusClass(getFeatureValue(item1, feature.key))">
                                            {{ getFeatureValue(item1, feature.key) }}
                                        </div>
                                        <span v-if="getFeatureComment(item1, feature.key)" class="feature-comment">
                                            {{ getFeatureComment(item1, feature.key) }}
                                        </span>
                                    </td>
                                    <td class="feature-value text-center">
                                        <div class="feature-status" :class="getStatusClass(getFeatureValue(item2, feature.key))">
                                            {{ getFeatureValue(item2, feature.key) }}
                                        </div>
                                        <span v-if="getFeatureComment(item2, feature.key)" class="feature-comment">
                                            {{ getFeatureComment(item2, feature.key) }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <p v-else class="no-features-message">
                    No comparative information on features is available for these products.
                </p>
            </div>

            <!-- Call-to-action -->
            <div class="final-actions mt-8">
                <div class="final-action-column">
                    <a :href="item1.url" target="_blank" rel="noopener noreferrer" class="action-button">
                        Visit {{ item1.name }} website
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
                <div class="final-action-column">
                    <a :href="item2.url" target="_blank" rel="noopener noreferrer" class="action-button">
                        Visit {{ item2.name }} website
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div v-else class="not-found">
            <h1>Unable to compare</h1>
            <p>
                One or more products you are trying to compare do not exist.
            </p>
            <NuxtLink to="/" class="back-link">
                Go back to the homepage
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import useFeatures from '~/utils/useFeatures'
import CategoryDropdowns from '~/components/resources/CategoryDropdowns.vue'

const route = useRoute()
const itemId1 = route.params.itemId1 as string
const itemId2 = route.params.itemId2 as string

const { getItemById, getSubcategoriesContainingItem } = useResources()
const { getCategoriesForDomain, getDomainFromCategories } = useFeatures()

const item1 = computed(() => getItemById(itemId1))
const item2 = computed(() => getItemById(itemId2))

// Déterminer le domaine des produits
const domain = computed(() => {
    if (!item1.value || !item2.value) return 'general'

    // Essayer d'abord avec le premier produit
    const domain1 = getDomainFromCategories(item1.value.id)

    // Si les deux produits sont de types différents, on prend celui du premier
    return domain1 || 'general'
})

// Récupérer les catégories de fonctionnalités pour ce domaine
const categories = computed(() => {
    return getCategoriesForDomain(domain.value)
})

// Catégorie sélectionnée pour le filtrage
const selectedCategory = ref('all')

// Fusionner les fonctionnalités des deux produits
const mergedFeatures = computed(() => {
    if (!item1.value || !item2.value) return []

    // Récupérer toutes les clés de fonctionnalités uniques des deux produits
    const item1Features = item1.value.features || []
    const item2Features = item2.value.features || []

    // Créer un Map pour stocker toutes les fonctionnalités uniques
    const featuresMap = new Map()

    // Ajouter les fonctionnalités du premier produit
    item1Features.forEach(feature => {
        featuresMap.set(feature.key, feature)
    })

    // Ajouter les fonctionnalités du second produit
    item2Features.forEach(feature => {
        if (!featuresMap.has(feature.key)) {
            featuresMap.set(feature.key, feature)
        }
    })

    // Convertir le Map en tableau
    return Array.from(featuresMap.values())
})

// Fonctionnalités filtrées par catégorie sélectionnée
const filteredFeaturesByCategory = computed(() => {
    if (selectedCategory.value === 'all') {
        return mergedFeatures.value
    }

    const selectedCat = categories.value.find(cat => cat.id === selectedCategory.value)
    if (!selectedCat) return mergedFeatures.value

    return mergedFeatures.value.filter(feature =>
        selectedCat.features.includes(feature.key)
    )
})

// Fonctionnalités qui ne sont pas dans une catégorie
const uncategorizedFeatures = computed(() => {
    if (!categories.value.length) return mergedFeatures.value

    // Rassembler toutes les clés de fonctionnalités catégorisées
    const categorizedKeys = new Set<string>()
    categories.value.forEach(category => {
        category.features.forEach(featureKey => {
            categorizedKeys.add(featureKey)
        })
    })

    // Filtrer les fonctionnalités qui ne sont pas dans une catégorie
    return mergedFeatures.value.filter(feature =>
        !categorizedKeys.has(feature.key)
    )
})

// Récupérer les fonctionnalités filtrées pour une catégorie spécifique
const getFilteredFeatures = (category: FeatureCategory) => {
    return mergedFeatures.value.filter(feature =>
        category.features.includes(feature.key)
    )
}

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
}

const getCategories = (item: ResourceItem) => {
    const locations = getSubcategoriesContainingItem(item.id)
    return locations.map(location => location.subcategory.name)
}

const getFeatureValue = (item: ResourceItem, featureKey: string): string => {
    const feature = item.features?.find(f => f.key === featureKey)
    // Retourner uniquement la valeur sans le commentaire
    return feature?.value || 'Not specified'
}

const getFeatureComment = (item: ResourceItem, featureKey: string): string | undefined => {
    const feature = item.features?.find(f => f.key === featureKey)
    return feature?.comment
}

const getStatusClass = (value: string): string => {
    const lowerValue = value.toLowerCase()

    if (lowerValue === 'yes' || lowerValue === 'true' || lowerValue === 'included' ||
        lowerValue === 'unlimited' || lowerValue === 'excellent' || lowerValue === 'both') {
        return 'status-positive'
    } else if (lowerValue === 'no' || lowerValue === 'false' || lowerValue === 'not included') {
        return 'status-negative'
    } else if (lowerValue.includes('limited') || lowerValue.includes('partial') ||
        lowerValue === 'configurable') {
        return 'status-partial'
    } else {
        return 'status-neutral'
    }
}
</script>

<style scoped lang="scss">
.comparison-container {
  @apply max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8;
}

.comparison-title {
  @apply text-3xl font-bold text-gray-900 mb-2 text-center;
}

.comparison-subtitle {
  @apply text-xl text-gray-600 mb-10 text-center max-w-3xl mx-auto;
}

.header-comparison {
  @apply flex flex-col md:flex-row items-center justify-between mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100;
}

.product-header {
  @apply flex flex-col items-center text-center md:w-5/12;
}

.vs-divider {
  @apply flex items-center justify-center my-4 md:my-0;
}

.vs-text {
  @apply text-2xl font-bold text-gray-500 bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center;
}

.product-logo-container {
  @apply mb-4;
}

.product-logo, .product-logo-placeholder {
  @apply w-20 h-20 rounded-lg flex items-center justify-center;
}

.product-logo-placeholder {
  @apply bg-slate-100 text-slate-800 font-bold text-xl;
}

.product-info {
  @apply text-center;
}

.product-name {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.product-description {
  @apply text-gray-700 mb-4;
}

.product-details-link {
  @apply text-slate-600 hover:text-slate-800 font-medium inline-flex items-center;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200;
}

.quick-comparison {
  @apply bg-white p-6 rounded-xl shadow-sm border border-gray-100;
}

.quick-comparison-grid {
  @apply space-y-6;
}

.quick-comparison-item {
  @apply border-b border-gray-100 pb-4 last:border-0 last:pb-0;
}

.quick-comparison-label {
  @apply text-xl font-semibold mb-3 text-gray-800;
}

.quick-comparison-values {
  @apply grid grid-cols-2 gap-4;
}

.quick-value {
  @apply text-gray-700;
}

.tags-container {
  @apply flex flex-wrap gap-2;
}

.category-tag {
  @apply text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded-full;
}

.feature-tag {
  @apply text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full;
}

.pros-cons-comparison {
  @apply bg-white p-6 rounded-xl shadow-sm border border-gray-100;
}

.pros-cons-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.pros-cons-column {
  @apply space-y-6;
}

.product-column-title {
  @apply text-xl font-bold text-center mb-4 pb-2 border-b border-gray-200;
}

.pros-container, .cons-container {
  @apply bg-gray-50 p-4 rounded-lg;
}

.pros-cons-title {
  @apply text-lg font-semibold mb-3;
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

.no-data {
  @apply text-gray-500 italic;
}

.features-comparison {
  @apply bg-white p-6 rounded-xl shadow-sm border border-gray-100;
}

.features-comparison-table {
  @apply overflow-x-auto;
}

.features-comparison-table table {
  @apply w-full border-collapse;
}

.feature-header, .product-header {
  @apply py-3 px-4 border-b-2 border-gray-200 bg-gray-50 w-1/3;
}

.feature-group-header {
  @apply bg-gray-100;
}

.feature-group-name {
  @apply py-2 px-4 font-semibold text-gray-700;
}

.features-tabs {
  @apply flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-2;
}

.feature-tab-button {
  @apply px-3 py-2 text-sm font-medium text-gray-600 rounded-t-lg hover:bg-gray-50 hover:text-gray-800 transition-colors;

  &.active {
    @apply bg-slate-100 text-slate-800 border-b-2 border-slate-600;
  }
}

.feature-row {
  @apply border-b border-gray-100;

  &:last-child {
    @apply border-b-0;
  }
}

.feature-name {
  @apply py-3 px-4 text-gray-800;
}

.feature-value {
  @apply py-3 px-4;
}

.feature-status {
  @apply inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mx-auto;
}

.feature-comment {
  @apply block mt-1 text-xs text-gray-500 whitespace-normal max-w-full;
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

.no-features-message {
  @apply text-gray-500 italic text-center py-8;
}

.final-actions {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.final-action-column {
  @apply flex flex-col items-center space-y-4;
}

.action-button {
  @apply inline-flex items-center justify-center px-6 py-3 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors w-full;
}

.external-link {
  @apply inline-flex items-center text-slate-600 hover:text-slate-800 font-medium;
}

.not-found {
  @apply max-w-xl mx-auto py-24 px-6 text-center;
}

.back-link {
  @apply inline-block mt-6 text-slate-600 hover:text-slate-800 font-medium;
}
</style>