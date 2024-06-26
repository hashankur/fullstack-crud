import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'bg-gray-100',
  routes: [
    {
      path: '/',
      component: () => import('../layout/AuthenticatedLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/sign-up',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/sign-in',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/user-profile',
      component: () => import('../views/UserProfile.vue')
    },
    {
      path: '/:catchAll(.*)*',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
