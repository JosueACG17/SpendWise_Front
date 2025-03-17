import { axiosInstance, handleAxiosError } from '@/utils/Request';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

export const loginUser = async (email: string, contraseña: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/Auth/login', { email, contraseña });
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      401: 'Credenciales inválidas',
    });
    throw error;
  }
};

export const registerUser = async (email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post<RegisterResponse>('/Auth/register', {
      email,
      contraseña: password,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'El correo electrónico ya está en uso o los datos son inválidos.',
    });
    throw error;
  }
};

export const validateToken = async (token: string): Promise<{ isValid: boolean; message?: string }> => {
  try {
    const response = await axiosInstance.get('/Auth/validate-token', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { isValid: response.status === 200 };
  } catch  {
    return { isValid: false, message: 'Token inválido o expirado' };
  }
};

export const logoutUser = async (token: string): Promise<void> => {
  try {
    await axiosInstance.delete('/Auth/logout', {
      data: { token },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    handleAxiosError(error, {
      415: 'Error en el formato de la solicitud',
      500: 'Error al cerrar sesión en el servidor',
    });
    throw error;
  }
};
