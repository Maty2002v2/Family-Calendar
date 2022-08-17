<template>
  <div class="list-of-whole-month">
    <Transition
      enter-active-class="animate__animated animate__faster animate__bounceInRight"
      leave-active-class="animate__animated animate__faster animate__bounceOut"
    >
      <div
        v-show="showList"
        class="list list-of-whole-month__list"
        :class="[showList ? 'list list-of-whole-month__list--active' : '']"
      >
        <app-accordion v-for="(specialDay, index) in getDays" :key="index">
          <template v-slot:title>
            <i class="list__date">{{
              convertingDate(
                specialDay.number_year,
                specialDay.number_month,
                specialDay.number_day
              )
            }}</i>
            <i
              class="list__icon icon-demo"
              :class="[specialDay.icon_name]"
              :style="{ backgroundColor: specialDay.icon_color }"
            ></i>

            <span class="list__title">
              {{ specialDay.title }}
            </span>
          </template>
          <template v-slot:content>
            <span class="list__content">
              {{ specialDay.description }}
            </span>
          </template>
        </app-accordion>
      </div>
    </Transition>
    <div class="list-of-whole-month__button" @click="showList = !showList">
      <span class="list-of-whole-month__counter">{{ getDays.length }}</span>
      <i class="demo-icon icon-calendar"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import AppAccordion from "../AppAccordion.vue";

import { storeToRefs } from "pinia";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";

export default defineComponent({
  name: "TheListOfWholeMonth",
  components: {
    AppAccordion,
  },
  setup() {
    const { getDays } = storeToRefs(useCalendarApiStore());
    const showList = ref(false);

    const convertingDate = (
      number_year: number,
      number_month: number,
      number_day: number
    ) => {
      return `(${number_year} - ${
        number_month < 9 ? "0" + number_month : number_month
      } - ${number_day < 9 ? "0" + number_day : number_day})`;
    };

    return { showList, getDays, convertingDate };
  },
});
</script>

<style lang="scss" scoped>
.list-of-whole-month {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);

  &__button {
    position: absolute;
    top: 50%;
    left: 50%;

    @include flexbox;
    @include flex-centering;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    color: $white;
    font-size: 30px;

    background: $active-day;

    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }

  &__counter {
    position: absolute;
    top: 0px;
    left: 0px;

    @include flexbox;
    @include flex-centering;
    width: 20px;
    height: 20px;
    border: 2px solid $active-day;
    border-radius: 50%;

    color: $color-day-field;
    font-size: 15px;
    font-weight: 600;

    background: $white;

    // transform: translate(-50%, -50%);
  }

  &__list {
    position: absolute;
    bottom: -25px;
    right: -25px;

    width: 400px;
    padding-bottom: 100px;

    border: 1px solid $active-day;
    border-radius: 5px;

    background: $background-color;

    &--active {
    }
  }
}

.list {
  &__icon {
    @include flexbox;
    @include flex-centering;
    aspect-ratio: 1 / 1;
    width: 25px;
    border-radius: 50%;

    color: $white;
  }

  &__date,
  &__title,
  &__content {
    color: $color-day-field;
  }

  &__title {
    font-size: 20px;
  }
}
</style>
