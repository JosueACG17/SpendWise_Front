export interface Perfil {
  usuarioId: number
  nombreCompleto: string
  telefono: string
  fechaNacimiento: string
  genero: string
  fotoUrl: string
}

export interface PerfilForm {
  usuarioId: number
  nombreCompleto: string
  telefono: string
  fechaNacimiento: string
  genero: string
  foto: File
}
