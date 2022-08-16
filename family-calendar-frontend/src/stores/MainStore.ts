import { defineStore } from "pinia";

export const useMainStore = defineStore("Main", {
  state: () => {
    return {
      incorrectCodeEntered: false,
      loadingCalendar: false,
      showNewDayForm: false,
      showModalDetailsOffDay: false,
      showModalOfNewCalendar: false,
    };
  },
  getters: {
    getIncorrectCodeEntered: (state) => state.incorrectCodeEntered,
    getLoadingCalendar: (state) => state.loadingCalendar,
    getShowNewDayForm: (state) => state.showNewDayForm,
    getShowModalDetailsOffDay: (state) => state.showModalDetailsOffDay,
    getShowModalOfNewCalendar: (state) => state.showModalOfNewCalendar,
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
    switchShowModalDetailsOffDay(value: boolean) {
      this.showModalDetailsOffDay = value;
    },
    switchShowModalOfNewCalendar(value: boolean) {
      this.showModalOfNewCalendar = value;
    },
  },
});
