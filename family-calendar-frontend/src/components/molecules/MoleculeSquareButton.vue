<script setup lang="ts">
import { computed } from "vue";
import AtomButton from "@/components/atoms/AtomButton.vue";

type Variant = "btn-rectangle--gradient";

interface Props {
  shakeXAnimate: boolean;
  variant?: Variant;
}

const props = withDefaults(defineProps<Props>(), {
  shakeXAnimate: false
});

const classObject = computed(() => ({
  "btn-rectangle": true,
  animate__animated: true,
  animate__shakeX: props.shakeXAnimate,
}));
</script>

<template>
  <atom-button :class="[classObject, variant?.length ? variant : '']" type="button">
    <slot></slot>
  </atom-button>
</template>

<style lang="scss" scoped>
.btn-rectangle {
  display: inline-block;
  height: 48px;
  padding: 0 32px;
  border: 0px;
  border-radius: 6px;
  outline: 0px;
  box-shadow: 0px 2px 4px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%),
    inset 0px -3px 0px $btn-rectangle-shawod;

  color: $btn-rectangle-color;
  font-size: 18px;
  cursor: pointer;

  background: $btn-rectangle-background-color;

  user-select: none;
  will-change: box-shadow, transform;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%),
      inset 0px -3px 0px $btn-rectangle-shawod;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: inset 0px 3px 7px $btn-rectangle-shawod;
    transform: translateY(2px);
  }

  &--gradient {
    @extend .btn-rectangle;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%),
      inset 0px -3px 0px $main-color;

    color: $btn-rectangle--gradient-color;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);

    background: $btn-rectangle--gradient-background-color;
  }

  &--gradient:hover {
    box-shadow: 0px 4px 8px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%),
      inset 0px -3px 0px $main-color;
  }

  &--gradient:active {
    box-shadow: inset 0px 3px 7px $main-color;
  }
}
</style>
