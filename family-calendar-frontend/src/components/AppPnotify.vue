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
      <div class="app-pnotify__title">
        <i
          class="app-pnotify__icon icon-demo"
          :class="[iconName]"
          v-show="iconName.length"
        ></i>
        <h2 class="app-pnotify__h2">{{ title }}</h2>
        <i
          v-show="message.length > 0"
          class="app-pnotify__open-content"
          :class="[
            showContent ? 'icon-up-open-mini' : 'icon-demo icon-down-open-mini',
          ]"
          @click="showContent = !showContent"
        ></i>
      </div>
      <div class="app-pnotify__timer">
        <span
          class="app-pnotify__line"
          :class="`app-pnotify__line--${type}`"
          :style="`animation-duration: ${time}s`"
        ></span>
      </div>
      <Transition
        name="app-pnotify"
        @enter="start"
        @after-enter="end"
        @before-leave="start"
        @after-leave="end"
      >
        <p v-show="showContent" class="app-pnotify__p">{{ message }}</p>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, watch } from "vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../stores/MainStore";

export default defineComponent({
  name: "AppPnotify",
  setup() {
    const { getShowPnotify, getPnotifyOptions } = storeToRefs(useMainStore());
    const { switchShowPnotify } = useMainStore();

    const showContent = ref(false);

    let timerValue = ref(getPnotifyOptions.value.time);

    watch(getShowPnotify, (newVal) => {
      if (newVal) {
        const interval = setInterval(() => {
          if (timerValue.value > 1) {
            timerValue.value--;
          } else {
            clearInterval(interval);
            switchShowPnotify(false);
            showContent.value = false;

            setTimeout(
              () => (timerValue.value = getPnotifyOptions.value.time),
              1000
            );
          }
        }, 1000);
      }
    });

    const iconName = computed(() => {
      switch (getPnotifyOptions.value.type) {
        case "success":
          return "icon-ok-circled";

        case "warning":
          return "icon-attention";

        case "info":
          return "icon-info-circled";

        case "danger":
          return "icon-error";
      }
      return "";
    });

    const start = (el: HTMLElement) =>
      (el.style.height = el.scrollHeight + "px");
    const end = (el: HTMLElement) => (el.style.height = "");

    return {
      getShowPnotify,
      ...toRefs(getPnotifyOptions.value),
      iconName,
      showContent,
      start,
      end,
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

@keyframes flashColdownLine {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
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

  &__title {
    @include flexbox;
    gap: 5px;
  }

  &__icon {
    @include flex-basis(10%);
    @include flexbox;
    @include flex-centering;
  }

  &__h2 {
    @include flex-basis(80%);
    margin: 0px;
    font-weight: 500;
  }

  &__p {
    margin: 10px 0px 0px 0px;
  }

  &__timer {
    width: 100%;
    height: 20px;
    text-align: center;
    animation: flashColdownLine 1s ease infinite;
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

  &__open-content {
    @include flex-basis(10%);
    cursor: pointer;
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
  }

  &-enter-from,
  &-leave-to {
    height: 0 !important;
    opacity: 0;
    margin-top: 0px;
    margin-bottom: 0px;
  }
}
</style>
