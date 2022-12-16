import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddThemeDialog from '@/components/add-theme-dialog/AddThemeDialog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'add-theme',
          name: 'add-theme',
          component: AddThemeDialog,
        },
      ],
    },
  ],
})

export default router
