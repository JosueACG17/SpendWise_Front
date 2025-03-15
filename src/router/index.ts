import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/User/HomeView.vue';
import RegisterView from '@/views/Register/RegisterView.vue';
import LoginView from '@/views/Login/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { useAuthStore } from '@/stores/authStore';
import ProfileView from '@/views/User/ProfileView.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import Swal from 'sweetalert2';
import GastosView from '../views/User/GastosView.vue';
import PresupuestosView from '../views/User/PresupuestosView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      meta: { requiresAuth: false },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/gastos',
      name: 'gastos',
      component: GastosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/presupuestos',
      name: 'presupuestos',
      component: PresupuestosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (token) {
      const { isValid, message } = await authStore.checkAuth();
      if (!isValid) {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: message || 'Tu sesión ha expirado o el token es inválido.',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        authStore.logout();
        next({ name: 'Login' });
        return;
      }
    } else {
      next({ name: 'Login' });
      return;
    }
  }
  if ((to.name === 'Login' || to.name === 'Register'|| to.name === 'welcome') && authStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }
  next();
});

export default router;
