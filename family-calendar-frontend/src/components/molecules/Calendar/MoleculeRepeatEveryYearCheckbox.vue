<template>
  <div class="molecule-repeat-every-year-checkbox">
    <label class="molecule-repeat-every-year-checkbox__label"
      >Do you repeat every year</label
    >
    <div class="molecule-repeat-every-year-checkbox__content">
      <molecule-checkbox-form firstOption="Disposable" secoundOption="Repeat every year" @valueToggle="(value) => switchValue = value"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

import MoleculeCheckboxForm from "@/components/molecules/MoleculeCheckboxForm.vue";

export default defineComponent({
  name: "MoleculeRepeatEveryYearCheckbox",
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
.molecule-repeat-every-year-checkbox {
  @include flexbox;
  @include flex-direction(column);
  padding: 2px;
  box-sizing: border-box;

  letter-spacing: 1px;

  &__label {
    @include flex-basis(100%);
    margin-bottom: 10px;
  }

  &__content {
    @include flexbox;
    @include flex-centering(space-between, center);
  }
}

@media only screen and (max-width: $small) {
  .molecule-repeat-every-year-checkbox {
    &__content {
      @include flex-centering(flex-start, stretch);
      @include flex-direction(column);
    }
  }
}
</style>
