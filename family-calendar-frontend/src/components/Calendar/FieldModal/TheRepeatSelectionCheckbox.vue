<template>
  <div class="repeat-selection-checkbox">
    <div class="repeat-selection-checkbox__title">
      <label class="repeat-selection-checkbox__label"
        >Do you repeat every year</label
      >
    </div>
    <div class="repeat-selection-checkbox__content">
      <p
        class="repeat-selection-checkbox__p"
        :class="{ 'repeat-selection-checkbox__p--active': !switchValue }"
      >
        Disposable
      </p>
      <atom-checkbox-input class="repeat-selection-checkbox__switch" v-model:checked="switchValue" />
      <p
        class="repeat-selection-checkbox__p"
        :class="{ 'repeat-selection-checkbox__p--active': switchValue }"
      >
        Repeat every year
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

import AtomCheckboxInput from "@/components/atoms/AtomCheckboxInput.vue";

export default defineComponent({
  name: "TheRepeatSelectionCheckbox",
  emits: ["getCheckboxValue"],
  components: {
    AtomCheckboxInput
  },
  setup(props, { emit }) {
    const switchValue = ref(false);

    watchEffect(() => emit("getCheckboxValue", switchValue.value));

    return { switchValue };
  },
});
</script>

<style lang="scss" scoped>
.repeat-selection-checkbox {
  @include flexbox;
  @include flex-direction(column);
  padding: 2px;
  box-sizing: border-box;

  letter-spacing: 1px;

  &__title {
    margin-bottom: 10px;
  }

  &__label {
    @include flex-basis(100%);
  }

  &__content {
    @include flexbox;
    @include flex-centering(space-between, center);
  }

  &__switch {
    @include flex-basis((100% / 3));
  }

  &__p {
    @include flex-basis((100% / 3));
    font-weight: 600;
    white-space: nowrap;
    transition: all 0.3s ease;

    &--active {
      color: $active-day;
    }
  }
}

@media only screen and (max-width: $small) {
  .repeat-selection-checkbox {
    &__content {
      @include flex-centering(flex-start, stretch);
      @include flex-direction(column);
    }

    &__switch,
    &__p {
      @include flex-basis(100%);
    }
  }

  .switch {
    min-height: 34px;
  }
}
</style>
