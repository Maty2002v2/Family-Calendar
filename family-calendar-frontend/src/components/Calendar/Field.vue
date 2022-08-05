<template>
  <div class="field">
    {{ nrDay }}
    <p v-if="bargainsOnThisday.length">jest</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CalendarField",
  props: {
    nrDay: {
      type: Number,
      required: true,
    },
    bargainsOnThisday: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
.field {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  font-size: 15px;
  font-family: sans-serif;
}

@media only screen and (max-width: 300px) {
  .field {
    font-size: 13px;
  }
}
</style>
