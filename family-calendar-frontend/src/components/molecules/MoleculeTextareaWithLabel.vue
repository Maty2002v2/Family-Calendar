<template>
  <div class="molecule-textarea-with-label">
    <atom-input-label :inputId="textareaId" :label="label" :requaied="requaied" />
    <atom-textarea
      :modelValue="modelValue"
      :textareaId="textareaId"
      :maxLength="maxLength"
      :placeholder="placeholder"
      :rows="rows"
      class="molecule-textarea-with-label__textarea"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <atom-counter-for-input
      v-if="showCounter"
      :inputLength="modelValue.length"
      :maxLength="maxLength"
      class="molecule-textarea-with-label__length-counter"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from "vue";

import AtomInputLabel from "@/components/atoms/AtomInputLabel.vue";
import AtomTextarea from "@/components/atoms/AtomTextarea.vue";
import AtomCounterForInput from "@/components/atoms/AtomCounterForInput.vue";

export default defineComponent({
  name: "MoleculeTextareaWithText",
  components: {
    AtomInputLabel,
    AtomTextarea,
    AtomCounterForInput,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
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
    rows: {
      type: Number,
      default: 10,
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

    const textareaId = computed(() => `molecule-textarea-with-label-${uid}`);

    return {
      textareaId,
    };
  },
});
</script>
<style lang="scss">
.molecule-textarea-with-label {
  &__textarea {
    margin-bottom: 5px;
  }

  &__length-counter {
    text-align: end;
    margin: 5px;
  }
}
</style>
