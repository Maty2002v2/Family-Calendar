<template>
  <div class="home">
    <div class="home__create-calendar">
      <h2 class="home__h2">Create your calendar.</h2>
      <button class="btn-rectangle">create</button>
    </div>
    <div class="home__join-calendar">
      <h2 class="home__h2">Join already existing calendar.</h2>
      <div class="form">
        <sliding-button title="KOD" />
        <button class="btn-rectangle--gradient">join</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SlidingButton from "../components/SlidingButton.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    SlidingButton,
  },
});
</script>

<style lang="scss" scoped>
@mixin home__segments($color, $background-color) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 100px;

  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;

  color: $color;

  background-color: $background-color;
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
      gap: 10px;
    }
  }

  &__h2 {
    font-size: max(5vw, 40px);
  }
}

@media only screen and (max-width: $medium) {
  .home {
    display: flex;
    flex-direction: column;
  }
}
</style>
