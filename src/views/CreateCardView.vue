<template>
  <div class="py-20 mx-auto px-20">
    <div class="flex items-start justify-between">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Créer une nouvelle carte</h1>
      <RouterLink to="/create" class="rounded-md border-indigo-600 border px-3.5 py-2.5 text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Retour
      </RouterLink>
    </div>
    <div class="mt-4">
      <label for="question" class="block text-sm font-medium leading-6 text-gray-900">Question</label>
      <div class="mt-2">
        <input type="text" name="question" id="question" v-model="cardQuestion" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
      </div>
    </div>
    <div class="mt-4">
      <label for="answer" class="block text-sm font-medium leading-6 text-gray-900">Réponse</label>
      <div class="mt-2">
        <input type="text" name="answer" id="answer" v-model="cardAnswer" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
      </div>
    </div>
    <div class="mt-4">
      <label for="level" class="block text-sm font-medium leading-6 text-gray-900">Niveau</label>
      <div class="mt-2">
        <input type="number" name="level" id="level" v-model="cardLevel" min="1" max="8" class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
      </div>
    </div>
    <div class="mt-4">
      <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Niveau</label>
      <select id="category" name="category" v-model="cardCategory" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <option v-for="category in categories" :value="category.name">{{ category.name }}</option>
      </select>
    </div>
    <br />
    <button class="px-4 py-2 bg-indigo-500 text-white rounded-lg" type="button" @click="createCard">Ajouter</button>
    <CardList></CardList>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import CardList from '../components/cards/CardList.vue'
import { useCardStore } from '@/stores/cards'
import { useCategoryStore } from '@/stores/categories';

const cardQuestion: Ref<string> = ref('')
const cardAnswer: Ref<string> = ref('')
const cardLevel: Ref<number> = ref(1)
const cardCategory: Ref<string> = ref('')

const cardStore = useCardStore()
const categoryStore = useCategoryStore()

function createCard() {
  console.log([cardQuestion.value, cardAnswer.value, cardLevel.value]);
  console.log(cardCategory.value);
  
  cardStore.createCard(
    cardQuestion.value,
    cardAnswer.value,
    cardLevel.value,
    cardCategory.value
  )
  cardQuestion.value = ''
  cardAnswer.value = ''
  cardLevel.value = 0

  if (cardCategory.value !== '') {
    // find the category
    const category = categoryStore.categoryList.find((category) => category.name === cardCategory.value)
    if (category) {
      categoryStore.addCardToCategory(category.id, cardStore.cardList[cardStore.cardList.length - 1].id)
    }
  }

  persist()
}

function persist() {
  window.localStorage.setItem('cards', JSON.stringify(cardStore.cardList))
}

function loadCards() {
  const todoListStringyfied = window.localStorage.getItem('cards')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    cardStore.cardList = JSON.parse(todoListStringyfied)
  }
}

function loadCategories() {
  const todoListStringyfied = window.localStorage.getItem('categories')
  if (todoListStringyfied && todoListStringyfied.length > 0) {
    categoryStore.categoryList = JSON.parse(todoListStringyfied)
  }
}

loadCards()
loadCategories()


const categories = categoryStore.categoryList;
</script>
