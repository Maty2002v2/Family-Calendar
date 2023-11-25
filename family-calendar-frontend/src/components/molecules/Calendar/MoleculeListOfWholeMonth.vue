<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomTitle from "@/components/atoms/AtomTitle.vue";
import AtomBackdrop from "@/components/atoms/AtomBackdrop.vue";
import MoleculeAccordion from "@/components/molecules/MoleculeAccordion.vue";
import MoleculeDeleteDayButton from "@/components/molecules/MoleculeDeleteDayButton.vue";

import { useMainStore } from "@/stores/MainStore";

import { useWidthWindow } from "@/composables/useWidthWindow";
import { useCalendarApi } from "@/composables/useCalendarApi";

const { t } = useI18n();
const { isMobile } = useWidthWindow();

const { switchAppModalState } = useMainStore();

const { daysOfTheMonth } = useCalendarApi();
const showList = ref(false);

const listButtonClassObject = computed(() => ({
  "molecule-list-of-whole-month__button": true,
  "molecule-list-of-whole-month__button--desabled": daysOfTheMonth.value.length < 1,
}));

const convertingDate = (
  number_year: number,
  number_month: number,
  number_day: number
) => {
  const date = new Date(`${number_year}-${number_month}-${number_day}`);
  return `
      ${t("namesDaysOfWeek." + date.getDay())}, 
      ${date.getDate()} ${t("months." + (date.getMonth() + 1))}`;
};

const switchActiveState = () => {
  if (!daysOfTheMonth.value.length) return;
  showList.value = !showList.value;
};

watch(showList, (newVlaue) => {
  switchAppModalState(newVlaue);
});
</script>

<template>
  <teleport to="#mobile-menu">
    <atom-backdrop
      :isShow="showList && daysOfTheMonth.length > 0"
      @clickBackdrop="showList = false"
    >
      <div class="molecule-list-of-whole-month">
        <Transition
          enter-active-class="animate__animated animate__faster animate__bounceInRight"
          leave-active-class="animate__animated animate__faster animate__bounceOut"
        >
          <div
            v-show="showList && daysOfTheMonth.length > 0"
            class="list molecule-list-of-whole-month__list"
            :class="[showList ? 'list molecule-list-of-whole-month__list--active' : '']"
          >
            <molecule-accordion
              v-for="(specialDay, index) in daysOfTheMonth"
              :key="index"
              :showUnderline="true"
            >
              <template v-slot:title>
                <atom-icon
                  class="list__icon"
                  :name="specialDay.icon_name"
                  :color="specialDay.icon_color"
                />
                <atom-title tag="h2" :content="specialDay.title" class="list__title" />
              </template>
              <template v-slot:content>
                <div class="list__content">
                  <span class="list__date">{{
                    convertingDate(
                      Number(specialDay.number_year),
                      Number(specialDay.number_month),
                      Number(specialDay.number_day)
                    )
                  }}</span>
                  <span class="list__description">
                    {{ specialDay.description }}
                  </span>
                </div>
                <molecule-delete-day-button class="delete-button" :id="specialDay.id" />
              </template>
            </molecule-accordion>
          </div>
        </Transition>
      </div>
    </atom-backdrop>
  </teleport>
  <div
    v-show="(!isMobile && daysOfTheMonth.length > 0) || isMobile"
    :class="listButtonClassObject"
    @click="switchActiveState"
  >
    <Transition
      enter-active-class="animate__animated animate__faster animate__bounceIn"
      leave-active-class="animate__animated animate__faster animate__bounceOut"
    >
      <span class="molecule-list-of-whole-month__counter" v-show="!showList">{{
        daysOfTheMonth.length
      }}</span>
    </Transition>
    <atom-icon name="CalendarDays" :stroke-width="3" />
  </div>
</template>

<style lang="scss" scoped>
.molecule-list-of-whole-month {
  @include position($position: fixed, $right: 10px, $bottom: 10px);
  width: 50px;
  height: 50px;
  margin-left: 10px;
  transform: translate(-50%, -50%);

  &__button {
    @include position($position: fixed, $bottom: 20px, $right: 20px);

    @include flexbox;
    @include flex-centering;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    color: $white;
    font-size: 30px;

    background: $main-color;

    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;

    &--desabled {
      opacity: 0.4;
    }
  }

  &__counter {
    @include position($top: 0px, $left: 0px);

    @include flexbox;
    @include flex-centering;
    width: 20px;
    height: 20px;
    border: 2px solid $main-color;
    border-radius: 50%;

    color: $main-font-color;
    font-size: 15px;
    font-weight: 600;

    background: $background-color;
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
    color: $main-font-color;
  }

  &__content {
    @include flexbox;
    @include flex-direction(column);
    @include justify-content(space-between);
    gap: 20px;
    font-size: 16px;
  }

  &__title {
    margin: 0px;
    font-size: 20px;
  }

  &__date {
    font-size: 17px;
  }
}

.delete-button {
  padding-bottom: 10px;
}

@media only screen and (max-width: $small) {
  .molecule-list-of-whole-month {
    &__button {
      @include position($position: static);
      transform: translate(0%, 0%);
    }
  }
}
</style>
