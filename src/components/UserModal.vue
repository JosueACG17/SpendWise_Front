<template>
  <div v-if="isModalOpen" class="fixed inset-0 overflow-y-auto z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Fondo oscuro -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>

      <!-- Espacio invisible para alinear el modal -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <!-- Contenedor del modal -->
      <div class="inline-block w-full max-w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Contenido del modal -->
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- Ícono -->
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
              <component :is="icon" class="h-6 w-6 text-yellow-600" />
            </div>

            <!-- Título y formulario -->
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ user ? 'Editar Usuario' : 'Agregar Usuario' }}
              </h3>
              <div class="mt-4">
                <!-- Formulario -->
                <form @submit.prevent="handleSubmit">
                  <!-- Campo: Correo Electrónico -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Ingrese el correo electrónico"
                    />
                  </div>

                  <!-- Campo: Rol -->
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                    <select
                      v-model="form.role"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="" disabled selected>Seleccione un rol</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Usuario">Usuario</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones del modal -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="handleSubmit"
            class="w-full inline-flex justify-center rounded-md cursor-pointer border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Guardar
          </button>
          <button
            @click="closeModal"
            class="mt-3 w-full inline-flex justify-center rounded-md cursor-pointer border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  icon: {
    type: [Object, Function],
    default: () => null,
  },
});

// Emits
const emit = defineEmits(['close', 'save']);

// Formulario
const form = ref({
  email: '',
  role: '',
});

// Cargar datos del usuario si está en modo edición
watch(
  () => props.user,
  (user) => {
    if (user) {
      form.value = { ...user };
    } else {
      form.value = { email: '', role: '' };
    }
  },
  { immediate: true }
);

// Cerrar modal
const closeModal = () => {
  emit('close');
};

// Guardar usuario
const handleSubmit = () => {
  emit('save', form.value);
};

// Controlar el scroll del body cuando el modal está abierto
watch(
  () => props.isModalOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  },
);
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
