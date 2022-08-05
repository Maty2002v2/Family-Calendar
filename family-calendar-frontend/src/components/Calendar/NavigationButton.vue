<template>
  <div class="calendar-navigation">
    <div
      class="calendar-navigation__icon"
      @click="changeDate()"
      v-html="icon"
    ></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useDateStore } from "../../stores/DateStore";

export default defineComponent({
  name: "CalendarNavigationButton",
  props: {
    icon: {
      type: String,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { changeDateData } = useDateStore();
    const changeDate = () => changeDateData(props.step);

    return { changeDate };
  },
});
</script>

<style lang="scss" scoped>
.calendar-navigation {
  width: 50px;
  height: 30px;
  box-sizing: border-box;

  color: #333;
  font-family: sans-serif;

  background-color: transparent;

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

.calendar-navigation:hover {
  border: 1px solid black;
  cursor: pointer;
}
</style>
