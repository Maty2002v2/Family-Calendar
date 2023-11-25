<script setup lang="ts">
import { useCalendarApi } from "@/composables/useCalendarApi";
import AtomIcon from "@/components/atoms/AtomIcon.vue";

const props = defineProps<{
  id: string
}>();

const { deleteDay } = useCalendarApi();
const eraseDay = () => deleteDay(props.id);
</script>

<template>
  <div class="molecule-delete-day-button">
    <atom-icon
      class="molecule-delete-day-button__icon"
      name="Trash2"
      @click="eraseDay"
    />
  </div>
</template>

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