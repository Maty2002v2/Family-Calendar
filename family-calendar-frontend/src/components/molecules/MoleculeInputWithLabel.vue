<template>
  <div class="molecule-input-with-label">
    <atom-input-label :inputId="inputId" :label="label" :requaied="requaied" />
    <atom-input
      :type="type"
      :modelValue="modelValue"
      :placeholder="placeholder"
      :maxLength="maxLength"
      :inputId="inputId"
      class="molecule-input-with-label__input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <atom-counter-for-input
      v-if="showCounter"
      :inputLength="modelValue.length"
      :maxLength="maxLength"
      class="molecule-input-with-label__length-counter"
    />
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, computed } from "vue";

import AtomInput from "@/components/atoms/AtomInput.vue";
import AtomInputLabel from "@/components/atoms/AtomInputLabel.vue";
import AtomCounterForInput from "@/components/atoms/AtomCounterForInput.vue";

export default {
  name: "MoleculeInputWithLabel",
  components: {
    AtomInput,
    AtomInputLabel,
    AtomCounterForInput,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value: string) {
        return ["text", "email", "tel", "number"].includes(value);
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    requaied: {
      type: Boolean,
      default: false,
    },
    showCounter: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const componentInstance = getCurrentInstance();
    let uid = 0;

    if(componentInstance) {
      uid = componentInstance.uid;
    }

    const inputId = computed(() => `molecule-input-with-label-${uid}`);

    return {
      inputId,
    };
  },
};
</script>

<style lang="scss" scoped>
.molecule-input-with-label {
  &__input {
    margin-bottom: 5px;
  }

  &__length-counter {
    text-align: end;
    margin: 5px;
  }
}
</style>
