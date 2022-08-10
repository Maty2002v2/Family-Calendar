<template>
  <div class="icon-selection">
    <article class="icon-selection__content">
      <section
        class="icon-selection__preview"
        v-html="previewTemplate"
      ></section>
      <section class="icon-selection__choice">
        <selection-popup
          title="icon"
          :listItem="iconNameList"
          @getValue="(element) => (selectedIcon = element)"
        >
          <template #item="{ name }">
            <div class="icon-selection__item-list">
              <i class="icon-demo" :class="[name]"></i>
            </div>
          </template>
        </selection-popup>

        <selection-popup
          title="color"
          :listItem="colorList"
          @getValue="(element) => (selectedColor = element)"
        >
          <template #item="{ name }">
            <div
              class="icon-selection__item-list"
              :style="{ background: name }"
            ></div>
          </template>
        </selection-popup>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import SelectionPopup from "./SelectionPopup.vue";

export default defineComponent({
  name: "TheIconSelection",
  components: {
    SelectionPopup,
  },
  setup() {
    const iconNameList = [
      { name: "icon-shopping-basket" },
      { name: "icon-cab" },
      { name: "icon-paw" },
      { name: "icon-male" },
      { name: "icon-female" },
      { name: "icon-medkit" },
      { name: "icon-briefcase" },
      { name: "icon-phone" },
      { name: "icon-users" },
      { name: "icon-glass" },
      { name: "icon-shopping-basket" },
      { name: "icon-cab" },
      { name: "icon-paw" },
      { name: "icon-male" },
      { name: "icon-female" },
      { name: "icon-medkit" },
      { name: "icon-briefcase" },
      { name: "icon-phone" },
      { name: "icon-users" },
      { name: "icon-glass" },
    ];

    const colorList = [
      { name: "#e43b3b" },
      { name: "#d28fad" },
      { name: "#637999" },
      { name: "#778afd" },
      { name: "#ffe800" },
      { name: "#ff3e99" },
      { name: "#c563a9" },
      { name: "#b6d7a8" },
      { name: "#d3ffce" },
      { name: "#ff985f" },
      { name: "#F1A9A9" },
    ];

    const selectedIcon = ref("icon-briefcase");
    const selectedColor = ref("#e43b3b");

    const previewTemplate = computed(
      () =>
        `<i class="icon-demo icon-selection__icon ${selectedIcon.value}" style="background-color: ${selectedColor.value}"></i>`
    );

    return {
      iconNameList,
      colorList,
      selectedIcon,
      selectedColor,
      previewTemplate,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-selection {
  width: 100%;
  height: 100%;

  &__content {
    display: flex;
    align-items: center;
    // gap: 70px;
  }

  &__preview {
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    height: 100%;
  }

  &:deep(.icon-selection__icon) {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    width: 50px;
    border-radius: 50%;

    color: $white;
    font-size: 20px;
  }

  &__choice {
    flex-basis: 50%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  &__item-list {
    width: 100%;
    height: 100%;
  }
}
</style>