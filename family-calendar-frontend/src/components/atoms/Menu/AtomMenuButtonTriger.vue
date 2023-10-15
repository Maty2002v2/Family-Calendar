<template>
  <slot name="atomMenuButtonTrigerWrapper" 
    :setRefParentElement="setRefParentElement"
    :setButtonTrgerElement="setButtonTrgerElement"
    :buttonAction="switchState"
  ></slot>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';

export default defineComponent({
  name: "AtomMenuButtonTriger",
  props: {
    classPrefix: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const mobileMenuElement = ref<HTMLDivElement>();
    const setRefParentElement = (el: HTMLDivElement) => {
      mobileMenuElement.value = el;
    };

    const trigerButton = ref<HTMLButtonElement>();
    const setButtonTrgerElement = (el: HTMLButtonElement) => {
      trigerButton.value = el;
    };
    
    const menuItems = computed(() => mobileMenuElement.value?.querySelectorAll(`.${props.classPrefix}-menu__item`));

    const switchState = () => {
      const menuItems = mobileMenuElement.value?.querySelectorAll(`.${props.classPrefix}__item`);
      if(!trigerButton.value || !menuItems) return;

      trigerButton.value.classList.toggle("is-rotate");
      menuItems.forEach((item, index) => item.classList.toggle(`item-${index}`))
    };

    const hideState = () => {
      if(!trigerButton.value || !menuItems.value) return;

      trigerButton.value.classList.remove("is-rotate");
      menuItems.value.forEach((item, index) => item.classList.remove(`item-${index}`))
    }

    onClickOutside(mobileMenuElement, hideState);

    return {
      setRefParentElement,
      setButtonTrgerElement,
      switchState
    }
  }
})
</script>

<style lang="scss">
  
</style>