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
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-vue-next";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const { requestOtp } = useAuth();
const isPending = requestOtp.isPending;

const handleLogin = async () => {
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    toast.error("Please enter a valid email address");
    return;
  }
  if (!password.value.trim() || password.value.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

  try {
    const data = await requestOtp.mutateAsync({
      email_address: email.value,
      password: password.value,
    });

    console.log("Request OTP Response:", data);
    const identifier = data?.Identifier || data?.identifier || "";

    if (!identifier) {
      toast.error("An error occurred extracting your session identifier.");
      return;
    }

    toast.success("OTP sent to your email");
    await navigateTo({
      path: "/verify-otp",
      query: { identifier, email: email.value },
    });
  } catch (error) {
    const gqlMsg = error?.graphQLErrors?.[0]?.message;

    const fallbackMsg =
      error.message === "GraphQL error"
        ? "Failed to authenticate"
        : error.message;
    toast.error(gqlMsg || fallbackMsg);
  }
};
</script>

<template>
  <div class="min-h-screen flex w-full bg-background">
    <!-- Left Panel: Branding / Visuals (Hidden on Mobile) -->
    <div
      class="hidden lg:flex flex-1 relative bg-zinc-950 text-white overflow-hidden flex-col justify-between p-12"
    >
      <!-- Background SVG Pattern -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-70 z-0"
        style="background-image: url('/elo_login_bg.svg');"
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

      <!-- Center Visual -->
      <div class="relative z-10 max-w-lg">
        <div
          class="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8 ring-1 ring-white/20 shadow-2xl"
        >
          <Building2 class="w-10 h-10 text-white/80" />
        </div>
        <h2 class="text-4xl font-extrabold tracking-tight">ELO Business</h2>
      </div>

      <!-- Bottom Meta -->
      <div class="relative z-10 text-sm text-zinc-500 font-medium">
        &copy; {{ new Date().getFullYear() }} ELO. All rights reserved.
      </div>
    </div>

    <!-- Right Panel: Login Form -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
      <!-- Mobile Logo (only shows on mobile since left panel is hidden) -->
      <div class="absolute top-8 left-8 lg:hidden flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
        >
          <Building2 class="w-5 h-5 text-primary-foreground" />
        </div>
        <span class="font-bold">ELO</span>
      </div>

      <div class="w-full max-w-sm space-y-8">
        <div class="text-center lg:text-left">
          <h1 class="text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p class="text-sm text-muted-foreground mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <div class="space-y-2 group">
              <Label
                for="email"
                class="text-sm font-medium transition-colors group-focus-within:text-primary"
                >Email Address</Label
              >
              <div class="relative">
                <Mail
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  v-model="email"
                  class="pl-10 h-11 border-muted bg-background hover:bg-accent/50 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <div class="space-y-2 group">
              <div class="flex items-center justify-between">
                <Label
                  for="password"
                  class="text-sm font-medium transition-colors group-focus-within:text-primary"
                  >Password</Label
                >
              </div>
              <div class="relative">
                <Lock
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary"
                />
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  v-model="password"
                  class="pl-10 pr-10 h-11 border-muted bg-background hover:bg-accent/50 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                >
                  <Eye v-if="showPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            class="w-full h-11 font-medium transition-all active:scale-[0.98]"
            :disabled="isPending"
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
              Signing in...
            </span>
            <span v-else class="flex items-center justify-center">
              Continue
              <ArrowRight class="w-4 h-4 ml-2" />
            </span>
          </Button>

          <p class="text-center text-sm text-muted-foreground">
            Don't have an account?
            <NuxtLink
              to="/signup"
              class="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
