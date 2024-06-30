import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Card } from '@/models/Card'

export const useCardStore = defineStore('card', () => {
  const cardList: Ref<Card[]> = ref([])

  function addCard(item: Card) {
    if (item.level === undefined) {
      item.level = 1
    }
    cardList.value.push(item)
  }

  function createCard(question: string, answer: string, level: number, category: string) {
    const newCard = {
      id: maxCardId.value + 1,
      question: question,
      answer: answer,
      level: level,
      category: category
    }
    console.log(newCard);
    addCard(newCard)
    console.log(`La carte ${newCard.question} a été créé`)
  }

  const maxCardId = computed(() =>
    cardList.value.reduce((acc: number, currentValue: Card): number => {
      if (currentValue.id) {
        return acc > currentValue.id ? acc : currentValue.id
      } else {
        return acc
      }
    }, 0)
  )

  function updateCardLevel(cardId: number, level: number) {
    const card = cardList.value.find((card) => card.id === cardId)
    if (card) {
      card.level = level
    }
  }

  return {
    cardList,
    createCard,
    updateCardLevel,
    maxCardId
  }
})
