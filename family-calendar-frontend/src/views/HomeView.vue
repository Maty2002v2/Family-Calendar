<template>
  <div class="home">
    <div class="home__create-calendar">
      <div class="containter animate__animated animate__fadeInDown">
        <h2 class="home__h2">Create your calendar.</h2>
        <button class="btn-rectangle" @click="create">create</button>
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
    const { switchIncorrectCodeEntered, createCalendar } = useMainStore();

    const calendarHash = ref("");

    const router = useRouter();

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

    const create = () => {
      createCalendar().then((response) => {
        if (!response.error) {
          router.push({
            name: "calendar",
            params: {
              calendarId: response.message,
            },
          });
        } else {
          console.log("Cos poszlo nie tak", response);
        }
      });
    };

    watch(getIncorrectCodeEntered, (newValue) => {
      if (newValue) {
        setTimeout(() => switchIncorrectCodeEntered(false), 3000);
      }
    });

    return { calendarHash, pushWithQuery, getIncorrectCodeEntered, create };
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
    align-items: center;
    flex-direction: column;
    gap: (100%) / 4;

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

      span {
        //TODO: Nadać klase nie zostawaic selektora.
        width: 100%;
        text-align: center;

        color: $color-day-fiels;
        font-size: 13px;
        font-weight: 100;
        letter-spacing: 1px;
      }
    }
  }

  &__h2 {
    margin-top: 100px;
    text-align: center;
    font-size: max(5vw, 40px);
  }
}

@media only screen and (max-width: $medium) {
  .home {
    flex-direction: column;

    &__h2 {
      margin-top: 30px;
    }
  }
}
</style>
