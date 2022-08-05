<template>
  <div>
    <Suspense>
      <template #default>
        <the-calendar />
      </template>
      <template #fallback>
        <app-loader />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheCalendar from "../components/Calendar/TheCalendar.vue"; // @ is an alias to /src
import AppLoader from "../components/AppLoader.vue"; // @ is an alias to /src

export default defineComponent({
  name: "CalendarView",
  components: {
    TheCalendar,
    AppLoader,
  },
});
</script>
