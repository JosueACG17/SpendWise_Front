<template>
  <NavbarComponent />
  <h2 class="text-2xl font-bold text-gray-900 sm:text-4xl text-center mt-4 mb-3">Mi perfil</h2>
  <div class="container mx-auto p-3 sm:p-2 ">
    <div class="bg-white flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6">
      <div class="w-60 h-60 overflow-hidden flex-shrink-0 mt-0 sm:mt-10">
        <img class="w-full h-full object-cover" :src="currentPhoto" alt="Foto de perfil" />
      </div>
      <div class="flex flex-col w-full">
        <div class="text-center md:text-left mb-4">
          <h1 class="text-gray-900 font-bold text-2xl sm:text-3xl leading-8">Josue Chan</h1>
          <h3 class="text-gray-600 font-lg text-semibold leading-7">cgjosue17@gmail.com</h3>
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
                <div class="px-4 py-2 sm:text-base">Josue Chan Gutierrez</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold sm:text-base">Género</div>
                <div class="px-4 py-2 sm:text-base">Masculino</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold sm:text-base">Número Telefónico</div>
                <div class="px-4 py-2 sm:text-base">9984847064</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold sm:text-base">Birthday</div>
                <div class="px-4 py-2 sm:text-base">Feb 06, 1998</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="openModal"
            class="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-full max-w-2xl">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Editar Perfil</h3>

      <div class="flex items-center space-x-6 mb-6">
        <div class="w-24 h-24 overflow-hidden">
          <img
            class="w-full h-full object-cover rounded-full"
            :src="currentPhoto"
            alt="Foto de perfil actual"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Cambiar Foto de Perfil</label>
          <input
            type="file"
            @change="handleFileUpload"
            class="w-full p-2 border border-gray-300 rounded-lg"
            accept="image/*"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Nombre Completo</label>
          <input
            v-model="formData.fullName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Correo Electrónico</label>
          <input
            v-model="formData.email"
            type="email"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Género</label>
          <select
            v-model="formData.gender"
            class="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Número Telefónico</label>
          <input
            v-model="formData.phone"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Fecha de Nacimiento</label>
          <input
            v-model="formData.birthday"
            type="date"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div class="flex justify-end mt-6 space-x-4">
        <button
          @click="closeModal"
          class="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          @click="saveChanges"
          class="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300  cursor-pointer"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';

const isModalOpen = ref(false);

const currentPhoto = ref(
  "https://media.licdn.com/dms/image/v2/D4D03AQEJMZ6q4deswg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713916849194?e=2147483647&v=beta&t=d9eytdUOAq86xdFqqgbQ-uAvXL43m4UeVhT2qBl6eYk"
);

const formData = ref({
  fullName: 'Josue Chan Gutierrez',
  email: 'cgjosue17@gmail.com',
  gender: 'Masculino',
  phone: '9984847064',
  birthday: '1998-02-06',
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveChanges = () => {
  console.log('Datos guardados:', formData.value);
  closeModal();
};

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      currentPhoto.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};
</script>
