<template>
  <div>{{ title }}</div>
</template>

<script>
import { defineComponent, computed } from "vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../stores/MainStore";

export default defineComponent({
  name: "TheCalendarTitle",
  setup() {
    const { getMounth, getYear } = storeToRefs(useMainStore());
    const monthNames = [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień",
    ];

    const title = computed(() => {
      return `${monthNames[getMounth.value]} ${getYear.value}`;
    });
    return { title };
  },
});
</script>
