import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Notification } from "@/interfaces/Notification";

export const useNotificacionesStore = defineStore("notificaciones", () => {
  const notifications = ref<Notification[]>([
    { id: 1, message: "Pago recibido con éxito.", date: "2025-03-18" },
    { id: 2, message: "Tu reporte mensual está listo.", date: "2025-03-17" },
    { id: 3, message: "Nueva actualización disponible.", date: "2025-03-16" },
    { id: 4, message: "Te etiquetaron en un comentario.", date: "2025-03-15" },
    { id: 5, message: "Evento programado para mañana.", date: "2025-03-18" },
  ]);

  const total = computed(() => notifications.value.length);

  const formatDateGroup = (date: string) => {
    const today = new Date();
    const notificationDate = new Date(date);
    const diffTime = today.getTime() - notificationDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    return `Hace ${diffDays} días`;
  };

  const groupedNotifications = computed(() => {
    const groups: { [key: string]: Notification[] } = {};
    notifications.value.forEach((notification) => {
      const group = formatDateGroup(notification.date);
      if (!groups[group]) groups[group] = [];
      groups[group].push(notification);
    });
    return groups;
  });

  const deleteNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  const clearNotifications = () => {
    notifications.value = [];
  };

  return {
    notifications,
    total,
    groupedNotifications,
    deleteNotification,
    clearNotifications,
  };
});
