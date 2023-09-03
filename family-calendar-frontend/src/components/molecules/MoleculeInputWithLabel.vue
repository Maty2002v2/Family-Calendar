<template>
  <div class="molecule-input-with-label">
    <label v-if="label.length" :for="inputId" class="molecule-input-with-label__label-input">
      {{ label }} <span v-if="requaied" class="molecule-input-with-label__optional-span">*</span>
    </label>
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

export default {
  name: 'MoleculeInputWithLabel',
  components: {
    AtomInput
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
<style lang="scss">
.molecule-input-with-label {
  &__optional-span {
    color: $active-day;
  }

  &__label-input {
    display: block;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
}
</style>