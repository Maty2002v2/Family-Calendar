<script setup lang="ts">
import { useRouter } from 'vue-router';

import AtomIcon from '@/components/atoms/AtomIcon.vue';

import { useCalendarApi } from "@/composables/useCalendarApi";

const router = useRouter();
const { removeCalendarHash } = useCalendarApi();

const calickAction = () => {
  removeCalendarHash();
  router.push({name: 'home'});
}
</script>

<template>
  <div class="molecule-logout-calendar" @click="calickAction">
    <atom-icon name="LogOut" />
  </div>
</template>

<style lang="scss" scoped>
.molecule-logout-calendar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;

  background-color: #8250df;

  color: $modal-headers-color;
  font-weight: 600;
  text-transform: uppercase;
}
</style>