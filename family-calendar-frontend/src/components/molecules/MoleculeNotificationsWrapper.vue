<template>
  <TransitionGroup 
    enter-active-class="animate__animated animate__faster animate__bounceIn"
    leave-active-class="animate__animated animate__faster animate__bounceOut" 
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

<script lang="ts">
import { defineComponent } from 'vue';

import MoleculeNotification from "@/components/molecules/MoleculeNotification.vue";

import { useNotifications } from '@/composables/useNotifications';

export default defineComponent({
  name: "MoleculeNotificationsWrapper",
  components: {
    MoleculeNotification,
  },
  setup() {
    const { notifications } = useNotifications();

    return {
      notifications
    }
  }
})
</script>

<style lang="scss">
.molecule-notifications-wrapper {
  @include position($position: fixed, $top: 30px, $right: 30px);
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
</style>