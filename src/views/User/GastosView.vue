<template>
  <NavbarComponent />

  <div class=" mx-auto p-8 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">

    <div class="flex flex-col items-center ">
      <button class="bg-gradient-to-r cursor-pointer from-yellow-500 to-yellow-600 text-white sm:px-6 sm:py-3 px-2 py-1.5 rounded-full hover:from-yellow-500 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
        Agregar Gasto
      </button>
    </div>
    <h1 class="text-center text-4xl font-bold text-gray-800 mb-4 mt-5 sm:mt-0  animate__animated animate__fadeIn">Mis Gastos</h1>
    <p class="text-center text-lg text-gray-700 mb-8 animate__animated animate__fadeIn animate__delay-1s">
      Aquí puedes ver tus gastos registrados.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="gasto in gastos"
        :key="gasto.id"
        class="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 animate__animated animate__fadeInUp border border-gray-100"
      >
        <div class="p-6 flex items-center justify-center">
          <div class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
            <span class="text-white text-2xl">
              {{ getIcon(gasto.categoria) }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">{{ gasto.nombre }}</h2>
          <div class="space-y-3">
            <p class="text-gray-600 flex items-center">
              <span class="mr-2">💰</span>
              <strong>Monto:</strong> {{ gasto.cantidad }} MXN
            </p>
            <p class="text-gray-600 flex items-center">
              <span class="mr-2">🏷️</span>
              <strong>Categoría:</strong> {{ gasto.categoria }}
            </p>
            <p class="text-gray-600 flex items-center">
              <span class="mr-2">📅</span>
              <strong>Fecha:</strong> {{ gasto.fecha }}
            </p>
            <p class="text-gray-600 flex items-center">
              <span class="mr-2">📝</span>
              <strong>Descripción:</strong> {{ gasto.descripcion }}
            </p>
          </div>
        </div>

        <div class="bg-gray-100 p-4 text-center rounded-b-3xl">
          <button class="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-full hover:from-gray-800 hover:to-gray-950 transition-all duration-300 shadow-md hover:shadow-lg">
            Detalles
          </button>
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

const gastos = ref([
  { id: 1, nombre: 'Comida', cantidad: 200, categoria: 'Alimentación', fecha: '2025-03-14', descripcion: '9 taquitos en los tarascos' },
  { id: 2, nombre: 'Transporte', cantidad: 150, categoria: 'Transporte', fecha: '2025-03-12', descripcion: 'Costo de uber crucero/americas' },
  { id: 3, nombre: 'Internet', cantidad: 500, categoria: 'Servicios', fecha: '2025-03-10', descripcion: 'Mensualidad Starlink' }
]);

const getIcon = (categoria:string) => {
  switch (categoria) {
    case 'Alimentación':
      return '🍔';
    case 'Transporte':
      return '🚗';
    case 'Servicios':
      return '🌐';
    default:
      return '💳';
  }
};
</script>
