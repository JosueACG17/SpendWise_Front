import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/User/HomeView.vue';
import RegisterView from '@/views/Register/RegisterView.vue';
import LoginView from '@/views/Login/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { useAuthStore } from '@/stores/authStore';
import ProfileView from '@/views/User/ProfilePrincipalView.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import DashView from '@/views/Admin/DashView.vue';
import Swal from 'sweetalert2';
import GastosView from '@/views/User/GastosView.vue';
import PresupuestosView from '@/views/User/PresupuestosView.vue';
import { jwtDecode } from 'jwt-decode';
import CategoriasView from '@/views/User/CategoriasView.vue';
import EtiquetasView from '@/views/User/EtiquetasView.vue';


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
      path: '/dashboard',
      name: 'Dashboard',
      component: DashView,
      meta: { requiresAuth: true, roles: ['Administrador'] },
    },
    {
      path: '/gastos',
      name: 'gastos',
      component: GastosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: CategoriasView,
      meta: { requiresAuth: true },
    },
    {
      path: '/etiquetas',
      name: 'etiquetas',
      component: EtiquetasView,
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
  let userRole: string = ''

  if (to.meta.requiresAuth) {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ role: string }>(token);
        userRole = decodedToken.role;
      } catch (error) {
        console.error('Invalid token:', error);
      }
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
  else if (to.meta.roles && Array.isArray(to.meta.roles) && !to.meta.roles.includes(userRole)) {
    next({ name: 'NotFound' });
    return;
  }
  next();
});

export default router;
