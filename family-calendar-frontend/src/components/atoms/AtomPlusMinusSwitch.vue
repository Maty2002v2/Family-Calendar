<script setup lang="ts">
defineProps<{
  isOpen: boolean,
}>();
</script>

<template>
  <span
    class="atom-plus-minus-switch"
    :class="{ 'atom-plus-minus-switch--active': isOpen }"
  ></span>
</template>

<style lang="scss">
%pseudo-elements {
  content: "";
  @include position(absolute, 50%, 0, 0, 50%);
  width: 50%;
  height: 2px;
  border-radius: 20px;
  background: $main-color;
}

.atom-plus-minus-switch {
  display: inline-block;

  &:before {
    @extend %pseudo-elements;
    transform: translate(-50%, -50%);
  }

  &:after {
    @extend %pseudo-elements;
    transition: all 0.2s ease;
    transform: translate(-50%, -50%) rotate(-90deg);
  }

  &--active {
    &:after {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
}
</style>