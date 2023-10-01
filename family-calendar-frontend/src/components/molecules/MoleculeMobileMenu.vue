<template>
  <div v-show="!modalIsOpen" class="molecule-mobile-menu" ref="mobileMenuElement">
    <button class="molecule-mobile-menu__triger" @click="switchState" ref="trigerButton"></button>
    <div class="molecule-mobile-menu__item molecule-mobile-menu__item--0"></div>
    <div class="molecule-mobile-menu__item molecule-mobile-menu__item--1"></div>
    <div class="molecule-mobile-menu__item molecule-mobile-menu__item--2">
      <molecule-list-of-whole-month />
    </div>

    <div class="molecule-mobile-menu__navgation-buttons-wrapper">
      <molecule-navigation-button
        :step="-1"
        >
          <template v-slot:mobile-icon>
            <atom-icon class="icon-left-open-mini"/>
          </template>
      </molecule-navigation-button>

      <molecule-navigation-button
        :step="-12"
      >
        <template v-slot:mobile-icon>
          <atom-icon class="icon-angle-double-left"/>
        </template>
      </molecule-navigation-button>
    </div>
    
    <div class="molecule-mobile-menu__navgation-buttons-wrapper">
      <molecule-navigation-button
        :step="12"
      >
        <template v-slot:mobile-icon>
          <atom-icon class="icon-angle-double-right"/>
        </template>
      </molecule-navigation-button>

      <molecule-navigation-button
        :step="1"
        >
          <template v-slot:mobile-icon>
            <atom-icon class="icon-right-open-mini"/>
          </template>
      </molecule-navigation-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import MoleculeListOfWholeMonth from "@/components/molecules/Calendar/MoleculeListOfWholeMonth.vue";
import MoleculeNavigationButton from "@/components/atoms/Calendar/AtomNavigationButton.vue";

import { useMainStore } from '@/stores/MainStore';

export default defineComponent({
  name: "MoleculeMobileMenu",
  components: {
    AtomIcon,
    MoleculeListOfWholeMonth,
    MoleculeNavigationButton,
  },
  setup() {
    const { modalIsOpen } = storeToRefs(useMainStore());

    const mobileMenuElement = ref<HTMLDivElement>();
    const trigerButton = ref<HTMLButtonElement>();

    const switchState = () => {
      const menuItems = mobileMenuElement.value?.querySelectorAll('.molecule-mobile-menu__item');
      if(!trigerButton.value || !menuItems) return;

      trigerButton.value.classList.toggle("is-rotate");
      menuItems.forEach((item, index) => item.classList.toggle(`item-${index}`))
    }

    return {
      modalIsOpen,
      mobileMenuElement,
      trigerButton,
      switchState
    }
  }
});
</script>

<style lang="scss" scoped>
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

  background: radial-gradient(circle at top, rgba(238, 238, 238, 0) 0%, rgba(238, 238, 238, 0) 23%, rgb(238, 238, 238) 22%, rgb(238, 238, 238) 100%);

  &__triger {
    @include position($position: absolute, $bottom: 80px, $left: calc(50% - 35px));

    width: 70px;
    height: 70px;
    background: #FFFFFF;
    border: none;
    border-radius: 50%;
    padding: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    transform: translateY(50%);
    transition: .35s ease;

    &::after, &::before{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      background: $active-day;
      transform: translate(-50%, -50%);
    }

    &::after {
      height: 30px;
      width: 2px;
    }

    &::before {
      height: 2px;
      width: 30px;
    }

    &.is-rotate {
      transform: translateY(40%) rotateZ(225deg);
      background-color: $active-day;

      &::after, &::before{
        background: #FFFFFF;
      }
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

      background: #FFFFFF;
      border: none;
      box-shadow: 0 0 5px 1px rgba(0,0,0,.05);
      z-index: -1000;
      opacity: 0;
    }

    &__item--0{ 
      transition: .35s ease; 
      left: calc(50% - 30px);
      background-color: $background-field;
    }

    &__item--1{ 
      transition: .35s ease .1s; 
      left: calc(50% - 30px);
      background-color: $background-field;
    }

    &__item--2{ 
      transition: .35s ease .2s; 
      right: calc(50% - 30px);
    }

  .item-0 { 
    top: -100px; 
    left: calc(50% - 130px); 
    opacity: 1;
  }

  .item-1 { 
    top: -140px; 
    left: calc(50% - 35px); 
    opacity: 1;
  }

  .item-2 { 
    top: -100px; 
    right: calc(50% - 130px); 
    opacity: 1;
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