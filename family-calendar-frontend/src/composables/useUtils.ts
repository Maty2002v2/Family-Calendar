import { useMainStore } from "@/stores/MainStore";
import router  from '@/router/index';

const mainStore = useMainStore();

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const pushToCalendar = (calendarHash: string) => {
  if (calendarHash.length > 0) {
    router.push({
      name: "calendar",
      params: {
        calendarId: calendarHash,
      },
    });
  } else {
    mainStore.switchIncorrectCodeEntered(true); //TODO: Zrobic by mozna bylo przekazywac wiadomosci a nie tylko BAD CODE, np pusty kod
  }
};

export const useUtils = () => {
  return {
    hexToRgb,
    pushToCalendar
  }
}