<template>
  <div class="flex h-screen bg-gray-100">
    <div :class="[
      'transition-all duration-200 ease-in-out bg-white border-r border-gray-200',
      isSidebarOpen ? 'w-48 sm:w-64' : 'sm:w-20 w-15'
    ]">
      <div class="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 class="text-xl font-bold text-gray-800" v-if="isSidebarOpen">Dashboard</h1>
        <h1 class="text-xl font-bold text-gray-800" v-else>D</h1>
      </div>
      <nav class="mt-5 px-2">
        <div v-for="(item, index) in menuItems" :key="index" class="mb-2">
          <RouterLink
            :to="item.route"
            :class="[
              'flex items-center p-3 rounded-lg transition-colors',
              item.active
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <span :class="[
              'ml-3 transition-opacity duration-300',
              isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
            ]">{{ item.name }}</span>
          </RouterLink>
        </div>
      </nav>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
        <div class="flex items-center">
          <button @click="toggleSidebar"
            class="text-gray-600 focus:outline-none hover:bg-gray-500 hover:text-white p-1 rounded-lg cursor-pointer">
            <MenuIcon v-if="!isSidebarOpen" class="h-6 w-6" />
            <XIcon v-else class="h-6 w-6" />
          </button>
          <div class="ml-4 md:ml-6">
            <h2 class="text-lg font-medium text-gray-800">Panel de Control</h2>
          </div>
        </div>
        <div class="relative" ref="menuRef">
          <button @click="isUserMenuOpen = !isUserMenuOpen"
            class="flex items-center max-w-xs rounded-full text-sm focus:outline-none cursor-pointer">
            <img class="h-10 w-10 rounded-full border-2 border-gray-500 p-0.5"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar" />
            <span class="ml-2 text-gray-700 hidden md:block font-semibold">Josue Chan</span>
            <ChevronDownIcon class="ml-1 h-4 w-4 text-gray-700" />
          </button>

          <div v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 w-56 bg-white  rounded-lg shadow-lg border border-gray-200 z-10">
            <div class="p-4 flex items-center space-x-3 border-b border-gray-200 ">
              <img class="h-12 w-12 rounded-full border-2 border-gray-500 p-0.5"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar" />
              <div>
                <p class="text-sm font-medium text-gray-900 ">Josue Chan</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Programador</p>
              </div>
            </div>
            <RouterLink to="/profile" class="flex items-center px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 ">
              <UserIcon class="h-5 w-5 mr-2" />
              Perfil
            </RouterLink>

            <button @click="confirmLogout"
              class="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
              <ArrowRightOnRectangleIcon class="h-5 w-5 mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/authStore';
import {
  Bars3BottomLeftIcon as MenuIcon,
  XMarkIcon as XIcon,
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,

} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const isSidebarOpen = ref(true);
const isUserMenuOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const menuItems = ref([
  { name: 'Dashboard', icon: HomeIcon, route: '/dashboard', active: false },
  { name: 'Usuarios', icon: UsersIcon, route: '/usuarios', active: false },
  { name: 'Logs', icon: BriefcaseIcon, route: '/logs', active: false },

]);

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
