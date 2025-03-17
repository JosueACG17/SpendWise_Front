<template>
  <NavbarComponent />

  <div class="mx-auto p-7 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">

    <!-- Botón para abrir el modal de agregar presupuesto -->
    <div class="flex flex-col items-center mb-4">
      <button @click="isModalOpen = true"
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
          <p class="text-2xl font-bold text-gray-800">${{ totalAsignado }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Total Gastado</p>
          <p class="text-2xl font-extrabold text-red-600">${{ totalGastado }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Restante</p>
          <p class="text-2xl font-extrabold text-green-600">${{ totalRestante }} MXN</p>
        </div>
      </div>
    </div>

    <!-- Progreso General de Presupuestos -->
    <div class="bg-white rounded-xl shadow-xl p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Progreso General de Presupuestos</h2>
      <div v-if="totalAsignado > 0" class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="h-2.5 rounded-full" :class="{
          'bg-gradient-to-r from-blue-400 to-blue-600': totalGastado <= totalAsignado,
          'bg-gradient-to-r from-red-400 to-red-600': totalGastado > totalAsignado
        }" :style="{ width: `${Math.min((totalGastado / totalAsignado) * 100, 100)}%` }"></div>
      </div>
      <div v-else class="w-full bg-gray-200 rounded-full h-2.5"></div>
      <p class="text-gray-700 mt-2">
        <span v-if="totalAsignado > 0">
          Gastado: ${{ totalGastado }} MXN / Asignado: ${{ totalAsignado }} MXN
        </span>
        <span v-else class="text-red-600">
          No hay presupuesto asignado.
        </span>
      </p>
    </div>

    <!-- Presupuestos por Categoría -->
    <div class="bg-white rounded-xl shadow-xl p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Presupuestos por Categoría</h2>
      <div class="space-y-6">
        <div v-for="presupuesto in presupuestos" :key="presupuesto.id" class="bg-gray-50 p-4 rounded-xl">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-xl font-semibold text-gray-800">{{ presupuesto.categoria }}</h3>
            <p class="text-gray-700" :class="{ 'text-red-600': presupuesto.gastado > presupuesto.asignado }">
              {{ presupuesto.gastado }} / {{ presupuesto.asignado }} MXN
            </p>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="h-2.5 rounded-full" :class="{
              'bg-gradient-to-r from-blue-400 to-blue-600': presupuesto.gastado <= presupuesto.asignado,
              'bg-gradient-to-r from-red-400 to-red-600': presupuesto.gastado > presupuesto.asignado
            }" :style="{ width: `${Math.min((presupuesto.gastado / presupuesto.asignado) * 100, 100)}%` }"></div>
          </div>
          <div class="flex justify-end mt-3 space-x-2">
            <button @click="editarPresupuesto(presupuesto)"
              class="text-yellow-600 hover:text-yellow-700 cursor-pointer">
              Editar
            </button>
            <button @click="eliminarPresupuesto(presupuesto.id)" class="text-red-600 hover:text-red-700 cursor-pointer">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar presupuesto -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Agregar Presupuesto</h2>
        <form @submit.prevent="agregarPresupuesto">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Categoría</label>
            <select v-model="nuevoPresupuesto.categoria"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
              <option disabled value="">Selecciona una categoría</option>
              <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                {{ categoria }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Monto Asignado</label>
            <input v-model="nuevoPresupuesto.asignado" type="number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ej. 1500" required />
          </div>

          <!-- Botones de acción -->
          <div class="flex justify-end">
            <button type="button" @click="isModalOpen = false"
              class="mr-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Cancelar
            </button>
            <button type="submit"
              class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import 'animate.css';

const categorias = ref([
  'Alimentación',
  'Transporte',
  'Servicios',
  'Entretenimiento',
  'Educación',
  'Salud',
  'Ropa',
  'Otros',
]);

const presupuestos = ref([
  { id: 1, categoria: 'Alimentación', asignado: 1500, gastado: 800 },
  { id: 2, categoria: 'Transporte', asignado: 1000, gastado: 600 },
  { id: 3, categoria: 'Servicios', asignado: 2000, gastado: 900 },
  { id: 4, categoria: 'Entretenimiento', asignado: 500, gastado: 300 },
]);

const isModalOpen = ref(false);
const nuevoPresupuesto = ref({
  categoria: '',
  asignado: 0,
  gastado: 0,
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

const agregarPresupuesto = () => {
  const nuevoId = presupuestos.value.length + 1;
  presupuestos.value.push({
    id: nuevoId,
    categoria: nuevoPresupuesto.value.categoria,
    asignado: nuevoPresupuesto.value.asignado,
    gastado: 0,
  });
  isModalOpen.value = false;
  nuevoPresupuesto.value = { categoria: '', asignado: 0, gastado: 0 };
};

const editarPresupuesto = (presupuesto) => {
  console.log('Editar:', presupuesto);
};

const eliminarPresupuesto = (id) => {
  presupuestos.value = presupuestos.value.filter(p => p.id !== id);
};
</script>
