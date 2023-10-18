import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useUtils } from '@/composables/useUtils';

const { hexToRgb } = useUtils();

const root: HTMLElement | null = document.querySelector(':root');

const mode = ref('light');

const mainColor = computed(() => 
  mode.value === 'dark' ? 
    process.env.VUE_APP_DARK_CURRENT_DAY_BACKGROUND_COLOR ?? '#5F85DB' : 
    process.env.VUE_APP_CURRENT_DAY_BACKGROUND_COLOR ?? '#F15C5C'
);
const secondMainColor = computed(() => 
  mode.value === 'dark' ? 
  process.env.VUE_APP_CURRENT_DAY_BACKGROUND_COLOR ?? '#F15C5C' :
  process.env.VUE_APP_DARK_CURRENT_DAY_BACKGROUND_COLOR ?? '#5F85DB' 
);

const updateModeBrowser = () => {
  mode.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  updateVariables();  
};
const updateVariable = (variableName: string, light: string, dark: string) => {
  if(!root) return;
  root.style.setProperty(
  variableName, 
  mode.value === 'light' ? light : dark
  );
}
const updateVariables = () => {
  updateVariable(
    '--mainColor',
    process.env.VUE_APP_CURRENT_DAY_BACKGROUND_COLOR ?? '#F15C5C',
    process.env.VUE_APP_DARK_CURRENT_DAY_BACKGROUND_COLOR ?? '#5F85DB' 
  );
  updateVariable(
    '--appBackgroundColor',
    process.env.VUE_APP_BACKGROUND_COLOR ?? '#FEFEFE',
    process.env.VUE_APP_DARK_BACKGROUND_COLOR ?? '#353941' 
  );
  updateVariable(
    '--backgroundDayField',
    process.env.VUE_APP_BACKGROUND_DAY_FIELD ?? '#FAFAFA',
    process.env.VUE_APP_DARK_BACKGROUND_DAY_FIELD ?? '#26282B' 
  );
  updateVariable(
    '--mainFontColor',
    process.env.VUE_APP_DAY_FIELD_FONT_COLOR ?? '#666666',
    process.env.VUE_APP_DARK_DAY_FIELD_FONT_COLOR ?? '#FFFFFF' 
  );
  updateVariable(
    '--hoverCurrentDayBackgroundColor',
    process.env.VUE_APP_HOVER_CURRENT_DAY_BACKGROUND_COLOR ?? '#DE5858',
    process.env.VUE_APP_DARK_HOVER_CURRENT_DAY_BACKGROUND_COLOR ?? '#90B8F8' 
  );
  updateVariable(
    '--hoverDayFieldBackgroundColor',
    process.env.VUE_APP_HOVER_DAY_FIELD_BACKGROUND_COLOR ?? '#D1EBFD',
    process.env.VUE_APP_DARK_HOVER_DAY_FIELD_BACKGROUND_COLOR ?? '#808080' 
  );
  updateVariable(
    '--inputBackgroundColor',
    process.env.VUE_APP_INPUT_BACKGROUND_COLOR,
    process.env.VUE_APP_DARK_INPUT_BACKGROUND_COLOR
  );
  updateVariable(
    '--inputPlaceholdercolor',
    process.env.VUE_APP_PLACEGOLDER_COLOR,
    process.env.VUE_APP_DARK_PLACEGOLDER_COLOR
  );
  updateVariable(
    '--modalHeadressColor',
    process.env.VUE_APP_MODAL_HEADERS_COLOR,
    process.env.VUE_APP_DARK_MODAL_HEADERS_COLOR
  );
  updateVariable(
    '--breakLineColor',
    process.env.VUE_APP_BREAK_LINE_COLOR,
    process.env.VUE_APP_DARK_BREAK_LINE_COLOR
  );
  updateVariable(
    '--successBackground',
    process.env.VUE_APP_SUCCESS_NOTIFICATION_BACKGROUND_COLOR,
    process.env.VUE_APP_DARK_SUCCESS_NOTIFICATION_BACKGROUND_COLOR
  );
  updateVariable(
    '--successBorder',
    process.env.VUE_APP_SUCCESS_NOTIFICATION_BORDER,
    process.env.VUE_APP_DARK_SUCCESS_NOTIFICATION_BORDER
  );
  updateVariable(
    '--successColor',
    process.env.VUE_APP_SUCCESS_NOTIFICATION_COLOR,
    process.env.VUE_APP_DARK_SUCCESS_NOTIFICATION_COLOR
  );
  updateVariable(
    '--infoBackground',
    process.env.VUE_APP_INFO_NOTIFICATION_BACKGROUND_COLOR,
    process.env.VUE_APP_DARK_INFO_NOTIFICATION_BACKGROUND_COLOR
  );
  updateVariable(
    '--infosBorder',
    process.env.VUE_APP_INFO_NOTIFICATION_BORDER,
    process.env.VUE_APP_DARK_INFO_NOTIFICATION_BORDER
  );
  updateVariable(
    '--infoColor',
    process.env.VUE_APP_INFO_NOTIFICATION_COLOR,
    process.env.VUE_APP_DARK_INFO_NOTIFICATION_COLOR
  );
  updateVariable(
    '--dangerBackground',
    process.env.VUE_APP_DANGER_NOTIFICATION_BACKGROUND_COLOR,
    process.env.VUE_APP_DARK_DANGER_NOTIFICATION_BACKGROUND_COLOR
  );
  updateVariable(
    '--dangerBorder',
    process.env.VUE_APP_DANGER_NOTIFICATION_BORDER,
    process.env.VUE_APP_DARK_DANGER_NOTIFICATION_BORDER
  );
  updateVariable(
    '--dangerColor',
    process.env.VUE_APP_DANGER_NOTIFICATION_COLOR,
    process.env.VUE_APP_DARK_DANGER_NOTIFICATION_COLOR
  );

  const { r: lr, g: lg, b: lb } = hexToRgb(process.env.VUE_APP_MENU_BACKGROUND_COLOR) ?? { r: 238, g: 238, b: 238 };
  const { r: dr, g: dg, b: db } = hexToRgb(process.env.VUE_APP_DARK_MENU_BACKGROUND_COLOR) ?? { r: 238, g: 238, b: 238 };
  updateVariable(
    '--menuBackgroundColor',
    `radial-gradient(circle at top, rgba(238, 238, 238, 0) 0%, rgba(238, 238, 238, 0) 23%, rgb(${lr}, ${lg}, ${lb}) 22%, rgb(${lr}, ${lg}, ${lb}) 100%)`,
    `radial-gradient(circle at top, rgba(238, 238, 238, 0) 0%, rgba(238, 238, 238, 0) 23%, rgb(${dr}, ${dg}, ${db}) 22%, rgb(${dr}, ${dg}, ${db}) 100%)`
  );

  const { r, g, b } = hexToRgb(mainColor.value) ?? { r: 241, g: 92, b: 92 }
  updateVariable(
    '--btnRectangleGradientColor',
    `linear-gradient(30deg, rgba(${r},${g},${b},1) 39%, rgba(253,253,253,1) 100%)`,
    `linear-gradient(30deg, rgba(${r},${g},${b},1) 39%, rgba(253,253,253,1) 100%)`
  );
}
const tapSwitchMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light';
};

export const useTheme = () => {
  const localStorageThemeMode = useLocalStorage('themeMode');

  watch(mode, (newValue) => {
    localStorageThemeMode.value = newValue;
    updateVariables();
  })

  onMounted(() => {
    if(localStorageThemeMode.value.length < 1) {
      updateModeBrowser();
    } else {
      mode.value = localStorageThemeMode.value;
      updateVariables();
    }

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateModeBrowser);
  });

  onBeforeUnmount(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', updateModeBrowser);
  })

  return {
    mode,
    mainColor,
    secondMainColor,
    tapSwitchMode,
  }
}