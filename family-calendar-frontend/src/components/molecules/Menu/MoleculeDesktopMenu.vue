<template>
  <atom-menu-button-triger classPrefix="molecule-desktop-menu">
    <template #atomMenuButtonTrigerWrapper="{ setRefParentElement, setButtonTrgerElement, buttonAction }">
      <div class="molecule-desktop-menu" :ref="(el) => setRefParentElement(el)">
        <button class="molecule-desktop-menu__triger" @click="buttonAction" :ref="(el) => setButtonTrgerElement(el)">
          <atom-icon class="icon-cog" />
        </button>
        <div class="molecule-desktop-menu__item molecule-desktop-menu__item--0">
          <moloecule-dark-mode-switcher />
        </div>
        <div class="molecule-desktop-menu__item molecule-desktop-menu__item--1">
          <molecule-language-switcher />
        </div>
        <div class="molecule-desktop-menu__item molecule-desktop-menu__item--2">
          <molecule-logout-calendar/>
        </div>
      </div>
    </template>
  </atom-menu-button-triger>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AtomIcon from '@/components/atoms/AtomIcon.vue';
import AtomMenuButtonTriger from '@/components/atoms/Menu/AtomMenuButtonTriger.vue';
import MoloeculeDarkModeSwitcher from "@/components/molecules/MoloeculeDarkModeSwitcher.vue";
import MoleculeLanguageSwitcher from "@/components/molecules/MoleculeLanguageSwitcher.vue";
import MoleculeLogoutCalendar from '@/components/molecules/MoleculeLogoutCalendar.vue';

export default defineComponent({
  name: "MoleculeDesktopMenu",
  components: {
    AtomIcon,
    AtomMenuButtonTriger,
    MoloeculeDarkModeSwitcher,
    MoleculeLanguageSwitcher,
    MoleculeLogoutCalendar,
  }
})
</script>

<style lang="scss">
.molecule-desktop-menu {
  @include position($position: absolute, $bottom: 20px, $left: 20px);
  transform: translate(50%, -50%);

  &__triger {
    width: 50px;
    height: 50px;
    background: $main-color;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: .35s ease;

    color: #FFFFFF;
    font-size: 22px;

    &.is-rotate {
      color: $main-color;
      background-color: $background-color;
      transform: rotateZ(225deg);
      border: 1px solid $main-color;
    }
  }

  &__item {
    @include position($position: absolute, $top: -5px);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 50%;
    border: none;

    background: $background-color;

    box-shadow: 0 0 5px 1px rgba(0,0,0,.05);
    z-index: -1000;
    opacity: 0;
    cursor: pointer;
    transform: scale(0.7);

    &:hover {
      & > div {
        filter: brightness(90%);
      }
    }

    &:active {
      & > div {
        transform: scale(0.9);
      }
    }
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
    left: calc(50% - 40px);
  }

  .item-0 { 
    top:  7px; 
    left: calc(50% + 40px); 
    opacity: 1;
    transform: translateY(-12px);
  }

  .item-1 { 
    top:  7px; 
    left: calc(50% + 110px); 
    opacity: 1;
    transform: translateY(-12px);
  }

  .item-2 { 
    top:  7px; 
    left: calc(50% + 180px); 
    opacity: 1;
    transform: translateY(-12px);
  }
}
</style>