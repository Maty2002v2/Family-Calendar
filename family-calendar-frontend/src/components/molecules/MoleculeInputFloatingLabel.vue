<template>
  <div class="molecule-input-floating-label">
    <atom-input
      type="text"
      class="input molecule-input-floating-label__input"
      :value="modelValue"
      @input="updateValue"
      :required="true"
    />
    <atom-input-label class="molecule-input-floating-label__label" :label="label" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AtomInput from "@/components/atoms/AtomInput.vue";
import AtomInputLabel from "@/components/atoms/AtomInputLabel.vue";

export default defineComponent({
  name: "MoleculeInputFloatingLabel",
  components: {
    AtomInput,
    AtomInputLabel
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const updateValue = (event: any) => {
      emit("update:modelValue", event.target.value);
    };

    return { updateValue };
  },
});
</script>

<style lang="scss" scoped>
.molecule-input-floating-label {
  position: relative;

  &__input {
    outline: none;
  }

  &__label {
    @include position($top: 50%, $left: 15px);

    color: $input-placeholder-color;

    user-select: none;
    pointer-events: none;
    transform: translateY(-50%) scale(0.8);
    transition: all 0.2s ease;
  }

  .input:focus ~ label,
  .input:valid ~ label {
    top: -15px;
    color: $main-color;
    letter-spacing: 1px;
    transform: translateY(-50%) scale(1.2);
  }
}
</style>
