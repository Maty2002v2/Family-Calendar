<script setup lang="ts">
import { ref } from 'vue';

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

const showList = ref(false);
</script>

<template>
  <div>
    <molecule-input-floating-label
      :label="label"
      :value="modelValue"
      @input="updateValue"
      @focus="showList = true"
      @blur="showList = false"
    />

    <molecule-list-of-options-to-input 
      :searchPhrase="props.modelValue" 
      :showList="showList"
      @selectOption="(selectCode) => pushToCalendar(selectCode)"
    />
  </div>
</template>