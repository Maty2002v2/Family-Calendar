<template>
  <div class="not-found">
    <div class="container">
      <h1 class="not-found__h1 animate__animated animate__jello">404</h1>
      <p class="not-found__p">Brak klendarza o takim #hashu</p>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 60vh;
    box-sizing: border-box;
    background: $active-day;
  }

  &__h1 {
    text-align: center;
    margin: 0px;
    color: $background-color;
    font-size: max(20vw, 70px);
    letter-spacing: 5px;
  }

  &__p {
    text-align: center;
    color: $background-color;
    font-weight: bold;
    letter-spacing: 1px;
  }
}
</style>
