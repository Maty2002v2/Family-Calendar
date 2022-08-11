<template>
  <div class="create-holiday">
    <header
      class="create-holiday__header"
      role="complementary"
      @click="switchShowNewDayForm(!getShowNewDayForm)"
    >
      <h2 class="create-holiday__h2">Add a new day</h2>
      <span
        class="create-holiday__char-toggle"
        :class="{ 'create-holiday__char-toggle--active': getShowNewDayForm }"
      ></span>
    </header>
    <Transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <article v-show="getShowNewDayForm" class="create-holiday__content">
        <section class="create-holiday__form">
          <div class="create-holiday__input-wrapper">
            <label
              for="create-holiday__input"
              class="create-holiday__label-input"
              >Title <span class="create-holiday__any-span">*</span></label
            >
            <input
              type="text"
              v-model="title"
              :maxlength="15"
              id="create-holiday__input"
              class="create-holiday__input"
            />
            <app-input-counter
              class="create-holiday__input-counter"
              :inputLength="title.length"
              maxLength="15"
            />
          </div>
          <div class="create-holiday__textarea-wrapper">
            <label
              for="create-holiday__textarea"
              class="create-holiday__label-textarea"
              >Description
              <span class="create-holiday__any-span">*</span></label
            >
            <textarea
              id="create-holiday__textarea"
              v-model="description"
              class="create-holiday__textarea"
              rows="5"
              placeholder="Describe yourself here..."
              maxlength="50"
            ></textarea>
            <app-input-counter
              class="create-holiday__input-counter"
              :inputLength="description.length"
              maxLength="50"
            />
          </div>
          <div class="create-holiday__icon-selection-wrapper">
            <the-icon-selection
              class="create-holiday__icon-selection"
              @getIconDay="(value) => (iconDay = value)"
            />
            <div class="create-holiday__button-wrapper">
              <button class="create-holiday__button btn-pils" @click="addDay">
                add
              </button>
            </div>
          </div>
        </section>
      </article>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import TheIconSelection from "./IconSelection/TheIconSelection.vue";
import AppInputCounter from "../../AppInputCounter.vue";

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
    TheIconSelection,
    AppInputCounter,
  },
  setup(props) {
    const { getCalendarHash } = storeToRefs(useCalendarApiStore());
    const { addDayToCalendar } = useCalendarApiStore();

    const { getMounth, getYear } = storeToRefs(useDateStore());

    const { getShowNewDayForm } = storeToRefs(useMainStore());
    const { switchShowNewDayForm } = useMainStore();

    const title = ref("");
    const description = ref("");
    const iconDay = ref({ name: "icon-briefcase", color: "#DE5858" });

    const addDay = () => {
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
        to_repeat: "0",
      }).then(() => {
        title.value = "";
        description.value = "";
      });
    };

    const start = (el: HTMLElement) =>
      (el.style.height = el.scrollHeight + "px");
    const end = (el: HTMLElement) => (el.style.height = "");

    return {
      getShowNewDayForm,
      switchShowNewDayForm,
      start,
      end,
      addDay,
      title,
      description,
      iconDay,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-holiday {
  &__header {
    position: relative;
    padding: 20px 20px 20px 20px;
    box-sizing: border-box;

    background: $active-day;

    cursor: pointer;
  }

  &__h2 {
    margin: 0px;
    color: $white;
  }

  &__char-toggle {
    position: absolute;
    top: 50%;
    right: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    width: 40px;
    border-radius: 50%;

    color: $active-day;

    background: $white;

    transform: translate(50%, -50%);

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 2px;
      border-radius: 20px;
      background: $active-day;
      transform: translate(-50%, -50%);
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 2px;
      border-radius: 20px;
      background: $active-day;
      transition: all 0.2s ease;
      transform: translate(-50%, -50%) rotate(-90deg);
    }

    &--active {
      &:after {
        transform: translate(-50%, -50%) rotate(0deg);
      }
    }
  }

  &__form {
    display: flex;
    justify-content: center;
    // align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 30px;
    padding: 35px 20px;
    box-sizing: border-box;
    border: 5px solid $active-day;

    color: $color-day-field;
    font-size: 15px;
    font-weight: bold;
  }

  &__any-span {
    color: $active-day;
  }

  // &__input-wrapper {
  // }

  &__label-input {
    letter-spacing: 1px;
    display: block;
    margin-bottom: 10px;
  }

  &__input {
    width: 100%;
    line-height: 1.5;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;

    color: $color-day-field;
    font-size: 15px;

    transition: all 0.3s ease;
  }

  &__input:focus {
    outline-color: $active-day;
    box-shadow: 0px 0px 3px $active-day;
  }

  &__input-counter {
    margin: 5px;
    text-align: end;
  }

  // &__textarea-wrapper {
  // }

  &__textarea {
    padding: 10px;
    width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    resize: none;

    color: $color-day-field;
    font-size: 15px;

    transition: all 0.3s ease;
  }

  &__textarea:focus {
    outline-color: $active-day;
    box-shadow: 0px 0px 3px $active-day;
  }

  &__label-textarea {
    letter-spacing: 1px;
    display: block;
    margin-bottom: 10px;
  }

  &__icon-selection-wrapper {
    display: flex;
  }

  &__icon-selection {
    flex-basis: 50%;
  }

  &__button-wrapper {
    flex-basis: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

@media only screen and (max-width: 300px) {
  .create-holiday {
    &__icon-selection-wrapper {
      flex-wrap: wrap;
      gap: 40px;
    }

    &__icon-selection {
      flex-basis: 100%;
      justify-content: center;
    }

    &__button-wrapper {
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
