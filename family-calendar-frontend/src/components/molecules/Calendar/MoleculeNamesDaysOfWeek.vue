<template>
  <div class="molecule-names-days-of-week">
    <div
      v-for="(name, index) in templateNamesDaysOfWeek"
      :key="index"
      class="molecule-names-days-of-week__div"
      :class="{
        'molecule-names-days-of-week__div--sunday': name == namesDaysOfWeek[0],
      }"
    >
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useWidthWindow } from "@/composables/useWidthWindow";

export default defineComponent({
  name: "MoleculeNamesDaysOfWeek",
  props: {
    totalNumberFields: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { width } = useWidthWindow();

    const namesDaysOfWeek: string[] = [
      "Mon",
      "Tues",
      "Wed",
      "Thurs",
      "Fri",
      "Sat",
      "Sun",
    ];

    const templateNamesDaysOfWeek = computed(() => {
      if (width.value < 460) {
        //460 to breakpoint w css ($samll) w _variabels.sass
        let total = props.totalNumberFields;
        let template = [];

        while (total > 7) {
          template.push(...namesDaysOfWeek);
          total -= 7;
        }

        while (total > 0) {
          template.push(namesDaysOfWeek[total]);
          total -= 1;
        }

        return template;
      } else {
        return namesDaysOfWeek;
      }
    });

    return { templateNamesDaysOfWeek, namesDaysOfWeek };
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
