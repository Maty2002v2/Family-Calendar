<script setup lang="ts">
import { ref, computed, watch } from "vue";

import AtomAnimatedWrapper from "@/components/atoms/AtomAnimatedWrapper.vue";
import AtomLoader from "@/components/molecules/MoleculeLoader.vue";
import MoleculeCalendarNavigaion from "@/components/molecules/Calendar/MoleculeCalendarNavigation.vue";
import MoleculeNamesDaysOfWeek from "@/components/molecules/Calendar/MoleculeNamesDaysOfWeek.vue";
import MoleculeNotificationsWrapper from "@/components/molecules/MoleculeNotificationsWrapper.vue";
import MoleculeDayField from "@/components/molecules/Calendar/MoleculeDayField.vue";
import MoleculeDesktopMenu from "@/components/molecules/Menu/MoleculeDesktopMenu.vue";
import MoleculeMobileMenu from "@/components/molecules/Menu/MoleculeMobileMenu.vue";
import MoleculeModalDayDetails from "@/components/molecules/Calendar/MoleculeModalDayDetails.vue";
import MoleculeModalOfNewCalendar from "@/components/molecules/MoleculeModalOfNewCalendar.vue";
import MoleculeListOfWholeMonth from "@/components/molecules/Calendar/MoleculeListOfWholeMonth.vue";

import { storeToRefs } from "pinia";
import { useCalendarApi } from "@/composables/useCalendarApi";
import { useDateStore } from "@/stores/DateStore";
import { useMainStore } from "@/stores/MainStore";

import { useWidthWindow } from "@/composables/useWidthWindow";
import { useTheme } from "@/composables/useTheme";

const { getSortedDays, getCalendarHash, fetchDaysOfTheMonth } = useCalendarApi();

const dataStore = useDateStore();
const { getDay, getMounth, getYear, getDaysInMonth, getFirstMonthDay } = storeToRefs(
  useDateStore()
);

const { getLoadingCalendar } = storeToRefs(useMainStore());
const { switchShowModalDetailsOffDay } = useMainStore();

const { width } = useWidthWindow();
const { mode, tapSwitchMode } = useTheme();

const calendarTransitionAnimationName = ref("");

const isMobile = computed(() => width.value <= 460);

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

let indexOfSelectedDay = ref(0);
const showThisDay = (nrDay: number) => {
  indexOfSelectedDay.value = nrDay;
  switchShowModalDetailsOffDay(true);
};
</script>

<template>
  <atom-animated-wrapper class="calendar animate__fadeInDown full-height">
    <molecule-calendar-navigaion
      @setTransitionName="
        (transitionName) => (calendarTransitionAnimationName = transitionName)
      "
    />

    <div class="days-grid">
      <molecule-names-days-of-week />

      <atom-animated-wrapper
        class="container animate__fast"
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
          <molecule-day-field
            :nrDay="day"
            :specialDayList="getSortedDays[day - 1]"
            @click="showThisDay(day - 1)"
          />
        </div>
      </atom-animated-wrapper>

      <atom-loader v-else />
    </div>

    <teleport to="#mobile-menu">
      <molecule-mobile-menu />
    </teleport>

    <!-- modals -->
    <teleport to="#modal">
      <molecule-list-of-whole-month v-if="!isMobile" />
    </teleport>

    <teleport to="#modal">
      <molecule-modal-day-details
        :selectedDayNumber="indexOfSelectedDay"
        :specialDayList="getSortedDays[indexOfSelectedDay]"
      />
    </teleport>

    <teleport to="#modal">
      <molecule-modal-of-new-calendar />
    </teleport>

    <teleport to="#pnotify">
      <molecule-notifications-wrapper />
    </teleport>

    <molecule-desktop-menu class="molecule-desktop-menu" />
  </atom-animated-wrapper>
</template>

<style lang="scss">
$size-day-div: calc(100% / 7 - 5px);

.calendar {
  @include flexbox;
  @include flex-wrap(wrap);
  @include align-content(flex-start);
  width: 100%;
  height: 100vh;
  padding: 5px;
  box-sizing: border-box;
}

.molecule-desktop-menu {
  @include position($position: absolute, $bottom: 20px, $left: 20px);
  transform: translate(50%, -50%);
}

.days-grid {
  @include flexbox;
  @include flex-wrap(wrap);
  @include flex-basis(100%);
  max-width: 2100px;
  margin: 20px auto 0px auto;

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

    color: $main-font-color;

    background: $background-field;

    &:hover {
      background: $hover-day-field;
      cursor: pointer;
    }

    &--blank {
      border: none;
      background: none;
    }

    &--active {
      color: #fff;
      font-weight: bold;
      background: $main-color;

      &:hover {
        background: $hover-active-day;
      }
    }
  }
}

@media only screen and (max-width: $small) {
  .calendar {
    gap: 20px;
    padding: 5px 0px;
    margin-bottom: 100px;
  }

  .days-grid {
    @include flex-wrap;
    margin-top: 0px;
    padding: 0px;
    gap: 10px;

    justify-content: center;

    .container {
      @include flex-direction(column);
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
      background-image: linear-gradient(180deg, $main-color 0%, $background-field 99%);
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    }

    &__day {
      width: 100%;
      min-height: 100px;

      &--blank {
        display: none;
      }
    }
  }

  .molecule-desktop-menu {
    display: none;
  }
}

@media only screen and (max-width: 660px) {
  .days-grid {
    &__day {
      height: 120px;
    }
  }
}

@media only screen and (max-width: 300px) {
  .field {
    font-size: 13px;
  }
}
</style>
