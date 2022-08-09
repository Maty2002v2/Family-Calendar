<template>
  <article class="app-accordion">
    <section class="title" @click="showContent = !showContent">
      <div class="title__title-slot no-select">
        <slot name="title" />
      </div>
      <div>
        <slot name="char-toggle">
          <div
            class="title__default-char-toggle no-select"
            :class="{ 'title__default-char-toggle--active': showContent }"
          ></div>
        </slot>
      </div>
    </section>
    <Transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <section v-show="showContent" class="app-accordion__content">
        <slot name="content" />
      </section>
    </Transition>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppAccordion",

  setup() {
    const showContent = ref(false);

    const start = (el: HTMLElement) =>
      (el.style.height = el.scrollHeight + "px");
    const end = (el: HTMLElement) => (el.style.height = "");

    return { showContent, start, end };
  },
});
</script>

<style lang="scss" scoped>
.app-accordion {
  padding: 5px 10px;
  border-bottom: 1px solid #ebebeb;

  .title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    cursor: pointer;

    &__title-slot {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__default-char-toggle {
      position: relative;
      color: $color-day-field;
      width: 15px;
      height: 50px;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 2px;
        // border: 1px solid $color-day-field;
        border-radius: 20px;
        // background: $color-day-field;
        background: $active-day;
        // box-sizing: border-box;
        transform: translate(-50%, -50%);
      }

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 90%;
        height: 2px;
        // border: 1px solid $color-day-field;
        border-radius: 20px;
        // background: $color-day-field;
        background: $active-day;
        // box-sizing: border-box;
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

  &__content {
    margin: 15px 0px 10px 20px;
    box-sizing: border-box;
  }

  .accordion-enter-active,
  .accordion-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    height: 0 !important;
    opacity: 0;
    margin-top: 0px;
    margin-bottom: 0px;
  }
}
</style>
