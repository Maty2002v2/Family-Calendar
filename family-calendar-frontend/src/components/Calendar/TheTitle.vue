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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  color: #666;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 1px;

  background: $background-color;

  z-index: 1;
}

@media only screen and (max-width: $small) {
  .calendar-title {
    @include position($position: sticky, $top: 0);

    @include flexbox;
    @include flex-centering;
    min-height: 50px;

    font-size: 20px;
  }
}
</style>
