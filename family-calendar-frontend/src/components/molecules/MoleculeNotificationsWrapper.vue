<script setup lang="ts">
import MoleculeNotification from "@/components/molecules/MoleculeNotification.vue";
import { useNotifications } from '@/composables/useNotifications';

const { notifications } = useNotifications();
</script>

<template>
  <TransitionGroup 
    enter-active-class="animate__animated animate__zoomInRight"
    leave-active-class="animate__animated animate__zoomOutRight" 
    class="molecule-notifications-wrapper"
    tag="div" 
  >
    <molecule-notification 
      v-for="(notification, key) in notifications" 
      :key="key"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
    />
  </TransitionGroup>
</template>

<style lang="scss">
.molecule-notifications-wrapper {
  @include position($position: fixed, $top: 50px, $right: 30px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media only screen and (max-width: $small) {
  .molecule-notifications-wrapper {
    @include position($position: fixed, $bottom: 150px, $right: 0px);
    font-size: 10px;
  }
}
</style>