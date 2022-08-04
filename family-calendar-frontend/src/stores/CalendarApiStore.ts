import { defineStore } from "pinia";
import DayObject from "../types/DayObject";

export const useCalendarApiStore = defineStore("CalendarApi", {
  state: () => {
    return {
      calendarHash: "",
    };
  },
  getters: {},
  actions: {
    setCalendarHash(hash: string) {
      this.calendarHash = hash;
    },
    async createCalendar() {
      const result = { error: false, message: "" };

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

      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key as keyof typeof params])
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
    async fetchDaysOfTheMonth(day: DayObject) {
      const url = new URL("http://localhost/family-calendar-api");
      const params = {
        action: "give-days-of-the-month",
        calendar_id: day.calendarId,
        number_month: day.numberMonth,
      };
      const result = { error: false, message: "" };

      Object.keys(params).forEach(
        (key) => url.searchParams.append(key, params[key]) //TODO: Zrobic to by ts byl zadwolony
      );
    },
  },
});
