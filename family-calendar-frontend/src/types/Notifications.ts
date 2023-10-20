type notificationType = 'success' | 'info' | 'danger';
type notification = {
  type: notificationType,
  title: string,
  message: string,
  time: number,
}

export {
  notificationType,
  notification,
};