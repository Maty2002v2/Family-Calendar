<template>
  <div class="delete-button">
    <i
      class="delete-button__icon demo-icon icon-trash-empty"
      @click="eraseDay"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useCalendarApiStore } from "../stores/CalendarApiStore";

export default defineComponent({
  name: "AppDeleteDayButton",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { deleteDay } = useCalendarApiStore();

    const eraseDay = () => deleteDay(props.id);

    return { eraseDay };
  },
});
</script>

<style lang="scss" scoped>
.delete-button {
  margin-top: 10px;
  text-align: right;

  &__icon {
    display: inline-block;
    color: $active-day;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
