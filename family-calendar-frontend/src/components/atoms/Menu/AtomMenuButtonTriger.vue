<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps<{
  classPrefix: string,
  class: string,
}>();

const mobileMenuElement = ref<HTMLDivElement>();
const setRefParentElement = (el: HTMLDivElement) => {
  mobileMenuElement.value = el;
};

const trigerButton = ref<HTMLButtonElement>();
const setButtonTrgerElement = (el: HTMLButtonElement) => {
  trigerButton.value = el;
};
    
const menuItems = computed(() => mobileMenuElement.value?.querySelectorAll(`.${props.classPrefix}__item`));

const switchState = () => {
  const menuItems = mobileMenuElement.value?.querySelectorAll(`.${props.classPrefix}__item`);
  if(!trigerButton.value || !menuItems) return;

  trigerButton.value.classList.toggle("is-rotate");
  menuItems.forEach((item, index) => item.classList.toggle(`item-${index}`));
};

const hideState = () => {
  if(!trigerButton.value || !menuItems.value) return;

  trigerButton.value.classList.remove("is-rotate");
  menuItems.value.forEach((item, index) => item.classList.remove(`item-${index}`));
}

onClickOutside(mobileMenuElement, hideState);
</script>

<template>
  <slot name="atomMenuButtonTrigerWrapper" 
    :setRefParentElement="setRefParentElement"
    :setButtonTrgerElement="setButtonTrgerElement"
    :buttonAction="switchState"
    :class="props.class"
  ></slot>
</template>