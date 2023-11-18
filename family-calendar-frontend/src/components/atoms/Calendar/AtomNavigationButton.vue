<script setup lang="ts">
import { computed } from "vue";
import { useDateStore } from "@/stores/DateStore";
import { useWidthWindow } from "@/composables/useWidthWindow";

const props = defineProps<{
  step: number,
}>();

const emit = defineEmits(['setTransitionName']);

const { changeDateData } = useDateStore();
const { isMobile } = useWidthWindow();

const transitionName = computed(() => {
  if (!isMobile.value) return props.step > 0 ? "animate__backInRight" : "animate__backInLeft";
  return "animate__fadeInDown";
});

const changeDate = () => {
  changeDateData(props.step);
  emit("setTransitionName", transitionName.value);
};
</script>

<template>
  <div class="calendar-navigation">
    <div class="calendar-navigation__icon" @click="changeDate()">
      <slot v-if="!isMobile" name="desktop-icon"></slot>
      <slot v-else name="mobile-icon"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-navigation {
  width: 100%;
  height: 30px;
  box-sizing: border-box;

  color: $main-font-color; //#333
  font-family: sans-serif;

  background-color: transparent;

  &:hover {
    background: $hover-day-field;
    cursor: pointer;
  }

  &__icon {
    @include flexbox;
    @include flex-centering;
    width: 100%;
    height: 100%;

    font-size: 25px;
  }
}
</style>