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
const identifier = route.query.identifier;
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

  if (!identifier) {
    toast.error("Invalid session. Please login again.");
    navigateTo("/");
    return;
  }

  try {
    await login.mutateAsync({
      otp: String(otp.value),
      identifier: String(identifier),
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
    await requestOtp.mutateAsync({
      email_address: email,
      password: resendPassword.value,
    });
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
  <div
    class="h-[100dvh] overflow-y-auto bg-background flex items-center justify-center px-4 py-6"
  >
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-8">
        <div
          class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden"
        >
          <img :src="'/favicon_io/favicon_io/apple-touch-icon.png'" class="w-full h-full object-cover" alt="ELO" />
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
          class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden"
        >
          <img :src="'/favicon_io/favicon_io/apple-touch-icon.png'" class="w-full h-full object-cover" alt="ELO" />
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
            class="w-full"
            :disabled="isPending || otp.length !== 6"
          >
            {{ isPending ? "Verifying..." : "Verify" }}
            <ArrowRight v-if="!isPending" class="w-4 h-4 ml-2" />
          </Button>

          <div class="text-center">
            <Button
              variant="ghost"
              size="sm"
              @click="handleResendClick"
              class="text-muted-foreground"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Custom Resend Password Modal -->
    <div
      v-if="isResendModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <Card class="w-full max-w-sm shadow-xl border border-border">
        <CardHeader class="pb-4 relative">
          <button
            @click="isResendModalOpen = false"
            class="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          >
            <X class="w-5 h-5" />
          </button>
          <CardTitle class="text-lg">Verify Password</CardTitle>
          <CardDescription>
            Please enter your password to resend the OTP.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitResend" class="space-y-4">
            <div class="space-y-2">
              <Label for="resend-password">Password</Label>
              <div class="relative">
                <Lock
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />
                <Input
                  id="resend-password"
                  :type="showResendPassword ? 'text' : 'password'"
                  v-model="resendPassword"
                  placeholder="••••••••"
                  class="pl-10 pr-10"
                />
                <button
                  type="button"
                  @click="showResendPassword = !showResendPassword"
                  class="absolute right-3 top-3 text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  <Eye v-if="showResendPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div class="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                @click="isResendModalOpen = false"
              >
                Cancel
              </Button>
              <Button type="submit" :disabled="isResending || !resendPassword">
                {{ isResending ? "Resending..." : "Resend" }}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
