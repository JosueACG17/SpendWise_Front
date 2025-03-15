<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <div class="p-3 rounded-full" :class="card.bgColor">
        <component :is="card.icon" class="h-6 w-6 text-white" />
      </div>
      <div class="ml-4">
        <h3 class="text-lg font-semibold text-gray-700">{{ card.title }}</h3>
        <p class="text-2xl font-bold text-gray-900">{{ card.value }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
});
</script>
