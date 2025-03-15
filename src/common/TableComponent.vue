<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium mb-4">{{ title }}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="header in headers" :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, index) in rows" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ row.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ row.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {{ row.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ row.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button class="text-indigo-600 hover:text-indigo-900">{{ row.actions }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface TableRow {
  id: string | number;
  name: string;
  status: string;
  date: string;
  actions: string;
}

defineProps({
  title: {
    type: String,
    required: true
  },
  headers: {
    type: Array as () => string[],
    required: true
  },
  rows: {
    type: Array as () => TableRow[],
    required: true
  }
});
</script>   
