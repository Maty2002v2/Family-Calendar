<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { useTheme } from '@/composables/useTheme';

export default {
  setup() {
    useTheme();
  }
}
</script>