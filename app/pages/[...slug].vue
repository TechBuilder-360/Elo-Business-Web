<script setup>
import { onMounted } from "vue";

definePageMeta({
  layout: false,
});

const route = useRoute();

onMounted(() => {
  console.error(
    "404 Error: User attempted to access non-existent route:",
    route.path
  );
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-muted text-foreground">
    <div class="text-center">
      <h1 class="mb-4 text-4xl font-bold text-foreground">404</h1>
      <p class="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
      <NuxtLink to="/" class="text-primary underline hover:text-primary/90">
        Return to Home
      </NuxtLink>
    </div>
  </div>
</template>
