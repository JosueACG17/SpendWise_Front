<template>
  <div>
    <LoadingScreen :show="loading" />

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Correo" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit" :disabled="loading">Iniciar sesión</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoadingScreen from "@/components/LoadingScreen.vue";

const email = ref("");
const password = ref("");
const loading = ref(false);

const login = async () => {
  loading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Usuario autenticado");

  } catch (error) {
    console.error("Error en el login", error);
  } finally {
    loading.value = false;
  }
};
</script>
