<template>
  <NavbarComponent />

  <div class="mx-auto p-7 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">

    <div class="flex flex-col items-center mb-4">
      <button class="bg-gradient-to-r cursor-pointer from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full hover:from-yellow-500 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
        Agregar Presupuesto
      </button>
      <h1 class="text-4xl font-bold text-gray-800 animate__animated animate__fadeIn">Mis Presupuestos</h1>
    </div>

    <p class="text-center text-lg text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
      Gestión y visualización tus presupuestos asignados.
    </p>


    <div class="bg-white rounded-3xl shadow-xl p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Resumen de Presupuestos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-gray-50 p-4 rounded-2xl">
          <p class="text-gray-600">Total Asignado</p>
          <p class="text-2xl font-bold text-gray-800">$5,000 MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-2xl">
          <p class="text-gray-600">Total Gastado</p>
          <p class="text-2xl font-bold text-gray-800">$2,300 MXN</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-2xl">
          <p class="text-gray-600">Restante</p>
          <p class="text-2xl font-bold text-green-600">$2,700 MXN</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl shadow-xl p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Presupuestos por Categoría</h2>
      <div class="space-y-6">
        <div v-for="presupuesto in presupuestos" :key="presupuesto.id" class="bg-gray-50 p-4 rounded-2xl">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-xl font-semibold text-gray-800">{{ presupuesto.categoria }}</h3>
            <p class="text-gray-600">{{ presupuesto.gastado }} / {{ presupuesto.asignado }} MXN</p>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full"
              :style="{ width: `${(presupuesto.gastado / presupuesto.asignado) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import 'animate.css'; 

const presupuestos = ref([
  { id: 1, categoria: 'Alimentación', asignado: 1500, gastado: 800 },
  { id: 2, categoria: 'Transporte', asignado: 1000, gastado: 600 },
  { id: 3, categoria: 'Servicios', asignado: 2000, gastado: 900 },
  { id: 4, categoria: 'Entretenimiento', asignado: 500, gastado: 300 },
]);
</script>
