<template>
  <div class="not-found">
    <div class="not-found__container">
      <atom-title tag="h1" content="404" class="not-found__h1 animate__animated animate__jello" />
      <p class="not-found__p">No calendar with such #hash</p>
    </div>
  </div>
</template>

<script lang="ts">

import AtomTitle from '@/components/atoms/AtomTitle.vue';

export default {
  components: {
    AtomTitle
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  @include flexbox;
  @include flex-centering;
  height: 100vh;

  &__container {
    @include flexbox;
    @include flex-centering;
    @include flex-direction(column);

    width: 100%;
    height: 60vh;
    box-sizing: border-box;
    background: $active-day;
  }

  &__h1,
  &__p {
    text-align: center;
    color: $background-color;
  }

  &__h1 {
    margin: 0px;
    font-size: max(20vw, 70px);
    letter-spacing: 5px;
  }

  &__p {
    font-weight: bold;
    letter-spacing: 1px;
  }
}
</style>
