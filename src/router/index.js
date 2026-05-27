import { createRouter, createWebHistory } from 'vue-router'
import PublicSite from '../pages/PublicSite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PublicSite
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 72, behavior: 'smooth' }
    }

    return { top: 0 }
  }
})

export default router
