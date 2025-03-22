import { axiosInstance, handleAxiosError } from "@/utils/Request";

interface Gasto {
  usuarioId: number;
  monto: number;
  categoriaId: number;
  fecha: Date;
  descripcion: string;
}

export const addGasto = async (gasto: Gasto): Promise<{ message: string }> => {
  try {
    console.log(gasto);
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

export const deleteGasto = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/gastos/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'Gasto no encontrado',
      500: 'Error en el servidor al eliminar el gasto',
    });
    throw error;
  }
};

export const updateGasto = async (id: number, gasto: any): Promise<{ message: string }> => {
  try {
    const gastoActualizado = {
      ...gasto,
      id: id,
      monto: Number(gasto.monto) || 0,
    };
    console.log(gastoActualizado);

    const response = await axiosInstance.put<{ message: string }>(`/gastos/${id}`, gastoActualizado);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos',
      404: 'Gasto no encontrado',
      500: 'Error en el servidor al actualizar el gasto',
    });
    throw error;
  }
};

