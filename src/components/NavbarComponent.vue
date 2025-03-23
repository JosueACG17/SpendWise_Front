<template>
  <nav class="border-gray-200 bg-black">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/inicio" class="flex items-center space-x-3 rtl:space-x-reverse text-white">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png" class="h-8" alt="Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">SpendWise</span>
      </RouterLink>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
        <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 cursor-pointer" id="user-menu-button"
          aria-expanded="false" @click="toggleDropdown">
          <p class="text-white mt-1.5 mr-2 ml-2">{{ userName }}</p>
          <img class="w-8 h-8 rounded-full object-cover" :src="userPhoto"
            alt="user photo" />
        </button>
        <!-- Icono de notificaciones -->
         <RouterLink to="/notificaciones">
        <div class="relative cursor-pointer sm:ml-4" >
          <BellIcon class="w-6 h-6 text-white" />
          <span v-if="totalNotificaciones > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {{ totalNotificaciones }}
          </span>
        </div>
      </RouterLink>
        <div v-show="isDropdownOpen"
            class="z-50 absolute right-0 w-60 top-10 sm:top-8 my-4 text-base list-none divide-y rounded-lg shadow-sm bg-black divide-gray-600">
            <div class="p-4 flex items-center space-x-3 border-b border-gray-200 ">
              <img class="h-12 w-12 rounded-full border-2 border-gray-500 p-0.5 object-cover"
                :src="userPhoto"
                alt="User avatar" />
              <div>
                <p class="text-sm font-medium text-white ">{{ userName }}</p>
                <p class="text-xs text-white">{{ userEmail }}</p>
              </div>
            </div>
            <RouterLink to="/profile" class="flex items-center px-4 py-2 text-sm text-white  hover:bg-gray-600 ">
              <UserIcon class="h-5 w-5 mr-2" />
              Perfil
            </RouterLink>

          <button @click="confirmLogout"
            class="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
            <ArrowRightOnRectangleIcon class="h-5 w-5 mr-2" />
            Cerrar sesión
          </button>
        </div>
        <button type="button"
          class="inline-flex items-center p-2 sm:w-10 sm:h-10 w-8 h-8 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-700 cursor-pointer"
          aria-controls="navbar-user" aria-expanded="false" @click="toggleMenu">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" :class="{ hidden: !isMenuOpen }">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <RouterLink to="/inicio"
              class="block py-2 px-3 rounded-sm sm:hover:bg-transparent md:p-0 sm:hover:text-yellow-500 "
              :class="{ 'text-yellow-500': $route.path === '/inicio', 'text-white hover:bg-yellow-600': $route.path !== '/inicio' }">
              Inicio
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/gastos"
              class="block py-2 px-3 rounded-sm sm:hover:bg-transparent md:p-0 sm:hover:text-yellow-500 "
              :class="{ 'text-yellow-500': $route.path === '/gastos', 'text-white hover:bg-yellow-600': $route.path !== '/gastos' }">
              Gastos
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/presupuestos"
              class="block py-2 px-3 rounded-sm sm:hover:bg-transparent md:p-0 sm:hover:text-yellow-500 "
              :class="{ 'text-yellow-500': $route.path === '/presupuestos', 'text-white hover:bg-yellow-600': $route.path !== '/presupuestos' }">
              Presupuestos
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/categorias"
              class="block py-2 px-3 rounded-sm sm:hover:bg-transparent md:p-0 sm:hover:text-yellow-500 "
              :class="{ 'text-yellow-500': $route.path === '/categorias', 'text-white hover:bg-yellow-600': $route.path !== '/categorias' }">
              Categorias
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/etiquetas"
              class="block py-2 px-3 rounded-sm sm:hover:bg-transparent md:p-0 sm:hover:text-yellow-500 "
              :class="{ 'text-yellow-500': $route.path === '/etiquetas', 'text-white hover:bg-yellow-600': $route.path !== '/etiquetas' }">
              Etiquetas
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/authStore';
import { usePerfilStore } from '@/stores/perfilStore';
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  BellIcon
} from '@heroicons/vue/24/outline';
import { useNotificacionesStore } from "@/stores/notificationStore";

const notificacionesStore = useNotificacionesStore();
const totalNotificaciones = computed(() => notificacionesStore.total);

const isDropdownOpen = ref(false);
const isMenuOpen = ref(false);
const authStore = useAuthStore();
const perfilStore = usePerfilStore();

const userEmail = computed(() => authStore.email || 'email@dominio.com')
const userName = computed(() => perfilStore.perfil?.nombreCompleto || 'Nombre Usuario')
const userPhoto = computed(() => perfilStore.perfil?.fotoUrl || 'https://cdn-icons-png.flaticon.com/512/219/219983.png')

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cerrar sesión',
  });

  if (result.isConfirmed) {
    try {
      await authStore.logout();
      Swal.fire({
        title: 'Sesión cerrada!',
        text: 'Has cerrado sesión correctamente.',
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error al cerrar sesión',
        text: 'No se pudo cerrar sesión correctamente. Inténtalo de nuevo.',
      });
    }
  }
};
</script>
