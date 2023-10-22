<template>
  <div class="molecule-new-day-accordion">
    <molecule-accordion
      :accordionHeaderStyle="accordionHeaderStyles"
      :showContent="getShowNewDayForm"
      @update:showContent="(newValue) => switchShowNewDayForm(newValue)"
    >
      <template v-slot:title>
        <atom-title tag="h2" :content="t('addToDayModal.AddToDay')" class="molecule-new-day-accordion__h2" />
      </template>
      <template v-slot:char-toggle>
        <atom-plus-minus-switch class="char-toggle" :isOpen="getShowNewDayForm" />
      </template>

      <template v-slot:content>
        <div class="molecule-new-day-accordion__content">
          <form class="form molecule-new-day-accordion__form">
            <molecule-input-with-label
              v-model="title"
              :maxLength="15"
              :placeholder="t('addToDayModal.placeholders.title')"
              :label="t('addToDayModal.Title')"
              :requaied="true"
              :showCounter="true"
            />
            <molecule-textarea-with-label
              v-model="description"
              :placeholder="t('addToDayModal.placeholders.description')"
              :label="t('addToDayModal.Description')"
              :maxLength="50"
              :rows="2"
              :requaied="true"
              :showCounter="true"
            />
            <div class="form-repeat-selection">
              <molecule-repeat-every-year-checkbox @getCheckboxValue="setToRepeat" />
            </div>
            <div class="form__icon-selection-container">
              <molecule-customization-day-icon
                class="form__icon-selection"
                @getIconDay="(value) => (iconDay = value)"
              />
              <div class="form__button-container">
                <molecule-pill-button
                  :jelloAniamted="titleOfButton === t('addToDayModal.giveData')"
                  @click="addDay"
                >
                  {{ titleOfButton }}
                </molecule-pill-button>
              </div>
            </div>
          </form>
        </div>
      </template>
    </molecule-accordion>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useI18n } from 'vue-i18n';
import { storeToRefs } from "pinia";

import AtomPlusMinusSwitch from "@/components/atoms/AtomPlusMinusSwitch.vue";
import AtomTitle from "@/components/atoms/AtomTitle.vue";
import MoleculeTextareaWithLabel from "@/components/molecules/MoleculeTextareaWithLabel.vue";
import MoleculeAccordion from "@/components/molecules/MoleculeAccordion.vue";
import MoleculePillButton from "@/components/molecules/MoleculePillButton.vue";
import MoleculeCustomizationDayIcon from "@/components/molecules/Calendar/MoleculeCustomizationDayIcon.vue";
import MoleculeInputWithLabel from "@/components/molecules/MoleculeInputWithLabel.vue";
import MoleculeRepeatEveryYearCheckbox from "@/components/molecules/Calendar/MoleculeRepeatEveryYearCheckbox.vue";

import { useDateStore } from "@/stores/DateStore";
import { useMainStore } from "@/stores/MainStore";

import { useCalendarApi } from "@/composables/useCalendarApi";
import { useTheme } from '@/composables/useTheme';

export default defineComponent({
  name: "MoleculeNewDayAccordion",
  props: {
    selectedDayNumber: {
      type: Number,
      required: true,
    },
  },
  components: {
    AtomPlusMinusSwitch,
    AtomTitle,
    MoleculeTextareaWithLabel,
    MoleculeInputWithLabel,
    MoleculeAccordion,
    MoleculePillButton,
    MoleculeCustomizationDayIcon,
    MoleculeRepeatEveryYearCheckbox,
  },
  setup(props) {
    const { mainColor } = useTheme();
    
    const { getCalendarHash, addDayToCalendar } = useCalendarApi();

    const { getMounth, getYear } = storeToRefs(useDateStore());

    const { getShowNewDayForm } = storeToRefs(useMainStore());
    const { switchShowNewDayForm } = useMainStore();
    
    const { t } = useI18n();

    const title = ref("");
    const description = ref("");
    const toRepeat = ref(false);
    const iconDay = ref({ name: "icon-briefcase", color: "#DE5858" });
    const titleOfButton = ref(t('addToDayModal.add'));
    const showAccordionContent = ref(getShowNewDayForm.value);

    const accordionHeaderStyles = computed(() => ({
      background: mainColor.value,
      position: "relative",
    }));

    const correctData = computed(
      () => title.value.length > 0 && description.value.length > 0
    );

    const translatedAddToDay = computed(() => t('addToDayModal.add'));
    const translatedGiveData = computed(() => t('addToDayModal.giveData'));

    const addDay = () => {
      if (correctData.value) {
        addDayToCalendar({
          calendar_id: getCalendarHash.value,
          number_day: (props.selectedDayNumber + 1).toString(),
          number_month: (getMounth.value + 1).toString(),
          number_year: getYear.value.toString(),
          title: title.value,
          description: description.value,
          icon_name: iconDay.value.name,
          icon_color: iconDay.value.color,
          category_day: "0",
          to_repeat: (+toRepeat.value).toString(),
        }).then(() => {
          title.value = "";
          description.value = "";
        });
      } else {
        if (titleOfButton.value === translatedAddToDay.value) {
          titleOfButton.value = translatedGiveData.value;
          setTimeout(() => (titleOfButton.value = translatedAddToDay.value), 2000);
        }
      }
    };

    const setToRepeat = (value: boolean) => (toRepeat.value = value);

    watch(translatedAddToDay, (newValue) => {
      titleOfButton.value = newValue;
    });

    return {
      showAccordionContent,
      getShowNewDayForm,
      title,
      description,
      iconDay,
      titleOfButton,
      accordionHeaderStyles,
      switchShowNewDayForm,
      setToRepeat,
      addDay,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.molecule-new-day-accordion {
  &__header {
    position: relative;
    padding: 20px;
    box-sizing: border-box;

    background: $main-color;

    cursor: pointer;
  }

  &__h2 {
    margin: 0px;
    color: $modal-headers-color;
  }
}

.char-toggle {
  @include position($top: 50%, $right: 40px);

  @include flexbox;
  @include flex-centering;
  aspect-ratio: 1/1;
  width: 40px;
  border-radius: 50%;

  color: $main-color;

  background: $modal-headers-color;

  transform: translate(50%, -50%);
}
.form {
  @include flexbox;
  @include justify-content(center);
  @include flex-direction(column);
  @include flex-wrap(wrap);
  gap: 30px;
  padding: 35px 20px;
  box-sizing: border-box;
  border: 5px solid $main-color;
  border-top: none;

  color: $main-font-color;
  font-size: 15px;
  font-weight: bold;

  &__icon-selection-container {
    @include flexbox;
  }

  &__icon-selection {
    @include flex-basis(50%);
  }

  &__button-container {
    @include flex-basis(50%);
    @include flexbox;
    @include flex-centering(flex-end, center);
  }
}



@media only screen and (max-width: $small) {
  .form {
    gap: 13px;
    padding: 18px 15px 15px 15px;
  }
}

@media only screen and (max-width: 300px) {
  .form {
    &__icon-selection-container {
      @include flex-wrap(wrap);
      gap: 40px;
    }

    &__icon-selection,
    &__button-container {
      flex-basis: 100%;
      justify-content: center;
    }
  }
}
</style>