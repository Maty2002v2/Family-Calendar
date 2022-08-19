import { defineStore } from "pinia";

export const useMainStore = defineStore("Main", {
  state: () => {
    return {
      incorrectCodeEntered: false,
      loadingCalendar: false,
      showNewDayForm: false,
      showModalDetailsOffDay: false,
      showModalOfNewCalendar: false,
      showPnotify: false,
      pnotifyOptions: {
        type: "success",
        title: "asd",
        message: "asd",
      },
    };
  },
  getters: {
    getIncorrectCodeEntered: (state) => state.incorrectCodeEntered,
    getLoadingCalendar: (state) => state.loadingCalendar,
    getShowNewDayForm: (state) => state.showNewDayForm,
    getShowModalDetailsOffDay: (state) => state.showModalDetailsOffDay,
    getShowModalOfNewCalendar: (state) => state.showModalOfNewCalendar,
    getShowPnotify: (state) => state.showPnotify,
    getPnotifyOptions: (state) => state.pnotifyOptions,
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
    switchShowPnotify(value: boolean) {
      this.showPnotify = value;
    },
    setPnotifyOptions(type: string, title: string, message: string) {
      this.pnotifyOptions.type = type;
      this.pnotifyOptions.title = title;
      this.pnotifyOptions.message = message;
    },
  },
});
