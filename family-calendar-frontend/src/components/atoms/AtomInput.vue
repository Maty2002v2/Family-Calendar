<template>
  <input 
    :type="type" 
    :value="modelValue"
    :placeholder="placeholder"
    :maxlength="maxLength"
    :id="inputId"
    class="atom-input" 
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "AtomInput",
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
    inputId: {
      type: String,
      default: ''
    }
  }
})
</script>
<style lang="scss">
.atom-input {
  width: 100%;
  line-height: 1.5;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  color: $input-placeholder-color;
  font-size: 15px;
  letter-spacing: 1px;

  background-color: $input-background-color;

  transition: all 0.3s ease;

  &:focus {
    outline-color: $main-color;
    box-shadow: 0px 0px 3px $main-color;
  }

  &::placeholder {
    color: $input-placeholder-color;
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Edge 12 -18 */
    color: $input-placeholder-color;
  }
}
</style>