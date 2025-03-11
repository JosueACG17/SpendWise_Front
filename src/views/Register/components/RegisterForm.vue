<template>
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <!-- Error Modal -->
    <div v-if="errorMessage" class="fixed top-4 right-4 w-96 bg-red-500 text-white rounded-lg shadow-lg z-50 transition-all duration-500">
      <!-- Barra de progreso -->
      <div class="h-1 bg-red-700" :style="{ width: `${progress}%` }"></div>
      <div class="p-4">
        <div class="flex">
          <div class="py-1">
            <!-- Icono de alerta (rojo) -->
            <svg class="fill-current h-6 w-6 text-white mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
          </div>
          <div>
            <p class="font-bold">Error</p>
            <p class="text-sm">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-4 sm:px-6 lg:w-1/2 lg:px-8">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Registro</h1>
        <h2 class="text-lg text-gray-500 font-semibold mt-2">Crea tu nueva cuenta</h2>
      </div>
      <form class="mx-auto mt-8 mb-0 max-w-md space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input id="email" type="email" v-model="email" v-bind="emailAttrs"
            class="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ingresa tu correo electrónico" />
          <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <div class="relative mt-1">
            <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password" v-bind="passwordAttrs"
              class="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña" />
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-2 flex items-center">
              <svg v-if="!showPassword" class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19.5 12a9.5 9.5 0 01-15 7.5M3 3l18 18" />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
        </div>
        <div>
          <label for="confirmpassword" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
          <div class="relative mt-1">
            <input id="confirmpassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
              v-bind="confirmPasswordAttrs"
              class="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Confirma tu contraseña" />
            <button type="button" @click="toggleConfirmPasswordVisibility"
              class="absolute inset-y-0 right-2 flex items-center">
              <svg v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19.5 12a9.5 9.5 0 01-15 7.5M3 3l18 18" />
              </svg>
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-600 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div>
        <button type="submit"
          class="inline-block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-800 text-white mt-4">
          Registrarse
        </button>
        <div class="mt-2 text-center">
          <span class="text-sm text-gray-600">¿Ya tienes cuenta? </span>
          <RouterLink to="/login" class="text-blue-800 font-semibold">Iniciar Sesión</RouterLink>
        </div>
      </form>
    </div>
    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img alt=""
        src="https://images.pexels.com/photos/11646613/pexels-photo-11646613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="absolute inset-0 h-full w-full object-cover" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { registerUser } from '@/services/authService';
import { handleAxiosError } from '@/utils/Request';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const router = useRouter();

const validationSchema = yup.object({
  email: yup.string().trim().email('Correo incorrecto').required('El correo es requerido'),
  password: yup.string().trim().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  confirmPassword: yup.string().trim().oneOf([yup.ref('password')], 'Las contraseñas deben coincidir').required('La confirmación de la contraseña es requerida'),
});

const { errors, handleSubmit, defineField } = useForm({ validationSchema });

const [email] = defineField('email');
const [password] = defineField('password');
const [confirmPassword] = defineField('confirmPassword');

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errorMessage = ref('');
const progress = ref(100);

const togglePasswordVisibility = () => (showPassword.value = !showPassword.value);
const toggleConfirmPasswordVisibility = () => (showConfirmPassword.value = !showConfirmPassword.value);

const onSubmit = handleSubmit(async (values) => {
  try {
    if (values.password !== values.confirmPassword) {
      errorMessage.value = 'Las contraseñas no coinciden';
      progress.value = 100;
      const interval = setInterval(() => {
        if (progress.value > 0) {
          progress.value -= 2;
        } else {
          clearInterval(interval);
          errorMessage.value = '';
        }
      }, 50);
      return;
    }

    const response = await registerUser(values.email, values.password);

    if (response.message === 'Usuario registrado exitosamente') {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Tu cuenta ha sido creada con éxito!',
        showConfirmButton: false,
      timer: 1000,
      }).then(() => {
        router.push('/login');
      });
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = handleAxiosError(error);

    const interval = setInterval(() => {
      if (progress.value > 0) {
        progress.value -= 1;
      } else {
        clearInterval(interval);
        errorMessage.value = '';
      }
    }, 50);
  }
});
</script>



