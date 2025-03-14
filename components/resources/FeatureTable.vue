<template>
    <div class="features-section">
        <h2 v-if="showTitle" class="section-title">
            {{ title || 'Features' }}
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

        <!-- Vue pour un seul item -->
        <div v-if="!compareMode" class="features-table-container">
            <table class="features-table">
                <thead>
                    <tr>
                        <th class="feature-name-header">
                            Feature
                        </th>
                        <th class="feature-value-header">
                            Support
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="selectedCategory === 'all'">
                        <template v-for="(category, categoryIndex) in categories" :key="'cat-' + categoryIndex">
                            <tr class="feature-group-header">
                                <td colspan="2" class="feature-group-name">
                                    {{ category.name }}
                                </td>
                            </tr>
                            <tr v-for="feature in getFilteredFeatures(category, features)" :key="feature.key" class="feature-row">
                                <td class="feature-name">
                                    {{ feature.key }}
                                </td>
                                <td class="feature-value">
                                    <div class="feature-status-container">
                                        <span class="feature-status" :class="getStatusClass(feature.value)">
                                            {{ feature.value }}
                                        </span>
                                        <span v-if="feature.comment" class="feature-comment">
                                            {{ feature.comment }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <!-- Features sans catégorie -->
                        <template v-if="uncategorizedFeatures.length > 0">
                            <tr class="feature-group-header">
                                <td colspan="2" class="feature-group-name">
                                    Other Features
                                </td>
                            </tr>
                            <tr v-for="feature in uncategorizedFeatures" :key="feature.key" class="feature-row">
                                <td class="feature-name">
                                    {{ feature.key }}
                                </td>
                                <td class="feature-value">
                                    <div class="feature-status-container">
                                        <span class="feature-status" :class="getStatusClass(feature.value)">
                                            {{ feature.value }}
                                        </span>
                                        <span v-if="feature.comment" class="feature-comment">
                                            {{ feature.comment }}
                                        </span>
                                    </div>
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
                            <td class="feature-value">
                                <div class="feature-status-container">
                                    <span class="feature-status" :class="getStatusClass(feature.value)">
                                        {{ feature.value }}
                                    </span>
                                    <span v-if="feature.comment" class="feature-comment">
                                        {{ feature.comment }}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <!-- Vue pour la comparaison de deux items -->
        <div v-else class="features-comparison-table">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="feature-name-header">
                            Feature
                        </th>
                        <th v-for="item in items" :key="item.id" class="feature-value-header text-center">
                            {{ item.name }}
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
                            <tr v-for="feature in getFilteredFeatures(category, mergedFeatures)" :key="feature.key" class="feature-row">
                                <td class="feature-name">
                                    {{ feature.key }}
                                </td>
                                <td v-for="item in items" :key="item.id" class="feature-value text-center">
                                    <div class="feature-status" :class="getStatusClass(getFeatureValue(item, feature.key))">
                                        {{ getFeatureValue(item, feature.key) }}
                                    </div>
                                    <span v-if="getFeatureComment(item, feature.key)" class="feature-comment">
                                        {{ getFeatureComment(item, feature.key) }}
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
                                <td v-for="item in items" :key="item.id" class="feature-value text-center">
                                    <div class="feature-status" :class="getStatusClass(getFeatureValue(item, feature.key))">
                                        {{ getFeatureValue(item, feature.key) }}
                                    </div>
                                    <span v-if="getFeatureComment(item, feature.key)" class="feature-comment">
                                        {{ getFeatureComment(item, feature.key) }}
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
                            <td v-for="item in items" :key="item.id" class="feature-value text-center">
                                <div class="feature-status" :class="getStatusClass(getFeatureValue(item, feature.key))">
                                    {{ getFeatureValue(item, feature.key) }}
                                </div>
                                <span v-if="getFeatureComment(item, feature.key)" class="feature-comment">
                                    {{ getFeatureComment(item, feature.key) }}
                                </span>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useFeatures from '~/utils/useFeatures'

interface Feature {
    key: string
    value: string
    comment?: string
}

interface ResourceItem {
    id: string
    name: string
    features?: Feature[]
    // Autres propriétés...
}

interface FeatureCategory {
    id: string
    name: string
    features: string[]
}

interface Props {
    // Props pour un seul item
    features?: Feature[]
    itemId?: string

    // Props pour la comparaison
    items?: ResourceItem[]
    compareMode?: boolean

    // Props communs
    title?: string
    showTitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    compareMode: false,
    features: () => [],
    showTitle: true
})

const { getCategoriesForDomain, getDomainFromCategories } = useFeatures()

// Déterminer le domaine des produits
const domain = computed(() => {
    if (props.compareMode && props.items?.length) {
        const domain1 = getDomainFromCategories(props.items[0].id)
        return domain1 || 'general'
    } else if (props.itemId) {
        return getDomainFromCategories(props.itemId) || 'general'
    }
    return 'general'
})

// Récupérer les catégories de fonctionnalités pour ce domaine
const categories = computed(() => {
    return getCategoriesForDomain(domain.value)
})

// Catégorie sélectionnée pour le filtrage
const selectedCategory = ref('all')

// Fusionner les fonctionnalités des items en mode comparaison
const mergedFeatures = computed(() => {
    if (!props.compareMode || !props.items?.length) return props.features

    // Récupérer toutes les clés de fonctionnalités uniques des items
    const featuresMap = new Map()

    // Parcourir tous les items et leurs fonctionnalités
    props.items.forEach(item => {
        const itemFeatures = item.features || []
        itemFeatures.forEach(feature => {
            if (!featuresMap.has(feature.key)) {
                featuresMap.set(feature.key, feature)
            }
        })
    })

    // Convertir le Map en tableau
    return Array.from(featuresMap.values())
})

// Fonctionnalités filtrées par catégorie sélectionnée
const filteredFeaturesByCategory = computed(() => {
    const featuresToFilter = props.compareMode ? mergedFeatures.value : props.features

    if (selectedCategory.value === 'all') {
        return featuresToFilter
    }

    const selectedCat = categories.value.find(cat => cat.id === selectedCategory.value)
    if (!selectedCat) return featuresToFilter

    return featuresToFilter.filter(feature =>
        selectedCat.features.includes(feature.key)
    )
})

// Fonctionnalités qui ne sont pas dans une catégorie
const uncategorizedFeatures = computed(() => {
    const featuresToCheck = props.compareMode ? mergedFeatures.value : props.features

    if (!categories.value.length) return featuresToCheck

    // Rassembler toutes les clés de fonctionnalités catégorisées
    const categorizedKeys = new Set<string>()
    categories.value.forEach(category => {
        category.features.forEach(featureKey => {
            categorizedKeys.add(featureKey)
        })
    })

    // Filtrer les fonctionnalités qui ne sont pas dans une catégorie
    return featuresToCheck.filter(feature =>
        !categorizedKeys.has(feature.key)
    )
})

// Récupérer les fonctionnalités filtrées pour une catégorie spécifique
const getFilteredFeatures = (category: FeatureCategory, featuresList: Feature[]) => {
    return featuresList.filter(feature =>
        category.features.includes(feature.key)
    )
}

// Pour le mode comparaison
const getFeatureValue = (item: ResourceItem, featureKey: string): string => {
    const feature = item.features?.find(f => f.key === featureKey)
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
        lowerValue === 'configurable' || lowerValue.includes('via plugin')) {
        return 'status-partial'
    } else {
        return 'status-neutral'
    }
}
</script>

<style scoped lang="scss">
.features-section {
  @apply mt-8;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200;
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

.features-table-container, .features-comparison-table {
  @apply overflow-x-auto bg-white rounded-lg border border-gray-100;
}

.features-table, .features-comparison-table table {
  @apply w-full border-collapse;
}

.feature-name-header, .feature-value-header {
  @apply px-4 py-3 text-left bg-gray-50 border-b border-gray-200 font-medium text-gray-700;
}

.feature-group-header {
  @apply bg-gray-100;
}

.feature-group-name {
  @apply py-2 px-4 font-semibold text-gray-700;
}

.feature-row {
  @apply border-b border-gray-100 hover:bg-gray-50 transition-colors;

  &:last-child {
    @apply border-b-0;
  }
}

.feature-name {
  @apply px-4 py-3 font-medium text-gray-800;
}

.feature-value {
  @apply px-4 py-3;
}

.feature-status-container {
  @apply flex flex-col;
}

.feature-status {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
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

.feature-comment {
  @apply text-xs text-gray-600 mt-1;
}
</style>