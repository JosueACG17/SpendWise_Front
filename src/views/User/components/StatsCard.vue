<template>
  <div class="bg-white overflow-hidden shadow-lg rounded-2xl">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0 p-3 rounded-md" :class="iconBgColor">
          <component :is="icon" class="h-6 w-6" :class="iconColor" />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">{{ title }}</dt>
            <dd>
              <div class="text-lg font-semibold text-gray-900">{{ value }}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: [Object,  Function],
  iconBgColor: String,
  iconColor: String,
});
</script>
