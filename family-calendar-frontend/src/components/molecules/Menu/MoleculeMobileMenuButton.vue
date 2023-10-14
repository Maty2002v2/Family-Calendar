<template>
  <div class="molecule-mobile-menu-button" ref="mobileMenuElement">
    <button class="molecule-mobile-menu-button__triger" @click="switchState" ref="trigerButton">
      <atom-icon class="icon-cog" />
    </button>
    <div class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--0">
      <moloecule-dark-mode-switcher />
    </div>
    <div class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--1">
      <molecule-language-switcher />
    </div>
    <div class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--2">
      <molecule-list-of-whole-month />
    </div>
    <div class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--3">
      <molecule-logout-calendar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AtomIcon from '@/components/atoms/AtomIcon.vue';
import MoloeculeDarkModeSwitcher from "@/components/molecules/MoloeculeDarkModeSwitcher.vue";
import MoleculeLanguageSwitcher from "@/components/molecules/MoleculeLanguageSwitcher.vue";
import MoleculeListOfWholeMonth from "@/components/molecules/Calendar/MoleculeListOfWholeMonth.vue";
import MoleculeLogoutCalendar from "@/components/molecules/MoleculeLogoutCalendar.vue";

export default defineComponent({
  name: "MoleculeMobileMenuButton",
  components: {
    AtomIcon,
    MoloeculeDarkModeSwitcher,
    MoleculeLanguageSwitcher,
    MoleculeListOfWholeMonth,
    MoleculeLogoutCalendar,
  },
  setup() {
    const mobileMenuElement = ref<HTMLDivElement>();
    const trigerButton = ref<HTMLButtonElement>();

    const switchState = () => {
      const menuItems = mobileMenuElement.value?.querySelectorAll('.molecule-mobile-menu-button__item');
      if(!trigerButton.value || !menuItems) return;

      trigerButton.value.classList.toggle("is-rotate");
      menuItems.forEach((item, index) => item.classList.toggle(`item-${index}`))
    };

    return {
      mobileMenuElement,
      trigerButton,
      switchState,
    }
  }
})
</script>

<style lang="scss">
.molecule-mobile-menu-button {
  @include position($position: relative);

  &__triger {
    width: 70px;
    height: 70px;
    background: $background-color;
    border: none;
    border-radius: 50%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    transition: .35s ease;

    color: $main-font-color;
    font-size: 25px;

    &.is-rotate {
      color: $white;
      background-color: $main-color;
      transform: translateY(-10%) rotateZ(225deg);
    }
  }

  &__item {
    @include position($position: absolute, $top: -25px);

    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 50%;

    background: $background-color;
    border: none;
    box-shadow: 0 0 5px 1px rgba(0,0,0,.05);
    z-index: -1000;
    opacity: 0;
  }

  &__item--0 { 
    transition: .35s ease; 
    left: calc(50% - 40px);
  }

  &__item--1 { 
    transition: .35s ease .1s; 
    left: calc(50% - 30px);
  }

  &__item--2 { 
    transition: .35s ease .2s; 
    right: calc(50% - 40px);
  }

  &__item--3 { 
    transition: .35s ease .3s; 
    right: calc(50% - 35px);
  }

  .item-0 { 
    top: -80px; 
    left: calc(50% - 130px); 
    opacity: 1;
  }

  .item-1 { 
    top: -110px; 
    left: calc(50% - 35px); 
    opacity: 1;
  }

  .item-2 { 
    top: -80px; 
    right: calc(50% - 130px); 
    opacity: 1;
  }

  .item-3 { 
    top: -210px; 
    right: calc(50% - 35px); 
    opacity: 1;
  }

  &--horizontal-trigger {
    .molecule-mobile-menu-button__triger {
      background-color: $main-color;
      font-size: 25px;

      &.is-rotate {
        color: $white;
        background: $background-color;
        transform: rotateZ(225deg);
      }
    }

    .molecule-mobile-menu-button__item {
      top: -10px;
    }

    .item-0 { 
      top:  0px; 
      left: calc(50% + 30px); 
      opacity: 1;
      transform: translateY(-12px);
    }

    .item-1 { 
      top: 0px; 
      left: calc(50% + 100px); 
      opacity: 1;
      transform: translateY(-12px);
    }

    .item-2 { 
      top: 0px;
      left: calc(50% + 130px); 
      opacity: 1;
      transform: translateY(-12px);
    }
  }
}
</style>