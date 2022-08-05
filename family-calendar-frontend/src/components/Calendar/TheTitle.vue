<template>
  <div class="calendar-title">{{ title }}</div>
</template>

<script>
import { defineComponent, computed } from "vue";

import { storeToRefs } from "pinia";
import { useDateStore } from "../../stores/DateStore";

export default defineComponent({
  name: "TheCalendarTitle",
  setup() {
    const { getMounth, getYear } = storeToRefs(useDateStore());
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

<style lang="scss" scoped>
.calendar-title {
  width: 120px;
  text-align: center;
  box-sizing: border-box;

  color: #666;
  font-family: sans-serif;
  font-size: 15px;
  line-height: 30px;
}
</style>
