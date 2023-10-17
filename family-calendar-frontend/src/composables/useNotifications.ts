import { ref } from 'vue';

import { notification } from '@/types/Notifications';

const notifications = ref<notification[]>([])

const addNotification = (notification: notification) => {
  const { type, title, message, time = 5000 } = notification;
  if(!type || !title || !message) return;

  notifications.value.push(notification);
  countdownSetting(notification.time);
}

const countdownSetting = (time: number) => {
  setTimeout(
    () => notifications.value.shift(), 
    time
  );
}

export const useNotifications = () => {
  return {
    notifications,
    addNotification
  }
}