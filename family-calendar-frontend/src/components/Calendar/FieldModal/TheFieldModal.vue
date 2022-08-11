<template>
  <div class="field-modal" @click.self="closeModal">
    <article class="field-modal__content">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppAccordion from "../../AppAccordion.vue";
import TheNewDayAccordion from "./TheNewDayAccordion.vue";

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
    AppAccordion,
    TheNewDayAccordion,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const { switchShowNewDayForm } = useMainStore();

    const closeModal = () => {
      emit("closeModal");
      switchShowNewDayForm(false);
    };

    return { closeModal };
  },
});
</script>

<style lang="scss" scoped>
.field-modal {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100vw;
  min-height: 100%;
  padding-top: 10vh;
  padding-bottom: 10vh;
  box-sizing: border-box;

  background: rgba($color: #000000, $alpha: 0.3);

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
    margin: 10px;
    border-radius: 5px;

    background: $background-color;
  }
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
    display: flex;
    justify-content: center;
    align-items: center;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    padding: 10px;
    border: 2px solid $active-day;
    border-radius: 50%;
    margin: auto;
    box-sizing: border-box;

    color: $active-day;
    font-size: 30px;

    background: $white;
  }
}
</style>
