<template>
  <div>
    <Suspense>
      <template #default>
        <the-calendar />
      </template>
      <template #fallback>
        <atom-loader />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheCalendar from "@/components/organisms/OrganismCalendar.vue"; // @ is an alias to /src
import AtomLoader from "@/components/molecules/MoleculeLoader.vue"; // @ is an alias to /src

export default defineComponent({
  name: "PageCalendar",
  components: {
    TheCalendar,
    AtomLoader,
  },
});
</script>
