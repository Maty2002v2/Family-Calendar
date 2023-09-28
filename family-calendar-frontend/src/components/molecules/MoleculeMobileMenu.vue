<template>
  <div class="molecule-mobile-menu" ref="mobileMenuElement">
    <button class="molecule-mobile-menu__triger" @click="switchState" ref="trigerButton"></button>
    <div class="molecule-mobile-menu__item molecule-mobile-menu__item--0">0</div>
    <div class="molecule-mobile-menu__item molecule-mobile-menu__item--1">1</div>
    <div class="molecule-mobile-menu__item molecule-mobile-menu__item--2">2</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MoleculeMobileMenu",
  setup() {
    const mobileMenuElement = ref<HTMLDivElement>();
    const trigerButton = ref<HTMLButtonElement>();

    const switchState = () => {
      const menuItems = mobileMenuElement.value?.querySelectorAll('.molecule-mobile-menu__item');
      if(!trigerButton.value || !menuItems) return;

      trigerButton.value.classList.toggle("is-rotate");
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.toggle(`item-${i}`);
      }
    }

    return {
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

  height: 80px;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

  background: radial-gradient(circle at top, rgba(238, 238, 238, 0) 0%, rgba(238, 238, 238, 0) 25%, rgb(238, 238, 238) 24%, rgb(238, 238, 238) 100%);

  &__triger {
    @include position($position: absolute, $bottom: 80px, $left: calc(50% - 40px));

    width: 80px;
    height: 80px;
    background: #008EFA;
    border: none;
    border-radius: 50%;
    padding: 20px;
    cursor: pointer;
    transform: translateY(50%);
    transition: .35s ease;

    &::after, &::before{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      background: #FFFFFF;
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
  }

  &__item{
      @include position($position: absolute, $top: -10px);

      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      padding: 20px;
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
    }

    &__item--1{ 
      transition: .35s ease .1s; 
      left: calc(50% - 30px);
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
    left: calc(50% - 30px); 
    opacity: 1;
  }

  .item-2 { 
    top: -100px; 
    right: calc(50% - 130px); 
    opacity: 1;
  }

  .is-rotate {
    transform: translateY(40%) rotateZ(225deg);
    background-color: #FF207A;
  }
}
</style>