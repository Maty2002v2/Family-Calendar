<script setup lang="ts">
import { computed } from "vue";
import { useLanguages } from "@/composables/useLanguages";

const { currentLanguage, tapNextLanguage } = useLanguages();

const styleObject = computed(() => ({
  backgroundColor: currentLanguage.value.background
}));
</script>

<template>
  <div 
    :style="styleObject" 
    class="molecule-language-switcher" 
    @click="tapNextLanguage"
  >
    {{ currentLanguage.code }}
  </div>
</template>

<style lang="scss">
.molecule-language-switcher {
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