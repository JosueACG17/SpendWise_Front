import { axiosInstance, handleAxiosError } from '@/utils/Request';

interface User {
  id: number;
  email: string;
  rolId: number;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<User[]>('/Usuario/listar');
    return response.data; 
  } catch (error) {
    handleAxiosError(error, {
      500: 'Error al obtener los usuarios.',
    });
    throw error;
  }
};

export const createUser = async (userData: { email: string; password: string; rolId: number }): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>('/Usuario/crear', userData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'El correo ya está en uso o los datos son inválidos.',
      500: 'Error al crear el usuario.',
    });
    throw error;
  }
};

export const updateUser = async (userId: number, userData: { email: string; password: string; rolId: number }): Promise<User> => {
  try {
    const response = await axiosInstance.put<User>(`/Usuario/actualizar/${userId}`, userData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'Datos inválidos.',
      404: 'Usuario no encontrado.',
      500: 'Error al actualizar el usuario.',
    });
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/Usuario/eliminar/${userId}`);
  } catch (error) {
    handleAxiosError(error, {
      404: 'Usuario no encontrado.',
      500: 'Error al eliminar el usuario.',
    });
    throw error;
  }
};
