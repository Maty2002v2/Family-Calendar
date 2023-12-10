export type NotificationType = 'success' | 'info' | 'danger';

export type ModeState = 'light' | 'dark';

export interface CreateNewDay {
  calendar_id: string;
  number_day: string;
  number_month: string;
  number_year: string;
  to_repeat: string;
  title: string;
  description: string;
  category_day: string;
  icon_name: string;
  icon_color: string;
}

export interface InfoForDownload {
  calendarId: string;
  numberMonth: string;
  numberYear: string;
}

export interface Notification {
  type: NotificationType,
  message: string,
  time: number,
}

export interface ResponseResults {
  error: boolean, 
  message: string
}

type LanguageCode = 'pl' | 'en';

export interface LanguageBlock {
  code: LanguageCode,
  background: string,
}