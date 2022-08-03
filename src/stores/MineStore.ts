import { defineStore } from "pinia";

export const useMineStore = defineStore("Mine", {
  state: () => {
    return {
      calendar_hash: "",
    };
  },
  getters: {},
  actions: {},
});
