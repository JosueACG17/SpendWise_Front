import { axiosInstance, handleAxiosError } from '@/utils/Request';

export interface ErrorLog {
  id: number;
  mensaje_error: string;
  enlace_error: string;
  fecha_error: string;
}

export const fetchErrorLogs = async (): Promise<ErrorLog[]> => {
  try {
    const response = await axiosInstance.get<ErrorLog[]>('/ErrorLogs');
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      500: 'Error al obtener los logs de errores',
    });
    throw error;
  }
};

export const deleteErrorLog = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/ErrorLogs/${id}`);
  } catch (error) {
    handleAxiosError(error, {
      404: 'Log de error no encontrado',
      500: 'Error al eliminar el log de error',
    });
    throw error;
  }
};

export const deleteAllErrorLogs = async (): Promise<void> => {
  try {
    await axiosInstance.delete('/ErrorLogs/all');
  } catch (error) {
    handleAxiosError(error, {
      500: 'Error al eliminar todos los logs de error',
    });
    throw error;
  }
};
