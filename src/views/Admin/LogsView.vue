<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-4">Registro de Errores</p>

      <div class="flex justify-end mb-4">
        <button
          @click="clearAllErrors"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Vaciar Todo
        </button>
      </div>

      <TableComponentLogs
        :title="'Tabla de Errores'"
        :headers="['Mensaje', 'Ubicación del Error', 'Fecha del error']"
        :rows="tableLogs"
        :showActions="true"
        @delete="deleteError"
      />
    </main>
  </NavSidebar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import NavSidebar from './components/NavSidebar.vue';
import TableComponentLogs from '@/common/TableComponentLogs.vue';
import { useErrorLogStore } from '@/stores/errorLogStore';

const errorLogStore = useErrorLogStore();
const tableLogs = ref([]);

onMounted(async () => {
  await errorLogStore.getErrorLogs();
  tableLogs.value = errorLogStore.errorLogs.map((log) => ({
    id: log.id,
    Mensaje_error: log.mensaje,
    Enlace_error: log.enlace_error,
    Fecha_error: log.fecha_error,
  }));
});

const deleteError = (error) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres eliminar este error?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
  }).then((result) => {
    if (result.isConfirmed) {
      tableLogs.value = tableLogs.value.filter((log) => log.id !== error.id);
      Swal.fire('¡Eliminado!', 'El error ha sido eliminado.', 'success');
    }
  });
};

const clearAllErrors = () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres eliminar todos los errores?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar todo',
  }).then((result) => {
    if (result.isConfirmed) {
      tableLogs.value = [];
      Swal.fire('¡Vaciado!', 'Todos los errores han sido eliminados.', 'success');
    }
  });
};
</script>
