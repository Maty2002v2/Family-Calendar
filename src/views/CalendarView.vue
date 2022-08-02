<template>
  <div class="calendar">
    <the-calendar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheCalendar from "../components/TheCalendar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "CalendarView",
  components: {
    TheCalendar,
  },
});
</script>
