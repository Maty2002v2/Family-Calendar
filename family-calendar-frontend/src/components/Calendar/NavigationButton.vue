<template>
  <div class="calendar-navigation">
    <div class="calendar-navigation__icon" @click="changeDate()">
      <slot v-if="isDesktopWith" name="desktop-icon"></slot>
      <slot v-else name="mobile-icon"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useDateStore } from "../../stores/DateStore";

import useBreakpoints from "../../utils/WindowWidth";

export default defineComponent({
  name: "NavigationButton",
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
  emits: ["setTransitionName"],
  setup(props, { emit }) {
    const { changeDateData } = useDateStore();
    const { width } = useBreakpoints();

    const isDesktopWith = computed(() => width.value > 460);

    const transitionName = computed(() => {
      if (isDesktopWith.value) {
        return props.step > 0 ? "animate__backInRight" : "animate__backInLeft";
      } else {
        return props.step > 0 ? "animate__backInDown" : "animate__backInUp";
      }
    });

    const changeDate = () => {
      changeDateData(props.step);

      emit("setTransitionName", transitionName.value);
    };

    return { changeDate, isDesktopWith };
  },
});
</script>

<style lang="scss" scoped>
.calendar-navigation {
  // width: 50px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;

  color: #333;
  font-family: sans-serif;

  background-color: transparent;

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

.calendar-navigation:hover {
  border: 1px solid black;
  cursor: pointer;
}
</style>
