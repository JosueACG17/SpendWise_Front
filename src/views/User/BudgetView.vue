<template>
  <NavbarComponent />

  <div
    class="mx-auto p-7 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">

    <div class="flex flex-col items-center mb-4">
      <button @click="openAddModal"
        class="bg-gradient-to-r cursor-pointer from-yellow-500 to-yellow-600 text-white sm:px-6 sm:py-3 px-2 py-1.5 rounded-full hover:from-yellow-500 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
        Agregar Presupuesto
      </button>
      <h1 class="text-4xl text-gray-800 animate__animated animate__fadeIn font-bold mt-3 sm:mt-0">Mis Presupuestos</h1>
    </div>

    <p class="text-center text-gray-700 text-lg animate__animated animate__delay-1s animate__fadeIn mb-8">
      Gestión y visualización tus presupuestos asignados.
    </p>

    <div class="bg-white p-6 rounded-xl shadow-xl mb-8">
      <h2 class="text-2xl text-gray-800 font-bold mb-4">Resumen de Presupuestos</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3 sm:grid-cols-2">
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
      <div v-else class="bg-gray-200 h-2.5 rounded-full w-full"></div>
      <p class="text-gray-700 mt-2">
        <span v-if="totalPresupuestado > 0">
          Gastado: ${{ totalGastadoGeneral }} MXN / Asignado: ${{ totalPresupuestado }} MXN
        </span>
        <span v-else class="text-red-600">
          No hay presupuesto asignado.
        </span>
      </p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-xl">
      <h2 class="text-2xl text-gray-800 font-bold mb-6">Presupuestos por Categoría</h2>
      <div v-if="presupuestos.length > 0" class="space-y-6">
        <div v-for="presupuesto in presupuestos" :key="presupuesto.id" class="bg-gray-50 p-4 rounded-xl">
          <div v-if="presupuesto.totalGastado > presupuesto.monto"
              class="mb-3 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <p class="font-medium">¡Has excedido el presupuesto!</p>
            </div>
            <p class="mt-1 text-sm">Te has pasado en {{ formatCurrency(presupuesto.totalGastado - presupuesto.monto) }}</p>
          </div>
          <div class="flex justify-between items-center mb-3">
    <h3 class="text-xl font-semibold text-gray-800">
      {{ getCategoriaNombre(presupuesto.categoriaId) }}
    </h3>
    <p class="text-gray-700" :class="{ 'text-red-600': presupuesto.totalGastado > presupuesto.monto }">
      {{ formatCurrency(presupuesto.totalGastado) }} / {{ formatCurrency(presupuesto.monto) }}
    </p>
  </div>
  <div class="bg-gray-200 h-2.5 rounded-full w-full">
    <div class="h-2.5 rounded-full" :class="{
      'bg-gradient-to-r from-blue-400 to-blue-600': presupuesto.totalGastado <= presupuesto.monto,
      'bg-gradient-to-r from-red-400 to-red-600': presupuesto.totalGastado > presupuesto.monto
    }" :style="{ width: `${Math.min((presupuesto.totalGastado / presupuesto.monto) * 100, 100)}%` }"></div>
  </div>
  <div class="flex justify-end mt-3 space-x-2">
    <button @click="editarPresupuesto(presupuesto)"
      class="text-yellow-600 cursor-pointer hover:text-yellow-700">
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
      <Form @submit="agregarPresupuesto" :validation-schema="schema">
        <div class="mb-4 input-group">
          <Field name="categoriaId" v-slot="{ field }">
            <label class="text-gray-700 block mb-2">Categoría</label>
            <select v-bind="field"  v-model="nuevoPresupuesto.categoriaId"
              class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2" required>
              <option disabled value="">Selecciona una categoría</option>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                {{ categoria.nombre }}
              </option>
            </select>
            <ErrorMessage name="categoriaId" class="error-message" />
          </Field>
        </div>
        <div class="mb-4 imput-group">
          <Field name="monto" v-slot="{ field }">
            <label class="block text-gray-700 mb-2">Monto Asignado</label>
            <input v-bind="field"  v-model="nuevoPresupuesto.monto" type="number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ej. 1500" required />
              <ErrorMessage name="monto" class="error-message" />
          </Field>
        </div>
      </Form>
    </GenericModal>

    <DeleteConfirmationModal :show="showDeleteModal" itemName="Categoría" :itemToDelete="categoryToDelete"
      @confirmDelete="deleteCategory" @close="closeDeleteModal" />

  </div>

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GenericModal from '../../common/GenericModal.vue';
import { CurrencyDollarIcon } from '@heroicons/vue/24/solid';
import 'animate.css';
import { addBudget, deleteBudget, getBudgetsByUser, updateBudget } from '@/services/presupuestosService';
import DeleteConfirmationModal from '@/views/User/components/DeleteConfirmationModal.vue';
import { getCategories } from '@/services/categoryService';
import { getGastosPorUsuario } from '@/services/gastosService';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const schema = yup.object({
  categoriaId: yup.number()
    .required('La categoría es requerida'),
  monto: yup.number()
    .required('El monto es requerido')
    .min(1, 'El monto debe ser mayor a 0')
    .max(1000000, 'El monto no puede exceder 1,000,000')
});

const categorias = ref([]);
const presupuestos = ref([]);
const gastos = ref([]);
const isModalOpen = ref(false);
const editingCategory = ref(null);
const nuevoPresupuesto = ref({
  categoriaId: null,
  usuarioId: null,
  monto: 0,
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

// Obtener el token del localStorage y decodificarlo
const token = localStorage.getItem('token');
const decodedToken = token ? jwtDecode(token) : null;
const usuarioId = decodedToken ? decodedToken.nameid : null;

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
    console.error('Error al obtener presupuestos:', error);
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
    categoriaId: null,
    usuarioId: usuarioId,
    monto: 0,
    fechaInicio: new Date(),
    fechaFin: new Date(),
  };
  isModalOpen.value = true;
};

const agregarPresupuesto = async () => {
  try {
    if (editingCategory.value) {
      const updatedCategory = {
        id: editingCategory.value.id,
        categoriaId: nuevoPresupuesto.value.categoriaId,
        usuarioId: usuarioId,
        monto: nuevoPresupuesto.value.monto,
        fechaInicio: nuevoPresupuesto.value.fechaInicio,
        fechaFin: nuevoPresupuesto.value.fechaFin,
      };
      await updateBudget(editingCategory.value.id, updatedCategory);
    } else {
      const newCategory = {
        categoriaId: nuevoPresupuesto.value.categoriaId,
        usuarioId: usuarioId,
        monto: nuevoPresupuesto.value.monto,
        fechaInicio: nuevoPresupuesto.value.fechaInicio,
        fechaFin: nuevoPresupuesto.value.fechaFin,
      };
      await addBudget(newCategory);
    }
    closeModal();
    await cargarPresupuestos();
    calcularGastosPorPresupuesto();
  } catch (error) {
    console.error("Error al guardar el presupuesto:", error);
  }
};

const editarPresupuesto = (presupuesto) => {
  editingCategory.value = presupuesto;

  nuevoPresupuesto.value = {
    categoriaId: presupuesto.categoriaId,
    usuarioId: usuarioId,
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
      console.error("Error al eliminar el presupuesto:", error);
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
  if (!monto) return 'Aún no hay gastos';
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
<style>
.error-message {
  color: #ff5252;
  font-size: 0.85rem;
}

.input-group {
  margin-bottom: 8px;
}
</style>
