<template>
  <NavbarComponent />
  <div class="p-5">
    <h1 class="text-2xl sm:text-4xl font-bold mb-4 text-gray-900 text-center">Mi Perfil</h1>
    <!-- Si ya tiene perfil -->
    <div v-if="perfilStore.perfil" class="bg-white rounded-xl shadow-xl overflow-hidden">
      <div class="relative h-32 bg-gradient-to-r from-gray-800 to-gray-900">
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      <div class="relative">
        <div class="absolute -top-20 left-8">
          <div class="relative">
            <div class="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img :src="perfilStore.perfil.fotoUrl" alt="Foto de perfil" class="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
        <div class="pt-24 px-8 pb-8">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800">{{ perfilStore.perfil.nombreCompleto }}</h2>
            <h4 class="text-lg font-medium text-gray-500">{{ authStore.email }}</h4>
          </div>
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="text-sm font-semibold text-gray-500 mb-2">Teléfono</div>
                <div class="text-lg font-medium text-gray-800">{{ perfilStore.perfil.telefono }}</div>
              </div>
              <div class="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="text-sm font-semibold text-gray-500 mb-2">Género</div>
                <div class="text-lg font-medium text-gray-800">{{ perfilStore.perfil.genero }}</div>
              </div>
              <div class="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div class="text-sm font-semibold text-gray-500 mb-2">Fecha de Nacimiento</div>
                <div class="text-lg font-medium text-gray-800">{{ formatDate(perfilStore.perfil.fechaNacimiento) }}</div>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-8">
            <button @click="abrirModalEditar" class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center gap-2 px-6 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Si NO tiene perfil -->
    <div v-else class="bg-white rounded-xl shadow-xl overflow-hidden">
      <div class="relative h-32 bg-gradient-to-r from-gray-800 to-gray-900">
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      <div class="relative flex flex-col items-center pt-10 pb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Porfavor, Completa tu perfil</h2>

        <!-- Imagen por defecto o precargada -->

        <div class="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
          <img v-if="fotoUrl" :src="fotoUrl" alt="Foto de perfil" class="w-full h-full object-cover"/>
          <svg v-else class="w-20 h-20 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A12.07 12.07 0 0112 15c2.213 0 4.294.576 6.121 1.604M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <form @submit.prevent="onSubmit" class="p-8 grid gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Nombre completo</label>
            <input v-model="nombreCompleto" type="text" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"/>
            <span v-if="errors.nombreCompleto" class="text-red-500 text-sm">{{ errors.nombreCompleto}}</span>

          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Teléfono</label>
            <input v-model="telefono" type="tel" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"/>
            <span v-if="errors.telefono" class="text-red-500 text-sm">{{ errors.telefono }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <input v-model="fechaNacimiento" type="date" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"/>
            <span v-if="errors.fechaNacimiento" class="text-red-500 text-sm">{{ errors.fechaNacimiento}}</span>

          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-700">Género</label>
            <select v-model="genero" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500">
              <option disabled value="">Selecciona un género</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
            <span v-if="errors.genero" class="text-red-500 text-sm">{{ errors.genero}}</span>
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700">Foto de perfil</label>
          <input type="file" @change="handleFile" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"/>
          <span v-if="errors.foto" class="text-red-500 text-sm">{{ errors.foto}}</span>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg px-6 py-3">
            Guardar Perfil
          </button>
        </div>
      </form>
    </div>
    <!-- Modal para editar perfil -->
    <div v-if="mostrarModalEditar" class="fixed inset-0 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div class="relative bg-white rounded-xl shadow-xl p-7 w-full max-w-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Editar Perfil</h2>
        <form @submit.prevent="actualizarPerfil" class="space-y-2.5">
          <div class="flex items-center gap-x-4">
            <div v-if="nuevaFotoUrl || perfilStore.perfil.fotoUrl" class="mt-2">
              <img :src="nuevaFotoUrl || perfilStore.perfil.fotoUrl" alt="Foto de perfil actual" class="w-20 h-20 rounded-full object-cover mr-6"/>
            </div>
            <div class="w-full">
              <label class="text-sm font-medium text-gray-700">Foto de perfil</label>
              <input type="file" @change="handleFileEditar" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"/>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Nombre completo</label>
            <input v-model="editarNombreCompleto" type="text" placeholder="Ingresa tu nombre completo" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"/>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Teléfono</label>
            <input v-model="editarTelefono" type="tel" placeholder="Ingresa tu teléfono" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"/>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <input v-model="editarFechaNacimiento" type="date" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"/>
          </div>
          <div class="space-y-2 mb-5">
            <label class="text-sm font-medium text-gray-700">Género</label>
            <select v-model="editarGenero" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition">
              <option disabled value="">Selecciona un género</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="cerrarModalEditar" class="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg shadow-md transition duration-200 flex items-center gap-2 px-6 py-3">
              Cancelar
            </button>
            <button type="submit" class="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center gap-2 px-6 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
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
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const perfilSchema = yup.object({
  nombreCompleto: yup
    .string()
    .trim()
    .required('El nombre completo es requerido')
    .matches(/^[a-zA-Z0-9]+$/, 'La contraseña no debe contener caracteres especiales'),
  telefono: yup
    .string()
    .trim()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
    .min(10, 'El teléfono debe tener al menos 10 dígitos'),
  fechaNacimiento: yup
    .date()
    .required('La fecha de nacimiento es requerida')
    .max(new Date(), 'La fecha de nacimiento no puede ser futura'),
  genero: yup
    .string()
    .required('El género es requerido'),
  foto: yup
    .mixed()
    .required('La foto de perfil es requerida')
    .test('fileType', 'Solo se permiten imágenes', (value) => {
      if (!value) return true; // Si no hay archivo, no se valida
      const allowedTypes = ['image/jpeg', 'image/png'];
      return allowedTypes.includes((value as File).type);
    }),
});

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: perfilSchema,
});

const [nombreCompleto] = defineField('nombreCompleto');
const [telefono] = defineField('telefono');
const [fechaNacimiento] = defineField('fechaNacimiento');
const [genero] = defineField('genero');
const [foto] = defineField('foto');

const authStore = useAuthStore()
const perfilStore = usePerfilStore()
const usuarioId = ref<number | null>(null)
const isLoading = ref(false)
const mostrarModalEditar = ref(false)

const editarNombreCompleto = ref('')
const editarTelefono = ref('')
const editarFechaNacimiento = ref('')
const editarGenero = ref('')
const editarFoto = ref<File | null>(null)
const nuevaFotoUrl = ref<string | null>(null)
const fotoUrl = ref<string | null>(null)

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
    fotoUrl.value = URL.createObjectURL(target.files[0])
  }
}

const handleFileEditar = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    editarFoto.value = target.files[0]
    nuevaFotoUrl.value = URL.createObjectURL(target.files[0])
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (!usuarioId.value) {
    console.error('ID de usuario no disponible')
    return
  }

  const formData = new FormData()
  formData.append('nombreCompleto', values.nombreCompleto)
  formData.append('telefono', values.telefono)
  formData.append('fechaNacimiento', values.fechaNacimiento)
  formData.append('genero', values.genero)
  formData.append('foto', values.foto)
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
    console.error('Error al actualizar perfil:', error)
    Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al registrar tu perfil. Revisa los datos e intenta nuevamente.',
      icon: 'error',
    })
  }
})

const abrirModalEditar = () => {
  if (perfilStore.perfil) {
    editarNombreCompleto.value = perfilStore.perfil.nombreCompleto
    editarTelefono.value = perfilStore.perfil.telefono
    editarFechaNacimiento.value = formatDateForInput(perfilStore.perfil.fechaNacimiento)
    editarGenero.value = perfilStore.perfil.genero
    fotoUrl.value = perfilStore.perfil.fotoUrl
    nuevaFotoUrl.value = null
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
  nuevaFotoUrl.value = null
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
  } else if (fotoUrl.value) {
    const response = await fetch(fotoUrl.value)
    const blob = await response.blob()
    formData.append('foto', blob, 'foto.jpg')
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
