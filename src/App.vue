<template>
  <RouterView></RouterView>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePerfilStore } from '@/stores/perfilStore';
import { useAuthStore } from '@/stores/authStore';

onMounted(() => {
  const perfilStore = usePerfilStore();
  perfilStore.cargarPerfilDesdeLocalStorage();

  const authStore = useAuthStore();
  authStore.loadFromLocalStorage();
});
</script>

<style scoped></style>
