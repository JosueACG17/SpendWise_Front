import { axiosInstance, handleAxiosError } from "@/utils/Request";

interface Category {
  id: number;
  nombre: string;
  usuarioId?: number;
}

export const addCategory = async (category: Category): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>('/categorias', category);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos',
    });
    throw error;
  }
};

export const getCategories = async (usuarioId: number): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<Category[]>(`/categorias/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'No se encontraron categorías',
    });
    throw error;
  }
};

export const deleteCategoria = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete<{ message: string }>(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      404: 'Categoría no encontrada',
      500: 'Error en el servidor al eliminar la categoría',
    });
    throw error;
  }
};

export const updateCategory = async (id: number, category: Category): Promise<{ message: string }> => {
  try {
    const categoryActualizada = {
      ...category,
      id: id,
    };
    const response = await axiosInstance.put<{ message: string }>(`/categorias/${id}`, categoryActualizada);
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
