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
import { Building2, Mail, Lock, ArrowRight } from "lucide-vue-next";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");
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
      password: password.value 
    });
    
    toast.success("OTP sent to your email");
    navigateTo({
      path: "/verify-otp",
      query: { identifier: data.Identifier, email: email.value },
    });
  } catch (error) {
    toast.error(error.message || "Failed to authenticate");
  }
};
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-8">
        <div
          class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4"
        >
          <Building2 class="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 class="text-2xl font-bold text-foreground">Welcome back</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Sign in to your account
        </p>
      </div>

      <Card class="shadow-lg border-0 shadow-foreground/5">
        <CardHeader class="pb-4">
          <CardTitle class="text-lg">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-2">
              <Label for="email">Email Address</Label>
              <div class="relative">
                <Mail
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  v-model="email"
                  class="pl-10"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Lock
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  v-model="password"
                  class="pl-10"
                />
              </div>
            </div>

            <Button type="submit" class="w-full" :disabled="isPending">
              {{ isPending ? "Signing in..." : "Continue" }}
              <ArrowRight v-if="!isPending" class="w-4 h-4 ml-2" />
            </Button>

            <p class="text-center text-sm text-muted-foreground">
              Don't have an account?
              <NuxtLink
                to="/signup"
                class="text-primary font-medium hover:underline ml-1"
              >
                Sign up
              </NuxtLink>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
