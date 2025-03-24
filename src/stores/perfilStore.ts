import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Perfil } from '@/interfaces/Perfil';
import { obtenerPerfil, crearPerfil, actualizarPerfilPorUsuario } from '@/services/perfilService';

export const usePerfilStore = defineStore('perfil', () => {
  const perfil = ref<Perfil | null>(null);

  const cargarPerfil = async (usuarioId: number) => {
    perfil.value = await obtenerPerfil(usuarioId);
  };

  const registrarPerfil = async (formData: FormData) => {
    const nuevoPerfil = await crearPerfil(formData);
    perfil.value = nuevoPerfil;
  };

  const editarPerfilPorUsuario = async (usuarioId: number, formData: FormData) => {
    const perfilActualizado = await actualizarPerfilPorUsuario(usuarioId, formData);
    perfil.value = perfilActualizado;
    return perfilActualizado;
  };

  const clearPerfil = () => {
    perfil.value = null;
  };

  return {
    perfil,
    cargarPerfil,
    registrarPerfil,
    editarPerfilPorUsuario,
    clearPerfil
  };
});
