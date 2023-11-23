import { ref } from 'vue';

import { notification } from '@/types/Notifications';

const defaultNotificationTime = {
  time: 5000
}

const notifications = ref<notification[]>([])

const addNotification = (notification: notification) => {
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