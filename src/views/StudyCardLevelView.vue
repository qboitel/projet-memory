<template>
    <div class="bg-white">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Réviser</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">Choisissez le niveau des cartes à reviser</p>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-10">
            <div v-for="level in levels" :key="level" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
              <div class="min-w-0 flex-1">
                <a href="#" class="focus:outline-none" @click="selectCardLevel(level)">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-900">{{ level }}</p>
                </a>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <RouterLink to="/study/category" class="rounded-md border-indigo-600 border px-3.5 py-2.5 text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Retour
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories';
import { computed } from 'vue';

const levels = computed(() => {
  return [1, 2, 3, 4, 5, 6, 7, 8]
})

const categoryStore = useCategoryStore()

function selectCardLevel(cardLevel: number) {
  const selectedCardLevel = cardLevel;

  // persist in local storage
  window.localStorage.setItem('selectedCardLevel', selectedCardLevel.toString())

  const selectedCategory = JSON.parse(window.localStorage.getItem('selectedCategory') ?? '{}')
  if (!selectedCategory) {
    throw new Error('Category not found')
  }
  const category = categoryStore.categoryList.find((c) => c.id === selectedCategory.id)
  if (!category) {
    throw new Error('Category not found')
  }
  const nextCards = category.cards.filter((card) => card.level === selectedCardLevel)
  if (!nextCards) {
    throw new Error('Cards not found')
  }
  // get a random card
  const randomCard = nextCards[Math.floor(Math.random() * nextCards.length)]
  if (!randomCard) {
    throw new Error('Random card not found')
  }
  window.location.href = '/study/study?cardId=' + randomCard.id
}
</script>
