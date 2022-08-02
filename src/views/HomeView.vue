<template>
  <div class="home">
    <div class="home__create-calendar">
      <button class="btn-rectangle">create</button>
    </div>
    <div class="home__join-calendar">
      <input type="text" />
      <button class="btn-rectangle">create</button>
      <button class="btn-rectangle--gradient">create</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style lang="scss" scoped>
@mixin home__segments($color, $background-color) {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
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
  }
}

@media only screen and (max-width: $medium) {
  .home {
    display: flex;
    flex-direction: column;
  }
}
</style>
