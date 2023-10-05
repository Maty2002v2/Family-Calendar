import { onMounted, ref, computed } from "vue";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { i18n } from '@/translations/main';

type languageCode = 'pl' | 'en';
type languageBlock = {
  code: languageCode,
  background: string,
}

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

export const useLanguages = () => {
  const { locale } = i18n.global;
  const localStorageLanguage = useLocalStorage('lang', avaibleLanguages[0].code);

  const languageIndex = ref(0);

  const currentLanguage = computed(() => avaibleLanguages[languageIndex.value]);

  //private functions
  const findLanguageIndexInAvible = (isoCode: string) => {
    const index = avaibleLanguages.findIndex(language => language.code === isoCode);
    return index < 0 ? 0 : index;
  }

  //public functions
  const tapNextLanguage = () => {
    languageIndex.value++;

    if(languageIndex.value >= avaibleLanguages.length) {
      languageIndex.value = 0;
    }

    locale.value = currentLanguage.value.code;
    localStorageLanguage.value = currentLanguage.value.code;
  }

  onMounted(() => {
    languageIndex.value = findLanguageIndexInAvible(localStorageLanguage.value);
    locale.value = currentLanguage.value.code;
  })

  return {
    avaibleLanguages,
    tapNextLanguage,
    currentLanguage
  }
}