<template>
  <app-modal
    :isShow="getShowModalOfNewCalendar"
    @closeModal="switchShowModalOfNewCalendar(false)"
  >
    <div class="modal-of-new-calendar">
      <h2 class="modal-of-new-calendar__h2">
        <span class="modal-of-new-calendar__thickening-span">Hey</span>, here's
        the code for this calendar
        <span class="modal-of-new-calendar__thickening-span" ref="codeSpan">{{
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
        Close
      </button>
    </div>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import AppModal from "../AppModal.vue";

import { storeToRefs } from "pinia";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";
import { useMainStore } from "../../stores/MainStore";

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

    const codeSpan = ref();
    const closeAndCopy = () => switchShowModalOfNewCalendar(false);

    const closeModal = () => {
      emit("closeModal");
    };

    return {
      getCalendarHash,
      getShowModalOfNewCalendar,
      codeSpan,
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
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

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
    max-width: 200px;
    height: auto;
  }
}
</style>
