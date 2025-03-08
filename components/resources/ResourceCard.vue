<template>
    <NuxtLink :to="`/item/${item.id}`" class="back-link resource-card h-full">
        <div class="h-full">
            <div class="resource-card-content">
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

                <div class="resource-info">
                    <h3 class="resource-name">
                        {{ item.name }}
                    </h3>
                    <p class="resource-description">
                        {{ item.description }}
                    </p>

                    <div class="resource-tags">
                        <span
                            v-for="tag in item.tags"
                            :key="tag"
                            class="resource-tag"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </nuxtlink>
</template>

<script setup lang="ts">
import {Icon} from '@iconify/vue'

interface Props {
    item: ResourceItem;
    showCategories?: boolean;
}

withDefaults(defineProps<Props>(), {
    showCategories: false
})

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
}

</script>

<style scoped lang="scss">
.resource-card {
  @apply bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden
  flex flex-col hover:shadow-lg transition-shadow duration-200 ;
}

.resource-card-content {
  @apply p-6 flex items-start space-x-4 flex-grow;
}

.resource-logo-container {
  @apply flex-shrink-0;
}

.resource-logo, .resource-logo-placeholder {
  @apply w-12 h-12 rounded-lg flex items-center justify-center;
}

.resource-logo-placeholder {
  @apply bg-slate-100 text-slate-800 font-bold text-sm;
}

.resource-info {
  @apply flex-grow;
}

.resource-name {
  @apply text-xl font-semibold text-gray-900 mb-2;
}

.resource-description {
  @apply text-gray-600 text-sm mb-3;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-tags {
  @apply flex flex-wrap gap-2;
}

.resource-tag {
  @apply text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full;
}

.resource-card-footer {
  @apply pb-6 pl-6 flex flex-col;
}

.resource-categories {
  @apply flex flex-col space-y-2;
}

.resource-categories-list {
  @apply flex flex-wrap gap-2;
}

.resource-category-badge {
  @apply text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded-full
  hover:bg-slate-200 transition-colors;
}

.resource-pros-cons {
  @apply grid grid-cols-1 sm:grid-cols-2 gap-4;
}

.resource-section-title {
  @apply text-sm font-semibold text-gray-700 mb-2;
}

.resource-list {
  @apply text-xs text-gray-600 space-y-1 list-disc list-inside;
}

.resource-pricing {
  @apply flex space-x-2 text-sm;
}

.resource-pricing-label {
  @apply font-medium text-gray-700;
}

.resource-pricing-value {
  @apply text-gray-600;
}

.resource-actions {
  @apply flex gap-3 mt-4;
}

.resource-btn {
  @apply text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200
  flex-grow text-center;
}

.resource-btn-primary {
  @apply bg-slate-600 text-white hover:bg-slate-700;
}

.resource-btn-secondary {
  @apply bg-white border border-gray-300 text-gray-700 hover:bg-gray-50;
}
</style>