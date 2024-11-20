import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import HomeView from '@/views/HomeView.vue'
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
      meta: { requiresAuth: true }
    },
  ],
})

// Глобальный навигационный охранник
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userId') !== null;

  // Проверяем, требует ли маршрут аутентификации
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Если не аутентифицирован, перенаправляем на страницу логина
    next({ name: 'login' });
  } else {
    // Если аутентифицирован или маршрут не требует аутентификации, продолжаем
    next();
  }
});

export default router
