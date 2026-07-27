import { computed } from 'vue';
import { u as useCookie } from './server.mjs';

const useTheme = () => {
  const colorMode = useCookie("color-mode", { default: () => "light" });
  const isDark = computed(() => colorMode.value === "dark");
  const toggleTheme = () => {
    colorMode.value = isDark.value ? "light" : "dark";
  };
  return { colorMode, isDark, toggleTheme };
};

export { useTheme as u };
//# sourceMappingURL=useTheme-CfcsnVmm.mjs.map
