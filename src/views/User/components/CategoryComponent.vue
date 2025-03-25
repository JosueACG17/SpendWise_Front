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
            class="inline-flex items-center cursor-pointer px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
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
            class="mt-1 p-3 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
import { onMounted, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GenericModal from '@/common/GenericModal.vue';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';
import StatsCard from '@/views/User/components/StatsCard.vue';
import TableContent from './TableContent.vue';
import { TagIcon, BriefcaseIcon } from '@heroicons/vue/24/solid';
import 'animate.css';
import { addCategory, deleteCategoria, getCategories, updateCategory, isCategoryInUse  } from '@/services/categoryService';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Swal from 'sweetalert2';

const categorias = ref([]);

const showModal = ref(false);
const editingCategory = ref(null);
const formData = ref({
  nombre: '',
});

const showDeleteModal = ref(false);
const categoryToDelete = ref(null);

// Obtener el token del localStorage y decodificarlo
const token = localStorage.getItem('token');
const decodedToken = token ? jwtDecode(token) : null;
const usuarioId = decodedToken ? decodedToken.nameid : null;

onMounted(() => {
  cargarCategorias();
});

const cargarCategorias = async () => {
  try {
    categorias.value = await getCategories(usuarioId);
  } catch (error) {
    console.error('Error al obtener categorias:', error);
  }
};

const openAddModal = () => {
  editingCategory.value = null;
  formData.value = {
    nombre: '',
  };
  showModal.value = true;
};

const editCategory = (categoria) => {
  editingCategory.value = { ...categoria };
  formData.value.nombre = categoria.nombre;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const validateCategoryName = (name) => {
  const trimmedName = name.trim();
  const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(trimmedName);
  if (!trimmedName) {
    return 'El nombre es requerido';
  }
  if (hasSpecialChars) {
    return 'El nombre no puede contener caracteres especiales';
  }
  if (trimmedName.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres válidos';
  }
  return null;
};

const saveCategory = async () => {
  const validationError = validateCategoryName(formData.value.nombre);
  if (validationError) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: validationError,
      showConfirmButton: false,
      timer: 700
    });
    return;
  }

  formData.value.nombre = formData.value.nombre.trim();
  try {
    if (editingCategory.value) {
      const updatedCategory = {
        id: editingCategory.value.id,
        nombre: formData.value.nombre,
        usuarioId: usuarioId,
      };
      await updateCategory(editingCategory.value.id, updatedCategory);
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'La categoría se ha actualizado correctamente',
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      const newCategory = {
        nombre: formData.value.nombre,
        usuarioId: usuarioId,
      };
      await addCategory(newCategory);
      Swal.fire({
        icon: 'success',
        title: '¡Creado!',
        text: 'Categoría creada correctamente',
        showConfirmButton: false,
        timer: 1000
      });
    }
    closeModal();
    cargarCategorias();
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
  }
};

const confirmDelete = (categoria) => {
  categoryToDelete.value = categoria;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  categoryToDelete.value = null;
};



const deleteCategory = async () => {
  if (categoryToDelete.value) {
    try {
      const inUse = await isCategoryInUse(categoryToDelete.value.id);
      if (inUse) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se puede eliminar la categoría porque está siendo utilizada en un presupuesto',
          showConfirmButton: false,
        timer: 1000
        });
        closeDeleteModal();
        return;
      }
      await deleteCategoria(categoryToDelete.value.id);
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'La categoría se ha eliminado correctamente',
        showConfirmButton: false,
        timer: 1000
      });
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  }
  closeDeleteModal();
  cargarCategorias();
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

.error-message {
  color: #ff5252;
  font-size: 0.85rem;
}

.input-group {
  margin-bottom: 8px;
}
</style>
