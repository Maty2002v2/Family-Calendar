<template>
  <div class="repeat-selection-checkbox">
    <div class="repeat-selection-checkbox__title">
      <label class="repeat-selection-checkbox__label"
        >Do you repeat every year</label
      >
    </div>
    <div class="repeat-selection-checkbox__content">
      <p
        class="repeat-selection-checkbox__p"
        :class="{ 'repeat-selection-checkbox__p--active': !switchValue }"
      >
        Disposable
      </p>
      <label class="switch repeat-selection-checkbox__switch">
        <input class="switch__input" type="checkbox" v-model="switchValue" />
        <span class="switch__span round"></span>
      </label>
      <p
        class="repeat-selection-checkbox__p"
        :class="{ 'repeat-selection-checkbox__p--active': switchValue }"
      >
        Repeat every year
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "TheRepeatSelectionCheckbox",
  emits: ["getCheckboxValue"],
  setup(props, { emit }) {
    const switchValue = ref(false);

    watchEffect(() => emit("getCheckboxValue", switchValue.value));

    return { switchValue };
  },
});
</script>

<style lang="scss" scoped>
.repeat-selection-checkbox {
  @include flexbox;
  @include flex-direction(column);
  padding: 2px;
  box-sizing: border-box;

  letter-spacing: 1px;

  &__title {
    margin-bottom: 10px;
  }

  &__label {
    @include flex-basis(100%);
  }

  &__content {
    @include flexbox;
    @include flex-centering(space-between, center);
  }

  &__switch {
    @include flex-basis((100% / 3));
  }

  &__p {
    @include flex-basis((100% / 3));
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s ease;

    &--active {
      font-weight: 600;
      color: $active-day;
    }
  }
}
.switch {
  position: relative;
  display: inline-block;
  max-width: 80px;
  height: 34px;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .switch__span::before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      left: 100%;
      transform: translate(-110%, -50%);
    }
  }

  &__span {
    @include position($top: 0px, $right: 0px, $bottom: 0px, $left: 0px);

    border: 2px solid $active-day;
    border-radius: 34px;

    background-color: $white;

    cursor: pointer;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &::before {
      content: "";

      @include position($top: 50%, $left: 4%);

      height: 26px;
      width: 26px;
      border-radius: 50%;

      background-color: $active-day;

      -webkit-transition: 0.4s;
      transition: 0.4s;
      transform: translateY(-50%);
    }
  }
}

@media only screen and (max-width: $small) {
  .repeat-selection-checkbox {
    &__content {
      @include flex-centering(flex-start, stretch);
      @include flex-direction(column);
    }

    &__switch,
    &__p {
      @include flex-basis(100%);
    }
  }

  .switch {
    min-height: 34px;
  }
}
</style>
