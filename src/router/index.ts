import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useCurrentUser from '@/hooks/useCurrentUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: { requiresAuth: false },
      component: HomeView
    },
    {
      path: '/apartments',
      name: 'apartments ',
      meta: { requiresAuth: false },
      component: () => import('../views/ApartmentsView.vue')
    },
    {
      path: '/apartments/:id',
      name: 'selected-apartments',
      meta: { requiresAuth: false },
      component: () => import('../views/SelectedApartments.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      meta: { requiresAuth: true },
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      
      meta: { requiresAuth: false },
      component: () => import('../views/404View.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user } = useCurrentUser()

  if (to.meta.requiresAuth) {
    if (!user.value) {
      return next('/')
    }
  }

  next()
})

export default router
