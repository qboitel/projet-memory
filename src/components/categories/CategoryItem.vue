<template>
  <div class="relative flex flex-col items-start gap-2 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
    <h2>Nom : {{ category.name }}</h2>
    <p>Thème : {{ category.theme }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from '../../models/Category'

const props = defineProps<{ category: Category }>()
</script>
