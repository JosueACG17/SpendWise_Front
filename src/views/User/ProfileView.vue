<template>
  <div class="container mx-auto p-3 sm:p-2 ">
    <div class="bg-white flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6">
      <div class="w-60 h-60 overflow-hidden flex-shrink-0 mt-0 sm:mt-10">
        <img class="w-full h-full object-cover" :src="currentPhoto" alt="Foto de perfil" />
      </div>
      <div class="flex flex-col w-full">
        <div class="text-center md:text-left mb-4">
          <h1 class="text-gray-900 font-bold text-2xl sm:text-3xl leading-8">{{ perfil.NombreCompleto }}</h1>
          <h3 class="text-gray-600 font-lg text-semibold leading-7">{{ perfil.email }}</h3>
        </div>
        <hr class="text-gray-400 my-3" />
        <div class="mt-5">
          <div class="flex items-center space-x-1 font-semibold text-gray-900">
            <span class="text-yellow-500 mb-2">
              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span class="tracking-wide mb-2 sm:text-lg font-bold">Mi Información Personal</span>
          </div>
          <div class="text-gray-700">
            <div class="grid  text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold sm:text-base">Nombre Completo</div>
                <div class="px-4 py-2 sm:text-base">{{ perfil.NombreCompleto }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold sm:text-base">Género</div>
                <div class="px-4 py-2 sm:text-base">{{ perfil.Genero }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold sm:text-base">Número Telefónico</div>
                <div class="px-4 py-2 sm:text-base">{{ perfil.Telefono }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold sm:text-base">Fecha de Nacimiento</div>
                <div class="px-4 py-2 sm:text-base">{{ perfil.FechaNacimiento }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="editarPerfil"
            class="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  perfil: {
    type: Object,
    required: true,
  },
});

const currentPhoto = ref(props.perfil.FotoUrl || "https://via.placeholder.com/150");

const editarPerfil = () => {
  // Emitir un evento para cambiar a la vista de edición
  emit('editar');
};

const emit = defineEmits(['editar']);
</script>
