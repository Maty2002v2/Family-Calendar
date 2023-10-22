<template>
  <div class="molecule-delete-day-button">
    <atom-icon
      class="molecule-delete-day-button__icon icon-trash-empty"
      @click="eraseDay"
    ></atom-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCalendarApi } from "@/composables/useCalendarApi";
import AtomIcon from "@/components/atoms/AtomIcon.vue";

export default defineComponent({
  name: "MoleculeDeleteDayButton",
  components: {
    AtomIcon
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { deleteDay } = useCalendarApi();

    const eraseDay = () => deleteDay(props.id);

    return { eraseDay };
  },
});
</script>

<style lang="scss" scoped>
.molecule-delete-day-button {
  margin-top: 10px;
  text-align: right;

  &__icon {
    display: inline-block;
    color: $main-color;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>