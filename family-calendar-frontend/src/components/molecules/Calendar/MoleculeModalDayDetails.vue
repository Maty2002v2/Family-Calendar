<template>
  <molecule-modal :isShow="getShowModalDetailsOffDay" @closeModal="closeModal">
    <article class="molecule-modal-day-details">
      <section v-if="specialDayList.length > 0" class="details-of-day">
        <header class="details-of-day__header" role="complementary">
          <atom-title tag="h2" content="Details" class="details-of-day__h2" />
        </header>
        <div class="accordions">
          <molecule-accordion
            v-for="(specialDay, index) in specialDayList"
            :key="index"
            :showUnderline="true"
          >
            <template v-slot:title>
              <atom-icon
                :class="['accordions__icon', specialDay.icon_name]"
                :style="{ backgroundColor: specialDay.icon_color }"
              />
              <span class="accordions__title">
                {{ specialDay.title }}
              </span>
            </template>
            <template v-slot:content>
              <span class="accordions__content">
                {{ specialDay.description }}
              </span>
              <molecule-delete-day-button class="delete-button" :id="specialDay.id" />
            </template>
          </molecule-accordion>
        </div>
      </section>

      <section v-else class="info-about-lack-of-days">
        <atom-title tag="h2" :content="t('dayOff')" class="info-about-lack-of-days__h2" />
        <div class="info-about-lack-of-days__div">
          <atom-icon class="icon-ok" />
        </div>
      </section>
      <section class="create-holiday">
        <molecule-new-day-accordion :selectedDayNumber="selectedDayNumber" />
      </section>
    </article>
  </molecule-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from 'vue-i18n';

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomTitle from "@/components/atoms/AtomTitle.vue";
import MoleculeModal from "@/components/molecules/MoleculeModal.vue";
import MoleculeAccordion from "@/components/molecules/MoleculeAccordion.vue";
import MoleculeDeleteDayButton from "@/components/molecules/MoleculeDeleteDayButton.vue";
import MoleculeNewDayAccordion from "@/components/molecules/Calendar/MoleculeNewDayAccordion.vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/MainStore";

export default defineComponent({
  name: "MoleculeModalDayDetails",
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
    AtomIcon,
    AtomTitle,
    MoleculeModal,
    MoleculeAccordion,
    MoleculeNewDayAccordion,
    MoleculeDeleteDayButton,
  },
  setup() {
    const { getShowModalDetailsOffDay } = storeToRefs(useMainStore());
    const { switchShowNewDayForm, switchShowModalDetailsOffDay } =
      useMainStore();

    const { t } = useI18n();

    const closeModal = () => {
      switchShowModalDetailsOffDay(false);
      switchShowNewDayForm(false);
    };

    return { 
      getShowModalDetailsOffDay,
      closeModal,
      t
    };
  },
});
</script>

<style lang="scss" scoped>
.molecule-modal-day-details {
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
    padding: 10px;
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

.delete-button {
  padding-bottom: 10px;
}
</style>
