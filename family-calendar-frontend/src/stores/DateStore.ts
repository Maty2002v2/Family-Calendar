import { defineStore } from "pinia";

export const useDateStore = defineStore("Date", {
  state: () => {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }
  },
  getters: {
    getDay: (state) => state.day,
    getMounth: (state) => state.month,
    getYear: (state) => state.year,
    getDaysInMonth: (state) =>
      new Date(state.year, state.month + 1, 0).getDate(),
    getFirstMonthDay: (state) => {
      const tempDate = new Date(state.year, state.month, 1);
      let firstMonthDay = tempDate.getDay();

      if (firstMonthDay === 0) {
        firstMonthDay = 7;
      }

      return firstMonthDay;
    },
  },
  actions: {
    changeDateData(step: number) {
      let newMonthValue = this.month + step;

      if (newMonthValue > 11) {
        this.year += Math.floor(newMonthValue / 12);
        newMonthValue %= 12;
        this.month = newMonthValue;

        return;
      }

      if (newMonthValue < 0) {
        this.year += Math.floor(newMonthValue / 12);
        newMonthValue %= 12;

        newMonthValue === 0
          ? (this.month = 0)
          : (this.month = 12 + newMonthValue);

        return;
      }

      this.month = newMonthValue;
    },
  },
});
