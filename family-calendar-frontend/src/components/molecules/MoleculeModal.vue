<script setup lang="ts">
import { watch } from "vue";
import AtomBackdrop from "@/components/atoms/AtomBackdrop.vue";
import { useMainStore } from "@/stores/MainStore";

interface Props {
  isShow: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
});

const emit = defineEmits(["closeModal"]);

const { switchAppModalState } = useMainStore();

const closeModal = () => {
  emit("closeModal");
};

watch(
  () => props.isShow,
  (newValue) => {
    switchAppModalState(newValue);
  }
);
</script>

<template>
  <atom-backdrop class="app-modal" :isShow="isShow" @clickBackdrop="closeModal">
    <Transition
      enter-active-class="animate__animated animate__faster animate__backInDown"
      leave-active-class="animate__animated animate__faster animate__fadeOut"
    >
      <div v-show="isShow" class="app-modal__slot">
        <slot></slot>
      </div>
    </Transition>
  </atom-backdrop>
</template>

<style lang="scss" scoped>
.app-modal {
  padding-top: 10vh;
  padding-bottom: 10vh;
  box-sizing: border-box;

  &__slot {
    @include flexbox;
    max-width: 500px;
    @include margin-auto;
    cursor: default;
  }
}
</style>