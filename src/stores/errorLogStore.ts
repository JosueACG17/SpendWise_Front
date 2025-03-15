import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchErrorLogs, type ErrorLog } from '@/services/errorlogService';

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

  return {
    errorLogs,
    getErrorLogs,
  };
});
