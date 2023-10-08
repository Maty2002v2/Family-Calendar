<template>
  <div>
    <textarea 
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :rows="rows"
      :id="textareaId"
      class="atom-textarea" 
      @textarea="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>
<script lang="ts">
export default {
  name: "AtomTextarea",
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: null
    },
    textareaId: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 10,
    },
  }
}
</script>
<style lang="scss">
.atom-textarea {
  width: 100%;
  line-height: 1.5;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: none;

  color: $input-placeholder-color;
  font-size: 15px;
  letter-spacing: 1px;

  background: $input-background-color;

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