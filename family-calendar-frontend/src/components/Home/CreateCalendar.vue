<template>
  <div class="create-calendar animate__animated animate__fadeInDown">
    <div class="create-calendar__title-with-information">
      <h2 class="create-calendar__h2">Create your calendar.</h2>
    </div>
    <button class="btn-rectangle" @click="create">create</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMainStore } from "../../stores/MineStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreateCalendar",
  setup() {
    const { createCalendar } = useMainStore();
    const router = useRouter();

    const create = () => {
      createCalendar().then((response) => {
        if (!response.error) {
          router.push({
            name: "calendar",
            params: {
              calendarId: response.message,
            },
          });
        } else {
          console.log("Cos poszlo nie tak", response);
        }
      });
    };

    return { create };
  },
});
</script>

<style lang="scss" scoped>
.create-calendar {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: (100%) / 4;
  height: 100%;
  padding: 0px 20px;

  height: 100%;

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
