<template>
  <div class="molecule-input-with-label">
    <atom-input-label :inputId="inputId" :label="label" :requaied="requaied" />
    <atom-input 
      :type="type" 
      :modelValue="modelValue"
      :placeholder="placeholder"
      :inputId="inputId"
      class="molecule-input-with-label__input" 
      @input="$emit('update:modelValue', $event.target.value)"
     />
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, computed } from 'vue';

import AtomInput from '@/components/atoms/AtomInput.vue';
import AtomInputLabel from '../atoms/AtomInputLabel.vue';

export default {
  name: 'MoleculeInputWithLabel',
  components: {
    AtomInput,
    AtomInputLabel,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator(value: string) {
        return ['text', 'email', 'tel', 'number'].includes(value);
      },
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    requaied: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { uid } = getCurrentInstance();

    const inputId = computed(() => `molecule-input-with-label-${uid}`)

    return {
      inputId
    }
  }
}
</script>