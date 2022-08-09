<template>
  <div class="create-holiday">
    <header
      class="create-holiday__header"
      role="complementary"
      @click="showContent = !showContent"
    >
      <h2 class="create-holiday__h2">Add a new day</h2>
      <span
        class="create-holiday__char-toggle"
        :class="{ 'create-holiday__char-toggle--active': showContent }"
      ></span>
    </header>
    <Transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <article v-show="showContent" class="create-holiday__content">
        <section class="create-holiday__form">
          <div class="create-holiday__input-wrapper">
            <label>Title</label>
            <input type="text" class="crate-holiday__input" />
          </div>
          <div class="create-holiday__textarea-wrapper">
            <label for="story">Description</label>
            <textarea id="story" name="story" rows="5" cols="33">
               It was a dark and stormy night...
            </textarea>
          </div>
        </section>
      </article>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TheNewDayAccordion",
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
.create-holiday {
  &__header {
    position: relative;
    padding: 20px 20px 20px 20px;
    box-sizing: border-box;

    background: $active-day;

    cursor: pointer;
  }

  &__h2 {
    margin: 0px;
    color: $white;
  }

  &__char-toggle {
    position: absolute;
    top: 50%;
    right: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    width: 40px;
    border-radius: 50%;

    color: $active-day;

    background: $white;

    transform: translate(50%, -50%);

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 2px;
      border-radius: 20px;
      background: $active-day;
      transform: translate(-50%, -50%);
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 2px;
      border-radius: 20px;
      background: $active-day;
      transition: all 0.2s ease;
      transform: translate(-50%, -50%) rotate(-90deg);
    }

    &--active {
      &:after {
        transform: translate(-50%, -50%) rotate(0deg);
      }
    }
  }

  &__form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    padding: 35px 0px;
    box-sizing: border-box;
    border: 5px solid $active-day;
  }
}

label,
textarea {
  font-size: 0.8rem;
  letter-spacing: 1px;
}
textarea {
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px $active-day;
}

label {
  display: block;
  margin-bottom: 10px;
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
</style>
