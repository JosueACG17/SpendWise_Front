import { axiosInstance, handleAxiosError } from "@/utils/Request";

interface Label {
  id: number;
  nombre: string;
}

export const addLabel = async (category: any): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>('/etiquetas', category);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos',
    });
    throw error;
  }
};

export const getLabels = async (usuarioId: number): Promise<any[]> => {
  try {
    const response = await axiosInstance.get<Label[]>(`/etiquetas/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'No se encontraron categorías',
    });
    throw error;
  }
};

export const deleteLabel = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/etiquetas/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'Categoría no encontrada',
      500: 'Error en el servidor al eliminar la categoría',
    });
    throw error;
  }
};

export const updateLabel = async (id: number, category: Label): Promise<{ message: string }> => {
  try {
    const categoryActualizada = {
      ...category,
      id: id,
    };
    const response = await axiosInstance.put<{ message: string }>(`/etiquetas/${id}`, categoryActualizada);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos',
      404: 'Categoría no encontrada',
      500: 'Error en el servidor al actualizar la categoría',
    });
    throw error;
  }
};
