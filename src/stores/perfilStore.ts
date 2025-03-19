import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Perfil } from '@/interfaces/Perfil'
import { obtenerPerfil, crearPerfil } from '@/services/perfilService'

export const usePerfilStore = defineStore('perfil', () => {
  const perfil = ref<Perfil | null>(null)

  const cargarPerfil = async (usuarioId: number) => {
    perfil.value = await obtenerPerfil(usuarioId)
  }

  const registrarPerfil = async (formData: FormData) => {
    const nuevoPerfil = await crearPerfil(formData)
    perfil.value = nuevoPerfil
  }

  const clearPerfil = () => {
    perfil.value = null
  }

  return {
    perfil,
    cargarPerfil,
    registrarPerfil,
    clearPerfil
  }
})
