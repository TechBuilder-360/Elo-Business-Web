<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/utils/alert";
import {
  Building2,
  ArrowRight,
  RotateCcw,
  Lock,
  Eye,
  EyeOff,
  X,
} from "lucide-vue-next";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

definePageMeta({
  layout: false,
});

const route = useRoute();
const email = route.query.email || "your email";
const identifier = ref(route.query.identifier);
const otp = ref("");
const { login, requestOtp } = useAuth();
const isPending = login.isPending;

const isResendModalOpen = ref(false);
const resendPassword = ref("");
const showResendPassword = ref(false);
const isResending = requestOtp.isPending;

const handleVerify = async () => {
  if (otp.value.length !== 6) {
    toast.error("Please enter the complete 6-digit code");
    return;
  }

  if (!identifier.value) {
    toast.error("Invalid session. Please login again.");
    navigateTo("/");
    return;
  }

  try {
    await login.mutateAsync({
      otp: String(otp.value),
      identifier: String(identifier.value),
    });
    toast.success("Login successful");
    await navigateTo("/businesses");
  } catch (error) {
    const gqlMsg = error?.graphQLErrors?.[0]?.message;
    const fallbackMsg =
      error.message === "GraphQL error"
        ? "Failed to verify OTP"
        : error.message;
    toast.error(gqlMsg || fallbackMsg);
  }
};

const handleResendClick = () => {
  resendPassword.value = "";
  showResendPassword.value = false;
  isResendModalOpen.value = true;
};

const submitResend = async () => {
  if (!resendPassword.value) {
    toast.error("Please enter your password!");
    return;
  }

  try {
    const response = await requestOtp.mutateAsync({
      email_address: email,
      password: resendPassword.value,
    });

    // CRITICAL FIX: Update the identifier with the newly generated one!
    if (response?.Identifier) {
      identifier.value = response.Identifier;
    }

    toast.success("A new OTP has been sent to your email");
    isResendModalOpen.value = false;
  } catch (error) {
    const gqlMsg = error?.graphQLErrors?.[0]?.message;
    const fallbackMsg =
      error.message === "GraphQL error"
        ? "Failed to resend OTP"
        : error.message;
    toast.error(gqlMsg || fallbackMsg);
  }
};
</script>

<template>
  <div class="min-h-screen flex w-full bg-background">
    <!-- Left Panel: Branding (Hidden on Mobile) -->
    <div
      class="hidden lg:flex flex-1 relative bg-zinc-900 text-white overflow-hidden flex-col justify-between p-12"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 z-0"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent z-0"
      ></div>

      <!-- Top Branding -->
      <div class="relative z-10 flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <Building2 class="w-6 h-6 text-primary-foreground" />
        </div>
        <span class="text-xl font-bold tracking-tight">ELO Business</span>
      </div>

      <div class="relative z-10 max-w-lg">
        <div
          class="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8 ring-1 ring-white/20 shadow-2xl"
        >
          <Lock class="w-10 h-10 text-white/80" />
        </div>
        <h2 class="text-4xl font-extrabold tracking-tight mb-4">
          One step away.
        </h2>
        <p class="text-lg text-zinc-400">
          Enter your 6-digit code to confirm your identity and access your
          account.
        </p>
      </div>

      <div class="relative z-10 text-sm text-zinc-500 font-medium">
        &copy; {{ new Date().getFullYear() }} ELO. All rights reserved.
      </div>
    </div>

    <!-- Right Panel: OTP Form -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
      <!-- Mobile Logo -->
      <div class="absolute top-8 left-8 lg:hidden flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
        >
          <Building2 class="w-5 h-5 text-primary-foreground" />
        </div>
        <span class="font-bold">ELO</span>
      </div>

      <div class="w-full max-w-sm space-y-8">
        <!-- Header -->
        <div class="text-center lg:text-left">
          <!-- Glowing icon (mobile only for visual interest) -->
          <div
            class="lg:hidden w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10"
          >
            <Lock class="w-8 h-8 text-primary" />
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-foreground">
            Check your inbox
          </h1>
          <p class="text-sm text-muted-foreground mt-2">
            We sent a 6-digit code to
            <span class="font-semibold text-foreground">{{ email }}</span>
          </p>
        </div>

        <!-- OTP Input Section -->
        <div class="space-y-6">
          <div class="flex justify-center lg:justify-start">
            <InputOTP
              :maxLength="6"
              :modelValue="otp"
              @update:modelValue="(val) => (otp = val)"
              class="gap-2"
            >
              <InputOTPGroup class="gap-2">
                <InputOTPSlot
                  v-for="i in 6"
                  :key="i"
                  :index="i - 1"
                  class="h-12 w-12 text-lg font-bold rounded-xl border-2 border-muted transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <!-- Verify Button -->
          <Button
            @click="handleVerify"
            class="w-full h-11 font-medium transition-all active:scale-[0.98]"
            :disabled="isPending || otp.length !== 6"
          >
            <span v-if="isPending" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </span>
            <span v-else class="flex items-center justify-center">
              Verify Code
              <ArrowRight class="w-4 h-4 ml-2" />
            </span>
          </Button>

          <!-- Resend -->
          <p class="text-center text-sm text-muted-foreground">
            Didn't receive a code?
            <button
              type="button"
              @click="handleResendClick"
              class="font-semibold text-primary hover:text-primary/80 transition-colors ml-1 underline-offset-4 hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Glassmorphism Resend Modal -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isResendModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        @click.self="isResendModalOpen = false"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
        >
          <div
            v-if="isResendModalOpen"
            class="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <!-- Modal Header -->
            <div
              class="flex items-center justify-between p-6 pb-4 border-b border-border"
            >
              <div>
                <h3 class="font-semibold text-foreground">Resend Code</h3>
                <p class="text-xs text-muted-foreground mt-0.5">
                  Confirm your password to resend.
                </p>
              </div>
              <button
                @click="isResendModalOpen = false"
                class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
            <!-- Modal Body -->
            <form @submit.prevent="submitResend" class="p-6 space-y-4">
              <div class="space-y-2 group">
                <Label
                  for="resend-password"
                  class="text-sm font-medium transition-colors group-focus-within:text-primary"
                  >Password</Label
                >
                <div class="relative">
                  <Lock
                    class="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary"
                  />
                  <Input
                    id="resend-password"
                    :type="showResendPassword ? 'text' : 'password'"
                    v-model="resendPassword"
                    placeholder="••••••••"
                    class="pl-10 pr-10 h-11 border-muted bg-background hover:bg-accent/50 focus-visible:ring-primary focus-visible:border-primary transition-all"
                  />
                  <button
                    type="button"
                    @click="showResendPassword = !showResendPassword"
                    class="absolute right-3 top-3 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                  >
                    <Eye v-if="showResendPassword" class="w-4 h-4" />
                    <EyeOff v-else class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  class="flex-1"
                  @click="isResendModalOpen = false"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  class="flex-1 transition-all active:scale-[0.98]"
                  :disabled="isResending || !resendPassword"
                >
                  <svg
                    v-if="isResending"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <RotateCcw v-else class="w-3.5 h-3.5 mr-2" />
                  {{ isResending ? "Sending..." : "Resend" }}
                </Button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
