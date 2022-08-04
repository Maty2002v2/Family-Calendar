import { defineStore } from "pinia";

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
    // async fetchDaysOfTheMonth() {
    //   const url = new URL("http://localhost/family-calendar-api");
    //   const params = { action: "exist-calendar", calendar_id: calendar_id };
    //   const result = { error: false, message: "" };
    // },
  },
});
