<template>
  <div class="calendar animate__animated animate__fadeInDown">
    <nav class="calendar__nav calendar__nav--prev">
      <navigation-button :step="-12" @setTransitionName="setTransitionName">
        <template v-slot:desktop-icon>
          <i class="demo-icon icon-angle-double-left"></i>
        </template>

        <template v-slot:mobile-icon>
          <i class="demo-icon icon-angle-double-down"></i>
        </template>
      </navigation-button>

      <navigation-button :step="-1" @setTransitionName="setTransitionName">
        <template v-slot:desktop-icon>
          <i class="demo-icon icon-left-open-mini"></i>
        </template>

        <template v-slot:mobile-icon>
          <i class="demo-icon icon-down-open-mini"></i>
        </template>
      </navigation-button>
    </nav>

    <the-title class="calendar__title" />

    <nav class="calendar__nav calendar__nav--next">
      <navigation-button :step="1" @setTransitionName="setTransitionName">
        <template v-slot:desktop-icon>
          <i class="demo-icon icon-right-open-mini"></i>
        </template>
        <template v-slot:mobile-icon>
          <i class="demo-icon icon-up-open-mini"></i>
        </template>
      </navigation-button>

      <navigation-button :step="12" @setTransitionName="setTransitionName">
        <template v-slot:desktop-icon>
          <i class="demo-icon icon-angle-double-right"></i>
        </template>
        <template v-slot:mobile-icon>
          <i class="demo-icon icon-angle-double-up"></i>
        </template>
      </navigation-button>
    </nav>

    <div class="days-grid">
      <div class="container">
        <the-name-day-of-week :totalNumberFields="totalNumberFields" />
      </div>

      <div
        class="container animate__animated animate__fast"
        :class="[calendarTransitionAnimationName]"
        v-if="!getLoadingCalendar"
      >
        <div
          class="days-grid__day days-grid__day--blank no-select"
          v-for="day in getFirstMonthDay - 1"
          :key="day"
        ></div>

        <div
          v-for="day in getDaysInMonth"
          :key="day"
          :class="{
            'days-grid__day': true,
            'days-grid__day--active':
              day === getDay &&
              new Date().getMonth() === getMounth &&
              new Date().getFullYear() === getYear,
          }"
        >
          <field
            :nrDay="day"
            :specialDayList="getSortedDays[day - 1]"
            @click="showThisDay(day - 1)"
          />
        </div>
      </div>

      <div v-else style="width: 100%">
        <app-loader />
      </div>
    </div>

    <the-list-of-whole-month />

    <teleport to="#modal">
      <the-field-modal
        :selectedDayNumber="indexOfSelectedDay"
        :specialDayList="getSortedDays[indexOfSelectedDay]"
      />
    </teleport>
    <teleport to="#modal">
      <the-modal-of-new-calendar />
    </teleport>

    <teleport to="#pnotify">
      <app-pnotify />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import NavigationButton from "./NavigationButton.vue";
import TheNameDayOfWeek from "./TheNameDayOfWeek.vue";
import TheTitle from "./TheTitle.vue";
import Field from "./Field.vue";
import AppLoader from "../AppLoader.vue";
import TheFieldModal from "./FieldModal/TheFieldModal.vue";
import TheModalOfNewCalendar from "./TheModalOfNewCalendar.vue";
import TheListOfWholeMonth from ".//TheListOfWholeMonth.vue";
import AppPnotify from "../AppPnotify.vue";

import { storeToRefs } from "pinia";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";
import { useDateStore } from "../../stores/DateStore";
import { useMainStore } from "../../stores/MainStore";

export default defineComponent({
  name: "TheCalendar",
  components: {
    NavigationButton,
    TheNameDayOfWeek,
    TheTitle,
    Field,
    AppLoader,
    TheFieldModal,
    TheModalOfNewCalendar,
    TheListOfWholeMonth,
    AppPnotify,
  },
  async setup() {
    const { getSortedDays, getCalendarHash } = storeToRefs(
      useCalendarApiStore()
    );
    const { fetchDaysOfTheMonth } = useCalendarApiStore();

    const dataStore = useDateStore();
    const { getDay, getMounth, getYear, getDaysInMonth, getFirstMonthDay } =
      storeToRefs(useDateStore());

    const { getLoadingCalendar } = storeToRefs(useMainStore());
    const { switchShowModalDetailsOffDay } = useMainStore();

    watch(
      dataStore,
      async () => {
        await fetchDaysOfTheMonth({
          calendarId: getCalendarHash.value,
          numberMonth: getMounth.value.toString(),
          numberYear: getYear.value.toString(),
        });
      },
      { deep: true }
    );

    await fetchDaysOfTheMonth({
      calendarId: getCalendarHash.value,
      numberMonth: getMounth.value.toString(),
      numberYear: getYear.value.toString(),
    });

    let calendarTransitionAnimationName = ref("");
    const setTransitionName = (transitionName: string) => {
      calendarTransitionAnimationName.value = transitionName;
    };

    let indexOfSelectedDay = ref(0);
    const showThisDay = (nrDay: number) => {
      indexOfSelectedDay.value = nrDay;
      switchShowModalDetailsOffDay(true);
    };

    const totalNumberFields = computed(
      () => getDaysInMonth.value + getFirstMonthDay.value - 1
    );

    return {
      getDay,
      getMounth,
      getYear,
      getDaysInMonth,
      getFirstMonthDay,
      totalNumberFields,
      getSortedDays,
      getLoadingCalendar,
      calendarTransitionAnimationName,
      setTransitionName,
      indexOfSelectedDay,
      showThisDay,
    };
  },
});
</script>

<style lang="scss" scoped>
$size-day-div: calc(100% / 7 - 5px);

.calendar {
  @include flexbox;
  @include flex-wrap(wrap);
  @include align-content(flex-start);
  width: 100%;
  height: 100vh;
  padding: 5px;
  box-sizing: border-box;

  &__nav {
    // todo: Poprawic to ze przy granicy zmiany z desckt namobile nawigazja przeskakuje
    @include flexbox;
    @include justify-content(space-around);
    @include flex-basis(40%);
    width: 100%;
    height: 30px;
  }

  &__title {
    @include flex-basis(20%);
    height: 30px;
  }
}

.days-grid {
  @include flexbox;
  @include flex-wrap(wrap);
  @include flex-basis(100%);
  margin-top: 20px;
  max-height: 567px;

  .container {
    @include flexbox;
    @include flex-wrap(wrap);
    gap: 5px;
    width: 100%;
  }

  &__day {
    display: inline-block;
    width: $size-day-div;
    height: 100px;
    border: 1px solid rgb(149, 148, 148);
    box-sizing: border-box;

    color: $color-day-field;

    background: $background-field;

    &:hover {
      background: $hover-blue;
      cursor: pointer;
    }

    &--blank {
      border: none;
      background: none;
    }

    &--active {
      color: #fff;
      font-weight: bold;
      background: $active-day;

      &:hover {
        background: $hover-active-day;
      }
    }
  }
}

@media only screen and (max-width: $small) {
  .calendar {
    gap: 20px;

    &__nav {
      @include flex-direction(column-reverse);
      @include flex-basis(100%);
      margin: 10px 0px;
    }

    &__nav--prev {
      @include order(1);
    }

    &__title {
      @include flex-basis(100%);
    }
  }

  .days-grid {
    @include flex-wrap;
    margin-top: 0px;
    padding: 0px 20px;
    gap: 10px;

    overflow-y: auto;

    .container {
      @include flex-direction(column);
      max-height: 600px;
    }

    .container:first-child {
      @include flex-basis(30%);
      background: $white;
    }

    .container:last-child {
      @include flex-wrap;
      @include flex-basis(70%);
    }

    &::-webkit-scrollbar-thumb {
      scrollbar-color: #d4aa70 #e4e4e4;
      scrollbar-width: thin;
    }

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #e4e4e4;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background-image: linear-gradient(
        180deg,
        $active-day 0%,
        $background-field 99%
      );
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    }

    &__day {
      width: 100%;
      min-height: 100px;
    }
  }
}

@media only screen and (max-width: 660px) {
  .days-grid {
    &__day {
      height: 80px;
    }
  }
}

@media only screen and (max-width: 300px) {
  .field {
    font-size: 13px;
  }
}
</style>
