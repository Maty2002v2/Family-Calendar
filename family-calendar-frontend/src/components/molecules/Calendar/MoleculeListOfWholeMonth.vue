<template>
  <teleport to='#mobile-menu'>
    <atom-backdrop :isShow="showList && getDays.length > 0" @clickBackdrop="showList = false" >
    <div class="molecule-list-of-whole-month">
      <Transition
        enter-active-class="animate__animated animate__faster animate__bounceInRight"
        leave-active-class="animate__animated animate__faster animate__bounceOut"
      >
        <div
          v-show="showList && getDays.length > 0"
          class="list molecule-list-of-whole-month__list"
          :class="[showList ? 'list molecule-list-of-whole-month__list--active' : '']"
        >
          <molecule-accordion 
            v-for="(specialDay, index) in getDays" 
            :key="index"
            :showUnderline="true">
            <template v-slot:title>
              <span class="list__date">{{
                convertingDate(
                  specialDay.number_year,
                  specialDay.number_month,
                  specialDay.number_day
                )
              }}</span>
              <atom-icon
                :class="['list__icon', specialDay.icon_name]"
                :style="{ backgroundColor: specialDay.icon_color }"
              />
            </template>
            <template v-slot:content>
              <div class="list__content">
                <atom-title tag="h2" :content="specialDay.title" class="list__title" />
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
      v-show="(!isMobile && getDays.length > 0) || isMobile"
      :class="listButtonClassObject"
      @click="switchShowListAction"
    >
      <Transition
        enter-active-class="animate__animated animate__faster animate__bounceIn"
        leave-active-class="animate__animated animate__faster animate__bounceOut"
      >
        <span class="molecule-list-of-whole-month__counter" v-show="!showList">{{
          getDays.length
        }}</span>
      </Transition>
      <atom-icon class="icon-calendar" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomTitle from "@/components/atoms/AtomTitle.vue";
import AtomBackdrop from '@/components/atoms/AtomBackdrop.vue';
import MoleculeAccordion from "@/components/molecules/MoleculeAccordion.vue";
import MoleculeDeleteDayButton from "@/components/molecules/MoleculeDeleteDayButton.vue";

import { useWidthWindow } from "@/composables/useWidthWindow";

import { useCalendarApiStore } from "@/stores/CalendarApiStore";
import { useMainStore } from '@/stores/MainStore';

export default defineComponent({
name: "MoleculeListOfWholeMonth",
components: {
  AtomIcon,
  AtomTitle,
  AtomBackdrop,
  MoleculeAccordion,
  MoleculeDeleteDayButton,
},
setup() {
  const { isMobile } = useWidthWindow();

  const { switchAppModalState } = useMainStore();

  const { getDays } = storeToRefs(useCalendarApiStore());
  const showList = ref(false);

  const listButtonClassObject = computed(() => ({
    'molecule-list-of-whole-month__button': true,
    'molecule-list-of-whole-month__button--desabled': getDays.value.length < 1,
  }))

  const convertingDate = (
    number_year: number,
    number_month: number,
    number_day: number
  ) => {
    return `(${number_year} - ${
      number_month < 9 ? "0" + number_month : number_month
    } - ${number_day < 9 ? "0" + number_day : number_day})`;
  };

  const switchShowListAction = () => {
    if(getDays.value.length > 0) {
      showList.value = !showList.value;
    }
  };

  watch(showList , (newVlaue) => {
    switchAppModalState(newVlaue);
  })

  return {
    isMobile,
    showList, 
    getDays,
    listButtonClassObject,
    convertingDate,
    switchShowListAction,
  };
},
});
</script>

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
}

&__title {
  margin: 0px;
  font-size: 20px;
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
