<template>
  <div class="molecule-notifications-wrapper">
    elo
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MoleculeNotification from "@/components/molecules/MoleculeNotification.vue";

export default defineComponent({
  name: "MoleculeNotificationsWrapper",
  components: {
    MoleculeNotification,
  }
})
</script>

<style lang="scss">
.molecule-notifications-wrapper {
  width: 100px;
  background-color: white;
}
</style>