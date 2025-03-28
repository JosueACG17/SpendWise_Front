<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
    <div class="mb-6 md:mb-0">
      <h1 class="text-3xl text-gray-900 font-extrabold md:text-4xl tracking-tight">
        Mis Gastos
      </h1>
      <p class="text-gray-600 text-lg max-w-3xl mt-3 animate__animated animate__fadeIn">
        Organiza tus finanzas personales para un mejor control de gastos.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row space-x-4 space-y-3 sm:space-y-0">
      <button @click="$emit('add-gasto')"
        class="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
        Agregar Gasto
      </button>
      <v-select
        label="Selecciona una categoría"
        :items="categorias"
        item-title="nombre"
        item-value="id"
        v-model="selectedCategory"
        variant="solo-filled"
        class="sm:w-60 sm:h-15"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  categorias: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: [Number, null],
    required: true
  }
});

const emit = defineEmits(['update:selected-category', 'add-gasto']);

const selectedCategory = computed({
  get: () => props.selectedCategory,
  set: (value) => emit('update:selected-category', value)
});
</script>
