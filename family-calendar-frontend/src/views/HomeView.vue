<template>
  <div class="home">
    <div class="home__create-calendar">
      <create-calendar />
    </div>
    <div class="home__join-calendar">
      <join-calendar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateCalendar from "../components/Home/CreateCalendar.vue";
import JoinCalendar from "../components/Home/JoinCalendar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    CreateCalendar,
    JoinCalendar,
  },
});
</script>

<style lang="scss" scoped>
@mixin home__segments($color, $background-color) {
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
    flex-direction: column;
  }
}
</style>
