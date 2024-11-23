import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import HomeView from '@/views/HomeView.vue'
import TodoView from '@/views/TodoView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoView,
      meta: { requiresAuth: true },
    },
  ],
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userId') !== null

  if (isAuthenticated) {
    // If the user tries to get to the login or registration page, redirect to the home page
    if (to.name === 'login' || to.name === 'registration') {
      next({ name: 'home' })
    } else {
      next()
    }
  }

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // If not authenticated, redirect to login page
    next({ name: 'login' })
  } else {
    // If authenticated or the route does not require authentication, continue
    next()
  }
})

export default router
