<template>
  <article class="app-accordion">
    <section class="title" @click="showContent = !showContent">
      <div class="title__slot">
        <slot name="title" />
      </div>
      <div
        class="title__char-toggle no-select"
        :class="{ 'title__char-toggle--active': showContent }"
      ></div>
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

    &__slot {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__char-toggle {
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
        height: 3px;
        // border: 1px solid $color-day-field;
        border-radius: 20px;
        background: $color-day-field;
        // box-sizing: border-box;
        transform: translate(-50%, -50%);
      }

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 3px;
        // border: 1px solid $color-day-field;
        border-radius: 20px;
        background: $color-day-field;
        // box-sizing: border-box;
        transition: all 0.2s ease;
        transform: translate(-50%, -50%) rotate(-90deg);
      }
    }

    &__char-toggle--active {
      &:after {
        transform: translate(-50%, -50%) rotate(0deg);
      }
    }
  }

  &__content {
    margin: 10px 0px 0px 20px;
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
  }
}
</style>
