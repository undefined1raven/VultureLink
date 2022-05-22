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
      component: () => import('../views/AdvancedTelemetry.vue')
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
    {
      path: '/MFA_TOTP',
      name: 'MFA_TOTP',
      component: () => import('../views/MFA_TOTP.vue')
    },
    {
      path: '/MFA_app',
      name: 'MFA_app',
      component: () => import('../views/MFA_app.vue')
    },
  ]
})

export default router
