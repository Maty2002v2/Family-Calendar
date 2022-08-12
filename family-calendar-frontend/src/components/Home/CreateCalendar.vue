<template>
  <div class="create-calendar animate__animated animate__fadeInDown">
    <div class="create-calendar__title-with-information">
      <h2 class="create-calendar__h2">Create your calendar.</h2>
    </div>
    <button
      v-html="messageButton"
      class="btn-rectangle animate__animated"
      :class="{ animate__shakeX: failedCreation }"
      @click="create"
    ></button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useCalendarApiStore } from "../../stores/CalendarApiStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreateCalendar",
  setup() {
    const { createCalendar } = useCalendarApiStore();
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
