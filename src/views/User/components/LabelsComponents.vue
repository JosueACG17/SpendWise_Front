<template>
  <NavbarComponent />
  <div class="animate__animated animate__fadeIn mx-auto sm:my-12 my-4 px-4 sm:px-6 lg:px-8 min-h-screen">
    <div class="mb-10">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-6 md:mb-0">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Gestión de Etiquetas
          </h1>
          <p class="mt-3 text-lg text-gray-600 max-w-3xl">
            Organiza tus gastos y presupuestos con etiquetas personalizadas.
          </p>
        </div>
        <div class="flex space-x-4">
          <button @click="openAddModal"
            class="inline-flex items-center cursor-pointer px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
            Agregar Etiqueta
          </button>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Etiquetas" :value="etiquetas.length" :icon="TagIcon" iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600" />
      </div>
    </div>


    <TableContent title="Lista de Etiquetas" description="Gestiona tus etiquetas para un mejor control financiero."
      searchPlaceholder="Buscar etiquetas..." :items="etiquetas" emptyStateMessage="Comienza creando una nueva etiqueta"
      addButtonText="Agregar Etiqueta" @add="openAddModal" @edit="editEtiqueta" @delete="confirmDelete" />
  </div>


  <GenericModal :show="showModal" :title="editingEtiqueta ? 'Editar Etiqueta' : 'Agregar Nueva Etiqueta'"
    :saveButtonText="editingEtiqueta ? 'Actualizar' : 'Crear'" :icon="TagIcon" @save="saveEtiqueta" @close="closeModal">
    <div class="mb-4">
      <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
      <input type="text" id="nombre" v-model="formData.nombre"
        class="mt-1 p-3 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        placeholder="nombre de la etiqueta" />
    </div>
  </GenericModal>


  <DeleteConfirmationModal :show="showDeleteModal" itemName="Etiqueta" :itemToDelete="etiquetaToDelete"
    @confirmDelete="deleteEtiqueta" @close="closeDeleteModal" />

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GenericModal from '@/views/User/components/GenericModal.vue';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';
import StatsCard from '@/views/User/components/StatsCard.vue';
import TableContent from './TableContent.vue';
import {
  TagIcon
} from '@heroicons/vue/24/solid';
import 'animate.css';
import { addLabel, deleteLabel, getLabels, updateLabel } from '@/services/labelService';

const etiquetas = ref([
  // { Id: 1, nombre: 'Urgente' },
  // { Id: 2, nombre: 'Ocio' },
  // { Id: 3, nombre: 'Trabajo' },
  // { Id: 4, nombre: 'Personal' },
]);

const showModal = ref(false);
const editingEtiqueta = ref(null);
const formData = ref({
  nombre: '',
});

const showDeleteModal = ref(false);
const etiquetaToDelete = ref(null);

const openAddModal = () => {
  editingEtiqueta.value = null;
  formData.value = {
    nombre: '',
  };
  showModal.value = true;
};

const usuarioId = 1;

onMounted(() => {
  cargarCategorias();
});

const cargarCategorias = async () => {
  try {
    etiquetas.value = await getLabels(usuarioId);
  } catch (error) {
    console.error('Error al obtener categorias:', error);
  }
};

const editEtiqueta = (etiqueta) => {
  editingEtiqueta.value = etiqueta;
  formData.value = {
    nombre: etiqueta.nombre,
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveEtiqueta = async () => {
  try {
    if (editingEtiqueta.value) {
      const updatedCategory = {
        id: editingEtiqueta.value.id,
        nombre: formData.value.nombre,
        usuarioId: 1,
      };
      await updateLabel(editingEtiqueta.value.id, updatedCategory);
    } else {
      const newCategory = {
        nombre: formData.value.nombre,
        usuarioId: 1,
      };
      await addLabel(newCategory);
    }
    closeModal();
    cargarCategorias();
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
  }
};

const confirmDelete = (etiqueta) => {
  etiquetaToDelete.value = etiqueta;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  etiquetaToDelete.value = null;
};

const deleteEtiqueta = async () => {
  if (etiquetaToDelete.value) {
    try {
      await deleteLabel(etiquetaToDelete.value.id);
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
</style>
