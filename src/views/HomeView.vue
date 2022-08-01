<template>
  <div class="home">
    <the-calendar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheCalendar from "../components/TheCalendar.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    TheCalendar,
  },
});
</script>
