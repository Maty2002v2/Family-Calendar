<template>
  <div class="input-counter" v-show="inputLength > 0">
    <span class="input-counter__span">{{ inputLength }} / {{ maxLength }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
  name: "AppInputCounter",
  props: {
    inputLength: {
      type: Number,
      required: true,
    },
    maxLength: {
      type: Number,
      required: true,
    },
  },
  emits: ["tooLongText"],
  setup(props, { emit }) {
    watch(
      () => props.inputLength,
      (newInputLength) => {
        if (newInputLength > props.maxLength) {
          emit("tooLongText");
        }
      }
    );
  },
});
</script>

<style lang="scss" scoped>
.input-counter {
  &__span {
    color: $active-day;
    font-weight: 500;
  }
}
</style>
