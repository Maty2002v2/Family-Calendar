<script setup lang="ts">
import { watch } from "vue";

const props = defineProps<{
  inputLength: number;
  maxLength: number;
}>();

const emit = defineEmits(["tooLongText"]);

watch(
  () => props.inputLength,
  (newInputLength) => {
    if (newInputLength > props.maxLength) {
      emit("tooLongText");
    }
  }
);
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__faster animate__fadeIn"
    leave-active-class="animate__animated animate__faster animate__fadeOut"
  >
    <div class="input-counter" v-show="inputLength > 0">
      <span class="input-counter__span">{{ inputLength }} / {{ maxLength }}</span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.input-counter {
  &__span {
    color: $main-color;
    font-weight: 500;
  }
}
</style>
