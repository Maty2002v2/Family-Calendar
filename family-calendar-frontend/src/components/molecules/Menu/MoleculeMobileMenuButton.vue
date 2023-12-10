<script setup lang="ts">
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import AtomMenuButtonTriger from "@/components/atoms/Menu/AtomMenuButtonTriger.vue";
import MoloeculeDarkModeSwitcher from "@/components/molecules/MoloeculeDarkModeSwitcher.vue";
import MoleculeLanguageSwitcher from "@/components/molecules/MoleculeLanguageSwitcher.vue";
import MoleculeListOfWholeMonth from "@/components/molecules/Calendar/MoleculeListOfWholeMonth.vue";
import MoleculeLogoutCalendar from "@/components/molecules/MoleculeLogoutCalendar.vue";

const mobileMenuElement = ref<HTMLDivElement>();
const trigerButton = ref<HTMLButtonElement>();

const menuItems = computed(() =>
  mobileMenuElement.value?.querySelectorAll(".molecule-mobile-menu-button__item")
);

const hideState = () => {
  if (!trigerButton.value || !menuItems.value) return;

  trigerButton.value.classList.remove("is-rotate");
  menuItems.value.forEach((item, index) => item.classList.remove(`item-${index}`));
};

onClickOutside(mobileMenuElement, hideState);
</script>

<template>
  <atom-menu-button-triger classPrefix="molecule-mobile-menu-button">
    <template
      #atomMenuButtonTrigerWrapper="{
        setRefParentElement,
        setButtonTrgerElement,
        buttonAction,
      }"
    >
      <div class="molecule-mobile-menu-button" :ref="(el) => setRefParentElement(el as HTMLDivElement)">
        <button
          class="molecule-mobile-menu-button__triger"
          @click="buttonAction"
          :ref="(el) => setButtonTrgerElement(el as HTMLButtonElement)"
        >
          <atom-icon name="Settings" />
        </button>
        <div
          class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--0"
        >
          <moloecule-dark-mode-switcher />
        </div>
        <div
          class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--1"
        >
          <molecule-language-switcher />
        </div>
        <div
          class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--2"
        >
          <molecule-list-of-whole-month />
        </div>
        <div
          class="molecule-mobile-menu-button__item molecule-mobile-menu-button__item--3"
        >
          <molecule-logout-calendar />
        </div>
      </div>
    </template>
  </atom-menu-button-triger>
</template>

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
    transition: 0.35s ease;

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
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.05);
    z-index: -1000;
    opacity: 0;
  }

  &__item--0 {
    transition: 0.35s ease;
    left: calc(50% - 40px);
  }

  &__item--1 {
    transition: 0.35s ease 0.1s;
    left: calc(50% - 30px);
  }

  &__item--2 {
    transition: 0.35s ease 0.2s;
    right: calc(50% - 40px);
  }

  &__item--3 {
    transition: 0.35s ease 0.3s;
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
}
</style>
