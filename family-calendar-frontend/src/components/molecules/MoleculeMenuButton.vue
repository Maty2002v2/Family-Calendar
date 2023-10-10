<template>
  <div 
    :class="['molecule-menu-button', `molecule-menu-button--${animationType}`]" 
    ref="mobileMenuElement"
  >
    <button class="molecule-menu-button__triger" @click="switchState" ref="trigerButton">
      <atom-icon class="icon-cog" />
    </button>
    <div class="molecule-menu-button__item molecule-menu-button__item--0">
      <moloecule-dark-mode-switcher />
    </div>
    <div class="molecule-menu-button__item molecule-menu-button__item--1">
      <molecule-language-switcher />
    </div>
    <div class="molecule-menu-button__item molecule-menu-button__item--2">
      <molecule-list-of-whole-month />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AtomIcon from '@/components/atoms/AtomIcon.vue';
import MoloeculeDarkModeSwitcher from "@/components/molecules/MoloeculeDarkModeSwitcher.vue";
import MoleculeLanguageSwitcher from "@/components/molecules/MoleculeLanguageSwitcher.vue";
import MoleculeListOfWholeMonth from "@/components/molecules/Calendar/MoleculeListOfWholeMonth.vue";

export default defineComponent({
  name: "MoleculeMenuButton",
  components: {
    AtomIcon,
    MoloeculeDarkModeSwitcher,
    MoleculeLanguageSwitcher,
    MoleculeListOfWholeMonth,
  },
  props: {
    trigerSeize: {//add validator for px
      type: String,
      default: '70px'
    },
    animationType: {
      type: String,
      default: 'over-trigger',
      validator(value: string) {
        return ['over-trigger', 'horizontal trigge-'].includes(value);
      },
    }
  },
  setup() {
    const mobileMenuElement = ref<HTMLDivElement>();
    const trigerButton = ref<HTMLButtonElement>();

    const switchState = () => {
      const menuItems = mobileMenuElement.value?.querySelectorAll('.molecule-menu-button__item');
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
.molecule-menu-button {
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
    color: #FFFFFF;
    font-size: 40px;
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

  &--over-trigger {
    .molecule-menu-button__triger.is-rotate {
      transform: translateY(10%) rotateZ(225deg);
      background-color: $main-color;
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
  }
}
</style>