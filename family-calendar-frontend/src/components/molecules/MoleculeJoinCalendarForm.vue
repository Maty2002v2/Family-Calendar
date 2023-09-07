<template>
  <div>
    <molecule-input-floating-label label="CODE" v-model="calendarHash" />
    <atom-square-button variant="btn-rectangle--gradient" @click="pushWithQuery">
      join
    </atom-square-button>
    <span
      class="molecule-join-calendar-form__invalid-code animate__animated"
      :class="{
        animate__rubberBand: getIncorrectCodeEntered,
        animate__bounceOut: !getIncorrectCodeEntered,
      }"
      >BAD CODE</span
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import MoleculeInputFloatingLabel from "@/components/molecules/MoleculeInputFloatingLabel.vue"
import AtomSquareButton from "@/components/atoms/AtomSquareButton.vue";

import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/MainStore";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "MoleculeJoinCalendarForm",
  components: {
    MoleculeInputFloatingLabel,
    AtomSquareButton,
  },
  setup() {
    const { getIncorrectCodeEntered } = storeToRefs(useMainStore());
    const { switchIncorrectCodeEntered } = useMainStore();

    const router = useRouter();

    const calendarHash = ref("");

    const pushWithQuery = () => {
      if (calendarHash.value.length > 0) {
        router.push({
          name: "calendar",
          params: {
            calendarId: calendarHash.value,
          },
        });
      } else {
        switchIncorrectCodeEntered(true); //TODO: Zrobic by mozna bylo przekazywac wiadomosci a nie tylko BAD CODE, np pusty kod
      }
    };

    watch(getIncorrectCodeEntered, (newValue) => {
      if (newValue) {
        setTimeout(() => switchIncorrectCodeEntered(false), 3000);
      }
    });

    return { calendarHash, getIncorrectCodeEntered, pushWithQuery };
  }
});
</script>

<style lang="scss">
.molecule-join-calendar-form {
  &__invalid-code {
    width: 100%;
    text-align: center;

    color: $color-day-field;
    font-size: 13px;
    font-weight: 100;
    letter-spacing: 1px;
  }
}
</style>
