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
      <atom-title tag="h2" :content="message" class="molecule-notification__h2" />
    </div>
    <Transition
      name="molecule-notification"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomTitle from "@/components/atoms/AtomTitle.vue";

export default defineComponent({
  name: "MoleculeNotification",
  components: {
    AtomIcon,
    AtomTitle,
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
    const iconName = computed(() => {
      switch (props.type) {
        case "success":
          return "icon-ok-circled";

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
  border-left: 5px solid $border-color;
  border-top: 1px solid $border-color;
  border-right: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  color: $color;
  background: $background;
  @content;
}

.molecule-notification {
  @include flexbox;
  @include flex-direction(column);
  min-width: 250px;
  padding: 10px 15px 10px 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-sizing: border-box;

  background: burlywood;
  transition: all 0.3s ease;
  z-index: 100000;

  &--success {
    @include pnotify-variants($success-border, $success-color, $success-background);
  }

  &--info {
    @include pnotify-variants($info-border, $info-color, $info-background);
  }

  &--danger {
    @include pnotify-variants($danger-border, $danger-color, $danger-background);
  }

  &__title {
    @include flexbox;
    gap: 5px;
  }

  &__icon {
    @include flex-basis(10%);
    @include flexbox;
    @include flex-centering;
    margin-top: 4px;
    font-size: 20px
  }

  &__h2 {
    @include flex-basis(80%);
    margin: 0px;
    font-weight: 500;
    white-space: nowrap;
  }

  &__timer {
    width: 100%;
    height: 20px;
    text-align: center;
    animation: flashColdownLine 1s ease infinite;
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