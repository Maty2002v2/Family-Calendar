<template>
  <div
    class="join-calendar animate__animated animate__zoomIn animate__delay-1s"
  >
    <div class="join-calendar__title-with-information">
      <h2 class="join-calendar__h2">Join already existing calendar.</h2>
    </div>
    <div class="join-calendar__form">
      <molecule-input-floating-label label="CODE" v-model="calendarHash" />
      <atom-square-button variant="btn-rectangle--gradient" @click="pushWithQuery">
        join
      </atom-square-button>
      <span
        class="join-calendar__invalid-code animate__animated"
        :class="{
          animate__rubberBand: getIncorrectCodeEntered,
          animate__bounceOut: !getIncorrectCodeEntered,
        }"
        >BAD CODE</span
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import MoleculeInputFloatingLabel from "@/components/molecules/MoleculeInputFloatingLabel.vue"
import AtomSquareButton from "@/components/atoms/AtomSquareButton.vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../../stores/MainStore";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "JoinCalendar",
  components: {
    MoleculeInputFloatingLabel,
    AtomSquareButton,
  },
  setup() {
    const { getIncorrectCodeEntered } = storeToRefs(useMainStore());
    const { switchIncorrectCodeEntered } = useMainStore();

    const router = useRouter();

    const calendarHash = ref("");

    const pushWithQuery = () => {
      if (calendarHash.value.length > 0) {
        router.push({
          name: "calendar",
          params: {
            calendarId: calendarHash.value,
          },
        });
      } else {
        switchIncorrectCodeEntered(true); //TODO: Zrobic by mozna bylo przekazywac wiadomosci a nie tylko BAD CODE, np pusty kod
      }
    };

    watch(getIncorrectCodeEntered, (newValue) => {
      if (newValue) {
        setTimeout(() => switchIncorrectCodeEntered(false), 3000);
      }
    });

    return { calendarHash, getIncorrectCodeEntered, pushWithQuery };
  },
});
</script>

<style lang="scss" scoped>
.join-calendar {
  @include flexbox;
  @include align-items(center);
  @include flex-direction(column);
  gap: (100%) / 4;
  height: 100%;
  padding: 0px 20px;
  overflow: hidden;

  &__h2 {
    text-align: center;
    margin-top: 100px;
    font-size: max(5vw, 40px);
  }

  &__form {
    @include flexbox;
    @include justify-content(center);
    @include flex-wrap(wrap);
    gap: 10px;
  }

  &__invalid-code {
    width: 100%;
    text-align: center;

    color: $color-day-field;
    font-size: 13px;
    font-weight: 100;
    letter-spacing: 1px;
  }
}

@media only screen and (max-width: $medium) {
  .join-calendar {
    gap: (100%) / 5;

    &__h2 {
      margin-top: 30px;
    }
  }
}
</style>
