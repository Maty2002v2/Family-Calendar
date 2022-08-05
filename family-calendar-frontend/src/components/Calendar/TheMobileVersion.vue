<template>
  <div class="calendar">
    <the-calendar-title />
    <nav class="calendar__nav">
      <navigation-button class="" icon="^^" :step="-1" />
      <navigation-button class="" icon="^" :step="1" />
    </nav>

    <div class="container">
      <div class="name-day-of-week">
        <div
          class="name-day-of-week__day"
          v-for="(name, index) in namesDaysOfWeek"
          :key="index"
        >
          {{ name }}
        </div>
      </div>

      <div class="wraper-na-dni">
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
          <calendar-field
            :nrDay="day"
            :bargainsOnThisday="getSortedDays[day - 1]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import NavigationButton from "./NavigationButton.vue";
import TheCalendarTitle from "./TheTitle.vue";
import CalendarField from "./Field.vue";

import DaysOfTheMonthDownloaded from "../../types/DaysOfTheMonthDownloaded";

export default defineComponent({
  name: "TheMobileVersion",
  props: {
    namesDaysOfWeek: {
      type: Array as PropType<string[]>,
      required: true,
    },
    getDay: {
      type: Number,
      required: true,
    },
    getMounth: {
      type: Number,
      required: true,
    },
    getYear: {
      type: Number,
      required: true,
    },
    getDaysInMonth: {
      type: Number,
      required: true,
    },
    getFirstMonthDay: {
      type: Number,
      required: true,
    },
    getSortedDays: {
      type: Array as PropType<DaysOfTheMonthDownloaded[]>,
      required: true,
    },
  },
  components: {
    NavigationButton,
    TheCalendarTitle,
    CalendarField,
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
    flex-direction: column;
    width: 100%;
    padding: 20px 0px 10px 0px;
  }

  .container {
    display: flex;
    gap: 5px;
  }

  .name-day-of-week {
    width: 30%;

    &__day {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      width: 100%;
      height: 80px;

      text-align: center;
      box-sizing: border-box;

      color: #aaa;
      font-family: sans-serif;
      font-weight: normal;
      font-size: 15px;
    }
  }

  .wraper-na-dni {
    width: 70%;
  }
  &__day {
    display: flex;
    flex-direction: column;
    width: 100%;
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

  //   @media only screen and (max-width: $large) {
  //     &__day {
  //       height: 90px;
  //     }
  //   }

  //   @media only screen and (max-width: $medium) {
  //     &__day {
  //       height: 70px;
  //     }
  //   }

  //   @media only screen and (max-width: $small) {
  //     &__day {
  //       height: 50px;
  //     }
  //   }

  //   @media only screen and (max-width: $extra-small) {
  //     &__day {
  //       height: 20px;
  //     }
  //   }
}
</style>
