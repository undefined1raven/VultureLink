import { createRouter, createWebHistory } from 'vue-router'
import Command from '../views/Command.vue'
import Login from '../views/Login.vue'
import Genesis from '../views/Genesis.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Command.vue')
    },
    {
      path: '/advanced_telemetry',
      name: 'advanced_telemetry',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },    
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/genesis',
      name: 'genesis',
      component: () => import('../views/Genesis.vue')
    },
  ]
})

export default router
