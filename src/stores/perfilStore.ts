import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Perfil } from '@/interfaces/Perfil';
import { obtenerPerfil, crearPerfil } from '@/services/perfilService';

export const usePerfilStore = defineStore('perfil', () => {
  const perfil = ref<Perfil | null>(null);

  // Cargar perfil desde el servidor
  const cargarPerfil = async (usuarioId: number) => {
    perfil.value = await obtenerPerfil(usuarioId);
  };

  // Registrar un nuevo perfil
  const registrarPerfil = async (formData: FormData) => {
    const nuevoPerfil = await crearPerfil(formData);
    perfil.value = nuevoPerfil;
  };

  // Limpiar perfil
  const clearPerfil = () => {
    perfil.value = null;
  };

  return {
    perfil,
    cargarPerfil,
    registrarPerfil,
    clearPerfil,
  };
});
