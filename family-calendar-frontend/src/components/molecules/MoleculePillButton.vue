<script setup lang="ts">
import { computed } from "vue";
import AtomButton from "@/components/atoms/AtomButton.vue";

interface Props {
  jelloAniamted: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  jelloAniamted: false,
});

const classObject = computed(() => ({
  "btn-pils": true,
  animate__animated: true,
  animate__jello: props.jelloAniamted,
}));
</script>

<template>
  <atom-button :class="classObject" type="button">
    <slot></slot>
  </atom-button>
</template>

<style lang="scss" scoped>
.btn-pils {
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: 600;
  color: $input-background-color;
  font-size: 14px;
  height: 38px;
  padding: 8px 24px;
  border-radius: 50px;
  background-image: $btn-rectangle--gradient-background-color;
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%);
  }
}
</style>
