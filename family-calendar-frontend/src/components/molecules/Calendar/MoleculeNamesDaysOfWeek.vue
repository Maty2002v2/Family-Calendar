<template>
  <div class="molecule-names-days-of-week">
    <div
      v-for="(name, index) in namesDaysOfWeek"
      :key="index"
      class="molecule-names-days-of-week__div"
      :class="{
        'molecule-names-days-of-week__div--sunday': name == namesDaysOfWeek[0],
      }"
    >
      {{ t(`shortNamesDaysOfWeek.${name}`) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useDateStore } from "@/stores/DateStore";

export default defineComponent({
  name: "MoleculeNamesDaysOfWeek",
  setup() {
    const { t } = useI18n();
    const { getNamesDaysOfWeek: namesDaysOfWeek } = storeToRefs(useDateStore());

    return { 
      t,
      namesDaysOfWeek,
    };
  },
});
</script>

<style lang="scss" scoped>
$size-day-div: calc(100% / 7 - 5px);

.molecule-names-days-of-week {
  @include flexbox;
  gap: 5px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  margin: 15px 0px;

  color: #aaa;
  font-family: sans-serif;
  font-weight: normal;
  font-size: 15px;

  &__div {
    width: $size-day-div;
    letter-spacing: 1px;
  }

  &__div--sunday {
    color: $active-day !important;
    font-weight: bold;
  }
}

@media only screen and (max-width: $small) {
  .molecule-names-days-of-week {
    display: none;
  }
}
</style>
