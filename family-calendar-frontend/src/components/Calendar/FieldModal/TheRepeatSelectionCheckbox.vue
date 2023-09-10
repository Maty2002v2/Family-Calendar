<template>
  <div class="repeat-selection-checkbox">
    <div class="repeat-selection-checkbox__title">
      <label class="repeat-selection-checkbox__label"
        >Do you repeat every year</label
      >
    </div>
    <div class="repeat-selection-checkbox__content">
      <molecule-checkbox-form firstOption="Disposable" secoundOption="Repeat every year" @valueToggle="(value) => switchValue = value"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

import MoleculeCheckboxForm from "@/components/molecules/MoleculeCheckboxForm.vue";

export default defineComponent({
  name: "TheRepeatSelectionCheckbox",
  emits: ["getCheckboxValue"],
  components: {
    MoleculeCheckboxForm
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
}

@media only screen and (max-width: $small) {
  .repeat-selection-checkbox {
    &__content {
      @include flex-centering(flex-start, stretch);
      @include flex-direction(column);
    }
  }
}
</style>
