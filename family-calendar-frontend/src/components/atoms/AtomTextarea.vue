<script setup lang="ts">
defineProps<{
  modelValue: string,
  placeholder: string,
  textareaId: string,
  maxLength: number,
  rows: number,
}>();
</script>

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