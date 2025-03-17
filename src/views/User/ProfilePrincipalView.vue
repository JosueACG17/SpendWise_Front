<template>
  <NavbarComponent />
  <h2 class="text-2xl font-bold text-gray-900 sm:text-4xl text-center mt-4 mb-3">Mi perfil</h2>
  <div class="flex justify-center items-center">
    <PerfilView v-if="perfilExiste" @editar="mostrarFormulario" />
  <PerfilForm v-else :esNuevo="true" @guardar="crearPerfil" @cancelar="ocultarFormulario" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import PerfilView from '@/views/User/ProfileView.vue';
import PerfilForm from '@/views/User/ProfileForm.vue';

const perfilExiste = ref(false); // Cambiar a true si el perfil ya existe


const mostrarFormulario = () => {
  perfilExiste.value = false;
};

const ocultarFormulario = () => {
  perfilExiste.value = true;
};

const crearPerfil = (nuevoPerfil) => {
  // Lógica para guardar el perfil en el backend
  console.log('Perfil creado:', nuevoPerfil);
  perfilExiste.value = true;
};
</script>
