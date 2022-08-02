<template>
  <div class="sliding-button">
    <input type="text" class="input" required />
    <label class="sliding-button__label">{{ title }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SlidingButton",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.sliding-button {
  position: relative;

  &__label {
    position: absolute;
    top: 50%;
    left: 15px;

    color: $color-day-fiels;

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
