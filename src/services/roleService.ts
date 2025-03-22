import { axiosInstance, handleAxiosError } from '@/utils/Request';

interface Role {
  id: number;
  nombre: string;
}

export const fetchRoles = async (): Promise<Role[]> => {
  try {
    const response = await axiosInstance.get<Role[]>('/Rol/listar');
    return response.data; // Devuelve directamente el array de roles
  } catch (error) {
    handleAxiosError(error, {
      500: 'Error al obtener los roles.',
    });
    throw error;
  }
};
