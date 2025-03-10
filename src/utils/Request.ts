import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

// Instancia de axios
export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7035/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export const handleAxiosError = (error: any, customMessages: Record<number, string> = {}): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const message =
      customMessages[status] || error.response?.data?.message || 'Ha ocurrido un problema'
    return message;
  } else {
    return 'Error desconocido';  
  }
}
