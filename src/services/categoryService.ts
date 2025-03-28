import { axiosInstance, handleAxiosError } from "@/utils/Request";
import type {
  Category,
  CategoryFormData,
  CategoryResponse,
  CategoryUsageStatus,
  CategoryErrorHandlers,
  CategoryExpenseStatus
} from "@/interfaces/category";

const defaultErrorHandlers: CategoryErrorHandlers = {
  400: 'Datos inválidos',
  404: 'Categoría no encontrada',
  500: 'Error en el servidor'
};

export const addCategory = async (category: CategoryFormData): Promise<CategoryResponse> => {
  try {
    const response = await axiosInstance.post<CategoryResponse>('/categorias', category);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      ...defaultErrorHandlers,
      400: 'Datos inválidos para crear categoría'
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
      ...defaultErrorHandlers,
      404: 'No se encontraron categorías para este usuario'
    });
    throw error;
  }
};

export const hasExpenses = async (categoryId: number): Promise<boolean> => {
  try {
    const response = await axiosInstance.get<CategoryExpenseStatus>(`/categorias/hasExpenses/${categoryId}`);
    return response.data.hasExpenses;
  } catch (error) {
    handleAxiosError(error, {
      ...defaultErrorHandlers,
      404: 'No se encontró la categoría'
    });
    throw error;
  }
};

export const deleteCategoria = async (id: number): Promise<CategoryResponse> => {
  try {
    const hasExp = await hasExpenses(id);
    if (hasExp) {
      throw {
        response: {
          status: 409,
          data: { message: 'No se puede eliminar la categoría porque tiene gastos asociados' }
        }
      };
    }

    const inUse = await isCategoryInUse(id);
    if (inUse) {
      throw {
        response: {
          status: 409,
          data: { message: 'No se puede eliminar la categoría porque está en un presupuesto' }
        }
      };
    }

    const response = await axiosInstance.delete<CategoryResponse>(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      ...defaultErrorHandlers,
      409: (error as any)?.response?.data?.message || 'La categoría está en uso y no puede ser eliminada'
    });
    throw error;
  }
};

export const updateCategory = async (id: number, category: CategoryFormData): Promise<CategoryResponse> => {
  try {
    const response = await axiosInstance.put<CategoryResponse>(
      `/categorias/${id}`,
      { ...category, id }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      ...defaultErrorHandlers,
      400: 'Datos inválidos para actualizar categoría'
    });
    throw error;
  }
};

export const isCategoryInUse = async (categoryId: number): Promise<boolean> => {
  try {
    const response = await axiosInstance.get<CategoryUsageStatus>(`/categorias/isInUse/${categoryId}`);
    return response.data.inUse;
  } catch (error) {
    handleAxiosError(error, defaultErrorHandlers);
    throw error;
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await axiosInstance.get<Category>(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, defaultErrorHandlers);
    throw error;
  }
};
