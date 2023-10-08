<template>
  <label v-if="label.length" :for="inputId" class="atom-input-label">
      {{ label }} <span v-if="requaied" class="atom-input-label__optional-span">*</span>
  </label>
</template>
<script lang="ts">
export default {
  name: "AtomInputLabel",
  props: {
    label: {
      type: String,
      default: ''
    },
    requaied: {
      type: Boolean,
      default: false
    },
    inputId: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.atom-input-label {
  display: block;
  margin-bottom: 10px;
  letter-spacing: 1px;

  &__optional-span {
    color: $main-color;
  }
}
</style>