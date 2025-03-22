import { axiosInstance, handleAxiosError } from "@/utils/Request";

// Interfaz para el modelo de presupuesto
interface Budget {
  id?: number;
  usuarioId: number;
  categoriaId: number;
  monto: number;
  fechaInicio: string;
  fechaFin: string;
}

export const addBudget = async (budget: Budget): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>('/presupuestos', budget);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos al crear presupuesto',
    });
    throw error;
  }
};

export const getBudgetsByUser = async (usuarioId: number): Promise<Budget[]> => {
  try {
    const response = await axiosInstance.get<Budget[]>(`/presupuestos/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'No se encontraron presupuestos para este usuario',
    });
    throw error;
  }
};

export const deleteBudget = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/presupuestos/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'Presupuesto no encontrado',
      500: 'Error en el servidor al eliminar el presupuesto',
    });
    throw error;
  }
};

export const updateBudget = async (id: number, budget: Budget): Promise<{ message: string }> => {
  try {
    const updatedBudget = {
      ...budget,
      id,
      monto: Number(budget.monto) || 0,
    };

    const response = await axiosInstance.put<{ message: string }>(`/presupuestos/${id}`, updatedBudget);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos al actualizar presupuesto',
      404: 'Presupuesto no encontrado',
      500: 'Error en el servidor al actualizar el presupuesto',
    });
    throw error;
  }
};
