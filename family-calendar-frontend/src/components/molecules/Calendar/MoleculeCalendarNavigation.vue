<script setup lang="ts">
import AtomCalendarTitle from "@/components/atoms/Calendar/AtomCalendarTitle.vue";
import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomNavigationButton from "@/components/atoms/Calendar/AtomNavigationButton.vue";
</script>

<template>
  <nav class="molecule-calendar-navigation__nav molecule-calendar-navigation__nav--prev">
    <atom-navigation-button
      :step="-12"
      @setTransitionName="(transitionName) => $emit('setTransitionName', transitionName)"
    >
      <template v-slot:desktop-icon>
        <atom-icon name="ChevronsLeft"/>
      </template>
    </atom-navigation-button>

    <atom-navigation-button
      :step="-1"
      @setTransitionName="(transitionName) => $emit('setTransitionName', transitionName)"
    >
      <template v-slot:desktop-icon>
        <atom-icon name="ChevronLeft"/>
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
        <atom-icon name="ChevronRight"/>
      </template>
    </atom-navigation-button>

    <atom-navigation-button
      :step="12"
      @setTransitionName="(transitionName) => $emit('setTransitionName', transitionName)"
    >
      <template v-slot:desktop-icon>
        <atom-icon name="ChevronsRight"/>
      </template>
    </atom-navigation-button>
  </nav>
</template>

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
      display: none
    }

    &__title {
      @include flex-basis(100%);
    }
  }
}
</style>
