<template>
  <div class="bg-white p-6 rounded-lg w-full max-w-2xl">
    <h3 class="text-2xl font-bold text-gray-900 mb-4">Crear Perfil</h3>

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
          v-model="formData.NombreCompleto"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Género</label>
        <select
          v-model="formData.Genero"
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
          v-model="formData.Telefono"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Fecha de Nacimiento</label>
        <input
          v-model="formData.FechaNacimiento"
          type="date"
          class="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
    <div class="flex justify-end mt-6 space-x-4">
      <button
        @click="cancelar"
        class="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
      >
        Cancelar
      </button>
      <button
        @click="guardarCambios"
        class="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300  cursor-pointer"
      >
        Guardar Cambios
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePerfilStore } from '@/stores/perfilStore';

const perfilStore = usePerfilStore();

const formData = ref({
  NombreCompleto: '',
  Genero: '',
  Telefono: '',
  FechaNacimiento: '',
});

const currentPhoto = ref("https://via.placeholder.com/150");

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

const guardarCambios = async () => {
  const formDataToSend = new FormData();
  formDataToSend.append('NombreCompleto', formData.value.NombreCompleto);
  formDataToSend.append('Genero', formData.value.Genero);
  formDataToSend.append('Telefono', formData.value.Telefono);
  formDataToSend.append('FechaNacimiento', formData.value.FechaNacimiento);

  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput?.files?.[0]) {
    formDataToSend.append('Foto', fileInput.files[0]);
  }

  await perfilStore.crearPerfil(formDataToSend);

  if (!perfilStore.error) {
    alert('Perfil guardado correctamente');
    // Aquí puedes redirigir al usuario o actualizar la vista
  } else {
    alert(perfilStore.error);
  }
};

const cancelar = () => {
  // Lógica para cancelar
};
</script>
