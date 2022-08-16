<template>
  <app-modal :isShow="getShowModalDetailsOffDay" @closeModal="closeModal">
    <article class="field-modal">
      <section v-if="specialDayList.length > 0" class="details-of-day">
        <header class="details-of-day__header" role="complementary">
          <h2 class="details-of-day__h2">Details</h2>
        </header>
        <div class="accordions">
          <app-accordion
            v-for="(specialDay, index) in specialDayList"
            :key="index"
          >
            <template v-slot:title>
              <i
                class="accordions__icon icon-demo"
                :class="[specialDay.icon_name]"
                :style="{ backgroundColor: specialDay.icon_color }"
              ></i>
              <span class="accordions__title">
                {{ specialDay.title }}
              </span>
            </template>
            <template v-slot:content>
              <span class="accordions__content">
                {{ specialDay.description }}
              </span>
            </template>
          </app-accordion>
        </div>
      </section>

      <section v-else class="info-about-lack-of-days">
        <h2 class="info-about-lack-of-days__h2">You have a day off!</h2>
        <div class="info-about-lack-of-days__div">
          <i class="demo-icon icon-ok"></i>
        </div>
      </section>
      <section class="create-holiday">
        <the-new-day-accordion :selectedDayNumber="selectedDayNumber" />
      </section>
    </article>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppModal from "../../AppModal.vue";
import AppAccordion from "../../AppAccordion.vue";
import TheNewDayAccordion from "./TheNewDayAccordion.vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../../../stores/MainStore";

export default defineComponent({
  name: "TheFieldModal",
  props: {
    selectedDayNumber: {
      type: Number,
      required: true,
    },
    specialDayList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    AppModal,
    AppAccordion,
    TheNewDayAccordion,
  },
  setup() {
    const { getShowModalDetailsOffDay } = storeToRefs(useMainStore());
    const { switchShowNewDayForm, switchShowModalDetailsOffDay } =
      useMainStore();

    const closeModal = () => {
      switchShowModalDetailsOffDay(false);
      switchShowNewDayForm(false);
    };

    return { getShowModalDetailsOffDay, closeModal };
  },
});
</script>

<style lang="scss" scoped>
.field-modal {
  @include flexbox;
  @include flex-direction(column);
  gap: 20px;
  width: 500px;
  height: 50%;
  margin: 10px;
  border-radius: 5px;

  background: $background-color;
}

.details-of-day {
  &__header {
    padding: 20px 0px 20px 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-sizing: border-box;
    background: $active-day;
  }

  &__h2 {
    margin: 0px;
    color: $white;
  }
}

.accordions {
  &__icon {
    @include flexbox;
    @include flex-centering;
    aspect-ratio: 1 / 1;
    width: 25px;
    border-radius: 50%;

    color: $white;
  }

  &__title {
    color: $color-day-field;
    font-size: 20px;
  }

  &__content {
    color: $color-day-field;
  }
}

.info-about-lack-of-days {
  &__h2 {
    text-align: center;
    color: $active-day;
    font-size: 30px;
    font-weight: 500;
  }

  &__div {
    @include flexbox;
    @include flex-centering;
    width: 50px;
    height: 50px;
    padding: 10px;
    border: 2px solid $active-day;
    border-radius: 50%;
    @include margin-auto;
    box-sizing: border-box;

    color: $active-day;
    font-size: 30px;

    background: $white;
  }
}
</style>
