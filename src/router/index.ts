import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudyView from '../views/StudyView.vue'
import StudyCategoryView from '../views/StudyCategoryView.vue'
import StudyCardLevelView from '../views/StudyCardLevelView.vue'
import StudyStudyView from '../views/StudyStudyView.vue'
import CreateCardView from '../views/CreateCardView.vue'
import CreateView from '../views/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/study',
      name: 'study',
      component: StudyView
    },
    {
      path: '/study/category',
      name: 'study_category',
      component: StudyCategoryView
    },
    {
      path: '/study/cardLevel',
      name: 'study_cardLevel',
      component: StudyCardLevelView
    },
    {
      path: '/study/study',
      name: 'study_study',
      component: StudyStudyView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/create/theme',
      name: 'create-theme',
      component: () => import('../views/CreateThemeView.vue')
    },
    {
      path: '/create/category',
      name: 'create-category',
      component: () => import('../views/CreateCategoryView.vue')
    },
    {
      path: '/create/card',
      name: 'create-card',
      component: CreateCardView
    },
  ]
})

export default router
