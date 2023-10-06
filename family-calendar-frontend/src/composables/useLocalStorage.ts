import { onMounted, ref, watch } from 'vue'

export const useLocalStorage = (key: string, defaultValue: string) => {
  const localStorageValue = ref('');
  
  onMounted(() => {
    const localStorageInitValue = localStorage.getItem(key);
    if(localStorageInitValue) {
      localStorageValue.value = localStorageInitValue;
      return;
    }
    
    localStorage.setItem(key, defaultValue);
    localStorageValue.value = localStorage.getItem(key) ?? 'pl';
  })
  

  watch(localStorageValue, (newValue) => {
    localStorage.setItem(key, newValue);
  });

  return localStorageValue;
} 