<script setup lang="ts">
import { getCurrentInstance, computed } from "vue";

import AtomInput from "@/components/atoms/AtomInput.vue";
import AtomInputLabel from "@/components/atoms/AtomInputLabel.vue";
import AtomCounterForInput from "@/components/atoms/AtomCounterForInput.vue";

type InputTypes = "text" | "email" | "tel" | "number";

interface Props { 
  modelValue: string,
  type?: InputTypes,
  placeholder: string,
  maxLength: number,
  label: string,
  requaied: boolean,
  showCounter: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text'
});

const componentInstance = getCurrentInstance();
let uid = 0;

if(componentInstance) {
  uid = componentInstance.uid;
}

const inputId = computed(() => `molecule-input-with-label-${uid}`);
</script>

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
