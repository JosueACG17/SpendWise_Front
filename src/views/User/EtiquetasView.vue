<template>
  <NavbarComponent />

  <div class="container mx-auto mt-8 mb-8 p-8 min-h-screen items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">

    <div class="flex flex-col items-center mb-8">
      <button class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full hover:from-yellow-500 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl self-end">
        Agregar Etiqueta
      </button>
      <h1 class="text-4xl font-bold text-gray-800 mb-4 mt-6 animate__animated animate__fadeIn">Etiquetas</h1>
    </div>

    <p class="text-center text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
      Aquí puedes gestionar las etiquetas para organizar tus gastos y presupuestos.
    </p>

    <div class="bg-white rounded-3xl shadow-xl p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Lista de Etiquetas</h2>
      <div class="space-y-4">
        <div v-for="etiqueta in etiquetas" :key="etiqueta.Id" class="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
          <p class="text-lg font-semibold text-gray-800">{{ etiqueta.Nombre }}</p>
          <div class="flex space-x-4">
            <button class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300">
              Editar
            </button>
            <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300">
              Eliminar
            </button>
          </div>
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

const etiquetas = ref([
  { Id: 1, Nombre: 'Urgente', UsuarioId: 1 },
  { Id: 2, Nombre: 'Ocio', UsuarioId: 1 },
  { Id: 3, Nombre: 'Trabajo', UsuarioId: 1 },
  { Id: 4, Nombre: 'Personal', UsuarioId: 1 },
]);
</script>

<style scoped>
.container {
  background-color: #f8fafc; /* Fondo más claro */
}
</style>
