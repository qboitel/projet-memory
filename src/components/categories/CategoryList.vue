<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">La liste des catégories</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <CategoryItem
        v-for="category in list"
        v-bind:category="category"
        :key="category.id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories'
import CategoryItem from './CategoryItem.vue'
import { computed } from 'vue'

const categoryStore = useCategoryStore()

const list = computed(() => {
  return categoryStore.categoryList
})
</script>
