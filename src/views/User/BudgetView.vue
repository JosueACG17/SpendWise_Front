<template>
  <NavbarComponent />

  <div
    class="bg-gradient-to-br justify-center p-7 rounded-3xl from-gray-50 items-center min-h-screen mx-auto to-gray-100">

    <div class="flex flex-col items-center mb-4">
      <button @click="isModalOpen = true"
        class="bg-gradient-to-r rounded-full shadow-lg text-white cursor-pointer duration-300 from-yellow-500 hover:from-yellow-500 hover:shadow-xl hover:to-yellow-800 px-2 py-1.5 self-end sm:px-6 sm:py-3 to-yellow-600 transition-all">
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
          <p class="text-2xl text-gray-800 font-bold">${{ totalAsignado }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Total Gastado</p>
          <p class="text-2xl text-red-600 font-extrabold">${{ totalGastado }} MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl">
          <p class="text-gray-700">Restante</p>
          <p class="text-2xl text-green-600 font-extrabold">${{ totalRestante }} MXN</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-xl mb-8">
      <h2 class="text-2xl text-gray-800 font-bold mb-6">Progreso General de Presupuestos</h2>
      <div v-if="totalAsignado > 0" class="bg-gray-200 h-2.5 rounded-full w-full">
        <div class="h-2.5 rounded-full" :class="{
          'bg-gradient-to-r from-blue-400 to-blue-600': totalGastado <= totalAsignado,
          'bg-gradient-to-r from-red-400 to-red-600': totalGastado > totalAsignado
        }" :style="{ width: `${Math.min((totalGastado / totalAsignado) * 100, 100)}%` }"></div>
      </div>
      <div v-else class="bg-gray-200 h-2.5 rounded-full w-full"></div>
      <p class="text-gray-700 mt-2">
        <span v-if="totalAsignado > 0">
          Gastado: ${{ totalGastado }} MXN / Asignado: ${{ totalAsignado }} MXN
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
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-gray-800 text-xl font-semibold">{{ presupuesto.categoria }}</h3>
            <p class="text-gray-700" :class="{ 'text-red-600': presupuesto.gastado > presupuesto.asignado }">
              {{ presupuesto.gastado }} / {{ presupuesto.asignado }} MXN
            </p>
          </div>
          <div class="bg-gray-200 h-2.5 rounded-full w-full">
            <div class="h-2.5 rounded-full" :class="{
              'bg-gradient-to-r from-blue-400 to-blue-600': presupuesto.gastado <= presupuesto.asignado,
              'bg-gradient-to-r from-red-400 to-red-600': presupuesto.gastado > presupuesto.asignado
            }" :style="{ width: `${Math.min((presupuesto.gastado / presupuesto.asignado) * 100)}%` }"></div>
          </div>
          <div class="flex justify-end mt-3 space-x-2">
            <button
              class="text-yellow-600 cursor-pointer hover:text-yellow-700">
              Editar
            </button>
            <button @click="eliminarPresupuesto(presupuesto.id)" class="text-red-600 cursor-pointer hover:text-red-700">
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-red-600">
        No existen categorías con presupuesto asignado.
      </p>
    </div>

    <GenericModal :show="isModalOpen" title="Agregar Presupuesto" saveButtonText="Agregar" :icon="CurrencyDollarIcon"
      @save="agregarPresupuesto" @close="isModalOpen = false">
      <form @submit.prevent="agregarPresupuesto">
        <div class="mb-4">
          <label class="text-gray-700 block mb-2">Categoría</label>
          <select v-model="nuevoPresupuesto.categoria"
            class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2" required>
            <option disabled value="">Selecciona una categoría</option>
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
              {{ categoria }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="text-gray-700 block mb-2">Monto Asignado</label>
          <input v-model="nuevoPresupuesto.asignado" type="number"
            class="border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2"
            placeholder="Ej. 1500" required />
        </div>
      </form>
    </GenericModal>

  </div>

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import GenericModal from '../../common/GenericModal.vue';
import { CurrencyDollarIcon } from '@heroicons/vue/24/solid';
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

const eliminarPresupuesto = (id:number) => {
  presupuestos.value = presupuestos.value.filter(p => p.id !== id);
};
</script>
