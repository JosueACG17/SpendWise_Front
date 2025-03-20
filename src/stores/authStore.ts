import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginUser, registerUser, validateToken, logoutUser } from '@/services/authService'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { usePerfilStore } from './perfilStore'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const email = ref<string | null>(null)
  const userId = ref<number | null>(null)
  const router = useRouter()
  const perfilStore = usePerfilStore()

  const isAuthenticated = computed(() => !!token.value)

  const checkAuth = async () => {
    if (!token.value) {
      return { isValid: false, message: 'No hay token' }
    }
    const { isValid, message } = await validateToken(token.value)
    return { isValid, message }
  }

  const login = async (emailInput: string, password: string): Promise<void> => {
    try {
      const response = await loginUser(emailInput, password);
      token.value = response.token;
      localStorage.setItem('token', response.token);

      const decodedToken = jwtDecode<{ nameid: string; email: string }>(response.token);

      email.value = decodedToken.email;
      userId.value = parseInt(decodedToken.nameid, 10);

      await perfilStore.cargarPerfil(userId.value);
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      await registerUser(email, password)
      router.push({ name: 'Login' })
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      if (token.value) {
        await logoutUser(token.value)
      }
    } catch (error) {
      console.error('Error al cerrar sesión en el backend:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error al cerrar sesión',
        text: 'No se pudo cerrar sesión correctamente. Inténtalo de nuevo.',
      })
    } finally {
      token.value = null
      localStorage.removeItem('token')
      perfilStore.clearPerfil()
      router.push({ name: 'Login' })
    }
  }

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<{ nameid: string; email: string }>(storedToken);
        token.value = storedToken;
        email.value = decoded.email;
        userId.value = parseInt(decoded.nameid, 10);

        await perfilStore.cargarPerfil(userId.value);
      } catch (error) {
        console.error('Token inválido al iniciar:', error);
        await logout();
      }
    }
  };


  return {
    token,
    email,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    userId,
    initializeAuth
  }
})
