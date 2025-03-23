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
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2"
            >
              <button
                @click="$emit('edit', row)"
                class="inline-flex cursor-pointer items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                <PencilIcon class="h-4 w-4" />
              </button>
              <button
                v-if="!nonDeletableUserIds.includes(row.id)"
                @click="$emit('delete', row)"
                class="inline-flex cursor-pointer items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                <TrashIcon class="h-4 w-4" />
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
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';

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
  nonDeletableUserIds: {
    type: Array as () => number[],
    default: () => [],
  },
});

const headerMap = computed(() => ({
  'Correo Electronico': 'email',
  'Rol': 'role',
  'ID': 'id',
  'Nombre': 'name',
  'Estado': 'status',
  'Fecha': 'date',
  'Mensaje': 'Mensaje_error',
  'Ubicación del Error': 'Enlace_error',
  'Fecha del error': 'Fecha_error',
}));
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
