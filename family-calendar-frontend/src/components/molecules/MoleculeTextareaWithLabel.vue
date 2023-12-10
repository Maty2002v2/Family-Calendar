<script setup lang="ts">
import { getCurrentInstance, computed } from "vue";

import AtomInputLabel from "@/components/atoms/AtomInputLabel.vue";
import AtomTextarea from "@/components/atoms/AtomTextarea.vue";
import AtomCounterForInput from "@/components/atoms/AtomCounterForInput.vue";

interface Props {
  modelValue: string,
  placeholder: string,
  maxLength: number | null,
  label: string,
  rows: number,
  requaied: boolean,
  showCounter: boolean,
}

withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "",
  maxLength: null,
  label: "",
  rows: 10,
  requaied: false,
  showCounter: false,
});

const componentInstance = getCurrentInstance();
let uid = 0;

if(componentInstance) {
  uid = componentInstance.uid;
}

const textareaId = computed(() => `molecule-textarea-with-label-${uid}`);
</script>

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
