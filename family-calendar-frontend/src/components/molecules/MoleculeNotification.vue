<template>
  <div
    class="molecule-notification"
    :class="`molecule-notification--${type}`"
  >
    <div class="molecule-notification__title">
      <atom-icon
        :class="['molecule-notification__icon', iconName]"
        v-show="iconName?.length"
      />
      <atom-title tag="h2" :content="title" class="molecule-notification__h2" />
      <atom-icon
        v-show="message.length > 0"
        :class="classObjectShowDetails"
        @click="showContent = !showContent"
      />
    </div>
    <div class="molecule-notification__timer">
      <span
        class="molecule-notification__line"
        :class="`molecule-notification__line--${type}`"
      ></span>
    </div>
    <Transition
      name="molecule-notification"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <p v-show="showContent" class="molecule-notification__p">{{ message }}</p>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomTitle from "@/components/atoms/AtomTitle.vue";

export default defineComponent({
  name: "MoleculeNotification",
  components: {
    AtomTitle,
    AtomIcon
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const showContent = ref(false);
    const classObjectShowDetails = computed(() => ({
      'molecule-notification__open-content': true,
      'icon-up-open-mini': showContent.value,
      'icon-down-open-mini': !showContent.value,
    }));

    const iconName = computed(() => {
      switch (props.type) {
        case "success":
          return "icon-ok-circled";

        case "warning":
          return "icon-attention";

        case "info":
          return "icon-info-circled";

        case "danger":
          return "icon-error";
        default: 
          return "icon-ok-circled"
      }
    });

    const start = (el: HTMLElement) =>
      (el.style.height = el.scrollHeight + "px");
    const end = (el: HTMLElement) => (el.style.height = "");

    return {
      showContent,
      classObjectShowDetails,
      iconName,
      start,
      end
    }
  }
})
</script>

<style lang="scss">
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

.molecule-notification {
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