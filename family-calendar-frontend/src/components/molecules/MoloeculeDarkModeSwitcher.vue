<script setup lang="ts">
import { computed } from 'vue';
import AtomIcon from '@/components/atoms/AtomIcon.vue';
import { useTheme } from '@/composables/useTheme';

const { mode, tapSwitchMode, secondMainColor } = useTheme();

const styleObject = computed(() => ({
  backgroundColor: secondMainColor.value,
}));

const iconName = computed(() => mode.value === 'dark' ? 'Sun' : 'Moon')
</script>

<template>
  <div 
    class="molecule-dork-mode-switcher" 
    :style="styleObject" 
    @click="tapSwitchMode"
  >
      <atom-icon :name="iconName"/>
  </div>
</template>

<style lang="scss">
.molecule-dork-mode-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;

  color: $modal-headers-color;
  font-weight: 600;
  text-transform: uppercase;
}
</style>