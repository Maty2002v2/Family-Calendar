import { ref } from 'vue';

import { type Notification } from '@/types/Composables.interface';

const defaultNotificationTime = {
  time: 5000
}

const notifications = ref<Notification[]>([])

const addNotification = (notification: Notification) => {
  const { type, message, time } = notification;
  if(!type || !message) return;

  notifications.value.push(notification);
  countdownSetting(time);
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
    addNotification,
    defaultNotificationTime
  }
}