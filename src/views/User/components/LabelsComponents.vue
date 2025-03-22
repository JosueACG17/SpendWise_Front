<template>
  <NavbarComponent />
  <div class="animate__animated animate__fadeIn lg:px-8 min-h-screen mx-auto my-4 px-4 sm:my-12 sm:px-6">
    <div class="mb-10">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-6 md:mb-0">
          <h1 class="text-3xl text-gray-900 font-extrabold md:text-4xl tracking-tight">
            Gestión de Etiquetas
          </h1>
          <p class="text-gray-600 text-lg max-w-3xl mt-3">
            Organiza tus gastos y presupuestos con etiquetas personalizadas.
          </p>
        </div>
        <div class="flex space-x-4">
          <button @click="openAddModal"
            class="bg-gradient-to-r border border-transparent rounded-full shadow-sm text-base text-white cursor-pointer duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 font-medium from-yellow-500 hover:from-yellow-600 hover:to-amber-700 inline-flex items-center px-5 py-3 to-amber-600 transition-all">
            Agregar Etiqueta
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 lg:grid-cols-4 mt-8 sm:grid-cols-2">
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
      <label for="nombre" class="text-gray-700 text-sm block font-medium">Nombre</label>
      <input type="text" id="nombre" v-model="formData.nombre"
        class="border-gray-300 p-3 rounded-md shadow-sm w-full block focus:border-yellow-500 focus:ring-yellow-500 mt-1 sm:text-sm"
        placeholder="Nombre de la etiqueta" />
    </div>
  </GenericModal>


  <DeleteConfirmationModal :show="showDeleteModal" itemName="Etiqueta" :itemToDelete="etiquetaToDelete"
    @confirmDelete="deleteEtiqueta" @close="closeDeleteModal" />

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
  TagIcon
} from '@heroicons/vue/24/solid';
import 'animate.css';

const etiquetas = ref([
  { Id: 1, Nombre: 'Urgente' },
  { Id: 2, Nombre: 'Ocio' },
  { Id: 3, Nombre: 'Trabajo' },
  { Id: 4, Nombre: 'Personal' },
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

const editEtiqueta = (etiqueta) => {
  editingEtiqueta.value = etiqueta;
  formData.value = {
    nombre: etiqueta.Nombre,
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveEtiqueta = () => {
  if (editingEtiqueta.value) {
    const index = etiquetas.value.findIndex(e => e.Id === editingEtiqueta.value.Id);
    if (index !== -1) {
      etiquetas.value[index] = {
        ...etiquetas.value[index],
        Nombre: formData.value.nombre
      };
    }
  } else {

    const newId = Math.max(0, ...etiquetas.value.map(e => e.Id)) + 1;
    etiquetas.value.push({
      Id: newId,
      Nombre: formData.value.nombre,
    });
  }
  closeModal();
};


const confirmDelete = (etiqueta) => {
  etiquetaToDelete.value = etiqueta;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  etiquetaToDelete.value = null;
};

const deleteEtiqueta = () => {
  if (etiquetaToDelete.value) {
    const index = etiquetas.value.findIndex(e => e.Id === etiquetaToDelete.value.Id);
    if (index !== -1) {
      etiquetas.value.splice(index, 1);
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
