import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchErrorLogs, deleteErrorLog, deleteAllErrorLogs, type ErrorLog } from '@/services/errorLogService';

export const useErrorLogStore = defineStore('errorLog', () => {
  const errorLogs = ref<ErrorLog[]>([]);

  const getErrorLogs = async () => {
    try {
      const logs = await fetchErrorLogs();
      errorLogs.value = logs;
    } catch (error) {
      console.error('Error al obtener los logs:', error);
      throw error;
    }
  };

  const removeErrorLog = async (id: number) => {
    try {
      await deleteErrorLog(id);
      errorLogs.value = errorLogs.value.filter(log => log.id !== id);
    } catch (error) {
      console.error('Error al eliminar el log:', error);
      throw error;
    }
  };

  const removeAllErrorLogs = async () => {
    try {
      await deleteAllErrorLogs();
      errorLogs.value = [];
    } catch (error) {
      console.error('Error al eliminar todos los logs:', error);
      throw error;
    }
  };

  return {
    errorLogs,
    getErrorLogs,
    removeErrorLog,
    removeAllErrorLogs,
  };
});
