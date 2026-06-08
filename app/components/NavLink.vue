<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  activeClass: String,
  class: String,
});
</script>

<template>
  <NuxtLink
    :to="to"
    :active-class="activeClass || 'router-link-active'"
    :class="class"
  >
    <slot />
  </NuxtLink>
</template>
