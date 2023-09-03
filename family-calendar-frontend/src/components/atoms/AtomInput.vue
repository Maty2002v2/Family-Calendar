<template>
  <div>
    <input 
      :type="type" 
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :id="inputId"
      class="atom-input" 
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>
<script lang="ts">
export default {
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
}
</script>
<style lang="scss">
.atom-input {
  width: 100%;
  line-height: 1.5;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  color: $color-day-field;
  font-size: 15px;
  letter-spacing: 1px;

  transition: all 0.3s ease;

  &:focus {
    outline-color: $active-day;
    box-shadow: 0px 0px 3px $active-day;
  }
}
</style>