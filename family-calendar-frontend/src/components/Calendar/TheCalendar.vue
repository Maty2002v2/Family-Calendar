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
        v-if="!loading"
      >
        <div
          class="days-grid__day days-grid__day--blank no-select"
          v-for="day in getFirstMonthDay - 1"
          :key="day"
        >
          .
        </div>

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

    <teleport to="#modal">
      <the-field-modal
        v-show="showDetailsOfDay"
        :specialDayList="getSortedDays[indexOfSelectedDay]"
        @closeModal="showDetailsOfDay = false"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

import { storeToRefs } from "pinia";
import { useDateStore } from "../../stores/DateStore";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";

import NavigationButton from "./NavigationButton.vue";
import TheNameDayOfWeek from "./TheNameDayOfWeek.vue";
import TheTitle from "./TheTitle.vue";
import Field from "./Field.vue";
import AppLoader from "../AppLoader.vue";
import TheFieldModal from "./FieldModal/TheFieldModal.vue";

export default defineComponent({
  name: "TheCalendar",
  components: {
    NavigationButton,
    TheNameDayOfWeek,
    TheTitle,
    Field,
    AppLoader,
    TheFieldModal,
  },
  async setup() {
    const { getSortedDays } = storeToRefs(useCalendarApiStore());
    const { fetchDaysOfTheMonth } = useCalendarApiStore();

    const { getDay, getMounth, getYear, getDaysInMonth, getFirstMonthDay } =
      storeToRefs(useDateStore());

    let loading = ref(false);

    watch(
      useDateStore,
      async () => {
        loading.value = true;
        await fetchDaysOfTheMonth({
          calendarId: "uNK2r6j",
          numberMonth: getMounth.value.toString(),
        }).then(() => (loading.value = false));
      },
      { deep: true }
    );

    loading.value = true;
    await fetchDaysOfTheMonth({
      calendarId: "uNK2r6j",
      numberMonth: getMounth.value.toString(),
    }).then(() => (loading.value = false));

    let calendarTransitionAnimationName = ref("");
    const setTransitionName = (transitionName: string) => {
      calendarTransitionAnimationName.value = transitionName;
    };

    let showDetailsOfDay = ref(false);
    let indexOfSelectedDay = ref();
    const showThisDay = (nrDay: number) => {
      indexOfSelectedDay.value = nrDay;
      showDetailsOfDay.value = true;
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
      loading,
      calendarTransitionAnimationName,
      setTransitionName,
      showDetailsOfDay,
      indexOfSelectedDay,
      showThisDay,
    };
  },
});
</script>

<style lang="scss" scoped>
$size-day-div: calc(100% / 7 - 5px);

.calendar {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;

  &__nav {
    display: flex;
    justify-content: space-around;
    flex-basis: 40%;
    width: 100%;
  }

  &__title {
    flex-basis: 20%;
  }

  .days-grid {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 100%;
    margin-top: 20px;

    .container {
      display: flex;
      flex-wrap: wrap;
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
    }

    &__day:hover {
      background: $hover-blue;
      cursor: pointer;
    }

    &__day--blank {
      color: $background-field;
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
  }
}

@media only screen and (max-width: $small) {
  .calendar {
    flex-direction: column;
    // gap: 20px;

    &__nav {
      flex-direction: column-reverse;
      flex-basis: 100%;
      margin: 10px 0px;
    }

    &__nav--prev {
      order: 1;
    }

    &__title {
      flex-basis: 100%;
    }

    .days-grid {
      flex-wrap: nowrap;
      margin-top: 0px;
      padding: 0px 20px;
      gap: 10px;

      overflow-y: auto;

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

    .container {
      flex-direction: column;
      max-height: 600px;
    }

    .container:first-child {
      flex-basis: 30%;
      background: $white;
    }

    .container:last-child {
      flex-wrap: nowrap;
      flex-basis: 70%;
    }
  }
}

@media only screen and (max-width: 660px) {
  .calendar {
    .days-grid {
      &__day {
        height: 80px;
      }
    }
  }
}

@media only screen and (max-width: 300px) {
  .field {
    font-size: 13px;
  }
}
</style>
