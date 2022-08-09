<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheIconSelection",
  setup() {
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

    return { iconNameList };
  },
});
</script>

<style lang="scss" scoped></style>
