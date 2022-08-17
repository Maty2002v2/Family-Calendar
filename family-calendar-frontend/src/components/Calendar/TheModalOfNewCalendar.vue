<template>
  <app-modal
    :isShow="getShowModalOfNewCalendar"
    @closeModal="switchShowModalOfNewCalendar(false)"
  >
    <div class="modal-of-new-calendar">
      <h2 class="modal-of-new-calendar__h2">
        <span class="modal-of-new-calendar__thickening-span">Hey</span>, here's
        the code for this calendar
        <span class="modal-of-new-calendar__thickening-span">{{
          getCalendarHash
        }}</span
        >.
      </h2>
      <p class="modal-of-new-calendar__p">
        You can
        <span class="modal-of-new-calendar__thickening-span">share</span> it
        with those you want to give access.
      </p>
      <button
        class="btn-pils modal-of-new-calendar__button"
        @click="closeAndCopy"
      >
        Copy and close
      </button>
    </div>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppModal from "../AppModal.vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "../../stores/MainStore";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";

export default defineComponent({
  name: "TheModalOfNewCalendar",
  components: {
    AppModal,
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const { getShowModalOfNewCalendar } = storeToRefs(useMainStore());
    const { switchShowModalOfNewCalendar } = useMainStore();

    const { getCalendarHash } = storeToRefs(useCalendarApiStore());

    const closeAndCopy = () => switchShowModalOfNewCalendar(false);

    const closeModal = () => {
      emit("closeModal");
    };

    return {
      getCalendarHash,
      getShowModalOfNewCalendar,
      switchShowModalOfNewCalendar,
      closeAndCopy,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-of-new-calendar {
  @include flexbox;
  @include align-items(center);
  @include flex-direction(column);
  gap: 20px;
  width: 500px;
  padding: 30px;
  border-radius: 5px;
  margin: 20px;
  text-align: center;
  color: $active-day;

  background: $background-color;

  &__thickening-span {
    font-weight: 600;
  }

  &__h2 {
    margin: 20px 0px 15px 0px;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 40px;
  }

  &__p {
    font-weight: 500;
    letter-spacing: 1px;
  }

  &__button {
    height: auto;
    max-width: 200px;
  }
}
</style>
