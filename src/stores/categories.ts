import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/models/Category'
import { useCardStore } from './cards'

export const useCategoryStore = defineStore('category', () => {
  const categoryList: Ref<Category[]> = ref([])

  function addCategory(item: Category) {
    categoryList.value.push(item)
  }

  function createCategory(name: string, theme: string) {
    const newCategory = {
      id: maxCategoryId.value + 1,
      name: name,
      cards: [],
      theme: theme
    }
    addCategory(newCategory)
    console.log(`Le thème ${newCategory.name} a été créé`)
  }
  const maxCategoryId = computed(() =>
    categoryList.value.reduce((acc: number, currentValue: Category): number => {
      if (currentValue.id) {
        return acc > currentValue.id ? acc : currentValue.id
      } else {
        return acc
      }
    }, 0)
  )

  function addCardToCategory(categoryId: number, cardId: number) {
    const category = categoryList.value.find((category) => category.id === categoryId)
    const cardStore = useCardStore()
    const card = cardStore.cardList.find((card) => card.id === cardId)
    if (category && card) {
        category.cards.push(card)
    }
  }

  return {
    categoryList,
    createCategory,
    addCardToCategory,
    maxCategoryId
  }
})
