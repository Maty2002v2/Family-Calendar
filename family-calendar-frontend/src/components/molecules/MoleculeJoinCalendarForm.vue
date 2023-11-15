<template>
  <div>
    <molecule-input-with-options :label="t('enterCode')" v-model="calendarHash" />
    <molecule-square-button variant="btn-rectangle--gradient" @click="pushToCalendar(calendarHash)">
      {{ t('join') }}
    </molecule-square-button>

    <atom-animated-wrapper
      class="molecule-join-calendar-form__invalid-code"
      :class="{
        animate__rubberBand: getIncorrectCodeEntered,
        animate__bounceOut: !getIncorrectCodeEntered,
      }"
      >
        {{ t('BadCode') }}
      </atom-animated-wrapper>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useI18n } from 'vue-i18n';
import { storeToRefs } from "pinia";

import AtomAnimatedWrapper from "@/components/atoms/AtomAnimatedWrapper.vue";
import MoleculeInputWithOptions from "@/components/molecules/InputWithOptions/MoleculeInputWithOptions.vue";
import MoleculeSquareButton from "@/components/molecules/MoleculeSquareButton.vue";

import { useUtils } from "@/composables/useUtils";

import { useMainStore } from "@/stores/MainStore";

export default defineComponent({
  name: "MoleculeJoinCalendarForm",
  components: {
    MoleculeInputWithOptions,
    MoleculeSquareButton,
    AtomAnimatedWrapper,
  },
  setup() {
    const { getIncorrectCodeEntered } = storeToRefs(useMainStore());
    const { switchIncorrectCodeEntered } = useMainStore();

    const { pushToCalendar } = useUtils();
    const { t } = useI18n();

    const calendarHash = ref("");

    watch(getIncorrectCodeEntered, (newValue) => {
      if (newValue) {
        setTimeout(() => switchIncorrectCodeEntered(false), 3000);
      }
    });

    return { 
      calendarHash, 
      getIncorrectCodeEntered,
      pushToCalendar,
      t 
    };
  }
});
</script>

<style lang="scss">
.molecule-join-calendar-form {
  &__invalid-code {
    width: 100%;
    text-align: center;

    color: $main-font-color;
    font-size: 13px;
    font-weight: 100;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}
</style>
