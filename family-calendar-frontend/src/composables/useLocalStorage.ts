import { ref, watch } from 'vue'

export const useLocalStorage = (key: string, defaultValue = '') => {
  const localStorageValue = ref('');
  const localStorageInitValue = localStorage.getItem(key);

  if(localStorageInitValue) {
    localStorageValue.value = localStorageInitValue;
  } else {
    localStorage.setItem(key, defaultValue);
    localStorageValue.value = localStorage.getItem(key) ?? '';
  }

  watch(localStorageValue, (newValue) => {
    localStorage.setItem(key, newValue ?? '');
  });

  return localStorageValue;
} 