export type NavigationAnimations = "animate__backInRight" | "animate__backInLeft" | "animate__fadeInDown"; 

export interface Icon {
  name: string
}

export interface Color {
  name: string
}

export interface NewSpecialDay {
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

export interface SpecialDay extends NewSpecialDay {
  id: string;
}