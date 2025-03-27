<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-4">Registro de Errores</p>
      <TableComponent
        :title="'Tabla de Errores'"
        :headers="['Mensaje', 'Ubicación del Error', 'Fecha del error']"
        :rows="tableLogs"
        :showActions="false"
      />
    </main>
  </NavSidebar>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import NavSidebar from './components/NavSidebar.vue';
import TableComponent from '@/common/TableComponent.vue';
import { useErrorLogStore } from '@/stores/errorLogStore';


const errorLogStore = useErrorLogStore();
const tableLogs = computed(() =>
  errorLogStore.errorLogs.map((log) => ({
    id: log.id,
    Mensaje_error: log.mensaje_error,
    Enlace_error: log.enlace_error,
    Fecha_error: log.fecha_error,
  }))
);

onMounted(async () => {
  await errorLogStore.getErrorLogs();
});

</script>
