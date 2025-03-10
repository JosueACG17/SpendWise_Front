import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginUser, registerUser, logoutUser } from '@/services/authService'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const email = ref<string | null>(null)
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await loginUser(email, password)
      token.value = response.token
      router.push({ name: 'home' })
    } catch (error) {
      throw error
    }
  }

  const register = async (email: string, password: string): Promise<void> => {
    try {
      const response = await registerUser(email, password)
      router.push({ name: 'Login' })
    } catch (error) {
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await logoutUser()
      token.value = null
      email.value = null
      router.push({ name: 'Login' })
    } catch (error) {
      throw error
    }
  }

  return {
    token,
    email,
    isAuthenticated,
    login,
    register,
    logout,
  }
})
