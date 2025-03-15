<template>
  <NavbarComponent />

  <div class="container mx-auto mt-8 mb-8 p-8 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">

    <div class="flex flex-col items-center mb-8">
      <button class="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
        Agregar Gasto
      </button>
      <h1 class="text-4xl font-bold text-gray-800 mb-4 mt-6 animate__animated animate__fadeIn">Mis Gastos</h1>
    </div>

    <p class="text-center text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
      Aquí puedes ver tus gastos registrados.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="gasto in gastos"
        :key="gasto.id"
        class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 animate__animated animate__fadeInUp border border-gray-100"
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

<script setup>
import { ref } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import 'animate.css'; // Importar Animate.css

const gastos = ref([
  { id: 1, nombre: 'Comida', cantidad: 200, categoria: 'Alimentación', fecha: '2025-03-14', descripcion: '9 taquitos en los tarascos' },
  { id: 2, nombre: 'Transporte', cantidad: 150, categoria: 'Transporte', fecha: '2025-03-12', descripcion: 'Costo de uber crucero/americas' },
  { id: 3, nombre: 'Internet', cantidad: 500, categoria: 'Servicios', fecha: '2025-03-10', descripcion: 'Mensualidad Starlink' }
]);

// Función para obtener iconos según la categoría
const getIcon = (categoria) => {
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

<style scoped>
/* Personalización adicional */
.container {
  background-color: #f8fafc; /* Fondo más claro */
}
</style>
