import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Theme } from '@/models/Theme'
import { useCategoryStore } from './categories'

export const useThemeStore = defineStore('theme', () => {
  const themeList: Ref<Theme[]> = ref([])

  function addTheme(item: Theme) {
    themeList.value.push(item)
  }

  function createTheme(name: string) {
    const newTheme = {
      id: maxThemeId.value + 1,
      name: name,
      categories: []
    }
    addTheme(newTheme)
    console.log(`Le thème ${newTheme.name} a été créé`)
  }
  const maxThemeId = computed(() =>
    themeList.value.reduce((acc: number, currentValue: Theme): number => {
      if (currentValue.id) {
        return acc > currentValue.id ? acc : currentValue.id
      } else {
        return acc
      }
    }, 0)
  )

  function addCategoryToTheme(themeId: number, categoryId: number) {
    const theme = themeList.value.find((theme) => theme.id === themeId)
    const categoryStore = useCategoryStore()
    const category = categoryStore.categoryList.find((category) => category.id === categoryId)
    if (theme && category) {
      theme.categories.push(category)
    }
  }

  return {
    themeList,
    createTheme,
    addCategoryToTheme,
    maxThemeId
  }
})
