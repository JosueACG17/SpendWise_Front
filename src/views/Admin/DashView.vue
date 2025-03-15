<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-4">¡Bienvenido Josue!</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <CardComponent v-for="(card, index) in dashboardCards" :key="index" :card="card" />
      </div>
      <TableComponent :title="'Tabla de Datos'" :headers="tableHeaders" :rows="tableRows" />
    </main>
  </NavSidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavSidebar from './components/NavSidebar.vue';
import CardComponent from '@/common/CardComponent.vue';
import TableComponent from '@/common/TableComponent.vue';
import { UsersIcon, ShoppingCartIcon, BriefcaseIcon } from '@heroicons/vue/24/outline';

const dashboardCards = ref([
  { title: 'Usuarios', value: '12,361', icon: UsersIcon, bgColor: 'bg-blue-500' },
  { title: 'Ventas', value: '1,247', icon: ShoppingCartIcon, bgColor: 'bg-purple-500' },
  { title: 'Proyectos', value: '374', icon: BriefcaseIcon, bgColor: 'bg-green-500' },
]);

const tableHeaders = ['ID', 'Nombre', 'Estado', 'Fecha', 'Acciones'];
const tableRows = ref([
  { id: '#1001', name: 'Usuario 1', status: 'Activo', date: new Date().toLocaleDateString(), actions: 'Editar' },
  { id: '#1002', name: 'Usuario 2', status: 'Activo', date: new Date().toLocaleDateString(), actions: 'Editar' },
  { id: '#1003', name: 'Usuario 3', status: 'Activo', date: new Date().toLocaleDateString(), actions: 'Editar' },
]);
</script>
