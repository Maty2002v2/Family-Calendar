<template>
  <div class="sliding-input">
    <input type="text" class="input sliding-input__input" required />
    <label class="sliding-input__label">{{ title }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SlidingInput",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.sliding-input {
  position: relative;

  &__input {
    outline: none;
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 15px;

    color: $color-day-fiels;

    user-select: none;
    pointer-events: none;
    transform: translateY(-50%) scale(0.8);
    transition: all 0.2s ease;
  }

  .input:focus ~ label,
  .input:valid ~ label {
    top: -15px;
    color: $active-day;
    letter-spacing: 1px;
    transform: translateY(-50%) scale(1.2);
  }
}
</style>
