import { ref, computed } from "vue";
import { i18n } from '@/translations/main';

type languageCode = 'pl' | 'en';
type languageBlock = {
  code: languageCode,
  background: string,
}

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

const tapNextLanguage = () => {
  languageIndex.value++;

  if(languageIndex.value >= avaibleLanguages.length) {
    languageIndex.value = 0;
  }

  locale.value = currentLanguage.value.code;
}

export const useLanguages = () => {
  return {
    avaibleLanguages,
    tapNextLanguage,
    currentLanguage
  }
}