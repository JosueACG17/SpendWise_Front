<template>
  <NavSidebar>
    <main class="flex-1 overflow-auto p-6 bg-gray-100">
      <p class="text-center text-3xl font-bold mb-4">Registro de Errores</p>

      <div class="flex justify-end mb-4">
        <button
          @click="clearAllErrors"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center cursor-pointer"
        >
          <TrashIcon class="w-5 h-5 mr-2" />
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
import { onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import NavSidebar from './components/NavSidebar.vue';
import TableComponentLogs from '@/common/TableComponentLogs.vue';
import { useErrorLogStore } from '@/stores/errorLogStore';
import type { ErrorLog } from '@/interfaces/ErrorLog';
import { TrashIcon } from '@heroicons/vue/24/solid';


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

const deleteError = (error: ErrorLog) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres eliminar este error?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await errorLogStore.removeErrorLog(error.id);
        Swal.fire('¡Eliminado!', 'El error ha sido eliminado.', 'success');
      } catch  {
        Swal.fire('Error', 'No se pudo eliminar el error.', 'error');
      }
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
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await errorLogStore.removeAllErrorLogs();
        Swal.fire('¡Vaciado!', 'Todos los errores han sido eliminados.', 'success');
      } catch  {
        Swal.fire('Error', 'No se pudieron eliminar los errores.', 'error');
      }
    }
  });
};
</script>
