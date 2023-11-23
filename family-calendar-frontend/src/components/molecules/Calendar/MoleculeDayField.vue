<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

import { type SpecialDay } from '@/types/Components.interface';

import { useDateStore } from "@/stores/DateStore";

import AtomAnimatedWrapper from "@/components/atoms/AtomAnimatedWrapper.vue";
import AtomIcon from "@/components/atoms/AtomIcon.vue";

export interface Props {
  nrDay: number;
  specialDayList: SpecialDay[];
}

const props = withDefaults(defineProps<Props>(), {
  specialDayList: () => [],
});
const { getFirstMonthDay } = storeToRefs(useDateStore());

const { t } = useI18n();

const translatedDayOfWeek = computed(() => {
  const index = ((getFirstMonthDay.value - 2 + props.nrDay) % 7) + 1;

  return t(`shortNamesDaysOfWeek.${index != 7 ? index : 0}`);
});

const theFirstThreeElements = computed(() => props.specialDayList.slice(0, 3));
</script>

<template>
  <div class="molecule-day-field">
    <p class="molecule-day-field__day-name">{{ translatedDayOfWeek }}</p>
    <p>{{ nrDay }}</p>
    <div v-if="specialDayList.length" class="icons molecule-day-field__icons">
      <atom-icon
        v-for="(specialDay, index) in theFirstThreeElements"
        :key="index"
        class="icons__i animate__pulse animate__faster"
        :class="[specialDay.icon_name, `animate__delay-${index + 1}s`]"
        :style="{ backgroundColor: specialDay.icon_color }"
      />

      <atom-animated-wrapper
        v-if="specialDayList.length > 3"
        class="icons__span animate__animated animate__pulse animate__slower animate__infinite"
      >
        ...
      </atom-animated-wrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.molecule-day-field {
  position: relative;

  @include flexbox;
  @include flex-centering;
  @include flex-direction(column);
  height: 100%;

  font-size: 15px;
  font-family: sans-serif;

  &__day-name {
    display: none;
    position: absolute;
    top: 0px;
    left: 10px;
  }

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
  .molecule-day-field {
    &__day-name {
      display: block;
    }
  }
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
  .molecule-day-field {
    font-size: 13px;
  }
}
</style>
