<template>
  <article class="app-accordion" @click="showContent = !showContent">
    <section class="title">
      <div class="title__slot">
        <slot name="title" />
      </div>
      <span>{{ showContent ? "-" : "+" }}</span>
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
  cursor: pointer;
  padding: 5px 10px;
  border-bottom: 1px solid #ebebeb;

  .title {
    display: flex;
    justify-content: space-between;

    &__slot {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  &__content {
    // background: darkcyan;
  }
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
}
</style>
