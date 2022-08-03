<template>
  <div class="home">
    <div class="home__create-calendar">
      <div class="containter animate__animated animate__fadeInDown">
        <h2 class="home__h2">Create your calendar.</h2>
        <button class="btn-rectangle">create</button>
      </div>
    </div>
    <div
      class="home__join-calendar animate__animated animate__zoomIn animate__delay-1s"
    >
      <div class="containter">
        <h2 class="home__h2">Join already existing calendar.</h2>
        <div class="form">
          <sliding-input label="CODE" v-model="calendarHash" />
          <button class="btn-rectangle--gradient" @click="pushWithQuery">
            join
          </button>
          <span
            class="animate__animated"
            :class="{
              animate__rubberBand: getIncorrectCodeEntered,
              animate__bounceOut: !getIncorrectCodeEntered,
            }"
            >BAD CODE</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import SlidingInput from "../components/SlidingInput.vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../stores/MineStore";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {
    SlidingInput,
  },
  setup() {
    const { getIncorrectCodeEntered } = storeToRefs(useMainStore());
    const { switchIncorrectCodeEntered } = useMainStore();

    const calendarHash = ref("");

    const router = useRouter();

    const pushWithQuery = () => {
      router.push({
        name: "calendar",
        params: {
          calendarId: calendarHash.value,
        },
      });
    };

    watch(getIncorrectCodeEntered, (newValue) => {
      if (newValue) {
        setTimeout(() => switchIncorrectCodeEntered(), 3000);
      }
    });

    return { calendarHash, pushWithQuery, getIncorrectCodeEntered };
  },
});
</script>

<style lang="scss" scoped>
@mixin home__segments($color, $background-color) {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  color: $color;

  background-color: $background-color;

  .containter {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 90px;

    height: 100%;
  }
}

.home {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: max(100vh, 600px);

  &__create-calendar {
    @include home__segments($background-color, $active-day);
  }

  &__join-calendar {
    @include home__segments($active-day, $background-color);

    .form {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;

      overflow-wrap: hidden;

      span {
        //TODO: Nadać klase nie zostawaic selektora
        width: 100%;
        text-align: center;

        color: $color-day-fiels;
        font-size: 13px;
        font-weight: 100;
        letter-spacing: 1px;

        z-index: -999;
        // opacity: 0;
      }
    }
  }

  &__h2 {
    text-align: center;
    font-size: max(5vw, 40px);
  }
}

@media only screen and (max-width: $medium) {
  .home {
    flex-direction: column;
  }
}
</style>
