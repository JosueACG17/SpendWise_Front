import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import { loginUser, registerUser, validateToken } from '@/services/authService';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const email = ref<string | null>(null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  const checkAuth = async () => {
    if (!token.value) return;
    const isValid = await validateToken(token.value);
    if (!isValid) {
      logout();
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await loginUser(email, password);
      token.value = response.token;
      localStorage.setItem('token', response.token);
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      await registerUser(email, password);
      router.push({ name: 'Login' });
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = (): void => {
    token.value = null;
    localStorage.removeItem('token');
    router.push({ name: 'Login' });
  };

  onMounted(() => {
    checkAuth();
  });

  return {
    token,
    email,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };
});
