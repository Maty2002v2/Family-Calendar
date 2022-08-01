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
    const { month, year } = storeToRefs(useMainStore());
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
      return `${monthNames[month.value]} ${year.value}`;
    });
    return { title };
  },
});
</script>
