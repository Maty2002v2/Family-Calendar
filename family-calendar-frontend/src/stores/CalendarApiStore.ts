import { defineStore, storeToRefs } from "pinia";
import InformationDaysDownload from "../types/InformationDaysDownload";
import DaysOfTheMonthDownloaded from "../types/DaysOfTheMonthDownloaded";
import CreateNewDay from "../types/CreateNewDay";

import { useMainStore } from "./MainStore";
import { useDateStore } from "./DateStore";

export const useCalendarApiStore = defineStore("CalendarApi", {
  state: () => {
    return {
      calendarHash: "",
      days: [] as DaysOfTheMonthDownloaded[],
    };
  },
  getters: {
    getCalendarHash: (state) => state.calendarHash,
    getDays: (state) => state.days,
    getSortedDays: (state) => {
      const dayIndex: DaysOfTheMonthDownloaded[][] = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ];

      state.days.forEach((day) => dayIndex[day.number_day - 1].push(day));

      return dayIndex;
    },
  },
  actions: {
    setCalendarHash(hash: string) {
      this.calendarHash = hash;
    },
    async createCalendar() {
      const result = { error: false, message: [] };

      await fetch("http://localhost/family-calendar-api?action=add-calendar", {
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
    },
    async checkIfThereIsCalendar(calendar_id: string) {
      const url = new URL("http://localhost/family-calendar-api");
      const params = { action: "exist-calendar", calendar_id: calendar_id };
      const result = { error: false, message: "" };

      Object.keys(params).forEach(
        (key) =>
          url.searchParams.append(key, params[key as keyof typeof params]) //TODO: Zrobic metode do tworzenia url, by nie powtarzac zaly czas tego samego
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
    },
    async fetchDaysOfTheMonth(whatDays: InformationDaysDownload) {
      const { switchLoadingCalendar } = useMainStore();

      const url = new URL("http://localhost/family-calendar-api");
      const params = {
        action: "give-days-of-the-month",
        calendar_id: whatDays.calendarId,
        number_month: (parseInt(whatDays.numberMonth) + 1).toString(), //By miesiace zaczynaly sie od 1 a nie 0
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
          this.days = response.message;
          switchLoadingCalendar(false);
        });
      // .catch((error) => {
      //   result.error = true;
      //   result.message = error;
      // });
    },
    async addDayToCalendar(day: CreateNewDay) {
      const { getMounth, getYear } = storeToRefs(useDateStore());

      const { switchShowNewDayForm, switchShowPnotify, setPnotifyOptions } =
        useMainStore();

      const url = "http://localhost/family-calendar-api/";
      const params = Object.assign({ action: "add-day" }, day);

      const formData = new FormData();

      for (const param in params) {
        formData.append(param, params[param as keyof typeof params] || "");
      }

      await fetch(url, {
        method: "POST",
        body: formData,
        mode: "cors",
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.error) {
            setPnotifyOptions(
              "success",
              "Success",
              `Added "${response.message.day.title}" to your calendar`
            );
            switchShowPnotify(true);

            switchShowNewDayForm(false);

            this.fetchDaysOfTheMonth({
              calendarId: this.calendarHash,
              numberMonth: getMounth.value.toString(),
              numberYear: getYear.value.toString(),
            });
          } else {
            setPnotifyOptions("danger", "We are sorry", response.message);
            switchShowPnotify(true);
          }
        });
    },
    async deleteDay(idDay: string) {
      const { getMounth, getYear } = storeToRefs(useDateStore());

      const { switchShowPnotify, setPnotifyOptions } = useMainStore();

      const url = "http://localhost/family-calendar-api/";
      const params = Object.assign({ action: "delete-day" }, { id: idDay });

      const formData = new FormData();

      for (const param in params) {
        formData.append(param, params[param as keyof typeof params] || "");
      }

      await fetch(url, {
        method: "POST",
        body: formData,
        mode: "cors",
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.error) {
            setPnotifyOptions("success", "Success", response.message);
            switchShowPnotify(true);
            this.fetchDaysOfTheMonth({
              calendarId: this.calendarHash,
              numberMonth: getMounth.value.toString(),
              numberYear: getYear.value.toString(),
            });
          } else {
            setPnotifyOptions("danger", "We are sorry", response.message);
            switchShowPnotify(true);
          }
        });
    },
  },
});
