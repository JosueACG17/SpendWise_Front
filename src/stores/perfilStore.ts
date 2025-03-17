import { defineStore } from 'pinia';
import { usePerfilService } from '@/services/perfilService';

export const usePerfilStore = defineStore('perfil', {
  state: () => ({
    perfil: null as any, // Aquí guardaremos los datos del perfil
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async crearPerfil(perfilData: FormData) {
      this.loading = true;
      this.error = null;

      try {
        const service = usePerfilService();
        const response = await service.crearPerfil(perfilData);
        this.perfil = response; // Guardar el perfil creado en el estado
      } catch (error: any) {
        this.error = error.message || 'Ocurrió un error interno al registrar el usuario.';
        throw error; // Relanzar el error para que el componente lo maneje
      } finally {
        this.loading = false;
      }
    },
  },
});
