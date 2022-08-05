<template>
  <div class="name-day-of-week">
    <div
      v-for="(name, index) in templateNamesDaysOfWeek"
      :key="index"
      class="name-day-of-week__div"
      :class="{
        'name-day-of-week__div--sunday': name == namesDaysOfWeek[0],
      }"
    >
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import useBreakpoints from "../../utils/WindowWidth";

export default defineComponent({
  name: "TheNameDayOfWeek",
  props: {
    totalNumberFields: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { width } = useBreakpoints();

    const namesDaysOfWeek: string[] = [
      "Pon",
      "Wto",
      "Śro",
      "Czw",
      "Pią",
      "Sob",
      "Nie",
    ];

    const templateNamesDaysOfWeek = computed(() => {
      //TODO: poprawic bo za kazdym razem jak zmiania sie szerokosc przekladarki to odpala sie funkcja
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

.name-day-of-week {
  display: flex;
  flex-wrap: wrap;
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
  .name-day-of-week {
    flex-direction: column;
    margin: 0px;

    &__div {
      display: flex;
      align-items: center;
      min-height: 100px;

      font-size: 30px;
    }
  }
}
</style>
