<template>
  <NavbarComponent />
  <div class="p-4 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-gray-900">Mi Perfil</h1>
    <!-- Si ya tiene perfil -->
    <div v-if="perfilStore.perfil" class="bg-white flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6">
      <div class="w-32 h-32 overflow-hidden flex-shrink-0 rounded-full mb-4">
        <img :src="perfilStore.perfil.fotoUrl" class="w-full h-full object-cover" alt="Foto de perfil" />
      </div>
      <div class="flex flex-col w-full">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">{{ perfilStore.perfil.nombreCompleto }}</h2>
        <h4 class="text-xl sm:text-2xl font-semibold text-gray-400 mb-3">{{ authStore.email }}</h4>
        <div class="grid text-sm text-gray-700 mb-4">
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold sm:text-base">Teléfono</div>
            <div class="px-4 py-2 sm:text-base">{{ perfilStore.perfil.telefono }}</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold sm:text-base">Género</div>
            <div class="px-4 py-2 sm:text-base">{{ perfilStore.perfil.genero }}</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold sm:text-base">Fecha de Nacimiento</div>
            <div class="px-4 py-2 sm:text-base">{{ formatDate(perfilStore.perfil.fechaNacimiento) }}</div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="abrirModalEditar"
            class="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
    <!-- Si NO tiene perfil -->
    <form v-else @submit.prevent="handleSubmit" class="grid gap-4">
      <input v-model="nombreCompleto" type="text" placeholder="Nombre completo" required class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
      <input v-model="telefono" type="tel" placeholder="Teléfono" required class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
      <input v-model="fechaNacimiento" type="date" required class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
      <select v-model="genero" required class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
        <option disabled value="">Selecciona un género</option>
        <option>Masculino</option>
        <option>Femenino</option>
        <option>Otro</option>
      </select>
      <input type="file" @change="handleFile" required class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
      <button type="submit" class="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 cursor-pointer">
        Guardar Perfil
      </button>
    </form>

    <!-- Modal para editar perfil -->
    <div v-if="mostrarModalEditar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-gray-900">Editar Perfil</h2>
        <form @submit.prevent="actualizarPerfil">
          <input v-model="editarNombreCompleto" type="text" placeholder="Nombre completo" required class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
          <input v-model="editarTelefono" type="tel" placeholder="Teléfono" required class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
          <input v-model="editarFechaNacimiento" type="date" required class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
          <select v-model="editarGenero" required class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option disabled value="">Selecciona un género</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Otro</option>
          </select>
          <input type="file" @change="handleFileEditar" class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="cerrarModalEditar" class="bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 cursor-pointer">
              Cancelar
            </button>
            <button type="submit" class="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 cursor-pointer">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <LoadingScreen :show="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePerfilStore } from '@/stores/perfilStore'
import { useAuthStore } from '@/stores/authStore'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import LoadingScreen from '@/components/LoadingScreen.vue'

const authStore = useAuthStore()
const perfilStore = usePerfilStore()
const usuarioId = ref<number | null>(null)
const isLoading = ref(false)
const mostrarModalEditar = ref(false)

// Datos del formulario de creación
const nombreCompleto = ref('')
const telefono = ref('')
const fechaNacimiento = ref('')
const genero = ref('')
const foto = ref<File | null>(null)

// Datos del formulario de edición
const editarNombreCompleto = ref('')
const editarTelefono = ref('')
const editarFechaNacimiento = ref('')
const editarGenero = ref('')
const editarFoto = ref<File | null>(null)

onMounted(() => {
  if (authStore.isAuthenticated) {
    const token = authStore.token
    if (token) {
      try {
        const decodedToken = jwtDecode<{ nameid: string }>(token)
        usuarioId.value = parseInt(decodedToken.nameid)
        perfilStore.cargarPerfil(usuarioId.value)
      } catch (error) {
        console.error('Error al decodificar el token:', error)
      }
    }
  }
})

const handleFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    foto.value = target.files[0]
  }
}

const handleFileEditar = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    editarFoto.value = target.files[0]
  }
}

const handleSubmit = async () => {
  if (!usuarioId.value) {
    console.error('ID de usuario no disponible')
    return
  }

  const formData = new FormData()
  formData.append('nombreCompleto', nombreCompleto.value)
  formData.append('telefono', telefono.value)
  formData.append('fechaNacimiento', fechaNacimiento.value)
  formData.append('genero', genero.value)
  formData.append('foto', foto.value as Blob)
  formData.append('usuarioId', usuarioId.value.toString())

  try {
    isLoading.value = true
    await perfilStore.registrarPerfil(formData)
    isLoading.value = false
    Swal.fire({
      title: '¡Perfil creado!',
      text: 'Tu perfil ha sido creado exitosamente.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    })
    await perfilStore.cargarPerfil(usuarioId.value)
  } catch (error) {
    isLoading.value = false
    console.error('Error al registrar perfil:', error)
    alert('Ocurrió un error al registrar tu perfil. Revisa los datos e intenta nuevamente.')
  }
}

const abrirModalEditar = () => {
  if (perfilStore.perfil) {
    editarNombreCompleto.value = perfilStore.perfil.nombreCompleto
    editarTelefono.value = perfilStore.perfil.telefono
    editarFechaNacimiento.value = formatDateForInput(perfilStore.perfil.fechaNacimiento)
    editarGenero.value = perfilStore.perfil.genero
    mostrarModalEditar.value = true
  }
}

const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const cerrarModalEditar = () => {
  mostrarModalEditar.value = false
}

const actualizarPerfil = async () => {
  if (!usuarioId.value || !perfilStore.perfil) {
    console.error('ID de usuario o perfil no disponible')
    return
  }

  const formData = new FormData()
  formData.append('nombreCompleto', editarNombreCompleto.value)
  formData.append('telefono', editarTelefono.value)
  formData.append('fechaNacimiento', editarFechaNacimiento.value)
  formData.append('genero', editarGenero.value)
  if (editarFoto.value) {
    formData.append('foto', editarFoto.value)
  }

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    isLoading.value = true
    await perfilStore.editarPerfilPorUsuario(perfilStore.perfil.usuarioId, formData)
    isLoading.value = false
    Swal.fire({
      title: '¡Perfil actualizado!',
      text: 'Tu perfil ha sido actualizado exitosamente.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    })
    cerrarModalEditar()
    await perfilStore.cargarPerfil(usuarioId.value)
  } catch (error) {
    isLoading.value = false
    console.error('Error al actualizar perfil:', error)
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al actualizar tu perfil. Revisa los datos e intenta nuevamente.',
      icon: 'error',
    })
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('es-ES', options)
}
</script>
