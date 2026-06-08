<script setup>
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, ExternalLink } from "lucide-vue-next";

definePageMeta({
  layout: false,
});

const handleLaunchVerification = () => {
  window.open("https://example.com/verify", "_blank");
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
        <h1 class="text-2xl font-bold text-foreground">Verify your identity</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Complete identity verification to continue
        </p>
      </div>

      <Card class="shadow-lg border-0 shadow-foreground/5">
        <CardHeader class="pb-4">
          <CardTitle class="text-lg"> Identity Verification Required </CardTitle>
          <CardDescription>
            We need to verify your identity before you can access the platform.
            This is a one-time process.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="bg-accent/50 rounded-lg p-4 space-y-3">
            <div class="flex items-start gap-3">
              <ShieldCheck class="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p class="text-sm font-medium text-foreground">
                  What you'll need
                </p>
                <ul
                  class="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside"
                >
                  <li>A valid government-issued ID</li>
                  <li>A clear selfie for facial verification</li>
                  <li>Proof of address (utility bill or bank statement)</li>
                </ul>
              </div>
            </div>
          </div>

          <Button @click="handleLaunchVerification" class="w-full">
            Launch Verification
            <ExternalLink class="w-4 h-4 ml-2" />
          </Button>

          <p class="text-xs text-muted-foreground text-center">
            Verification is handled by our trusted third-party partner. Your
            data is encrypted and secure.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
