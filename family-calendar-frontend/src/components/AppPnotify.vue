<template>
  <Transition
    enter-active-class="animate__animated animate__faster animate__bounceIn"
    leave-active-class="animate__animated animate__faster animate__bounceOut"
  >
    <div
      class="app-pnotify"
      :class="`app-pnotify--${type}`"
      v-show="getShowPnotify"
    >
      <h2 class="app-pnotify__h2">{{ title }}</h2>
      <p class="app-pnotify__p">{{ message }}</p>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch } from "vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../stores/MainStore";

export default defineComponent({
  name: "AppPnotify",
  setup() {
    const { getShowPnotify, getPnotifyOptions } = storeToRefs(useMainStore());
    const { switchShowPnotify } = useMainStore();

    watch(getShowPnotify, (newVal) => {
      if (newVal) {
        setTimeout(() => switchShowPnotify(false), 10000);
      }
    });

    return { getShowPnotify, ...toRefs(getPnotifyOptions.value) };
  },
});
</script>

<style lang="scss" scoped>
.app-pnotify {
  position: fixed;
  top: 5vh;
  right: 5vw;

  @include flexbox;
  @include flex-direction(column);
  width: 250px;
  min-height: 60px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-sizing: border-box;

  background: burlywood;
  transition: all 0.3s ease;

  &--success {
    color: #3c763d;
    background: rgba($color: #dff0d8, $alpha: 0.8);
    border-color: #d6e9c6;
  }

  &--warning {
    border: 1px solid #faebcc;
    color: #8a6d3b;
    background: rgba($color: #fcf8e3, $alpha: 0.8);
  }

  &--info {
    border: 1px solid #bce8f1;
    color: #31708f;
    background: rgba($color: #d9edf7, $alpha: 0.8);
  }

  &--danger {
    color: $white;
    border: 1px solid $active-day;
    background: rgba($color: $active-day, $alpha: 0.8);
  }

  &__h2 {
    margin: 0px;
    font-weight: 500;
  }

  &__p {
    margin: 10px 0px 0px 0px;
  }
}
</style>
