<template>
  <div class="field">
    <div class="fiels__p">
      {{ nrDay }}
    </div>
    <div v-if="specialDayList.length" class="icons">
      <i
        v-for="(specialDay, index) in theFirstThreeElements"
        :key="index"
        class="icon-demo icons__i"
        :class="[specialDay.icon_name]"
        :style="{ backgroundColor: specialDay.icon_color }"
      ></i>
      <span
        v-if="specialDayList.length > 3"
        class="icons__span animate__animated animate__flash animate__slower animate__infinite"
        >...</span
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "CalendarField",
  props: {
    nrDay: {
      type: Number,
      required: true,
    },
    specialDayList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props) {
    const iconNameList = [
      "icon-shopping-basket",
      "icon-cab",
      "icon-paw",
      "icon-male",
      "icon-female",
      "icon-medkit",
      "icon-briefcase",
      "icon-phone",
      "icon-users",
      "icon-glass",
    ];

    const theFirstThreeElements = computed(() =>
      props.specialDayList.slice(0, 3)
    );

    return { iconNameList, theFirstThreeElements };
  },
});
</script>

<style lang="scss" scoped>
.field {
  position: relative;

  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  font-size: 15px;
  font-family: sans-serif;

  &__p {
    z-index: 100;
  }

  .icons {
    position: absolute;
    bottom: 0px;
    left: 0px;

    display: flex;
    justify-content: flex-end;
    gap: 5px;
    width: 100%;
    padding: 5px 7px;
    box-sizing: border-box;

    &__i {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: min(calc(100% / 4 - 5px), 25px);
      border-radius: 50%;

      color: $white;
      font-size: max(1vw, 8px);
    }

    &__span {
      display: flex;
      align-items: flex-end;
      aspect-ratio: 1 / 1;
      width: min(calc(100% / 4 - 5px), 25px);

      color: #000000;
      font-size: 1vw;
    }
  }
}

@media only screen and (max-width: $small) {
  .field {
    .icons {
      &__i {
        width: 27px;
        font-size: 15px;
      }

      &__span {
        width: 27px;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
}

@media only screen and (max-width: 300px) {
  .field {
    font-size: 13px;
  }
}
</style>
