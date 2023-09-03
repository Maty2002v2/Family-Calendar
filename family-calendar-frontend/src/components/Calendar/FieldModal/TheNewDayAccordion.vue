<template>
  <div class="create-holiday">
  <molecule-accordion 
    :accordionHeaderStyle="accordionHeaderStyles" 
    :showContent="getShowNewDayForm"
    @update:showContent="newValue => switchShowNewDayForm(newValue)">

    <template v-slot:title>
      <h2 class="create-holiday__h2 ">Add a new day</h2>
    </template>
    <template v-slot:char-toggle>
      <span
        class="create-holiday__char-toggle"
        :class="{ 'create-holiday__char-toggle--active': getShowNewDayForm }"
      ></span>
    </template>

    <template v-slot:content>
      <div class="create-holiday__content">
        <form class="form create-holiday__form">
          <div class="form__input-container">
            <molecule-input-with-label 
              v-model="title"
              :maxLength="15" 
              placeholder="Meeting with in-laws..."
              label="Title"
              :requaied="true"
            />
            <atom-counter-for-input
              class="form__input-counter"
              :inputLength="title.length"
              :maxLength="15"
            />
          </div>
          <div class="form__textarea-container">
            <label for="form__description-textarea" class="form__label-textarea"
              >Description <span class="form__optional-span">*</span></label
            >
            <textarea
              id="form__description-textarea"
              v-model="description"
              class="form__description"
              rows="5"
              placeholder="At 15:00. Don't be drunk..."
              maxlength="50"
            ></textarea>
            <atom-counter-for-input
              class="form__input-counter"
              :inputLength="description.length"
              :maxLength="50"
            />
          </div>
          <div class="form-repeat-selection">
            <the-repeat-selection-checkbox @getCheckboxValue="setToRepeat" />
          </div>
          <div class="form__icon-selection-container">
            <the-icon-selection
              class="form__icon-selection"
              @getIconDay="(value) => (iconDay = value)"
            />
            <div class="form__button-container">
              <atom-pill-button
                :jelloAniamted="titleOfButton === 'give data'"
                @click="addDay"
              >
                {{ titleOfButton }}
              </atom-pill-button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </molecule-accordion>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";

import MoleculeAccordion from "@/components/molecules/MoleculeAccordion.vue";
import AtomPillButton from "../../atoms/AtomPillButton.vue";
import TheIconSelection from "./IconSelection/TheIconSelection.vue";
import AtomCounterForInput from "@/components/atoms/AtomCounterForInput.vue";
import MoleculeInputWithLabel from '@/components/molecules/MoleculeInputWithLabel.vue';
import TheRepeatSelectionCheckbox from "./TheRepeatSelectionCheckbox.vue";

import { storeToRefs } from "pinia";
import { useCalendarApiStore } from "../../../stores/CalendarApiStore";
import { useDateStore } from "../../../stores/DateStore";
import { useMainStore } from "../../../stores/MainStore";

export default defineComponent({
  name: "TheNewDayAccordion",
  props: {
    selectedDayNumber: {
      type: Number,
      required: true,
    },
  },
  components: {
    MoleculeInputWithLabel,
    MoleculeAccordion,
    AtomPillButton,
    TheIconSelection,
    AtomCounterForInput,
    TheRepeatSelectionCheckbox,
  },
  setup(props) {
    const { getCalendarHash } = storeToRefs(useCalendarApiStore());
    const { addDayToCalendar } = useCalendarApiStore();

    const { getMounth, getYear } = storeToRefs(useDateStore());

    const { getShowNewDayForm } = storeToRefs(useMainStore());
    const { switchShowNewDayForm } = useMainStore();

    const title = ref("");
    const description = ref("");
    const toRepeat = ref(false);
    const iconDay = ref({ name: "icon-briefcase", color: "#DE5858" });
    const titleOfButton = ref("add");
    const showAccordionContent = ref(getShowNewDayForm.value);

    const accordionHeaderStyles = reactive({
      background: '#F15C5C',
      position: 'relative',
    });

    const correctData = computed(
      () => title.value.length > 0 && description.value.length  > 0
    );

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
        if (titleOfButton.value === "add") {
          titleOfButton.value = "give data";
          setTimeout(() => (titleOfButton.value = "add"), 2000);
        }
      }
    };

    const setToRepeat = (value: boolean) => (toRepeat.value = value);

    const start = (el: HTMLElement) =>
      (el.style.height = el.scrollHeight + "px");
    const end = (el: HTMLElement) => (el.style.height = "");

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
      start,
      end,
      addDay,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-holiday {
  &__header {
    position: relative;
    padding: 20px;
    box-sizing: border-box;

    background: $active-day;

    cursor: pointer;
  }

  &__h2 {
    margin: 0px;
    color: $white;
  }

  %pseudo-elements {
    content: "";
    @include position(absolute, 50%, 0, 0, 50%);
    width: 50%;
    height: 2px;
    border-radius: 20px;
    background: $active-day;
  }

  &__char-toggle {
    @include position($top: 50%, $right: 40px);

    @include flexbox;
    @include flex-centering;
    aspect-ratio: 1/1;
    width: 40px;
    border-radius: 50%;

    color: $active-day;

    background: $white;

    transform: translate(50%, -50%);

    &:before {
      @extend %pseudo-elements;
      transform: translate(-50%, -50%);
    }

    &:after {
      @extend %pseudo-elements;
      transition: all 0.2s ease;
      transform: translate(-50%, -50%) rotate(-90deg);
    }

    &--active {
      &:after {
        transform: translate(-50%, -50%) rotate(0deg);
      }
    }
  }
}

.form {
  @include flexbox;
  @include justify-content(center);
  @include flex-direction(column);
  @include flex-wrap(wrap);
  gap: 30px;
  padding: 35px 20px;
  box-sizing: border-box;
  border: 5px solid $active-day;

  color: $color-day-field;
  font-size: 15px;
  font-weight: bold;

  &__optional-span {
    color: $active-day;
  }

  &__title,
  &__description {
    width: 100%;
    line-height: 1.5;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;

    color: $color-day-field;
    font-size: 15px;
    letter-spacing: 1px;

    transition: all 0.3s ease;
  }

  &__title:focus {
    outline-color: $active-day;
    box-shadow: 0px 0px 3px $active-day;
  }

  &__input-counter {
    text-align: end;
    margin: 5px;
  }

  &__description {
    resize: none;
  }

  &__description:focus {
    outline-color: $active-day;
    box-shadow: 0px 0px 3px $active-day;
  }

  &__label-textarea {
    display: block;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }

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

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
