<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import AtomInputLabel from '@/components/atoms/AtomInputLabel.vue';
import MoleculeInputFloatingLabel from '@/components/molecules/MoleculeInputFloatingLabel.vue';
import MoleculeListOfOptionsToInput from '@/components/molecules/InputWithOptions/MoleculeListOfOptionsToInput.vue';

import { useUtils } from '@/composables/useUtils';

const props = defineProps<{
  label: string
  modelValue: string
}>();

const emit = defineEmits(['update:modelValue'])
const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};

const { pushToCalendar } = useUtils();

const componentElement = ref(); 
onClickOutside(componentElement, () => {
  showList.value = false;
})

const selectedCode = (code: string) => {
  showList.value = false;
  pushToCalendar(code);
}

const showList = ref(false);
</script>

<template>
  <div ref="componentElement">
    <molecule-input-floating-label
      :label="label"
      :value="modelValue"
      @input="updateValue"
      @focus="showList = true"
    />

    <molecule-list-of-options-to-input 
      :searchPhrase="props.modelValue" 
      :showList="showList"
      @selectOption="selectedCode"
    />

    <atom-input-label
     v-show="!showList"
     class="molecule-input-with-opitions__label" 
     label="Podaj lub wybierz kod"
     />
  </div>
</template>

<style lang="scss">
.molecule-input-with-opitions {
  &__label {
    margin-top: 5px;
    font-size: 15px;
  }
}
</style>