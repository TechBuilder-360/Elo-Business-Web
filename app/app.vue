<script setup>
const colorMode = useCookie('color-mode', { default: () => 'light' });

useHead({
  htmlAttrs: {
    class: () => colorMode.value === 'dark' ? 'dark' : ''
  }
});
</script>

<template>
  <div class="w-full min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20">
    <NuxtPage />
  </div>
</template>
