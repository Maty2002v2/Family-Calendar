import { defineStore } from "pinia";

export const useMainStore = defineStore("Main", {
  state: () => {
    return {
      incorrectCodeEntered: false,
      loadingCalendar: false,
      showNewDayForm: false,
    };
  },
  getters: {
    getIncorrectCodeEntered: (state) => state.incorrectCodeEntered,
    getLoadingCalendar: (state) => state.loadingCalendar,
    getShowNewDayForm: (state) => state.showNewDayForm,
  },
  actions: {
    switchIncorrectCodeEntered(value: boolean) {
      this.incorrectCodeEntered = value;
    },
    switchLoadingCalendar(value: boolean) {
      this.loadingCalendar = value;
    },
    switchShowNewDayForm(value: boolean) {
      this.showNewDayForm = value;
    },
  },
});
