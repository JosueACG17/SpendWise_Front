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
