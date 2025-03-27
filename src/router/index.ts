import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/User/HomeView.vue'
import RegisterView from '@/views/Register/RegisterView.vue'
import LoginView from '@/views/Login/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores/authStore'
import ProfileView from '@/views/User/ProfileView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import DashView from '@/views/Admin/DashView.vue'
import Swal from 'sweetalert2'
import GastosView from '@/views/User/BillsView.vue'
import PresupuestosView from '@/views/User/BudgetView.vue'
import CategoriasView from '@/views/User/CategoryView.vue'
import EtiquetasView from '@/views/User/LabelsView.vue'
import NotificationsView from '@/views/User/NotificationsView.vue'
import UsuariosCrudView from '../views/Admin/UsuariosCrudView.vue'
import LogsView from '../views/Admin/LogsView.vue'
import ChartsView from '@/views/User/ChartsView.vue'

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
      path: '/inicio',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, roles: ['Usuario'] },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true, roles: ['Usuario']  },
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
      meta: { requiresAuth: true, roles: ['Usuario']  },
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: CategoriasView,
      meta: { requiresAuth: true, roles: ['Usuario']  },
    },
    {
      path: '/etiquetas',
      name: 'etiquetas',
      component: EtiquetasView,
      meta: { requiresAuth: true, roles: ['Usuario']  },
    },
    {
      path: '/presupuestos',
      name: 'presupuestos',
      component: PresupuestosView,
      meta: { requiresAuth: true , roles: ['Usuario'] },
    },
    {
      path: '/notificaciones',
      name: 'notificaciones',
      component: NotificationsView,
      meta: { requiresAuth: true, roles: ['Usuario']  },
    },
    {
      path: '/graficas',
      name: 'graficas',
      component: ChartsView,
      meta: { requiresAuth: true, roles: ['Usuario']  },
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosCrudView,
      meta: { requiresAuth: true, roles: ['Administrador'] },
    },
    {
      path: '/logs',
      name: 'logs',
      component: LogsView,
      meta: { requiresAuth: true, roles: ['Administrador'] },
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
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (token) {
      try {
        const { isValid, message } = await authStore.checkAuth()
        if (!isValid) {
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: message || 'Tu sesión ha expirado o el token es inválido.',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          })
          next({ name: 'Login' })
          return
        }

        if (to.meta.roles && authStore.userRole && !to.meta.roles.includes(authStore.userRole)) {
          const redirectTo = authStore.userRole === 'Administrador'
            ? 'Dashboard'
            : 'home'
          next({ name: redirectTo })
          return
        }
      } catch (error) {
        console.error('Error de autenticación:', error)
        next({ name: 'Login' })
        return
      }
    } else {
      next({ name: 'Login' })
      return
    }
  }

  if (
    (to.name === 'Login' || to.name === 'Register' || to.name === 'welcome') &&
    authStore.isAuthenticated
  ) {
    const redirectTo = authStore.userRole === 'Administrador'
      ? 'Dashboard'
      : 'home'
    next({ name: redirectTo })
    return
  }

  next()
})

export default router
