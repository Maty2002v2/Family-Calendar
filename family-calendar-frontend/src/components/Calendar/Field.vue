<template>
  <div class="field">
    <p class="field__p">
      {{ nrDay }}
    </p>
    <div v-if="specialDayList.length" class="icons field__icons">
      <atom-icon
        v-for="(specialDay, index) in theFirstThreeElements"
        :key="index"
        class="icons__i animate__animated animate__pulse animate__faster"
        :class="[specialDay.icon_name, `animate__delay-${index + 1}s`]"
        :style="{ backgroundColor: specialDay.icon_color }"
      />
      <span
        v-if="specialDayList.length > 3"
        class="icons__span animate__animated animate__pulse animate__slower animate__infinite"
        >...</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import AtomIcon from '@/components/atoms/AtomIcon.vue';

export default defineComponent({
  name: "CalendarField",
  components: {
    AtomIcon
  },  
  props: {
    nrDay: {
      type: Number,
      required: true,
    },
    specialDayList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props) {
    const theFirstThreeElements = computed(() =>
      props.specialDayList.slice(0, 3)
    );

    return { theFirstThreeElements };
  },
});
</script>

<style lang="scss" scoped>
.field {
  position: relative;

  @include flexbox;
  @include flex-centering;
  @include flex-direction(column);
  height: 100%;

  font-size: 15px;
  font-family: sans-serif;

  &__icons {
    @include position($bottom: 0px, $left: 0px);
  }
}

.icons {
  $gap: 5px;

  @mixin sizing-icons-childs {
    aspect-ratio: 1 / 1;
    width: min(calc(100% / 4 - $gap), 25px);
  }

  @include flexbox;
  @include justify-content(flex-end);
  gap: $gap;
  width: 100%;
  padding: 5px 7px;
  box-sizing: border-box;

  &__i {
    @include sizing-icons-childs;

    @include flexbox;
    @include flex-centering();
    border-radius: 50%;

    color: $white;
    font-size: max(1vw, 8px);
  }

  &__span {
    @include sizing-icons-childs;

    @include flexbox;
    @include align-items(flex-end);

    color: #000000;
    font-size: 1vw;
  }
}

@media only screen and (max-width: $small) {
  .icons {
    &__i {
      width: 27px;
      font-size: 15px;
    }

    &__span {
      width: 27px;
      font-size: 15px;
      font-weight: bold;
    }
  }
}

@media only screen and (max-width: 300px) {
  .field {
    font-size: 13px;
  }
}
</style>
