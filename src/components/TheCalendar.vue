<template>
  <div class="calendar">
    <div>{{ daysInMonth }} {{ firstMonthDay }}</div>
    <calendar-navigation-button icon="<" :step="-1" />
    <calendar-navigation-button icon=">" :step="1" />
    <the-calendar-title />
    <div
      class="calendar__nameDayOfWeek"
      v-for="(name, index) in namesDaysOfWeek"
      :key="index"
    >
      {{ name }}
    </div>
    <div
      class="calendar__border--blank"
      v-for="day in firstMonthDay - 1"
      :key="day"
    >
      __
    </div>
    <div class="calendar__border--normal" v-for="day in daysInMonth" :key="day">
      {{ day }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../stores/MainStore";

import CalendarNavigationButton from "./CalendarNavigationButton.vue";
import TheCalendarTitle from "./TheCalendarTitle.vue";

export default defineComponent({
  name: "TheCalendar",
  components: {
    CalendarNavigationButton,
    TheCalendarTitle,
  },
  setup() {
    const { getDaysInMonth, getFirstMonthDay } = storeToRefs(useMainStore());
    const totalNumberFields = getDaysInMonth.value + getFirstMonthDay.value - 1;

    const namesDaysOfWeek: string[] = [
      "Pon",
      "Wto",
      "Śro",
      "Czw",
      "Pią",
      "Sob",
      "Nie",
    ];

    return {
      getDaysInMonth,
      getFirstMonthDay,
      totalNumberFields,
      namesDaysOfWeek,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar {
  width: 100%;

  &__nameDayOfWeek {
    display: inline-block;
    width: (100% / 7.5);
    margin: 1px;
  }

  &__border,
  &__border--blank,
  &__border--normal {
    display: inline-block;
    width: (100% / 7.5);
    box-sizing: border-box;
    margin: 1px;
  }

  &__border--blank {
    border: 1px solid #000000;
  }

  &__border--normal {
    border: 1px solid #7b4848;
  }
}
</style>
