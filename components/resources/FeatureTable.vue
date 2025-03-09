<template>
    <div v-if="features && features.length > 0" class="content-section features-section">
        <h2 class="section-title">
            Features
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

        <div class="features-table-container">
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
                    <tr v-for="feature in displayedFeatures" :key="feature.key" class="feature-row">
                        <td class="feature-name">
                            {{ feature.key }}
                        </td>
                        <td class="feature-value">
                            <div class="feature-status-container">
                                <span class="feature-status" :class="getFeatureStatusClass(feature.value)">
                                    {{ feature.value }}
                                </span>
                                <span v-if="feature.comment" class="feature-comment">
                                    {{ feature.comment }}
                                </span>
                            </div>
                        </td>
                    </tr>
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

interface Props {
    features: Feature[]
    itemId: String
}

const { getCategoriesForDomain, getDomainFromCategories } = useFeatures()

const props = defineProps<Props>()

const domain = computed(() => {
    return getDomainFromCategories(props.itemId)
})

const categories = computed(() => {
    return getCategoriesForDomain(domain.value)
})

const selectedCategory = ref('all')

const displayedFeatures = computed(() => {
    if (!props.features || props.features.length === 0) return []

    if (selectedCategory.value === 'all') {
        return props.features
    }

    const category = categories.value.find(cat => cat.id === selectedCategory.value)
    if (!category) return props.features

    return props.features.filter(feature =>
        category.features.includes(feature.key)
    )
})

const getFeatureStatusClass = (value: string): string => {
    const normalizedValue = value.toLowerCase()

    if (normalizedValue === 'yes' || normalizedValue === 'unlimited' ||
        normalizedValue === 'excellent' || normalizedValue === 'both') {
        return 'status-positive'
    } else if (normalizedValue === 'no') {
        return 'status-negative'
    } else if (normalizedValue === 'limited' || normalizedValue === 'partial' ||
        normalizedValue === 'configurable') {
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
  @apply text-2xl font-bold text-gray-900 mb-3;
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

.features-table-container {
  @apply overflow-x-auto bg-white rounded-lg border border-gray-100;
}

.features-table {
  @apply w-full border-collapse;
}

.feature-name-header, .feature-value-header {
  @apply px-4 py-3 text-left bg-gray-50 border-b border-gray-200 font-medium text-gray-700;
}

.feature-name-header {
  @apply w-1/2;
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
  @apply bg-gray-100 text-gray-500;
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