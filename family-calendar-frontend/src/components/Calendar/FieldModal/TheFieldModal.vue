<template>
  <div class="field-modal" @click="closeModal">
    <article class="field-modal__content">
      <section class="field-modal__details-of-day">
        <h1>modal</h1>
      </section>
      <section class="field-modal__create-holiday">
        <button>klick</button>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheFieldModal",
  emits: ["closeModal"],
  setup(props, { emit }) {
    const closeModal = () => emit("closeModal");

    return { closeModal };
  },
});
</script>

<style lang="scss" scoped>
.field-modal {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba($color: #000000, $alpha: 0.3);

  &__content {
    width: 200px;
    height: 400px;
    background: $background-color;
  }
}
</style>
