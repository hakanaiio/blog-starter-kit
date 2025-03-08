<template>
    <ResourceLayout
        :items="allItems"
        :page-title="'All Resources'"
        :page-description="'Discover all the tools and resources for bloggers in one place'"
        :show-categories="true"
    />
</template>

<script setup lang="ts">
import ResourceLayout from '~/components/resources/ResourceLayout.vue'

const { getAllItems } = useResources()
const allItems: ResourceItem[] = getAllItems()
</script>