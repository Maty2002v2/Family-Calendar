<template>
  <div class="molecule-mobile-menu">
    <button class="molecule-mobile-menu__triger"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoleculeMobileMenu",
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
  background: #FFFFFF;

  &__triger {
    position: absolute;
    bottom: 80px;
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
    background-color: #008EFA;
    border: 10px solid #EEEEEE;
    border-radius: 50%;
    padding: 20px;
    cursor: pointer;
    transform: translateY(50%);
    transition: .35s ease;
  }
}
</style>