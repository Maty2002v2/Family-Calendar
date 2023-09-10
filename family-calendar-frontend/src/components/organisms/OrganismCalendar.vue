<template>
  <div class="calendar animate__animated animate__fadeInDown">
    <molecule-calendar-navigaion @setTransitionName="(transitionName) => calendarTransitionAnimationName = transitionName" />

    <div class="days-grid">
      <div class="container">
        <molecule-names-days-of-week :totalNumberFields="totalNumberFields" />
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
          <molecule-day-field
            :nrDay="day"
            :specialDayList="getSortedDays[day - 1]"
            @click="showThisDay(day - 1)"
          />
        </div>
      </div>

      <div v-else style="width: 100%">
        <atom-loader />
      </div>
    </div>

    <molecule-list-of-whole-month />

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
      <app-pnotify />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import MoleculeCalendarNavigaion from "@/components/molecules/Calendar/MoleculeCalendarNavigation.vue"
import MoleculeNamesDaysOfWeek from "@/components/molecules/Calendar/MoleculeNamesDaysOfWeek.vue";
import MoleculeDayField from "@/components/molecules/Calendar/MoleculeDayField.vue";
import AtomLoader from "@/components/atoms/AtomLoader.vue";
import MoleculeModalDayDetails from "@/components/molecules/Calendar/MoleculeModalDayDetails.vue";
import MoleculeModalOfNewCalendar from "@/components/molecules/MoleculeModalOfNewCalendar.vue";
import MoleculeListOfWholeMonth from "@/components/molecules/Calendar/MoleculeListOfWholeMonth.vue";
import AppPnotify from "../AppPnotify.vue";

import { storeToRefs } from "pinia";
import { useCalendarApiStore } from "@/stores/CalendarApiStore";
import { useDateStore } from "@/stores/DateStore";
import { useMainStore } from "@/stores/MainStore";

export default defineComponent({
  name: "OrganismCalendar",
  components: {
    MoleculeCalendarNavigaion,
    MoleculeNamesDaysOfWeek,
    MoleculeDayField,
    AtomLoader,
    MoleculeModalDayDetails,
    MoleculeModalOfNewCalendar,
    MoleculeListOfWholeMonth,
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

    const calendarTransitionAnimationName = ref('');

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
