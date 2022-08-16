<template>
  <app-modal
    :isShow="getShowModalOfNewCalendar"
    @closeModal="switchShowModalOfNewCalendar(false)"
  >
    <div class="modal-of-new-calendar">
      <h2>Hey, here's the code for this calendar.</h2>
      <p>You can share it with those you want to give access.</p>
    </div>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppModal from "../AppModal.vue";

import { useMainStore } from "../../stores/MainStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "TheModalOfNewCalendar",
  components: {
    AppModal,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const { getShowModalOfNewCalendar } = storeToRefs(useMainStore());
    const { switchShowModalOfNewCalendar } = useMainStore();

    const closeModal = () => {
      emit("closeModal");
    };

    return {
      getShowModalOfNewCalendar,
      switchShowModalOfNewCalendar,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-of-new-calendar {
  @include flexbox;
  @include flex-direction(column);
  gap: 20px;
  width: 500px;
  margin: 10px;
  border-radius: 5px;

  background: $background-color;
}
</style>
