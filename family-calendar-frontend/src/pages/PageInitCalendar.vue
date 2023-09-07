<template>
  <div class="home">
    <div class="home__create-calendar">
      <organism-create-calendar />
    </div>
    <div class="home__join-calendar">
      <organism-join-calendar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrganismCreateCalendar from "@/components/organisms/OrganismCreateCalendar.vue";
import OrganismJoinCalendar from "@/components/organisms/OrganismJoinCalendar.vue";

export default defineComponent({
  name: "PageInitCalendar",
  components: {
    OrganismCreateCalendar,
    OrganismJoinCalendar,
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
  @include flexbox;
  @include flex-direction(row);
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
    @include flex-direction(column);
  }
}
</style>
