<script setup lang="ts">
defineProps<{
  checked: boolean;
}>();
</script>

<template>
  <label class="atom-checkbox-input">
    <input
      class="atom-checkbox-input__input"
      type="checkbox"
      :checked="checked"
      @input="$emit('update:checked', ($event.target as HTMLInputElement).checked)"
    />
    <span class="atom-checkbox-input__span round"></span>
  </label>
</template>

<style lang="scss">
.atom-checkbox-input {
  position: relative;
  display: inline-block;
  max-width: 80px;
  min-height: 34px;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .atom-checkbox-input__span::before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      left: 100%;
      transform: translate(-110%, -50%);
    }
  }

  &__span {
    @include position($top: 0px, $right: 0px, $bottom: 0px, $left: 0px);

    border: 2px solid $main-color;
    border-radius: 34px;

    background-color: $input-background-color;

    cursor: pointer;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &::before {
      content: "";

      @include position($top: 50%, $left: 4%);

      height: 26px;
      width: 26px;
      border-radius: 50%;

      background-color: $main-color;

      -webkit-transition: 0.4s;
      transition: 0.4s;
      transform: translateY(-50%);
    }
  }
}
</style>
