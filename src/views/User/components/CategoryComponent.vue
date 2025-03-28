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
            class="inline-flex items-center cursor-pointer sm:px-5 sm:py-2.5 px-2 py-1.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
            Agregar Categoría
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Categorías" :value="categorias.length" :icon="TagIcon" iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600" />
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
    <Form @submit="saveCategory">
      <div class="mb-4 input-group">
        <Field name="nombre">
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input :value="formData.nombre" @input="formData.nombre = $event.target.value"
            class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2 mt-1"
            placeholder="Nombre de la categoría" />
          <ErrorMessage name="nombre" class="error-message" />
        </Field>
      </div>
    </Form>
  </GenericModal>

  <!-- Delete Confirmation Modal -->
  <DeleteConfirmationModal :show="showDeleteModal" itemName="Categoría" :itemToDelete="categoryToDelete"
    @confirmDelete="deleteCategory" @close="closeDeleteModal" />

  <FooterComponent />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GenericModal from '@/common/GenericModal.vue';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';
import StatsCard from '@/views/User/components/StatsCard.vue';
import TableContent from './TableContent.vue';
import 'animate.css';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { TagIcon, BriefcaseIcon } from '@heroicons/vue/24/solid';
import 'animate.css';
import { useCategorias, getUsuarioId } from '@/composables/useCategorias';

// Obtener el usuarioId
const usuarioId = getUsuarioId();

// Inicializar el composable
const {
  categorias,
  showModal,
  editingCategory,
  showDeleteModal,
  categoryToDelete,
  formData,
  cargarCategorias,
  openAddModal,
  editCategory,
  closeModal,
  saveCategory,
  confirmDelete,
  closeDeleteModal,
  deleteCategory
} = useCategorias(usuarioId);

onMounted(() => {
  cargarCategorias();
});
</script>
