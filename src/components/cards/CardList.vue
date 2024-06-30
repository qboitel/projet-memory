<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">La liste des cartes</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <CardItem
        v-for="card in list"
        v-bind:card="card"
        :key="card.id"
      ></CardItem>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCardStore } from '@/stores/cards'
import CardItem from './CardItem.vue'
import { computed, ref, type Ref } from 'vue'

const cardStore = useCardStore()

const list = computed(() => {
  return cardStore.cardList
})
</script>
