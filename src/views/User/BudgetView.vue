<template>
  <NavbarComponent />

  <div
    class="mx-auto p-7 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">

    <!-- Botón para abrir el modal de agregar presupuesto -->
    <div class="flex flex-col items-center mb-4">
      <button @click="openAddModal"
        class="bg-gradient-to-r cursor-pointer from-yellow-500 to-yellow-600 text-white sm:px-6 sm:py-3 px-2 py-1.5 rounded-full hover:from-yellow-500 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
        Agregar Presupuesto
      </button>
      <h1 class="text-4xl font-bold sm:mt-0 mt-3 text-gray-800 animate__animated animate__fadeIn">Mis Presupuestos</h1>
    </div>

    <p class="text-center text-lg text-gray-700 mb-8 animate__animated animate__fadeIn animate__delay-1s">
      Gestión y visualización tus presupuestos asignados.
    </p>

    <!-- Resumen de Presupuestos -->
    <div class="bg-white rounded-xl shadow-xl p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Resumen de Presupuestos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Total Asignado</p>
          <p class="text-2xl font-bold text-gray-800">${{ totalPresupuestado }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Total Gastado</p>
          <p class="text-2xl font-extrabold text-red-600">${{ totalGastadoGeneral }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Restante</p>
          <p class="text-2xl font-extrabold text-green-600">${{ totalPresupuestado - totalGastadoGeneral }} MXN</p>
        </div>
      </div>
    </div>

    <!-- Progreso General de Presupuestos -->
    <div class="bg-white rounded-xl shadow-xl p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Progreso General de Presupuestos</h2>
      <div v-if="totalPresupuestado > 0" class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="h-2.5 rounded-full" :class="{
          'bg-gradient-to-r from-blue-400 to-blue-600': totalGastadoGeneral <= totalPresupuestado,
          'bg-gradient-to-r from-red-400 to-red-600': totalGastadoGeneral > totalPresupuestado
        }" :style="{ width: `${Math.min((totalGastadoGeneral / totalPresupuestado) * 100, 100)}%` }"></div>
      </div>
      <div v-else class="w-full bg-gray-200 rounded-full h-2.5"></div>
      <p class="text-gray-700 mt-2">
        <span v-if="totalPresupuestado > 0">
          Gastado: ${{ totalGastadoGeneral }} MXN / Asignado: ${{ totalPresupuestado }} MXN
        </span>
        <span v-else class="text-red-600">
          No hay presupuesto asignado.
        </span>
      </p>
    </div>

    <!-- Presupuestos por Categoría -->
    <div class="bg-white rounded-xl shadow-xl p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Presupuestos por Categoría</h2>
      <div v-if="presupuestos.length > 0" class="space-y-6">
        <div v-for="presupuesto in presupuestos" :key="presupuesto.id" class="bg-gray-50 p-4 rounded-xl">
          <div class="flex justify-between items-center mb-3">
            <!-- <h3 class="text-xl font-semibold text-gray-800">{{ presupuesto.categoriaId }}</h3> -->
            <h3 class="text-xl font-semibold text-gray-800">
              {{ getCategoriaNombre(presupuesto.categoriaId) }}
            </h3>
            <p class="text-gray-700" :class="{ 'text-red-600': presupuesto.totalGastado > presupuesto.monto }">
              {{ formatCurrency(presupuesto.totalGastado) }} / {{ formatCurrency(presupuesto.monto) }}
            </p>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="h-2.5 rounded-full" :class="{
              'bg-gradient-to-r from-blue-400 to-blue-600': presupuesto.totalGastado <= presupuesto.monto,
              'bg-gradient-to-r from-red-400 to-red-600': presupuesto.totalGastado > presupuesto.monto
            }" :style="{ width: `${Math.min((presupuesto.totalGastado / presupuesto.monto) * 100)}%` }"></div>
          </div>
          <div class="flex justify-end mt-3 space-x-2">
            <button @click="editarPresupuesto(presupuesto)"
              class="text-yellow-600 hover:text-yellow-700 cursor-pointer">
              Editar
            </button>
            <button @click="confirmDelete(presupuesto.id)" class="text-red-600 hover:text-red-700 cursor-pointer">
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-red-600">
        No existen categorías con presupuesto asignado.
      </p>
    </div>

    <!-- Nuevo Modal para agregar presupuesto -->
    <GenericModal :show="isModalOpen" title="Agregar Presupuesto" saveButtonText="Agregar" :icon="CurrencyDollarIcon"
      @save="agregarPresupuesto" @close="isModalOpen = false">
      <form @submit.prevent="agregarPresupuesto">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Categoría</label>
          <select v-model="nuevoPresupuesto.categoria"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
            <option disabled value="">Selecciona una categoría</option>
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
              {{ categoria.nombre }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Monto Asignado</label>
          <input v-model="nuevoPresupuesto.monto" type="number"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Ej. 1500" required />
        </div>
      </form>
    </GenericModal>

    <DeleteConfirmationModal :show="showDeleteModal" itemName="Categoría" :itemToDelete="categoryToDelete"
      @confirmDelete="deleteCategory" @close="closeDeleteModal" />

  </div>

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GenericModal from './components/GenericModal.vue';
import { CurrencyDollarIcon } from '@heroicons/vue/24/solid';
import 'animate.css';
import { addBudget, deleteBudget, getBudgetsByUser, updateBudget } from '@/services/presupuestosService';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';
import { getCategories } from '@/services/categoryService';
import { getGastosPorUsuario } from '@/services/gastosService';

const categorias = ref([]);

const presupuestos = ref([]);

const gastos = ref([]);

const isModalOpen = ref(false);
const editingCategory = ref(null);
const nuevoPresupuesto = ref({
  categoriaId: 1,
  usuarioId: 1,
  monto: 1,
  fechaInicio: new Date(),
  fechaFin: new Date(),
});

const totalAsignado = computed(() => {
  return presupuestos.value.reduce((total, p) => total + p.asignado, 0);
});

const totalGastado = computed(() => {
  return presupuestos.value.reduce((total, p) => total + p.gastado, 0);
});

const totalRestante = computed(() => {
  return totalAsignado.value - totalGastado.value;
});

const usuarioId = 1;
const showDeleteModal = ref(false);
const categoryToDelete = ref(null);

const totalPresupuestado = ref(0);
const totalGastadoGeneral = ref(0);

onMounted(async () => {
  await cargarPresupuestos();
  await cargarGastos();
  await cargarCategorias();
  calcularGastosPorPresupuesto();
});

const cargarCategorias = async () => {
  try {
    categorias.value = await getCategories(usuarioId);
  } catch (error) {
    console.error('Error al obtener categorias:', error);
  }
};

const cargarPresupuestos = async () => {
  try {
    presupuestos.value = await getBudgetsByUser(usuarioId);
  } catch (error) {
    console.error('Error al obtener categorias:', error);
  }
};

const cargarGastos = async () => {
  try {
    gastos.value = await getGastosPorUsuario(usuarioId);
  } catch (error) {
    console.error('Error al obtener gastos:', error);
  }
};

const calcularGastosPorPresupuesto = () => {
  presupuestos.value = presupuestos.value.map(presupuesto => ({
    ...presupuesto,
    totalGastado: 0,
  }));

  gastos.value.forEach(gasto => {
    const presupuesto = presupuestos.value.find(p => p.categoriaId === gasto.categoriaId);
    if (presupuesto) {
      presupuesto.totalGastado += gasto.monto;
    }
  });

  totalPresupuestado.value = presupuestos.value.reduce((acc, p) => acc + p.monto, 0);
  totalGastadoGeneral.value = gastos.value.reduce((acc, g) => acc + g.monto, 0);

};

const openAddModal = () => {
  editingCategory.value = null;
  nuevoPresupuesto.value = {
    categoriaId: 1,
    usuarioId: 1,
    monto: 1,
    fechaInicio: '',
    fechaFin: '',
  };
  isModalOpen.value = true;
};

const agregarPresupuesto = async () => {
  try {
    if (editingCategory.value) {
      const updatedCategory = {
        nombre: editingCategory.value.nombre,
        usuarioId: 1,
        categoriaId: 1,
        monto: nuevoPresupuesto.value.monto,
      };
      await updateBudget(editingCategory.value.id, updatedCategory);
    } else {
      const newCategory = {
        nombre: nuevoPresupuesto.value.nombre,
        usuarioId: 1,
        categoriaId: 1,
        monto: nuevoPresupuesto.value.monto,
      };
      await addBudget(newCategory);
    }
    closeModal();
    await cargarPresupuestos();
    calcularGastosPorPresupuesto();
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
  }
};

const editarPresupuesto = (presupuesto) => {
  editingCategory.value = presupuesto;

  nuevoPresupuesto.value = {
    categoriaId: presupuesto.categoriaId,
    usuarioId: 1,
    monto: presupuesto.monto,
    fechaInicio: presupuesto.fechaInicio,
    fechaFin: presupuesto.fechaFin,
  };
  isModalOpen.value = true;
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
      await deleteBudget(categoryToDelete.value);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  }
  closeDeleteModal();
  await cargarPresupuestos();
  calcularGastosPorPresupuesto();
};

const closeModal = () => {
  isModalOpen.value = false;
};

const formatCurrency = (monto) => {
  if (!monto) return 'Monto no disponible';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(monto);
};

const getCategoriaNombre = (categoriaId) => {
  const categoria = categorias.value.find(c => c.id === categoriaId);
  return categoria ? categoria.nombre : "Sin categoría";
};

</script>
