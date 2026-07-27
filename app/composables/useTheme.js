import { useCookie } from '#app';
import { computed } from 'vue';

export const useTheme = () => {
  const colorMode = useCookie('color-mode', { default: () => 'light' });

  const isDark = computed(() => colorMode.value === 'dark');

  const toggleTheme = () => {
    colorMode.value = isDark.value ? 'light' : 'dark';
    if (import.meta.client) {
      if (colorMode.value === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return { colorMode, isDark, toggleTheme };
};
