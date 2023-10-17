type notificationType = 'success' | 'warning' | 'info' | 'danger';
type notification = {
  type: notificationType,
  title: string,
  message: string,
  time: number,
}

const defaultNotificationTime = {
  time: 5000
}

export {
  notificationType,
  notification,
  defaultNotificationTime
};