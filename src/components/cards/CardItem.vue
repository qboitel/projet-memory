<template>
  <div class="relative flex flex-col items-start gap-2 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
    <h2>Question : {{ card.question }}</h2>
    <p>Réponse : {{ card.answer }}</p>
    <p>Niveau : {{ card.level }}</p>
    <p>Catégorie : {{ card.category }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { Card } from '../../models/Card'

const props = defineProps<{ card: Card }>()
</script>
