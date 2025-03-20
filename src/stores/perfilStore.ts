import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Perfil } from '@/interfaces/Perfil';
import { obtenerPerfil, crearPerfil } from '@/services/perfilService';

export const usePerfilStore = defineStore('perfil', () => {
  const perfil = ref<Perfil | null>(null);

  // Cargar perfil desde el servidor y almacenar en localStorage
  const cargarPerfil = async (usuarioId: number) => {
    perfil.value = await obtenerPerfil(usuarioId);
    if (perfil.value) {
      guardarPerfilEnLocalStorage(perfil.value);
    }
  };

  // Registrar un nuevo perfil y almacenar en localStorage
  const registrarPerfil = async (formData: FormData) => {
    const nuevoPerfil = await crearPerfil(formData);
    perfil.value = nuevoPerfil;
    if (nuevoPerfil) {
      guardarPerfilEnLocalStorage(nuevoPerfil);
    }
  };

  // Cargar perfil desde localStorage
  const cargarPerfilDesdeLocalStorage = () => {
    const storedPerfil = localStorage.getItem('perfil');
    if (storedPerfil) {
      perfil.value = JSON.parse(storedPerfil) as Perfil;
    }
  };

  // Guardar perfil en localStorage
  const guardarPerfilEnLocalStorage = (perfilData: Perfil) => {
    localStorage.setItem('perfil', JSON.stringify(perfilData));
  };

  // Limpiar perfil y localStorage
  const clearPerfil = () => {
    perfil.value = null;
    localStorage.removeItem('perfil');
  };

  return {
    perfil,
    cargarPerfil,
    registrarPerfil,
    cargarPerfilDesdeLocalStorage,
    clearPerfil,
  };
});
