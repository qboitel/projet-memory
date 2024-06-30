<template>
    <div class="bg-white">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Réviser</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">Choisissez une catégorie à réviser</p>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-10">
            <div v-for="category in categories" :key="category.id" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
              <div class="min-w-0 flex-1">
                <a href="#" class="focus:outline-none" @click="selectCategory(category)">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-900">{{ category.name }}</p>
                </a>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <RouterLink to="/study" class="rounded-md border-indigo-600 border px-3.5 py-2.5 text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Retour
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '@/models/Theme';
import { useThemeStore } from '@/stores/themes';
import { useCategoryStore } from '@/stores/categories';
import { computed } from 'vue';
import type { Category } from '@/models/Category';

const themeStore = useThemeStore()
const categoryStore = useCategoryStore()

function load() {
  const todoListStringyfied = window.localStorage.getItem('themes')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    themeStore.themeList = JSON.parse(todoListStringyfied)
  }
}

function loadCategories() {
  const todoListStringyfied = window.localStorage.getItem('categories')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    categoryStore.categoryList = JSON.parse(todoListStringyfied)
  }
}

load()
loadCategories()

const categories = computed(() => {
  // get selected theme from local storage
  const selectedThemeStringyfied = JSON.parse(window.localStorage.getItem('selectedTheme') ?? '{}')
  const categories = categoryStore.categoryList.filter((category) => category.theme === selectedThemeStringyfied.name)
  return categories;
})

function selectCategory(category: Category) {
  const selectedCategory = categoryStore.categoryList.find((c) => c.id === category.id)

  // persist in local storage
  window.localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory))

  // redirect to the category view
  window.location.href = '/study/cardLevel'
}
</script>
