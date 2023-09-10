<template>
  <div class="icon-selection">
    <article class="icon-selection__content">
      <section
        class="icon-selection__preview"
      >
        <atom-icon :class="['icon-selection__icon', selectedIcon]" :style="{'background-color': selectedColor}" />
      </section>
      <section class="icon-selection__choice">
        <selection-popup
          title="icon"
          :listItem="iconNameList"
          @getValue="(element) => (selectedIcon = element)"
        >
          <template #item="{ name }">
            <div class="icon-selection__item-list">
              <atom-icon :class="[name]" />
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
import { defineComponent, ref, computed, watch } from "vue";

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import SelectionPopup from "./SelectionPopup.vue";

export default defineComponent({
  name: "TheIconSelection",
  components: {
    AtomIcon,
    SelectionPopup,
  },
  emits: ["getIconDay"],
  setup(props, { emit }) {
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
      { name: "icon-glass" }, //
      { name: "icon-calendar" },
      { name: "icon-hourglass-2" },
      { name: "icon-venus-mars" },
      { name: "icon-bicycle" },
      { name: "icon-brush" },
      { name: "icon-tree" },
      { name: "icon-space-shuttle" },
      { name: "icon-food" },
      { name: "icon-coffee" },
      { name: "icon-mail-alt" },
      { name: "icon-moon-inv" },
      { name: "icon-pencil" },
      { name: "icon-wrench" },
      { name: "icon-home" },
      { name: "icon-hammer" },
      { name: "icon-credit-card" },
      { name: "icon-cog" },
      { name: "icon-basket" },
      { name: "icon-attention" },
      { name: "icon-trash-empty" },
      { name: "icon-ok" },
      { name: "icon-phone" },
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
      { name: "#34568B" },
      { name: "#6B5B95" },
      { name: "#88B04B" },
      { name: "#F7CAC9" },
      { name: "#92A8D1" },
      { name: "#EFC050" },
      { name: "#DD4124" },
      { name: "#DFCFBE" },
    ];

    const selectedIcon = ref("icon-briefcase");
    const selectedColor = ref("#DE5858");

    watch([selectedIcon, selectedColor], ([newIcon, newColor]) => {
      emit("getIconDay", { name: newIcon, color: newColor });
    });

    return {
      iconNameList,
      colorList,
      selectedIcon,
      selectedColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-selection {
  width: 100%;
  height: 100%;

  &__content {
    @include flexbox;
    @include align-items(center);
    gap: 20px;
  }

  &__preview {
    @include flex-basis(50%);
    @include flexbox;
    @include justify-content(center);
    height: 100%;
  }

  &:deep(.icon-selection__icon) {
    @include flexbox;
    @include flex-centering;
    aspect-ratio: 1 / 1;
    width: 50px;
    border-radius: 50%;

    color: $white;
    font-size: 20px;
  }

  &__choice {
    @include flex-basis(50%);
    @include flexbox;
    @include justify-content(flex-start);
    @include flex-direction(column);
    gap: 10px;
  }

  &__item-list {
    width: 100%;
    height: 100%;
  }
}
</style>
