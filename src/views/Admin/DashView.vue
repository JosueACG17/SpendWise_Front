<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-4">¡Bienvenido Josue!</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <CardComponent v-for="(card, index) in dashboardCards" :key="index" :card="card" />
      </div>
      <TableComponent
        :title="'Tabla de Usuarios'"
        :headers="['Correo Electronico', 'Rol']"
        :rows="tableUsers"
        :showActions="false"
      />
      <TableComponent
        class="mt-6"
        :title="'Tabla de Errores'"
        :headers="['Mensaje', 'Ubicación del Error', 'Fecha del error']"
        :rows="tableLogs"
        :showActions="false"
      />
    </main>
  </NavSidebar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import NavSidebar from './components/NavSidebar.vue';
import CardComponent from '@/common/CardComponent.vue';
import TableComponent from '@/common/TableComponent.vue';
import { UsersIcon, ShoppingCartIcon, BriefcaseIcon } from '@heroicons/vue/24/outline';
import { useErrorLogStore } from '@/stores/errorLogStore';

const dashboardCards = ref([
  { title: 'Usuarios', value: '12,361', icon: UsersIcon, bgColor: 'bg-blue-500' },
  { title: 'Ventas', value: '1,247', icon: ShoppingCartIcon, bgColor: 'bg-purple-500' },
  { title: 'Proyectos', value: '374', icon: BriefcaseIcon, bgColor: 'bg-green-500' },
]);

const tableUsers = ref([
  { email: 'usuario1@example.com', role: 'Admin' },
  { email: 'usuario2@example.com', role: 'Editor' },
  { email: 'usuario3@example.com', role: 'Usuario' },
]);

const errorLogStore = useErrorLogStore();
const tableLogs = ref([]);

onMounted(async () => {
  await errorLogStore.getErrorLogs();
  tableLogs.value = errorLogStore.errorLogs.map((log) => ({
    Mensaje: log.mensaje,
    Enlace_error: log.enlace_error,
    Fecha_error: log.fecha_error,
  }));
});
</script>
