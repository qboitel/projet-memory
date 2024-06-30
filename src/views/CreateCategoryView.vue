<template>
  <div class="py-20 mx-auto px-20">
    <div class="flex items-start justify-between">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Créer une nouvelle catégorie</h1>
      <RouterLink to="/create" class="rounded-md border-indigo-600 border px-3.5 py-2.5 text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Retour
      </RouterLink>
    </div>
    <div class="mt-4">
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nom</label>
      <div class="mt-2">
        <input type="text" name="name" id="name" v-model="categoryName" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
      </div>
    </div>
    <div class="mt-4">
      <label for="theme" class="block text-sm font-medium leading-6 text-gray-900">Thème</label>
      <select id="theme" name="theme" v-model="categoryTheme" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <option v-for="theme in themes" :value="theme.name">{{ theme.name }}</option>
      </select>
    </div>
    <br />
    <button class="px-4 py-2 bg-indigo-500 text-white rounded-lg" type="button" @click="createCategory">Ajouter</button>
    <CategoryList />
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import CategoryList from '../components/categories/CategoryList.vue'
import { useCategoryStore } from '@/stores/categories';
import { useThemeStore } from '@/stores/themes';

const categoryName: Ref<string> = ref('')
const categoryTheme: Ref<string> = ref('')

const categoryStore = useCategoryStore()
const themeStore = useThemeStore()

function createCategory() {
  
  categoryStore.createCategory(
    categoryName.value,
    categoryTheme.value,
  )
  categoryName.value = ''

  if (categoryTheme.value !== '') {
    // find the category
    const theme = themeStore.themeList.find((theme) => theme.name === categoryTheme.value)
    if (theme) {
      themeStore.addCategoryToTheme(theme.id, categoryStore.categoryList[categoryStore.categoryList.length - 1].id)
    }
  }

  persist()
}

function persist() {
  window.localStorage.setItem('categories', JSON.stringify(categoryStore.categoryList))
}

function load() {
  const todoListStringyfied = window.localStorage.getItem('categories')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    categoryStore.categoryList = JSON.parse(todoListStringyfied)
  }
}

function loadThemes() {
  const todoListStringyfied = window.localStorage.getItem('themes')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    themeStore.themeList = JSON.parse(todoListStringyfied)
  }
}

load()
loadThemes()

const themes = themeStore.themeList
</script>
