<script setup>
import { ref } from "vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/utils/alert";
import { Building2, ArrowRight, RotateCcw } from "lucide-vue-next";
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
const otp = ref("");
const isLoading = ref(false);

const handleVerify = () => {
  if (otp.value.length !== 6) {
    toast.error("Please enter the complete 6-digit code");
    return;
  }

  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    // Simulate checking verification status
    const isVerified = true;
    if (isVerified) {
      navigateTo("/businesses");
    } else {
      navigateTo("/verify-identity");
    }
  }, 1000);
};

const handleResend = () => {
  toast.success("A new OTP has been sent to your email");
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
        <h1 class="text-2xl font-bold text-foreground">Verify your email</h1>
        <p class="text-sm text-muted-foreground mt-1">
          We sent a 6-digit code to
          <span class="font-medium text-foreground">{{ email }}</span>
        </p>
      </div>

      <Card class="shadow-lg border-0 shadow-foreground/5">
        <CardHeader class="pb-4">
          <CardTitle class="text-lg">Enter OTP</CardTitle>
          <CardDescription>
            Check your inbox for the verification code
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="flex justify-center">
            <InputOTP
              :maxLength="6"
              :modelValue="otp"
              @update:modelValue="(val) => (otp = val)"
            >
              <InputOTPGroup>
                <InputOTPSlot :index="0" />
                <InputOTPSlot :index="1" />
                <InputOTPSlot :index="2" />
                <InputOTPSlot :index="3" />
                <InputOTPSlot :index="4" />
                <InputOTPSlot :index="5" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            @click="handleVerify"
            class="w-full"
            :disabled="isLoading || otp.length !== 6"
          >
            {{ isLoading ? "Verifying..." : "Verify" }}
            <ArrowRight v-if="!isLoading" class="w-4 h-4 ml-2" />
          </Button>

          <div class="text-center">
            <Button
              variant="ghost"
              size="sm"
              @click="handleResend"
              class="text-muted-foreground"
            >
              <RotateCcw class="w-3 h-3 mr-1" />
              Resend code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
