<template>
  <div style="z-index: 2">
    <atom-backdrop :isShow="showList && getDays.length > 0" @clickBackdrop="showList = false" />
    <div class="list-of-whole-month">
      <Transition
        enter-active-class="animate__animated animate__faster animate__bounceInRight"
        leave-active-class="animate__animated animate__faster animate__bounceOut"
      >
        <div
          v-show="showList && getDays.length > 0"
          class="list list-of-whole-month__list"
          :class="[showList ? 'list list-of-whole-month__list--active' : '']"
        >
          <app-accordion v-for="(specialDay, index) in getDays" :key="index">
            <template v-slot:title>
              <span class="list__date">{{
                convertingDate(
                  specialDay.number_year,
                  specialDay.number_month,
                  specialDay.number_day
                )
              }}</span>
              <i
                class="list__icon icon-demo"
                :class="[specialDay.icon_name]"
                :style="{ backgroundColor: specialDay.icon_color }"
              ></i>
            </template>
            <template v-slot:content>
              <div class="list__content">
                <h2 class="list__title">
                  {{ specialDay.title }}
                </h2>
                <span class="list__description">
                  {{ specialDay.description }}
                </span>
              </div>
              <app-delete-day-button :id="specialDay.id" />
            </template>
          </app-accordion>
        </div>
      </Transition>
      <div
        class="list-of-whole-month__button"
        @click="showList = !showList"
        v-show="getDays.length"
      >
        <Transition
          enter-active-class="animate__animated animate__faster animate__bounceIn"
          leave-active-class="animate__animated animate__faster animate__bounceOut"
        >
          <span class="list-of-whole-month__counter" v-show="!showList">{{
            getDays.length
          }}</span>
        </Transition>
        <i class="demo-icon icon-calendar"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import AtomBackdrop from '../atoms/AtomBackdrop.vue';
import AppAccordion from "../AppAccordion.vue";
import AppDeleteDayButton from "../AppDeleteDayButton.vue";

import { storeToRefs } from "pinia";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";

export default defineComponent({
  name: "TheListOfWholeMonth",
  components: {
    AtomBackdrop,
    AppAccordion,
    AppDeleteDayButton,
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
  @include position($position: fixed, $right: 10px, $bottom: 10px);
  width: 50px;
  height: 50px;
  margin-left: 10px;
  transform: translate(-50%, -50%);

  &__button {
    @include position($top: 50%, $left: 50%);

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
    @include position($top: 0px, $left: 0px);

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
  }

  &__list {
    @include position($bottom: -25px, $right: -25px);
  }
}

.list {
  @extend .custom-scrollbar;
  width: min(400px, (100vw - 20px));
  max-height: 90vh;
  padding: 10px 10px 100px 10px;
  border: 2px solid rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  box-sizing: border-box;
  overflow-y: auto;

  background: $background-color;

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

  &__content {
    @include flexbox;
    @include flex-direction(column);
    @include justify-content(space-between);
    gap: 20px;
  }

  &__title {
    margin: 0px;
    font-size: 20px;
  }
}

@media only screen and (max-width: $small) {
  .list-of-whole-month {
    &__button {
      transform: translate(0%, 0%);
    }
  }
}
</style>
