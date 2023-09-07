<template>
  <div class="create-calendar animate__animated animate__fadeInDown">
    <div class="create-calendar__title-with-information">
      <atom-title tag="h2" content="Create your calendar." class="create-calendar__h2" />
    </div>
    <atom-square-button @click="create">
      {{ messageButton }}
    </atom-square-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useCalendarApiStore } from "../../stores/CalendarApiStore";
import { useMainStore } from "../../stores/MainStore";

import AtomTitle from "../atoms/AtomTitle.vue";
import AtomSquareButton from "@/components/atoms/AtomSquareButton.vue";

export default defineComponent({
  name: "CreateCalendar",
  components: {
    AtomTitle,
    AtomSquareButton
  },
  setup() {
    const { createCalendar } = useCalendarApiStore();
    const { switchShowModalOfNewCalendar } = useMainStore();

    const router = useRouter();

    let failedCreation = ref(false);

    const create = () => {
      createCalendar()
        .then((response) => {
          if (!response.error) {
            router.push({
              name: "calendar",
              params: {
                calendarId: response.message,
              },
            });
            setTimeout(() => switchShowModalOfNewCalendar(true), 1000);
          } else {
            failedCreation.value = true;
            setTimeout(() => (failedCreation.value = false), 4000);
          }
        })
        .catch(() => {
          failedCreation.value = true;
          setTimeout(() => (failedCreation.value = false), 4000);
        });
    };

    const messageButton = computed(() =>
      failedCreation.value ? "Something went wrong <br /> Try leater" : "create"
    );

    return { create, failedCreation, messageButton };
  },
});
</script>

<style lang="scss" scoped>
.create-calendar {
  @include flexbox;
  @include align-items(center);
  @include flex-direction(column);
  gap: (100%) / 4;
  height: 100%;
  padding: 0px 20px;

  &__h2 {
    text-align: center;
    margin-top: 100px;
    font-size: max(5vw, 40px);
  }
}

@media only screen and (max-width: $medium) {
  .create-calendar {
    gap: (100%) / 5;

    &__h2 {
      margin-top: 30px;
    }
  }
}
</style>
