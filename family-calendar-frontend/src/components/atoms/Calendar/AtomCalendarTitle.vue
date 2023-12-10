<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from 'vue-i18n';
import { storeToRefs } from "pinia";
import { useDateStore } from "@/stores/DateStore";

const { t } = useI18n();
const { getMounth, getYear } = storeToRefs(useDateStore());

const monuhName = computed(() => t(`months.${[getMounth.value + 1]}`));
const title = computed(() => `${monuhName.value} ${getYear.value}`);
</script>

<template>
  <div class="atom-calendar-title">{{ title }}</div>
</template>

<style lang="scss" scoped>
.atom-calendar-title {
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  color: $main-font-color;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 1px;

  background: $background-color;

  z-index: 1;
}

@media only screen and (max-width: $small) {
  .atom-calendar-title {
    @include position($position: sticky, $top: 0);

    @include flexbox;
    @include flex-centering;
    min-height: 50px;

    font-size: 20px;
  }
}
</style>