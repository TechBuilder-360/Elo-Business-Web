<script setup>
import { onMounted } from 'vue';

const colorMode = useCookie('color-mode', { default: () => 'light' });

useHead({
  htmlAttrs: {
    class: () => colorMode.value === 'dark' ? 'dark' : ''
  }
});

// Sync class with cookie immediately on client so there is no flash
onMounted(() => {
  if (colorMode.value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
  <div class="w-full min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20">
    <NuxtPage />
  </div>
</template>
