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
            <span class="title">
              {{ specialDay.title }}
            </span>
          </template>
          <template v-slot:content>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus rem nobis maiores ab at. Possimus molestiae itaque
              nobis. Illo corporis consequuntur excepturi eaque fugiat vero
              magnam esse impedit laudantium quia! Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Ullam illo minus esse, odio a unde
              veritatis vero nostrum iste, numquam inventore velit
              exercitationem modi tempore ducimus, neque eum mollitia enim?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
              soluta eos provident saepe harum aperiam, sequi numquam porro cum
              eius voluptatibus, fugit illo sed, rerum itaque aliquid?
              Voluptates, incidunt porro?
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
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100vw;
  min-height: 100%;
  padding-top: 10vh;
  padding-bottom: 10vh;
  box-sizing: border-box;

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

    .title {
      color: $color-day-field;
      font-size: 20px;
    }
  }

  &__content {
    width: 500px;
    border-radius: 5px;
    background: $background-color;
  }
}
</style>
