<template>
  <NavbarComponent />
  <div class="animate__animated animate__fadeIn lg:px-8 min-h-screen mx-auto my-4 px-4 sm:my-12 sm:px-6">
    <!-- Header Section with Stats -->
    <div class="mb-10">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-6 md:mb-0">
          <h1 class="text-3xl text-gray-900 font-extrabold md:text-4xl tracking-tight">
            Gestión de Categorías
          </h1>
          <p class="text-gray-600 text-lg max-w-3xl mt-3">
            Organiza tus finanzas personales con categorías personalizadas para un mejor control de gastos.
          </p>
        </div>
        <div class="flex space-x-4">
          <button @click="openAddModal"
            class="bg-gradient-to-r border border-transparent rounded-full shadow-sm text-base text-white cursor-pointer duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 font-medium from-yellow-500 hover:from-yellow-600 hover:to-amber-700 inline-flex items-center px-5 py-3 to-amber-600 transition-all">
            Agregar Categoría
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-4 mt-8 sm:grid-cols-2">
        <StatsCard title="Total Categorías" :value="categorias.length" :icon="TagIcon" iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600" />
        <StatsCard title="Categoria Más Usada" :value="Alimentacion" :icon="ChartBarIcon" iconBgColor="bg-green-100"
          iconColor="text-green-600" />
        <StatsCard title="Ultima Actualización" :value="Hoy" :icon="ClockIcon" iconBgColor="bg-blue-100"
          iconColor="text-blue-600" />
        <StatsCard title="Presupuesto Asignado" :value="Presupuesto" :icon="CurrencyDollarIcon"
          iconBgColor="bg-purple-100" iconColor="text-purple-600" />
      </div>
    </div>

    <!-- Main Content -->
    <TableContent title="Lista de Categorías" description="Gestiona tus categorías para un mejor análisis de gastos."
      searchPlaceholder="Buscar categorías..." :items="categorias"
      emptyStateMessage="Comienza creando una nueva categoría" addButtonText="Agregar Categoría" @add="openAddModal"
      @edit="editCategory" @delete="confirmDelete" />
  </div>

  <!-- Add/Edit Modal -->
  <GenericModal :show="showModal" :title="editingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'"
    :saveButtonText="editingCategory ? 'Actualizar' : 'Crear'" :icon="BriefcaseIcon" @save="saveCategory"
    @close="closeModal">
    <div class="mb-4">
      <label for="nombre" class="text-gray-700 text-sm block font-medium">Nombre</label>
      <input type="text" id="nombre" v-model="formData.nombre"
        class="border-gray-300 p-3 rounded-md shadow-sm w-full block focus:border-yellow-500 focus:ring-yellow-500 mt-1 sm:text-sm"
        placeholder="Nombre de la categoría" />
    </div>

  </GenericModal>

  <!-- Delete Confirmation Modal -->
  <DeleteConfirmationModal :show="showDeleteModal" itemName="Categoría" :itemToDelete="categoryToDelete"
    @confirmDelete="deleteCategory" @close="closeDeleteModal" />

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GenericModal from '@/common/GenericModal.vue';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';
import StatsCard from '@/views/User/components/StatsCard.vue';
import TableContent from './TableContent.vue';
import {
  TagIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BriefcaseIcon
} from '@heroicons/vue/24/solid';
import 'animate.css';

const Alimentacion = ref("Alimentos");
const Hoy = ref("Hoy");
const Presupuesto = ref("$2,450");


const categorias = ref([
  { Id: 1, Nombre: 'Alimentación' },
  { Id: 2, Nombre: 'Transporte' },
  { Id: 3, Nombre: 'Servicios' },
  { Id: 4, Nombre: 'Entretenimiento' },
]);


const showModal = ref(false);
const editingCategory = ref(null);
const formData = ref({
  nombre: '',
  tipo: 'gasto',
});

const showDeleteModal = ref(false);
const categoryToDelete = ref(null);

const openAddModal = () => {
  editingCategory.value = null;
  formData.value = {
    nombre: '',
    tipo: 'gasto',
  };
  showModal.value = true;
};

const editCategory = (categoria) => {
  editingCategory.value = categoria;
  formData.value = {
    nombre: categoria.Nombre,
    tipo: 'gasto',
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveCategory = () => {
  if (editingCategory.value) {
    const index = categorias.value.findIndex(c => c.Id === editingCategory.value.Id);
    if (index !== -1) {
      categorias.value[index] = {
        ...categorias.value[index],
        Nombre: formData.value.nombre
      };
    }
  } else {
    const newId = Math.max(0, ...categorias.value.map(c => c.Id)) + 1;
    categorias.value.push({
      Id: newId,
      Nombre: formData.value.nombre,
    });
  }
  closeModal();
};

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
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hover\:bg-gray-50:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
</style>
