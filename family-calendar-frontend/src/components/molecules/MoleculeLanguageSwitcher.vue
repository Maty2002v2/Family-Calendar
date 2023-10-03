<template >
  <div 
    :style="styleObject" 
    class="molecule-language-switcher" 
    @click="languageIndexIncremental"
  >
    {{ currentLanguage.code }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { i18n } from '@/translations/main'

type languageCode = 'pl' | 'en';

type languageBlock = {
  code: languageCode,
  background: string,
}

export default defineComponent({
  name: "MoleculeLanguageSwitcher",
  setup() {
    const { locale } = i18n.global;

    const languageIndex = ref(0);

    const avaibleLanguages: Array<languageBlock> = [
      {
        code: "pl",
        background: "#DE5858"
      },
      {
        code: "en",
        background: "#FF8000"
      }
    ];

    const currentLanguage = computed(() => avaibleLanguages[languageIndex.value]);
    const styleObject = computed(() => ({
      backgroundColor: currentLanguage.value.background
    }));

    const languageIndexIncremental = () => {
      languageIndex.value++;

      if(languageIndex.value >= avaibleLanguages.length) {
        languageIndex.value = 0;
      }

      locale.value = currentLanguage.value.code;
    }

    return {
      languageIndex,
      styleObject,
      currentLanguage,
      languageIndexIncremental,
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