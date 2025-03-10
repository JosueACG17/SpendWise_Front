import { axiosInstance, handleAxiosError } from '@/utils/Request';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
}

interface LogoutResponse {
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
      contraseña: password
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, {
      400: 'El correo electrónico ya está en uso o los datos son inválidos.',
    });
    throw error;
  }
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    const response = await axiosInstance.post<LogoutResponse>('/Auth/logout');
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

