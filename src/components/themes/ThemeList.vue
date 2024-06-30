<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">La liste des thèmes</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <ThemeItem
        v-for="theme in list"
        v-bind:theme="theme"
        :key="theme.id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Theme } from '../../models/Theme'
import { computed, ref, type Ref } from 'vue'
import ThemeItem from './ThemeItem.vue';
import { useThemeStore } from '@/stores/themes';

const themeStore = useThemeStore()

const list = computed(() => {
  return themeStore.themeList
})
</script>
