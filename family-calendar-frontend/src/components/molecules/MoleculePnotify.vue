<template>
  <Transition
    enter-active-class="animate__animated animate__faster animate__bounceIn"
    leave-active-class="animate__animated animate__faster animate__bounceOut"
  >
    <div
      class="molecule-pnotify"
      :class="`molecule-pnotify--${type}`"
      v-show="getShowPnotify"
    >
      <div class="molecule-pnotify__title">
        <atom-icon
          :class="['molecule-pnotify__icon', iconName]"
          v-show="iconName.length"
        />
        <atom-title tag="h2" :content="title" class="molecule-pnotify__h2" />
        <atom-icon
          v-show="message.length > 0"
          :class="classObjectShowDetails"
          @click="showContent = !showContent"
        />
      </div>
      <div class="molecule-pnotify__timer">
        <span
          class="molecule-pnotify__line"
          :class="`molecule-pnotify__line--${type}`"
          :style="`animation-duration: ${time}s`"
        ></span>
      </div>
      <Transition
        name="molecule-pnotify"
        @enter="start"
        @after-enter="end"
        @before-leave="start"
        @after-leave="end"
      >
        <p v-show="showContent" class="molecule-pnotify__p">{{ message }}</p>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, watch } from "vue";

import AtomIcon from "@/components/atoms/AtomIcon.vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/MainStore";

import AtomTitle from "@/components/atoms/AtomTitle.vue";

export default defineComponent({
  name: "MoleculePnotify",
  components: {
    AtomTitle,
    AtomIcon
  },
  setup() {
    const { getShowPnotify, getPnotifyOptions } = storeToRefs(useMainStore());
    const { switchShowPnotify } = useMainStore();

    const showContent = ref(false);
    const classObjectShowDetails = computed(() => ({
      'molecule-pnotify__open-content': true,
      'icon-up-open-mini': showContent.value,
      'icon-down-open-mini': !showContent.value,
    }));

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
      classObjectShowDetails,
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

.molecule-pnotify {
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
    @include pnotify-variants(#ebccd1, #a94442, #f2dede);
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
      background: #a94442;
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
