<template>
  <div>
    <NavbarComponent />
    <div class="mx-auto p-8 min-h-screen items-center justify-center rounded-3xl bg-white animate__animated animate__fadeIn ">
      <GastosHeader
        @add-gasto="openAddModal"
        :categorias="categorias"
        v-model:selected-category="selectedId"
      />

      <GastosTable
      @add="openAddModal"
        :gastos="gastosConCategoria"
        :categorias="categorias"
        @edit="editGasto"
        @delete="solicitarEliminarGasto"
      />

      <GastosModal
        v-model="dialog"
        :gasto="editingGasto"
        :categorias="categorias"
        :presupuestos="presupuestos"
        @submit="handleSubmit"
      />

      <DeleteConfirmationModal
        :show="showDeleteModal"
        itemName="Gasto"
        :itemToDelete="gastoToDelete"
        @confirmDelete="confirmDeleteGasto"
        @close="closeDeleteModal"
      />
    </div>
    <FooterComponent />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GastosHeader from '@/views/User/components/BillsHeader.vue';
import GastosTable from '@/views/User/components/BillsTable.vue';
import GastosModal from '@/views/User/components/BillsModal.vue';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';
import { useGastos } from '@/composables/UseGastos';
import { useCategorias } from '@/composables/useCategorias';
import Swal from 'sweetalert2';

interface Gasto {
  id: number;
  monto: number;
  categoriaId: number;
  fecha: string;
  descripcion: string;
  nombreCategoria?: string;
}

const token = localStorage.getItem('token');
const usuarioId = token ? jwtDecode(token).nameid : null;

const {
  categorias,
  presupuestos,
  cargarCategorias,
  cargarPresupuestos
} = useCategorias(usuarioId);

const {
  filteredGastos,
  selectedId,
  dialog,
  editingGasto,
  showDeleteModal,
  gastoToDelete,
  cargarGastos,
  editGasto,
  handleSubmit,
  solicitarEliminarGasto,
  confirmDeleteGasto,
  closeDeleteModal
} = useGastos(usuarioId);

const openAddModal = () => {
  if (categorias.value.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No hay categorías disponibles',
      text: 'Por favor, crea una categoría antes de agregar un gasto.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#f59e0b',
    });
    return;
  }

  editingGasto.value = null;
  dialog.value = true;
};

const gastosConCategoria = computed<Gasto[]>(() => {
  return filteredGastos.value.map(gasto => ({
    ...gasto,
    nombreCategoria: categorias.value.find(c => c.id === gasto.categoriaId)?.nombre || 'Sin categoría'
  }));
});

onMounted(async () => {
  try {
    await Promise.all([
      cargarCategorias(),
      cargarPresupuestos(),
      cargarGastos()
    ]);
  } catch (error) {
    console.error('Error al cargar datos iniciales:', error);
  }
});
</script>
