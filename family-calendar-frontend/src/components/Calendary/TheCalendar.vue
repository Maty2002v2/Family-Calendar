<template>
  <div
    class="calendar calendar animate__animated animate__fadeInDown"
    v-if="days"
  >
    <div class="calendar__nav">
      <calendar-navigation-button class="" icon="<" :step="-1" />
      <the-calendar-title />
      <calendar-navigation-button class="" icon=">" :step="1" />
    </div>

    <div class="container">
      <div
        class="calendar__name-day-of-week"
        v-for="(name, index) in namesDaysOfWeek"
        :key="index"
      >
        {{ name }}
      </div>

      <div
        class="calendar__day calendar__day--blank"
        v-for="day in getFirstMonthDay - 1"
        :key="day"
      >
        .
      </div>

      <div
        class="calendar__day"
        :class="{
          'calendar__day--active':
            day === getDay &&
            new Date().getMonth() === getMounth &&
            new Date().getFullYear() === getYear,
        }"
        v-for="day in getDaysInMonth"
        :key="day"
      >
        <calendar-field :nrDay="day" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { storeToRefs } from "pinia";
import { useDateStore } from "../../stores/DateStore";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";

import CalendarNavigationButton from "./NavigationButton.vue";
import TheCalendarTitle from "./TheTitle.vue";
import CalendarField from "./Field.vue";

export default defineComponent({
  name: "TheCalendar",
  components: {
    CalendarNavigationButton,
    TheCalendarTitle,
    CalendarField,
  },
  async setup() {
    const { getDay, getMounth, getYear, getDaysInMonth, getFirstMonthDay } =
      storeToRefs(useDateStore());
    const totalNumberFields = getDaysInMonth.value + getFirstMonthDay.value - 1;

    watch(getMounth, () => {
      console.log("zmiana");
    });

    const { fetchDaysOfTheMonth } = useCalendarApiStore();
    const days: any = ref("");

    const result = await fetchDaysOfTheMonth({
      calendarId: "uNK2r6j",
      numberMonth: getMounth.value.toString(),
    });

    days.value = result.message;

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
      getDay,
      getMounth,
      getYear,
      getDaysInMonth,
      getFirstMonthDay,
      totalNumberFields,
      namesDaysOfWeek,
      days,
    };
  },
});
</script>

<style lang="scss" scoped>
$size-day-div: calc(100% / 7 - 5px);

.calendar {
  width: 100%;

  &__nav {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 20px 0px 10px 0px;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__name-day-of-week {
    display: inline-block;
    width: $size-day-div;
    text-align: center;
    box-sizing: border-box;
    margin: 15px 0px;

    color: #aaa;
    font-family: sans-serif;
    font-weight: normal;
    font-size: 15px;
  }

  &__day {
    display: inline-block;
    width: $size-day-div;
    height: 100px;
    border: 1px solid rgb(149, 148, 148);
    box-sizing: border-box;

    color: $color-day-fiels;

    background: #fafafa;
  }

  &__day:hover {
    background: $hover-blue;
    cursor: pointer;
  }

  &__day--blank {
    background: none;
    border: none;
  }

  &__day--active {
    color: #fff;
    font-weight: bold;
    background: $active-day;
  }

  &__day--active:hover {
    background: $hover-active-day;
  }

  @media only screen and (max-width: $large) {
    &__day {
      height: 90px;
    }
  }

  @media only screen and (max-width: $medium) {
    &__day {
      height: 70px;
    }
  }

  @media only screen and (max-width: $small) {
    &__day {
      height: 50px;
    }
  }

  @media only screen and (max-width: $extra-small) {
    &__day {
      height: 20px;
    }
  }
}
</style>
