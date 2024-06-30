<template>
    <div class="bg-white">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Révision</h1>
          <div class="mt-10">
            <div class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400" @click="showAnswer">
              <div class="min-w-0 flex-1">
                <a href="#" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-900">{{ card.question }}</p>
                </a>
              </div>
            </div>
            <div id="answer" class="hidden mt-4">
                    <p class="font-bold text-2xl text-gray-900">{{ card.answer }}</p>
                    <div class="flex justify-between mt-2">
                      <button class="bg-red-600 text-white px-4 py-2 rounded-lg" @click="error">
                        Je me suis trompé
                      </button>
                      <button class="bg-green-600 text-white px-4 py-2 rounded-lg" @click="success">
                        Je me suis souvenu
                      </button>
                    </div>
                  </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/models/Card';
import { useCardStore } from '@/stores/cards';
import { useCategoryStore } from '@/stores/categories';
import { computed } from 'vue';

// get id from url
const url = new URL(window.location.href)
const cardId = url.searchParams.get('cardId')

const cardStore = useCardStore()
const categoryStore = useCategoryStore()

function loadCards() {
  const cards = window.localStorage.getItem('cards')
  if (cards && cards.length > 0) {
    cardStore.cardList = JSON.parse(cards)
  }
}

function loadCategories() {
  const todoListStringyfied = window.localStorage.getItem('categories')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    categoryStore.categoryList = JSON.parse(todoListStringyfied)
  }
}

function persist() {
  window.localStorage.setItem('cards', JSON.stringify(cardStore.cardList))
}

loadCards()
loadCategories()

const card = computed(() => {
  // transform string to number
  const newCardId = Number(cardId)
  const card = cardStore.cardList.find((c) => c.id === newCardId)
  if (!card) {
    throw new Error('Card not found')
  }
  return card;
})

function showAnswer() {
  document.getElementById('answer')!.style.display = 'block'
}

function error() {
  if (card.value.level === 1) {
    throw new Error('Card level cannot be lower than 1')
  }
  cardStore.updateCardLevel(card.value.id, card.value.level - 1)
  persist()
  const selectedCategory = JSON.parse(window.localStorage.getItem('selectedCategory') ?? '{}')
  if (!selectedCategory) {
    throw new Error('Category not found')
  }
  const category = categoryStore.categoryList.find((c) => c.id === selectedCategory.id)
  if (!category) {
    throw new Error('Category not found')
  }
  const nextCards = category.cards
  if (!nextCards) {
    throw new Error('Cards not found')
  }
  // remove the current card from the list
  const filteredCards = nextCards.filter((c) => c.id !== card.value.id)
  if (filteredCards.length === 0) {
    throw new Error('No cards left')
  }
  const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)]
  if (!randomCard) {
    throw new Error('Random card not found')
  }
  window.location.href = '/study/study?cardId=' + randomCard.id
}

function success() {
  if (card.value.level === 8) {
    throw new Error('Card level cannot be higher than 8')
  }
  cardStore.updateCardLevel(card.value.id, card.value.level + 1)
  persist()
  const selectedCategory = JSON.parse(window.localStorage.getItem('selectedCategory') ?? '{}')
  if (!selectedCategory) {
    throw new Error('Category not found')
  }
  const category = categoryStore.categoryList.find((c) => c.id === selectedCategory.id)
  if (!category) {
    throw new Error('Category not found')
  }
  const nextCards = category.cards
  if (!nextCards) {
    throw new Error('Cards not found')
  }
  // remove the current card from the list
  const filteredCards = nextCards.filter((c) => c.id !== card.value.id)
  if (filteredCards.length === 0) {
    throw new Error('No cards left')
  }
  // get a random card
  const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)]
  if (!randomCard) {
    console.log('No cards left')
    window.location.href = '/'
  }
  window.location.href = '/study/study?cardId=' + randomCard.id
}
</script>
