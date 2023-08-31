<template>
  <article :class="accordionClassObject">
    <section
      class="header app-accordion__header"
      :style="accordionHeaderStyle"
      @click="switchShowContent"
    >
      <div class="header__title-slot no-select">
        <slot name="title" />
      </div>
      <div>
        <slot name="char-toggle">
          <div
            class="header__default-char-toggle no-select"
            :class="{ 'header__default-char-toggle--active': isShowContent }"
          ></div>
        </slot>
      </div>
    </section>
    <Transition
      name="app-accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <section v-show="isShowContent" class="app-accordion__content">
        <slot name="content" />
      </section>
    </Transition>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  name: "MoleculeAccordion",
  emits: ['update:showContent'],
  props: {
    accordionHeaderStyle: {
      type: Object,
      default: () => ({})
    },
    showContent: {
      type: Boolean,
      default: false
    },
    showUnderline: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const isShowContent = ref(props.showContent);

    const accordionClassObject = computed(() => ({
      'app-accordion': true,
      'app-accordion--underline': props.showUnderline
    }))

    const switchShowContent = () => {
      isShowContent.value = !isShowContent.value;
      emit('update:showContent', isShowContent.value)
    }

    const start = (el: HTMLElement) =>
      (el.style.height = el.scrollHeight + "px");
    const end = (el: HTMLElement) => (el.style.height = "");

    watch(
      () => props.showContent,
      (newShowContent) => isShowContent.value = newShowContent
    )

    return {
      isShowContent,
      accordionClassObject,
      switchShowContent,
      end,
      start,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-accordion {
  
  &--underline {
    border-bottom: 1px solid #ebebeb;
  }

  &__header {
    @include flexbox;
    @include justify-content(space-between);
    height: 50px;
    cursor: pointer;
  }

  &__content {
    // margin: 15px 0px 10px 20px;
    box-sizing: border-box;
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

.header {
  &__title-slot {
    @include flexbox;
    @include align-items(center);
    gap: 10px;
    margin: 10px;
  }

  %pseudo-elements {
    content: "";
    @include position(absolute, 50%, 0, 0, 50%);
    height: 2px;
    border-radius: 20px;
    background: $active-day;
  }

  &__default-char-toggle {
    position: relative;
    color: $color-day-field;
    width: 15px;
    height: 50px;
    margin: 10px;

    &:before {
      @extend %pseudo-elements;
      width: 100%;
      transform: translate(-50%, -50%);
    }

    &:after {
      @extend %pseudo-elements;
      width: 90%;
      transition: all 0.2s ease;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
  }

  &__default-char-toggle--active {
    &:after {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
}
</style>
