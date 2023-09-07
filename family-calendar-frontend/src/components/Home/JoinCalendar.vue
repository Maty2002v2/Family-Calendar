<template>
  <div
    class="join-calendar animate__animated animate__zoomIn animate__delay-1s"
  >
    <div class="join-calendar__title-with-information">
      <h2 class="join-calendar__h2">Join already existing calendar.</h2>
    </div>
    <molecule-join-calendar-form class="join-calendar__form" />
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import MoleculeJoinCalendarForm from "@/components/molecules/MoleculeJoinCalendarForm.vue"

export default defineComponent({
  name: "JoinCalendar",
  components: {
    MoleculeJoinCalendarForm
  }
});
</script>

<style lang="scss" scoped>
.join-calendar {
  @include flexbox;
  @include align-items(center);
  @include flex-direction(column);
  gap: (100%) / 4;
  height: 100%;
  padding: 0px 20px;
  overflow: hidden;

  &__h2 {
    text-align: center;
    margin-top: 100px;
    font-size: max(5vw, 40px);
  }

  &__form {
    @include flexbox;
    @include justify-content(center);
    @include flex-wrap(wrap);
    gap: 10px;
  }
}

@media only screen and (max-width: $medium) {
  .join-calendar {
    gap: (100%) / 5;

    &__h2 {
      margin-top: 30px;
    }
  }
}
</style>
