<template>
  <p
    class="molecule-checkboc-form__p"
    :class="{ 'molecule-checkboc-form__p--active': !switchValue }"
  >
    {{ firstOption }}
  </p>
  <atom-checkbox-input class="molecule-checkboc-form__switch" v-model:checked="switchValue" />
  <p
    class="molecule-checkboc-form__p"
    :class="{ 'molecule-checkboc-form__p--active': switchValue }"
  >
    {{ secoundOption }}
  </p>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import AtomCheckboxInput from "@/components/atoms/AtomCheckboxInput.vue";

export default defineComponent({
  name: "MoleculeCheckboxForm",
  components: {
    AtomCheckboxInput
  },
  props: {
    firstOption: {
      type: String,
      default: ''
    },
    secoundOption: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const switchValue = ref(false);

    watch(switchValue, () => {
      emit('valueToggle', switchValue.value)
    })

    return { switchValue }
  }
})
</script>

<style lang="scss">
.molecule-checkboc-form {
  &__switch {
    @include flex-basis((100% / 3));
  }

  &__p {
    @include flex-basis((100% / 3));
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s ease;

    &--active {
      color: $main-color;
    }
  }
}

@media only screen and (max-width: $small) {
  .molecule-checkboc-form {
    &__switch,
    &__p {
      @include flex-basis(100%);
    }
  }
}
</style>