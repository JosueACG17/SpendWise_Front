import { axiosInstance, handleAxiosError } from '@/utils/Request';

interface Gasto {
  usuarioId: number;
  monto: number;
  categoriaId: number;
  fecha: Date;
  descripcion: string;
}

export const addGasto = async (gasto: Gasto): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>('/gastos', gasto);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos',
    });
    throw error;
  }
};

export const getGastosPorUsuario = async (usuarioId: number): Promise<Gasto[]> => {
  try {
    const response = await axiosInstance.get<Gasto[]>(`/gastos/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'No se encontraron gastos para este usuario',
    });
    throw error;
  }
};
