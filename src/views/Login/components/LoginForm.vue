<template>
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="relative h-full w-full sm:h-96 lg:h-full lg:w-1/2">
      <img alt="Fondo tecnológico"
        src="https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="absolute inset-0 h-full w-full object-cover" loading="lazy" />
    </div>
    <div class="w-full px-4 py-10 sm:px-6 sm:py-16 lg:w-1/2">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">¡BIENVENIDO!</h1>
        <h2 class="text-lg text-gray-500 font-semibold mt-2">Inicia sesión con tu cuenta</h2>
      </div>
      <form class="mx-auto mt-8 mb-0 max-w-md space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <div class="relative mt-1">
            <input id="email" type="email" v-model="email"
              class="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ingresa tu correo electrónico" />
          </div>
          <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <div class="relative mt-1">
            <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
              class="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña" />
            <button type="button" @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-2 flex items-center">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.03 0 2.02.15 2.96.425M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19.5 12a9.5 9.5 0 01-15 7.5M3 3l18 18" />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <button type="submit"
          class="inline-block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white mt-5 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-800">
          Iniciar Sesión
        </button>

        <div class="mt-4 text-center">
          <span class="text-sm text-gray-600">¿No tienes cuenta aún? </span>
          <RouterLink to="/register" class="text-blue-800 font-semibold">Registrarse</RouterLink>
        </div>
      </form>
    </div>
  </section>
  <LoadingScreen :show="isLoading" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import LoadingScreen from '@/components/LoadingScreen.vue';

const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);

const validationSchema = yup.object({
  email: yup.string()
    .trim()
    .email('Correo incorrecto')
    .required('El correo es requerido')
    .matches(/^[a-zA-Z0-9@.]+$/, 'El correo no debe contener caracteres especiales'),
  password: yup.string()
    .trim()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
    .matches(/^[a-zA-Z0-9]+$/, 'La contraseña no debe contener caracteres especiales'),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });

const [email] = defineField('email', { validateOnModelUpdate: true });
const [password] = defineField('password', { validateOnModelUpdate: true });
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;

    await authStore.login(values.email, values.password);

    isLoading.value = false;

    Swal.fire({
      icon: 'success',
      title: '¡Inicio de sesión exitoso!',
      showConfirmButton: false,
      timer: 1000,
    }).then(() => {
      router.push({ name: 'home' });
    });
  } catch {
    isLoading.value = false;

    Swal.fire({
      icon: 'error',
      title: 'Credenciales Incorrectas',
      text: 'Por favor, revisa tu correo y contraseña.',
      showConfirmButton: false,
      timer: 2000,
    });
  }
});
</script>
