<template>
  <div v-if="show" class="loading-screen">
    <div class="loader">
      <div class="btc-symbol">B</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  show: Boolean,
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f7931a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.8);
  animation: spin 1s linear infinite;
  border: 4px solid white;
}

.btc-symbol {
  font-size: 28px;
  font-weight: bold;
  color: white;
  font-family: Arial, sans-serif;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
