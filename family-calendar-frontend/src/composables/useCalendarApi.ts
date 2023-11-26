import { storeToRefs } from "pinia";
import { ref, computed } from 'vue';
import { i18n } from '@/translations/main';

import { type InfoForDownload, type ResponseResults } from "@/types/Composables.interface";
import { type SpecialDay, type NewSpecialDay } from "@/types/Components.interface";

import { useMainStore } from "@/stores/MainStore";
import { useDateStore } from "@/stores/DateStore";

import { useLocalStorage } from "@/composables/useLocalStorage";
import { useNotifications } from "@/composables/useNotifications";

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
  obj[key];

const localStorageCalendarId = useLocalStorage('calendarId');
const localStorageIdsOfCreatedCalendars = useLocalStorage('idsOfCreatedCalendars', '[]');
const { addNotification, defaultNotificationTime } = useNotifications();
const { t } = i18n.global;

const calendarApiCache = new Map();
const calendarHash = ref('');
const daysOfTheMonth = ref<SpecialDay[]>([]);

export const useCalendarApi = () => {
  const getCalendarHash = computed(() => calendarHash.value);
  const getSortedDays = computed(() => {
    const dayIndex: SpecialDay[][] = [
      [],[],[],[],[],[],[],
      [],[],[],[],[],[],[],
      [],[],[],[],[],[],[],
      [],[],[],[],[],[],[],
      [],[],[],
    ];

    daysOfTheMonth.value.forEach((day) => dayIndex[Number(day.number_day) - 1].push(day));

    return dayIndex;
  });

  const setCalendarHash = (hash: string) => {
    calendarHash.value = hash;
    localStorageCalendarId.value = hash;
  };

  const removeCalendarHash = () => {
    setCalendarHash('');
  };

  const createCalendar = async () => {
    const result: ResponseResults = { error: false, message: '' };

    try {
      const responeJson = await fetch(
        `${process.env.VUE_APP_API_URL}?action=add-calendar`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const response = await responeJson.json();
  
      result.error = response.error;
      result.message = response.message;
  
      localStorageIdsOfCreatedCalendars.value = 
        JSON.stringify([...JSON.parse(localStorageIdsOfCreatedCalendars.value), result.message]);
    } catch(error) {
      result.error = true;
      result.message = error as string;
    }

    return result;
  };

  const checkIfThereIsCalendar = async (calendar_id: string) => {
    const url = new URL(process.env.VUE_APP_API_URL);
    const params = { action: "exist-calendar", calendar_id: calendar_id };
    const result: ResponseResults = { error: false, message: "" };

    Object.keys(params).forEach(
      (key) =>
        url.searchParams.append(key, params[key as keyof typeof params]) //TODO: Zrobic metode do tworzenia url, by nie powtarzac caly czas tego samego
    );
    
    try {
      const responseJson = await fetch(url.toString(), {
        method: "GET",
        mode: "cors",
      })
      const response = await responseJson.json();
      
      result.error = response.error;
      result.message = response.message;
    } catch (error) {
      result.error = true;
      result.message = error as string;
    }

    return result;
  };

  const fetchDaysOfTheMonth = async (whatDays: InfoForDownload, cacheable = true) => {
    const { switchLoadingCalendar } = useMainStore();
    const { calendarId, numberMonth, numberYear } = whatDays;

    const url = new URL(process.env.VUE_APP_API_URL);
    const params = {
      action: "give-days-of-the-month",
      calendar_id: calendarId,
      number_month: (parseInt(numberMonth) + 1).toString(),
      number_year: numberYear.toString(),
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key as keyof typeof params])
    );

    //chack if is in cache
    const cacheKey = `cache-key_${numberMonth}_${numberYear}`;
    if (cacheable && calendarApiCache.has(cacheKey)) {
      daysOfTheMonth.value = calendarApiCache.get(cacheKey);
      return;
    }

    switchLoadingCalendar(true);

    try {
      const responseJson = await fetch(url.toString(), {
        method: "GET",
        mode: "cors",
      })
      const response = await responseJson.json();
      daysOfTheMonth.value = response.message;

      //set result in cache
      calendarApiCache.set(cacheKey, response.message);
    } finally {
      switchLoadingCalendar(false);
    }
  };

  const addDayToCalendar = async (day: NewSpecialDay) => {
    const { getMounth, getYear } = storeToRefs(useDateStore());

    const { switchShowNewDayForm } = useMainStore();
    const params = Object.assign({ action: "add-day" }, day);

    const formData = new FormData();

    for (const param in params) {
      formData.append(param, getKeyValue<keyof NewSpecialDay, NewSpecialDay>(param as keyof NewSpecialDay)(params));
    }

    try {
      const responeJson = await fetch(process.env.VUE_APP_API_URL, {
        method: "POST",
        body: formData,
        mode: "cors",
      })
      const response = await responeJson.json();

      if (!response.error) {
        addNotification({
          type: "success",
          message: t('newDayHasBeenAdded', { dayTitle: response.message.day.title }),
          ...defaultNotificationTime
        });
  
        switchShowNewDayForm(false);

        fetchDaysOfTheMonth({
          calendarId: calendarHash.value,
          numberMonth: getMounth.value.toString(),
          numberYear: getYear.value.toString(),
        }, false);
      } else {
        addNotification({
          type: "danger",
          message: response.message,//todo translated respone
          ...defaultNotificationTime
        });
      }
    } catch (error) {
      addNotification({
        type: "danger",
        message: error as string,//todo translated respone
        ...defaultNotificationTime
      });
    }
  };

  const deleteDay = async (idDay: string) => {
    const { getMounth, getYear } = storeToRefs(useDateStore());
    const params = Object.assign({ action: "delete-day" }, { id: idDay });

    const formData = new FormData();

    for (const param in params) {
      formData.append(param, params[param as keyof typeof params] || "");
    }

    try {
      const responseJson = await fetch(process.env.VUE_APP_API_URL, {
        method: "POST",
        body: formData,
        mode: "cors",
      })
      const response = await responseJson.json();
      
      if (!response.error) {
        addNotification({
          type: "success",
          message: response.message,//todo translated respone
          ...defaultNotificationTime
        });
        fetchDaysOfTheMonth({
          calendarId: calendarHash.value,
          numberMonth: getMounth.value.toString(),
          numberYear: getYear.value.toString(),
        });
      } else {
        addNotification({
          type: "danger",
          message: response.message,//todo translated respone
          ...defaultNotificationTime
        });
      }
    } catch(error) {
      addNotification({
        type: "danger",
        message: error as string,//todo translated respone
        ...defaultNotificationTime
      });
    }
  };

  return {
    getCalendarHash,
    daysOfTheMonth,
    getSortedDays,
    setCalendarHash,
    removeCalendarHash,
    createCalendar,
    checkIfThereIsCalendar,
    fetchDaysOfTheMonth,
    addDayToCalendar,
    deleteDay
  }
};