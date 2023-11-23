<script setup lang="ts">
import { useI18n } from "vue-i18n";

import AtomAnimatedWrapper from "@/components/atoms/AtomAnimatedWrapper.vue";
import AtomTitle from "@/components/atoms/AtomTitle.vue";
import MoleculeJoinCalendarForm from "@/components/molecules/MoleculeJoinCalendarForm.vue";

const { t } = useI18n();
</script>

<template>
  <atom-animated-wrapper class="organism-join-calendar animate__zoomIn animate__delay-1s">
    <atom-title
      tag="h2"
      :content="`${t('JoinExisting')}.`"
      class="organism-join-calendar__h2"
    />
    <molecule-join-calendar-form class="organism-join-calendar__form" />
  </atom-animated-wrapper>
</template>

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
