import { storeToRefs } from "pinia";
import { ref, computed } from 'vue';
import { i18n } from '@/translations/main';

import InformationDaysDownload from "@/types/InformationDaysDownload";
import DaysOfTheMonthDownloaded from "@/types/DaysOfTheMonthDownloaded";
import CreateNewDay from "@/types/CreateNewDay";

import { useMainStore } from "@/stores/MainStore";
import { useDateStore } from "@/stores/DateStore";

import { useLocalStorage } from "@/composables/useLocalStorage";
import { useNotifications } from "@/composables/useNotifications";

const localStorageCalendarId = useLocalStorage('calendarId');
const { addNotification, defaultNotificationTime } = useNotifications();
const { t } = i18n.global;

const calendarHash = ref('');
const days = ref<DaysOfTheMonthDownloaded[]>([]);

export const useCalendarApi = () => {
  const getCalendarHash = computed(() => calendarHash.value);

  const getDays = computed(() => days.value);

  const getSortedDays = computed(() => {
    const dayIndex: DaysOfTheMonthDownloaded[][] = [
      [],[],[],[],[],[],[],
      [],[],[],[],[],[],[],
      [],[],[],[],[],[],[],
      [],[],[],[],[],[],[],
      [],[],[],
    ];

    days.value.forEach((day) => dayIndex[day.number_day - 1].push(day));

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
    const result = { error: false, message: [] };

    await fetch(
      `${process.env.VUE_APP_API_URL}?action=add-calendar`,
      {
        method: "GET",
        mode: "cors",
      }
    )
    .then((response) => response.json())
    .then((response) => {
      result.error = response.error;
      result.message = response.message;
    })
    .catch((error) => {
      result.error = true;
      result.message = error;
    });

    return result;
  };

  const checkIfThereIsCalendar = async (calendar_id: string) => {
    const url = new URL(process.env.VUE_APP_API_URL);
    const params = { action: "exist-calendar", calendar_id: calendar_id };
    const result = { error: false, message: "" };

    Object.keys(params).forEach(
      (key) =>
        url.searchParams.append(key, params[key as keyof typeof params]) //TODO: Zrobic metode do tworzenia url, by nie powtarzac caly czas tego samego
    );

    await fetch(url.toString(), {
      method: "GET",
      mode: "cors",
    })
    .then((response) => response.json())
    .then((response) => {
      result.error = response.error;
      result.message = response.message;
    })
    .catch((error) => {
      result.error = true;
      result.message = error;
    });

    return result;
  };

  const fetchDaysOfTheMonth = async (whatDays: InformationDaysDownload) => {
    const { switchLoadingCalendar } = useMainStore();

    const url = new URL(process.env.VUE_APP_API_URL);
    const params = {
      action: "give-days-of-the-month",
      calendar_id: whatDays.calendarId,
      number_month: (parseInt(whatDays.numberMonth) + 1).toString(),
      number_year: whatDays.numberYear.toString(),
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key as keyof typeof params])
    );

    switchLoadingCalendar(true);
    await fetch(url.toString(), {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((response) => {
        days.value = response.message;
        switchLoadingCalendar(false);
      });
  };

  const addDayToCalendar = async (day: CreateNewDay) => {
    const { getMounth, getYear } = storeToRefs(useDateStore());

    const { switchShowNewDayForm } = useMainStore();
    const params = Object.assign({ action: "add-day" }, day);

    const formData = new FormData();

    for (const param in params) {
      formData.append(param, params[param as keyof typeof params] || "");
    }

    await fetch(process.env.VUE_APP_API_URL, {
      method: "POST",
      body: formData,
      mode: "cors",
    })
    .then((response) => response.json())
    .then((response) => {
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
        });
      } else {
        addNotification({
          type: "danger",
          message: response.message,//todo translated respone
          ...defaultNotificationTime
        });
      }
    });
  };

  const deleteDay = async (idDay: string) => {
    const { getMounth, getYear } = storeToRefs(useDateStore());
    const params = Object.assign({ action: "delete-day" }, { id: idDay });

    const formData = new FormData();

    for (const param in params) {
      formData.append(param, params[param as keyof typeof params] || "");
    }

    await fetch(process.env.VUE_APP_API_URL, {
      method: "POST",
      body: formData,
      mode: "cors",
    })
      .then((response) => response.json())
      .then((response) => {
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
      });
    };

  return {
    getCalendarHash,
    getDays,
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