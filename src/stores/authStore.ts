import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginUser, registerUser, validateToken, logoutUser } from '@/services/authService'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const email = ref<string | null>(null)
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  const checkAuth = async () => {
    if (!token.value) {
      return { isValid: false, message: 'No hay token' }
    }
    const { isValid, message } = await validateToken(token.value)
    return { isValid, message }
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await loginUser(email, password)
      token.value = response.token
      localStorage.setItem('token', response.token)
      router.push({ name: 'home' })
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }

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
      router.push({ name: 'Login' })
    }
  }

  return {
    token,
    email,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  }
})
