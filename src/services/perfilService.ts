import type { Perfil } from '@/interfaces/Perfil'
import axios from 'axios'

const apiUrl = 'https://localhost:7035/api/Perfil'

export const obtenerPerfil = async (usuarioId: number): Promise<Perfil | null> => {
  try {
    const { data } = await axios.get(`${apiUrl}/${usuarioId}`)
    return data
  } catch {
    return null
  }
}

export const crearPerfil = async (formData: FormData): Promise<Perfil> => {
  const { data } = await axios.post(apiUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
