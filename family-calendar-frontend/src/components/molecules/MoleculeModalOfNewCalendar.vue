<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";

import AtomTitle from "@/components//atoms/AtomTitle.vue";
import MoleculePillButton from "@/components/molecules/MoleculePillButton.vue";
import MoleculeModal from "@/components/molecules/MoleculeModal.vue";

import { useCalendarApi } from "@/composables/useCalendarApi";
import { useCopyText } from "@/composables/useCopyText";
import { useNotifications } from "@/composables/useNotifications";

import { useMainStore } from "@/stores/MainStore";

const { getShowModalOfNewCalendar } = storeToRefs(useMainStore());
const { switchShowModalOfNewCalendar } = useMainStore();

const { getCalendarHash } = useCalendarApi();

const { copyTextToClipboard } = useCopyText();
const { t } = useI18n();
const { addNotification, defaultNotificationTime } = useNotifications();

const codeSpan = ref();
const closeAndCopy = () => switchShowModalOfNewCalendar(false);

const copyHash = () => {
  copyTextToClipboard(getCalendarHash.value);
  addNotification({
    type: "info",
    message: t("CodeCopied", { code: getCalendarHash.value }),
    time: defaultNotificationTime.time,
  });
};
</script>

<template>
  <molecule-modal
    :isShow="getShowModalOfNewCalendar"
    @closeModal="switchShowModalOfNewCalendar(false)"
  >
    <div class="modal-of-new-calendar">
      <atom-title tag="h2" class="modal-of-new-calendar__h2">
        <span v-html="t('startAlert.hereIsYourCode')"></span>
        <span
          class="modal-of-new-calendar__thickening-span modal-of-new-calendar__hash"
          ref="codeSpan"
          @click="copyHash"
        >
          {{ getCalendarHash }} </span
        >.
      </atom-title>
      <p v-html="t('startAlert.youCanShare')" class="modal-of-new-calendar__p"></p>
      <molecule-pill-button class="modal-of-new-calendar__button" @click="closeAndCopy">{{
        t("close")
      }}</molecule-pill-button>
    </div>
  </molecule-modal>
</template>

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
  color: $main-color;

  background: $background-color;

  &__hash {
    display: inline-block;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none;
    cursor: pointer;

    &:active {
      transition: all 0.2 ease-in-out;
      transform: scale(0.9);
    }
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

  &__thickening-span {
    font-weight: 600;
  }

  &__button {
    max-width: 200px;
    height: auto;
  }
}
</style>