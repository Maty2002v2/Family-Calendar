<template>
  <nav class="molecule-calendar-navigation__nav molecule-calendar-navigation__nav--prev">
    <atom-navigation-button
      :step="-12"
      @setTransitionName="(transitionName) => $emit('setTransitionName', transitionName)"
    >
      <template v-slot:desktop-icon>
        <i class="demo-icon icon-angle-double-left"></i>
      </template>

      <template v-slot:mobile-icon>
        <i class="demo-icon icon-angle-double-down"></i>
      </template>
    </atom-navigation-button>

    <atom-navigation-button
      :step="-1"
      @setTransitionName="(transitionName) => $emit('setTransitionName', transitionName)"
    >
      <template v-slot:desktop-icon>
        <i class="demo-icon icon-left-open-mini"></i>
      </template>

      <template v-slot:mobile-icon>
        <i class="demo-icon icon-down-open-mini"></i>
      </template>
    </atom-navigation-button>
  </nav>

  <atom-calendar-title class="molecule-calendar-navigation__title" />

  <nav class="molecule-calendar-navigation__nav molecule-calendar-navigation__nav--next">
    <atom-navigation-button
      :step="1"
      @setTransitionName="(transitionName) => $emit('setTransitionName', transitionName)"
    >
      <template v-slot:desktop-icon>
        <i class="demo-icon icon-right-open-mini"></i>
      </template>
      <template v-slot:mobile-icon>
        <i class="demo-icon icon-up-open-mini"></i>
      </template>
    </atom-navigation-button>

    <atom-navigation-button
      :step="12"
      @setTransitionName="(transitionName) => $emit('setTransitionName', transitionName)"
    >
      <template v-slot:desktop-icon>
        <i class="demo-icon icon-angle-double-right"></i>
      </template>
      <template v-slot:mobile-icon>
        <i class="demo-icon icon-angle-double-up"></i>
      </template>
    </atom-navigation-button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import AtomNavigationButton from "@/components/atoms/Calendar/AtomNavigationButton.vue";
import AtomCalendarTitle from "@/components/atoms/Calendar/AtomCalendarTitle.vue";

export default defineComponent({
  name: "MoleculeCalendarNavigation",
  components: {
    AtomNavigationButton,
    AtomCalendarTitle,
  },
});
</script>

<style lang="scss" scoped>
.molecule-calendar-navigation {
  &__nav {
    // todo: Poprawic to ze przy granicy zmiany z desckt namobile nawigazja przeskakuje
    @include flexbox;
    @include justify-content(space-around);
    @include flex-basis(40%);
    width: 100%;
    height: 30px;
  }

  &__title {
    @include flex-basis(20%);
    height: 30px;
  }
}

@media only screen and (max-width: $small) {
  .molecule-calendar-navigation {
    &__nav {
      @include flex-direction(column-reverse);
      @include flex-basis(100%);
      margin: 10px 0px;
    }

    &__nav--prev {
      @include order(1);
    }

    &__title {
      @include flex-basis(100%);
    }
  }
}
</style>
