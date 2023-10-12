<template>
  <div class="molecule-desktop-menu" ref="mobileMenuElement">
    <button class="molecule-desktop-menu__triger" @click="switchState" ref="trigerButton">
      <atom-icon class="icon-cog" />
    </button>
    <div class="molecule-desktop-menu__item molecule-desktop-menu__item--0">
      <moloecule-dark-mode-switcher />
    </div>
    <div class="molecule-desktop-menu__item molecule-desktop-menu__item--1">
      <molecule-language-switcher />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AtomIcon from '@/components/atoms/AtomIcon.vue';
import MoloeculeDarkModeSwitcher from "@/components/molecules/MoloeculeDarkModeSwitcher.vue";
import MoleculeLanguageSwitcher from "@/components/molecules/MoleculeLanguageSwitcher.vue";

export default defineComponent({
  name: "MoleculeDesktopMenu",
  components: {
    AtomIcon,
    MoloeculeDarkModeSwitcher,
    MoleculeLanguageSwitcher,
  },
  setup(props) {
    const mobileMenuElement = ref<HTMLDivElement>();
    const trigerButton = ref<HTMLButtonElement>();

    const switchState = () => {
      const menuItems = mobileMenuElement.value?.querySelectorAll('.molecule-desktop-menu__item');
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
.molecule-desktop-menu {
  @include position($position: relative);

  &__triger {
    width: 50px;
    height: 50px;
    background: $main-color;
    border: none;
    border-radius: 50%;
    // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    transition: .35s ease;

    color: #FFFFFF;
    font-size: 22px;

    &.is-rotate {
      color: $main-color;
      background-color: $background-color;
      // box-shadow: $main-color 0px 0px 24px;
      transform: rotateZ(225deg);
      border: 1px solid $main-color;
    }
  }

  &__item {
    @include position($position: absolute, $top: -10px);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 50%;
    border: none;

    background: $background-color;

    box-shadow: 0 0 5px 1px rgba(0,0,0,.05);
    z-index: -1000;
    opacity: 0;
    cursor: pointer;
    transform: scale(0.7);
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

  .item-0 { 
    top:  2px; 
    left: calc(50% + 30px); 
    opacity: 1;
    transform: translateY(-12px);
  }

  .item-1 { 
    top: 2px; 
    left: calc(50% + 100px); 
    opacity: 1;
    transform: translateY(-12px);
  }

  .item-2 { 
    top: 2px;
    left: calc(50% + 130px); 
    opacity: 1;
    transform: translateY(-12px);
  }

  &--horizontal-trigger {
    .molecule-desktop-menu__triger {
      background-color: $main-color;
      font-size: 25px;

      &.is-rotate {
        color: $white;
        background: $background-color;
        transform: rotateZ(225deg);
      }
    }
  }
}
</style>