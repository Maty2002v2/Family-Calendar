<template>
  <atom-animated-wrapper
    class="organism-join-calendar animate__zoomIn animate__delay-1s"
  >
    <atom-title tag="h2" content="Join already existing calendar." class="organism-join-calendar__h2" />
    <molecule-join-calendar-form class="organism-join-calendar__form" />
  </atom-animated-wrapper>
</template>

<script lang="ts">
import { defineComponent} from "vue";

import AtomAnimatedWrapper from "@/components/atoms/AtomAnimatedWrapper.vue";
import AtomTitle from "../atoms/AtomTitle.vue";
import MoleculeJoinCalendarForm from "@/components/molecules/MoleculeJoinCalendarForm.vue"

export default defineComponent({
  name: "OrganismJoinCalendar",
  components: {
    AtomTitle,
    AtomAnimatedWrapper,
    MoleculeJoinCalendarForm
  }
});
</script>

<style lang="scss" scoped>
.organism-join-calendar {
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
  .organism-join-calendar {
    gap: (100%) / 5;

    &__h2 {
      margin-top: 30px;
    }
  }
}
</style>
