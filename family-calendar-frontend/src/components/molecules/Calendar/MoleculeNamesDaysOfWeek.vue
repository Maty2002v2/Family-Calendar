<template>
  <div class="molecule-names-days-of-week">
    <div
      v-for="(value) in 6"
      :key="value"
      class="molecule-names-days-of-week__div"
      :class="{
        'molecule-names-days-of-week__div--sunday': value == 1,
      }"
    >
      {{ t(`shortNamesDaysOfWeek.${value}`) }}
    </div>

    <div
      class="molecule-names-days-of-week__div"
    >
      {{ t(`shortNamesDaysOfWeek.${0}`) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: "MoleculeNamesDaysOfWeek",
  setup() {
    const { t } = useI18n();

    return { 
      t
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

  color: $main-font-color;
  font-family: sans-serif;
  font-weight: normal;
  font-size: 15px;

  &__div {
    width: $size-day-div;
    letter-spacing: 1px;
  }

  &__div--sunday {
    color: $main-color !important;
    font-weight: bold;
  }
}

@media only screen and (max-width: $small) {
  .molecule-names-days-of-week {
    display: none;
  }
}
</style>
