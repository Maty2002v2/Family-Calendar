<template>
  <div class="field-modal" @click.self="closeModal">
    <article class="field-modal__content">
      <section v-if="specialDayList.length" class="field-modal__details-of-day">
        <app-accordion
          v-for="(specialDay, index) in specialDayList"
          :key="index"
        >
          <template v-slot:title>
            <i
              class="icon icon-demo"
              :class="[specialDay.icon_name]"
              :style="{ backgroundColor: specialDay.icon_color }"
            ></i>
            {{ specialDay.title }}
          </template>
          <template v-slot:content>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus rem nobis maiores ab at. Possimus molestiae itaque
              nobis. Illo corporis consequuntur excepturi eaque fugiat vero
              magnam esse impedit laudantium quia!
            </span>
          </template>
        </app-accordion>
      </section>
      <section v-else class="field-modal__info-about-lack-of-days">das</section>
      <section class="field-modal__create-holiday">
        <button>klick</button>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppAccordion from "../../AppAccordion.vue";

export default defineComponent({
  name: "TheFieldModal",
  props: {
    specialDayList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    AppAccordion,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const closeModal = () => emit("closeModal");

    return { closeModal };
  },
});
</script>

<style lang="scss" scoped>
.field-modal {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba($color: #000000, $alpha: 0.3);

  &__details-of-day {
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: 25px;
      border-radius: 50%;

      color: $white;
    }
  }

  &__content {
    width: 200px;
    height: 400px;
    background: $background-color;
  }
}
</style>
