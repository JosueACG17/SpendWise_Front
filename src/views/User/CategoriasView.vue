<template>
  <NavbarComponent />

  <div class="animate__animated animate__fadeIn mx-auto sm:my-12 my-4 px-4 sm:px-6 lg:px-8 min-h-screen">
    <!-- Header Section with Stats -->
    <div class="mb-10">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-6 md:mb-0">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Gestión de Categorías
          </h1>
          <p class="mt-3 text-lg text-gray-600 max-w-3xl">
            Organiza tus finanzas personales con categorías personalizadas para un mejor control de gastos.
          </p>
        </div>
        <div class="flex space-x-4">
          <button @click="openAddModal" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
            <PlusIcon class="h-5 w-5 mr-2" />
            Agregar Categoría
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow-lg rounded-2xl">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <TagIcon class="h-6 w-6 text-yellow-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Categorías</dt>
                  <dd>
                    <div class="text-lg font-semibold text-gray-900">{{ categorias.length }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-lg rounded-2xl">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                <ChartBarIcon class="h-6 w-6 text-green-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Categoría Más Usada</dt>
                  <dd>
                    <div class="text-lg font-semibold text-gray-900">Alimentación</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-lg rounded-2xl">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <ClockIcon class="h-6 w-6 text-blue-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Última Actualización</dt>
                  <dd>
                    <div class="text-lg font-semibold text-gray-900">Hoy</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-lg rounded-2xl">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <CurrencyDollarIcon class="h-6 w-6 text-purple-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Presupuesto Asignado</dt>
                  <dd>
                    <div class="text-lg font-semibold text-gray-900">$2,450</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="border-b border-gray-200 bg-gray-50 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Lista de Categorías</h2>
          <p class="mt-1 text-sm text-gray-500">
            Gestiona tus categorías para un mejor análisis de gastos
          </p>
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
              placeholder="Buscar categoría..."
            />
          </div>
        </div>
      </div>

      <!-- Categories List -->
      <div class="divide-y divide-gray-200 bg-white">
        <div v-if="filteredCategorias.length === 0" class="py-12 flex flex-col items-center justify-center">
          <div class="rounded-full bg-yellow-100 p-3">
            <ExclamationTriangleIcon class="h-6 w-6 text-yellow-600" />
          </div>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No se encontraron categorías</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ searchQuery ? 'Intenta con otra búsqueda' : 'Comienza creando una nueva categoría' }}
          </p>
          <div class="mt-6" v-if="!searchQuery">
            <button
              @click="openAddModal"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              Agregar Categoría
            </button>
          </div>
        </div>

        <div v-for="categoria in filteredCategorias" :key="categoria.Id" class="hover:bg-gray-50 transition-colors duration-200">
          <div class="px-6 py-5 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {{ categoria.Nombre.charAt(0) }}
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ categoria.Nombre }}</h3>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex space-x-2">
                <button @click="editCategory(categoria)" class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  <PencilIcon class="h-5 w-5" />
                </button>
                <button @click="confirmDelete(categoria)" class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
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
              Mostrando <span class="font-medium">1</span> a <span class="font-medium">{{ filteredCategorias.length }}</span> de <span class="font-medium">{{ filteredCategorias.length }}</span> resultados
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
  </div>

  <!-- Add/Edit Modal -->
  <div v-if="showModal" class="fixed inset-0 overflow-y-auto z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
              <TagIcon class="h-6 w-6 text-yellow-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ editingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría' }}
              </h3>
              <div class="mt-4">
                <div class="mb-4">
                  <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    v-model="formData.nombre"
                    class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Nombre de la categoría"
                  />
                </div>
                <div class="mb-4">
                  <label for="tipo" class="block text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    id="tipo"
                    v-model="formData.tipo"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
                  >
                    <option value="gasto">Gasto</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="ahorro">Ahorro</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <input
                    id="activo"
                    type="checkbox"
                    v-model="formData.activo"
                    class="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label for="activo" class="ml-2 block text-sm text-gray-900">Activo</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="saveCategory"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ editingCategory ? 'Actualizar' : 'Crear' }}
          </button>
          <button
            @click="closeModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 overflow-y-auto z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Eliminar Categoría
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  ¿Estás seguro que deseas eliminar la categoría "{{ categoryToDelete?.Nombre }}"? Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="deleteCategory"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Eliminar
          </button>
          <button
            @click="closeDeleteModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  TagIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/solid';
import 'animate.css';

// Sample data
const categorias = ref([
  { Id: 1, Nombre: 'Alimentación'},
  { Id: 2, Nombre: 'Transporte'},
  { Id: 3, Nombre: 'Servicios'},
  { Id: 4, Nombre: 'Entretenimiento'},
]);

// Search functionality
const searchQuery = ref('');
const filteredCategorias = computed(() => {
  if (!searchQuery.value) return categorias.value;
  const query = searchQuery.value.toLowerCase();
  return categorias.value.filter(categoria =>
    categoria.Nombre.toLowerCase().includes(query)
  );
});

// Modal state
const showModal = ref(false);
const editingCategory = ref(null);
const formData = ref({
  nombre: '',
  tipo: 'gasto',
  activo: true
});

// Delete modal state
const showDeleteModal = ref(false);
const categoryToDelete = ref(null);


// Modal functions
const openAddModal = () => {
  editingCategory.value = null;
  formData.value = {
    nombre: '',
    tipo: 'gasto',
    activo: true
  };
  showModal.value = true;
};

const editCategory = (categoria) => {
  editingCategory.value = categoria;
  formData.value = {
    nombre: categoria.Nombre,
    tipo: 'gasto', // Default value, would come from API in real app
    activo: true
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveCategory = () => {
  if (editingCategory.value) {
    // Update existing category
    const index = categorias.value.findIndex(c => c.Id === editingCategory.value.Id);
    if (index !== -1) {
      categorias.value[index] = {
        ...categorias.value[index],
        Nombre: formData.value.nombre
      };
    }
  } else {
    // Add new category
    const newId = Math.max(0, ...categorias.value.map(c => c.Id)) + 1;
    categorias.value.push({
      Id: newId,
      Nombre: formData.value.nombre,
    });
  }
  closeModal();
};

// Delete functions
const confirmDelete = (categoria) => {
  categoryToDelete.value = categoria;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  categoryToDelete.value = null;
};

const deleteCategory = () => {
  if (categoryToDelete.value) {
    const index = categorias.value.findIndex(c => c.Id === categoryToDelete.value.Id);
    if (index !== -1) {
      categorias.value.splice(index, 1);
    }
  }
  closeDeleteModal();
};
</script>

<style scoped>
/* Subtle animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Card hover effects */
.hover\:bg-gray-50:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
</style>
