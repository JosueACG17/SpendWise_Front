<script setup lang="ts">
import { computed } from "vue";
import { BellIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useNotificacionesStore } from "@/stores/notificationStore";
import 'animate.css';

const notificacionesStore = useNotificacionesStore();
const groupedNotifications = computed(() => notificacionesStore.groupedNotifications);
const totalNotificaciones = computed(() => notificacionesStore.total);

const deleteNotification = (id: number) => {
  const element = document.getElementById(`notif-${id}`);
  if (element) {
    element.classList.add("animate__animated", "animate__fadeOutRight");
    setTimeout(() => notificacionesStore.deleteNotification(id), 500);
  }
};

const clearNotifications = () => {
  document.querySelectorAll(".notification-item").forEach((el) => {
    el.classList.add("animate__animated", "animate__fadeOutRight");
  });
  setTimeout(() => notificacionesStore.clearNotifications(), 500);
};
</script>

<template>
  <div class="p-10 min-h-screen w-full max-w-screen mx-auto overflow-x-hidden">
    <div class="flex justify-between items-center mb-6 animate__animated animate__fadeIn">
      <h2 class="sm:text-2xl text-xl font-bold text-gray-900 flex items-center">
        🔔 Notificaciones <span class="ml-2 text-yellow-500">({{ totalNotificaciones }})</span>
      </h2>
      <button
        @click="clearNotifications"
        class="text-white cursor-pointer bg-red-500 hover:bg-red-700 transition-transform transform hover:scale-105 sm:px-4 sm:py-2 px-2 py-1.5 rounded-md shadow-md flex items-center"
      >
        <TrashIcon class="w-5 h-5 mr-2" />
        Borrar todo
      </button>
    </div>

    <div v-if="Object.keys(groupedNotifications).length > 0">
      <div v-for="(notifs, group) in groupedNotifications" :key="group" class="mb-4">
        <h3 class="text-gray-600 font-semibold text-sm mb-1">{{ group }}</h3>
        <ul class="space-y-3">
          <li
            v-for="notification in notifs"
            :key="notification.id"
            :id="'notif-' + notification.id"
            class="notification-item flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-md animate__animated animate__fadeInDown"
          >
            <div class="flex items-center ">
              <BellIcon class="w-6 h-6 text-yellow-500 mr-3 animate__animated animate__heartBeat animate__infinite" />
              <span class="text-gray-800">{{ notification.message }}</span>
            </div>
            <button
              @click="deleteNotification(notification.id)"
              class="text-white bg-red-600 hover:bg-red-700 transition-transform transform hover:scale-110 p-2 rounded-full shadow-lg cursor-pointer"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </li>
        </ul>
      </div>
    </div>

    <p v-else class="text-center sm:text-2xl mt-10 text-gray-500 animate__animated animate__fadeIn">
      No hay notificaciones pendientes.
    </p>
  </div>
</template>
