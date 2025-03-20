<template>
  <RouterView></RouterView>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

onMounted(async () => {
  const authStore = useAuthStore();
  await authStore.initializeAuth();
});
</script>

<style scoped></style>
