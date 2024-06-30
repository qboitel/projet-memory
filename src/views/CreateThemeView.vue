<template>
  <div class="py-20 mx-auto px-20">
    <div class="flex items-start justify-between">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Créer un nouveau thème</h1>
      <RouterLink to="/create" class="rounded-md border-indigo-600 border px-3.5 py-2.5 text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Retour
      </RouterLink>
    </div>
    <div class="mt-4">
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nom</label>
      <div class="mt-2">
        <input type="text" name="name" id="name" v-model="themeName" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
      </div>
    </div>
    <br />
    <button class="px-4 py-2 bg-indigo-500 text-white rounded-lg" type="button" @click="createTheme">Ajouter</button>
    <ThemeList />
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ThemeList from '../components/themes/ThemeList.vue'
import { useThemeStore } from '@/stores/themes';

const themeName: Ref<string> = ref('')

const themeStore = useThemeStore()

function createTheme() {
  
  themeStore.createTheme(
    themeName.value,
  )
  themeName.value = ''

  persist()
}

function persist() {
  window.localStorage.setItem('themes', JSON.stringify(themeStore.themeList))
}

function load() {
  const todoListStringyfied = window.localStorage.getItem('themes')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    themeStore.themeList = JSON.parse(todoListStringyfied)
  }
}

load()
</script>
