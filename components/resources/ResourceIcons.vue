<template>
    <section class="marquee-container relative overflow-hidden w-full bg-albescent-white-100/40 shadow border-y border-slate-600 py-8">
        <div class="marquee-content" :style="{ animationDuration: `${items.length * 3}s` }">
            <div class="marquee-items flex gap-6 items-center">
                <template v-for="item in items" :key="item.id">
                    <div v-if="item.logo || item.icon" class="flex items-center justify-center resource-logo-container">
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
                </template>
            </div>
            <!-- Duplication des éléments pour créer un effet de défilement infini -->
            <div class="marquee-items flex gap-6 items-center">
                <template v-for="item in items" :key="`duplicate-${item.id}`">
                    <div v-if="item.logo || item.icon" class="flex items-center justify-center resource-logo-container">
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
                </template>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import {Icon} from '@iconify/vue'

const { getAllItems } = useResources()
const items = getAllItems()

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
.marquee-container {
  position: relative;
}

.marquee-content {
  display: flex;
  animation: scroll-left linear infinite;
  width: max-content;
}

.marquee-items {
  display: flex;
  flex-shrink: 0;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
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
</style>