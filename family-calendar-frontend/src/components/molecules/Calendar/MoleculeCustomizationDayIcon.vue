<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from 'vue-i18n';

import AtomIcon from "@/components/atoms/AtomIcon.vue";
import MoleculeSelectionIconPopup from "@/components/molecules/Calendar/MoleculeSelectionIconPopup.vue";

import { useTheme } from '@/composables/useTheme';

import { Icon, Color } from '@/types/Components.interface';

const emit = defineEmits(['getIconDay']);

const { t } = useI18n();
const { mainColor } = useTheme();

const listOfIconsNames: Icon[] = [
  { name: "Baby" },
  { name: "Accessibility" },
  { name: "AlarmClock" },
  { name: "Apple" },
  { name: "Contact" },
  { name: "DollarSign" },
  { name: "FlaskConical" },
  { name: "FlagTriangleRight" },
  { name: "Dumbbell" },
  { name: "Home" },
  { name: "HandMetal" },
  { name: "Lightbulb" },
  { name: "Moon" },
  { name: "PackageOpen" },
  { name: "Palmtree" },
  { name: "Palmtree" },
  { name: "Paintbrush2" },
  { name: "Plane" },
  { name: "Phone" },
  { name: "School" },
  { name: "ShoppingBasket" },
  { name: "Slack" },
  { name: "Stethoscope" },
  { name: "Truck" },
  { name: "Wallet" },
  { name: "Utensils" },
  { name: "Video" },
  { name: "Wrench" },
  { name: "Wine" },
  { name: "Trash" },
  { name: "Tv2" },
  { name: "Sword" },
];

const colorList: Color[] = [
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

const selectedIcon = ref("Apple");
const selectedColor = ref(mainColor.value);

watch([selectedIcon, selectedColor], ([newIcon, newColor]) => {
  emit("getIconDay", { name: newIcon, color: newColor });
});

watch(mainColor, (newValue) => {
  selectedColor.value = newValue;
})
</script>

<template>
  <article class="icon-selection">
    <section
      class="icon-selection__preview"
    >
      <atom-icon 
        class="icon-selection__icon" 
        :name="selectedIcon" 
        :color="selectedColor"
        :size="35"
      />
    </section>
    <section class="icon-selection__choice">
      <molecule-selection-icon-popup
        :title="t('addToDayModal.Icon')"
        :listItem="listOfIconsNames"
        @getValue="(element) => (selectedIcon = element)"
      >
        <template #item="{ name }">
          <div class="icon-selection__item-list">
            <atom-icon :name="name"/>
          </div>
        </template>
      </molecule-selection-icon-popup>

      <molecule-selection-icon-popup
        :title="t('addToDayModal.Color')"
        :listItem="colorList"
        @getValue="(element) => (selectedColor = element)"
      >
        <template #item="{ name }">
          <div
            class="icon-selection__item-list"
            :style="{ background: name }"
          ></div>
        </template>
      </molecule-selection-icon-popup>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.icon-selection {
  width: 100%;
  height: 100%;
  @include flexbox;
  @include align-items(center);
  gap: 20px;

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
