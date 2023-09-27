<template>
  <div class="molecule-mobile-menu">
    <button class="molecule-mobile-menu__triger" @click="switchState" ref="trigerButton"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MoleculeMobileMenu",
  setup() {
    const trigerButton = ref<HTMLDivElement>();

    const switchState = () => {
      if(!trigerButton.value) return;

      trigerButton.value.classList.toggle("is-rotate");
      // for (var i = 0; i < item.length; i++) {
      //     item[i].classList.toggle(`item-${i}`);
      // }
    }

    return {
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

  background: radial-gradient(circle at top, rgba(238, 238, 238, 0) 0%, rgba(238, 238, 238, 0) 28%, rgb(238, 238, 238) 27%, rgb(238, 238, 238) 100%);

  &__triger {
    position: absolute;
    bottom: 80px;//use position
    left: calc(50% - 40px);
    width: 80px;
    height: 80px;
    background-color: #008EFA;
    border: none;
    border-radius: 50%;
    padding: 20px;
    cursor: pointer;
    transform: translateY(50%);
    transition: .35s ease;
  }

  .is-rotate {
    transform: translateY(40%) rotateZ(225deg);
    background-color: #FF207A;
  }
}
</style>