<script setup>
import { ShieldAlert } from "lucide-vue-next";
import { useSessionExpired } from "@/composables/useSessionExpired";

const { isSessionExpired, hideExpiredModal } = useSessionExpired();

const handleGoToLogin = async () => {
  hideExpiredModal();
  try {
    await $fetch("/api/logout", { method: "POST" });
  } catch (e) {
    // ignore
  }
  window.location.href = "/";
};
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isSessionExpired"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <Transition
        enter-active-class="transition-all duration-250 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-3"
        enter-to-class="opacity-100 scale-100 translate-y-0"
      >
        <div
          v-if="isSessionExpired"
          class="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          <!-- Top accent bar -->
          <div class="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

          <!-- Content -->
          <div class="p-8 flex flex-col items-center text-center gap-5">
            <!-- Icon -->
            <div class="relative">
              <div
                class="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/20 flex items-center justify-center"
              >
                <ShieldAlert class="w-10 h-10 text-amber-500" />
              </div>
              <!-- Pulse ring -->
              <span class="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-ping opacity-30" />
            </div>

            <!-- Text -->
            <div class="space-y-2">
              <h2 class="text-xl font-bold text-foreground tracking-tight">
                Session Expired
              </h2>
              <p class="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Your session has timed out for security reasons. Please log in again to continue.
              </p>
            </div>

            <!-- Button -->
            <button
              @click="handleGoToLogin"
              class="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              Back to Login
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
