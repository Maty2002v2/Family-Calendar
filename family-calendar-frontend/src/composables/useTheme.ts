import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const mode = ref('light');

const updateMode = () => {
  mode.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useTheme = () => {
  const localStorageThemeMode = useLocalStorage('themeMode');

  onMounted(() => {
    console.log(localStorageThemeMode.value)

    if(localStorageThemeMode.value.length < 1) {
      updateMode();
    } else {
      mode.value = localStorageThemeMode.value;
    }

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateMode);
  });

  onBeforeUnmount(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', updateMode);
  })

  return {
    mode
  }
}