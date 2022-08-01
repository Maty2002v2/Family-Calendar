<template>
  <div>
    <div @click="changeDate()" v-html="icon"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMainStore } from "../stores/MainStore";

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
    const { changeDateData } = useMainStore();
    const changeDate = () => changeDateData(props.step);

    return { changeDate };
  },
});
</script>
