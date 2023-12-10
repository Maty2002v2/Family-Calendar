<script setup lang="ts">
import { storeToRefs } from "pinia";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomNavigationButton from "@/components/atoms/Calendar/AtomNavigationButton.vue";
import MoleculeMobileMenuButton from "@/components/molecules/Menu/MoleculeMobileMenuButton.vue";

import { useMainStore } from '@/stores/MainStore';

const { modalIsOpen } = storeToRefs(useMainStore());
</script>

<template>
  <div v-show="!modalIsOpen" class="molecule-mobile-menu">
    <molecule-mobile-menu-button class="molecule-mobile-menu-button" />

    <div class="molecule-mobile-menu__navgation-buttons-wrapper">
      <atom-navigation-button
        :step="-1"
        >
          <template v-slot:mobile-icon>
            <atom-icon name="ChevronLeft"/>
          </template>
      </atom-navigation-button>

      <atom-navigation-button
        :step="-12"
      >
        <template v-slot:mobile-icon>
          <atom-icon name="ChevronsLeft"/>
        </template>
      </atom-navigation-button>
    </div>
    
    <div class="molecule-mobile-menu__navgation-buttons-wrapper">
      <atom-navigation-button
        :step="12"
      >
        <template v-slot:mobile-icon>
          <atom-icon name="ChevronsRight"/>
        </template>
      </atom-navigation-button>

      <atom-navigation-button
        :step="1"
        >
          <template v-slot:mobile-icon>
            <atom-icon name="ChevronRight"/>
          </template>
      </atom-navigation-button>
    </div>
  </div>
</template>

<style lang="scss">
.molecule-mobile-menu {
  @include position($position: fixed, $bottom: 0px);

  display: none;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

  background: $menu-background-color;

  .molecule-mobile-menu-button {
    @include position($position: absolute, $bottom: 80px, $left: calc(50% - 35px));
    transform: translateY(50%);
  }

  &__navgation-buttons-wrapper {
    display: flex;
    gap: 10px;
  }
}

@media only screen and (max-width: $small) {
	.molecule-mobile-menu {
		display: flex;
	}
}
</style>