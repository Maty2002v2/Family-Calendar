<template >
  <div 
    :style="styleObject" 
    class="molecule-language-switcher" 
    @click="tapNextLanguage"
  >
    {{ currentLanguage.code }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useLanguages } from "@/composables/useLanguages";


export default defineComponent({
  name: "MoleculeLanguageSwitcher",
  setup() {
    const { currentLanguage, tapNextLanguage } = useLanguages();

    const styleObject = computed(() => ({
      backgroundColor: currentLanguage.value.background
    }));

    return {
      styleObject,
      currentLanguage,
      tapNextLanguage,
    }
  }
})
</script>

<style lang="scss">
.molecule-language-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;

  color: #FFFFFF;
  font-weight: 600;
  text-transform: uppercase;
}
</style>