<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-6">¡Bienvenido!</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
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
import { ref, onMounted, computed } from 'vue';
import NavSidebar from './components/NavSidebar.vue';
import CardComponent from '@/common/CardComponent.vue';
import TableComponent from '@/common/TableComponent.vue';
import { UsersIcon, ExclamationTriangleIcon} from '@heroicons/vue/24/outline';
import { useErrorLogStore } from '@/stores/errorLogStore';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const errorLogStore = useErrorLogStore();

const dashboardCards = ref([
  { title: 'Usuarios', value: '0', icon: UsersIcon, bgColor: 'bg-blue-500' },
  { title: 'Errores Encontrados', value: '0', icon: ExclamationTriangleIcon, bgColor: 'bg-red-500' },
]);

const tableLogs = ref([]);
const tableUsers = computed(() => {
  const users = userStore.users.map((user) => ({
    id: user.id,
    email: user.email,
    role: user.rolNombre || 'Sin rol',
  }));
  return users;
});

onMounted(async () => {
  await userStore.getUsers();
  await errorLogStore.getErrorLogs();

  dashboardCards.value[0].value = userStore.users.length.toString();
  dashboardCards.value[1].value = errorLogStore.errorLogs.length.toString();

  tableLogs.value = errorLogStore.errorLogs.map((log) => ({
    Mensaje_error: log.mensaje_error,
    Enlace_error: log.enlace_error,
    Fecha_error: log.fecha_error,
  }));
});
</script>
