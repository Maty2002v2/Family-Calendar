import { computed, onMounted, onUnmounted, ref } from "vue";

const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value <= 460);

export const useWidthWindow = () => {
  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  return { 
    width: windowWidth,
    isMobile,
  };
}
