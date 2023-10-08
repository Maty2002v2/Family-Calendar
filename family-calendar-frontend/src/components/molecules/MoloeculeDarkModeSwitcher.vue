<template>
  <div class="molecule-dork-mode-switcher" :style="styleObject" @click="tapSwitchMode">
    <atom-icon class="icon-brush" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import AtomIcon from '@/components/atoms/AtomIcon.vue';
import { useTheme } from '@/composables/useTheme';

export default defineComponent({
  name: "MoleculeDarkModeSwitcher",
  components: {
    AtomIcon
  },
  setup() {
    const { tapSwitchMode, secondMainColor } = useTheme();

    const styleObject = computed(() => ({
      backgroundColor: secondMainColor.value,
    }));

    return {
      styleObject,
      tapSwitchMode,
    }
  }
})
</script>

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