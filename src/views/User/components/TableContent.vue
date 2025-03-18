<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div class="border-b border-gray-200 bg-gray-50 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
        <p class="mt-1 text-sm text-gray-500">{{ description }}</p>
      </div>
      <div class="mt-4 md:mt-0 relative">
        <div class="relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="focus:ring-yellow-500 focus:border-yellow-500 bg-white block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
            :placeholder="searchPlaceholder"
          />
        </div>
      </div>
    </div>


    <div class="divide-y divide-gray-200 bg-white">
      <div v-if="filteredItems.length === 0" class="py-12 flex flex-col items-center justify-center">
        <div class="rounded-full bg-yellow-100 p-3">
          <ExclamationTriangleIcon class="h-6 w-6 text-yellow-600" />
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No se encontraron resultados</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchQuery ? 'Intenta con otra búsqueda' : emptyStateMessage }}
        </p>
        <div class="mt-6" v-if="!searchQuery && showAddButton">
          <button
            @click="emit('add')"
            class="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            {{ addButtonText }}
          </button>
        </div>
      </div>

      <div v-for="item in filteredItems" :key="item.Id" class="bg-white p-4 rounded-2xl flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {{ item.Nombre.charAt(0) }}
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ item.Nombre }}</h3>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="flex space-x-2">
            <button
              @click="emit('edit', item)"
              class="inline-flex cursor-pointer items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <PencilIcon class="h-5 w-5" />
            </button>
            <button
              @click="emit('delete', item)"
              class="inline-flex cursor-pointer items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Anterior
        </a>
        <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Siguiente
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Mostrando <span class="font-medium">1</span> a <span class="font-medium">{{ filteredItems.length }}</span> de <span class="font-medium">{{ items.length }}</span> resultados
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Anterior</span>
              <ChevronLeftIcon class="h-5 w-5" />
            </a>
            <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </a>
            <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Siguiente</span>
              <ChevronRightIcon class="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/solid';

interface TableItem {
  Id: number;
  Nombre: string;
}

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  searchPlaceholder: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => TableItem[],
    required: true,
  },
  emptyStateMessage: {
    type: String,
    default: 'Comienza creando un nuevo elemento',
  },
  addButtonText: {
    type: String,
    default: 'Agregar',
  },
  showAddButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['add', 'edit', 'delete']);

const searchQuery = ref('');
const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items;
  const query = searchQuery.value.toLowerCase();
  return props.items.filter((item) =>
    item.Nombre.toLowerCase().includes(query)
  );
});
</script>
