<template>
  <nav class="border-gray-200 bg-black">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/home" class="flex items-center space-x-3 rtl:space-x-reverse text-white">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">SpendWise</span>
      </RouterLink>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
        <button
          type="button"
          class="flex text-sm bg-gray-800 rounded-full md:me-0 cursor-pointer"
          id="user-menu-button"
          aria-expanded="false"
          @click="toggleDropdown"
        >
          <p class="text-white mt-1.5 mr-2 ml-2">Josue Chan</p>
          <img
            class="w-8 h-8 rounded-full"
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt="user photo"
          />
        </button>
        <div
          class="z-50 absolute right-0 top-10 sm:top-8 my-4 text-base list-none divide-y rounded-lg shadow-sm bg-black divide-gray-600"
          v-show="isDropdownOpen"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">Josue Chan</span>
            <span class="block text-sm text-gray-500 truncate dark:text-gray-400">cgjosue17@gmail.com</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <RouterLink to="/profile" class="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                Perfil
              </RouterLink>
            </li>
            <li>
              <a
                class="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                @click="confirmLogout"
              >
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-600 cursor-pointer"
          aria-controls="navbar-user"
          aria-expanded="false"
          @click="toggleMenu"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" :class="{ hidden: !isMenuOpen }">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li>
            <RouterLink
              to="/home"
              class="block py-2 px-3 text-white rounded-sm sm:hover:bg-transparent md:hover:text-yellow-500 md:p-0 hover:bg-yellow-600"
            >
              Inicio
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/home"
              class="block py-2 px-3 text-white rounded-sm sm:hover:bg-transparent md:hover:text-yellow-500 md:p-0 hover:bg-yellow-600"
            >
              Gastos
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/home"
              class="block py-2 px-3 text-white rounded-sm sm:hover:bg-transparent md:hover:text-yellow-500 md:p-0 hover:bg-yellow-600"
            >
              Presupuestos
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/home"
              class="block py-2 px-3 text-white rounded-sm sm:hover:bg-transparent md:hover:text-yellow-500 md:p-0 hover:bg-yellow-600"
            >
              Categorias
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/home"
              class="block py-2 px-3 text-white rounded-sm sm:hover:bg-transparent md:hover:text-yellow-500 md:p-0 hover:bg-yellow-600"
            >
              Etiquetas
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/authStore';

const isDropdownOpen = ref(false);
const isMenuOpen = ref(false);
const authStore = useAuthStore();

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
    } catch  {
      Swal.fire({
        icon: 'error',
        title: 'Error al cerrar sesión',
        text: 'No se pudo cerrar sesión correctamente. Inténtalo de nuevo.',
      });
    }
  }
};
</script>
