type notificationType = 'success' | 'info' | 'danger';
type notification = {
  type: notificationType,
  message: string,
  time: number,
}

export {
  notificationType,
  notification,
};