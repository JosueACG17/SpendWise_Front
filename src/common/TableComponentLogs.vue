<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium mb-4">{{ title }}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in headers"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th
              v-if="showActions"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, index) in rows" :key="index">
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
              {{ row[headerMap[header]] || '-' }}
            </td>
            <td
              v-if="showActions"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
              <button
                @click="$emit('delete', row)"
                class="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  headers: {
    type: Array as () => string[],
    required: true,
  },
  rows: {
    type: Array as () => any[],
    required: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
});

const headerMap = computed(() => ({
  'Mensaje': 'Mensaje_error',
  'Ubicación del Error': 'Enlace_error',
  'Fecha del error': 'Fecha_error',
}));
</script>
