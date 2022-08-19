<template>
  <Transition
    enter-active-class="animate__animated animate__faster  animate__fadeIn"
    leave-active-class="animate__animated animate__faster animate__fadeOut"
  >
    <div class="app-modal" v-show="isShow" @click.self="closeModal">
      <Transition
        enter-active-class="animate__animated animate__faster animate__backInDown"
        leave-active-class="animate__animated animate__faster animate__fadeOut"
      >
        <div v-show="isShow" class="app-modal__slot">
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppModal",
  props: {
    isShow: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const closeModal = () => {
      emit("closeModal");
    };

    return { closeModal };
  },
});
</script>

<style lang="scss" scoped>
.app-modal {
  @include position($top: 0px, $left: 0px);

  width: 100vw;
  min-height: 100%;
  padding-top: 10vh;
  padding-bottom: 10vh;
  box-sizing: border-box;

  background: rgba($color: #000000, $alpha: 0.3);

  cursor: pointer;

  &__slot {
    @include flexbox;
    max-width: 500px;
    @include margin-auto;
    cursor: default;
  }
}

@media only screen and (max-width: $small) {
  .app-modal {
    min-height: 120vh;
  }
}
</style>
