<script setup>
import { Check } from "lucide-vue-next";

defineProps({
  steps: {
    type: Array,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-between w-full mb-8">
    <div
      v-for="(label, index) in steps"
      :key="label"
      class="flex items-center flex-1 last:flex-none"
    >
      <div class="flex flex-col items-center gap-2">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
          :class="
            index < currentStep
              ? 'bg-step-complete text-primary-foreground'
              : index === currentStep
                ? 'bg-step-active text-primary-foreground shadow-lg shadow-primary/30'
                : 'bg-muted text-muted-foreground'
          "
        >
          <Check v-if="index < currentStep" class="w-5 h-5" />
          <template v-else>{{ index + 1 }}</template>
        </div>
        <span
          class="text-xs font-medium whitespace-nowrap"
          :class="
            index === currentStep
              ? 'text-primary'
              : index < currentStep
                ? 'text-foreground'
                : 'text-muted-foreground'
          "
        >
          {{ label }}
        </span>
      </div>
      <div
        v-if="index < steps.length - 1"
        class="h-0.5 flex-1 mx-3 mt-[-1.5rem] transition-colors duration-300"
        :class="index < currentStep ? 'bg-step-complete' : 'bg-muted'"
      />
    </div>
  </div>
</template>
