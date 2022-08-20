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
      <div class="app-pnotify__timer">
        <span
          class="app-pnotify__line"
          :class="`app-pnotify__line--${type}`"
          :style="`animation-duration: ${howLong}s`"
        ></span>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../stores/MainStore";

export default defineComponent({
  name: "AppPnotify",
  setup() {
    const { getShowPnotify, getPnotifyOptions } = storeToRefs(useMainStore());
    const { switchShowPnotify } = useMainStore();

    const howLong = 3; //liczba sekund dla timera
    let timerValue = ref(howLong);

    watch(getShowPnotify, (newVal) => {
      if (newVal) {
        const interval = setInterval(() => {
          if (timerValue.value > 1) {
            timerValue.value--;
          } else {
            clearInterval(interval);
            switchShowPnotify(false);

            setTimeout(() => (timerValue.value = howLong), 1000);
          }
        }, 1000);
      }
    });

    return {
      getShowPnotify,
      ...toRefs(getPnotifyOptions.value),
      howLong,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes coldownLine {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

@mixin pnotify-variants($border-color, $color, $background) {
  border: 1px solid $border-color;
  color: $color;
  background: rgba($color: $background, $alpha: 0.8);
  @content;
}

.app-pnotify {
  @include position($position: fixed, $top: 5vh, $right: 5vw);

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
    @include pnotify-variants(#d6e9c6, #3c763d, #dff0d8);
  }

  &--warning {
    @include pnotify-variants(#faebcc, #8a6d3b, #fcf8e3);
  }

  &--info {
    @include pnotify-variants(#bce8f1, #31708f, #d9edf7);
  }

  &--danger {
    @include pnotify-variants($active-day, $white, $active-day);
  }

  &__h2 {
    margin: 0px;
    font-weight: 500;
  }

  &__p {
    margin: 10px 0px 0px 0px;
  }

  &__timer {
    width: 100%;
    height: 20px;
  }

  &__line {
    display: inline-block;
    height: 2px;
    animation-name: coldownLine;
    animation-timing-function: linear;

    &--success {
      background: #3c763d;
    }

    &--warning {
      background: #8a6d3b;
    }

    &--info {
      background: #31708f;
    }

    &--danger {
      background: $active-day;
    }
  }
}
</style>
