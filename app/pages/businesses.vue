<script setup>
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Plus,
  ChevronRight,
  Loader2,
  ShieldAlert,
  RotateCcw,
} from "lucide-vue-next";

import { useBusiness } from "@/composables/useBusiness";
import { useVerification } from "@/composables/useVerification";
import { toast } from "@/utils/alert";
import { onMounted, onUnmounted, ref, watch, computed } from "vue";
import { navigateTo } from "#app";
import { Skeleton } from "@/components/ui/skeleton";

definePageMeta({
  layout: false,
});

const { currentUser, requestVerification } = useVerification();
const isUserVerified = computed(
  () => currentUser.data.value?.currentUserProfile?.is_verified === true,
);
const userLoading = currentUser.isPending;

// Only fetch businesses if user is verified
const { userBusinesses } = useBusiness({ enabled: isUserVerified });
const { data, isPending: bizPending, isError } = userBusinesses;

const businesses = computed(() => {
  return data.value?.getUserBusinsses || [];
});

const roleColors = {
  Owner: "bg-primary text-primary-foreground",
  Manager: "bg-accent text-accent-foreground",
  Staff: "bg-secondary text-secondary-foreground",
};

const handleSelectBusiness = (business) => {
  navigateTo({
    path: "/dashboard",
    query: { name: business.name },
  });
};

const handleOnboardNew = () => {
  navigateTo("/onboard");
};

// Verification State
const verificationLink = ref("");
const verificationStatus = ref("");
const isRequestingVerification = ref(false);
const showIframe = ref(false);
const hasPrompted = ref(false);

watch(
  () => currentUser.data.value?.currentUserProfile,
  async (user) => {
    if (user && !user.is_verified) {
      // Auto-check verification status if not verified
      if (!verificationStatus.value && !isRequestingVerification.value) {
        isRequestingVerification.value = true;
        try {
          const res = await requestVerification.mutateAsync({
            entity: "USER_VERIFICATION",
          });
          const verificationRes = res.requestUserVerification;

          if (verificationRes) {
            verificationStatus.value = verificationRes.status || "unverified";
            verificationLink.value = verificationRes.link || "";
          }
        } catch (err) {
          console.error(err);
        } finally {
          isRequestingVerification.value = false;
        }
      }
    }
  },
  { immediate: true },
);

const handleStartVerification = async () => {
  if (verificationLink.value) {
    showIframe.value = true;
    return;
  }

  isRequestingVerification.value = true;
  try {
    const res = await requestVerification.mutateAsync({
      entity: "USER_VERIFICATION",
    });
    const verificationRes = res.requestUserVerification;

    if (verificationRes?.link) {
      verificationLink.value = verificationRes.link;
      verificationStatus.value = verificationRes.status || "unverified";

      if (
        verificationStatus.value.toLowerCase() !== "in_progress" &&
        verificationStatus.value.toLowerCase() !== "processing"
      ) {
        showIframe.value = true;
      }
    } else if (verificationRes?.message) {
      toast.error(verificationRes.message);
    } else {
      toast.error("Failed to generate verification link.");
    }
  } catch (err) {
    console.error(err);
    toast.error(
      err?.graphQLErrors?.[0]?.message ||
        "An error occurred while starting verification.",
    );
  } finally {
    isRequestingVerification.value = false;
  }
};

// Listen to iframe postMessage for completion (e.g. Dojah completion)
onMounted(() => {
  const handleMessage = (event) => {
    // Basic catch-all for verification completion events from iframes like Dojah
    if (event.data?.type === "success" || event.data?.status === "success") {
      showIframe.value = false;
      verificationStatus.value = "in_progress";
      handleRefreshStatus();
    } else if (event.data?.type === "close") {
      showIframe.value = false;
      handleRefreshStatus();
    }
  };
  window.addEventListener("message", handleMessage);
  onUnmounted(() => window.removeEventListener("message", handleMessage));
});

const handleRefreshStatus = () => {
  currentUser.refetch();
};
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="w-full max-w-lg">
      <div class="flex flex-col items-center mb-8">
        <div
          class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4"
        >
          <Building2 class="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 class="text-2xl font-bold text-foreground">Your Businesses</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Select a business to continue
        </p>
      </div>

      <!-- User Loading State -->
      <div
        v-if="userLoading"
        class="flex flex-col items-center justify-center py-12"
      >
        <Loader2 class="w-8 h-8 text-primary animate-spin mb-3" />
        <p class="text-sm text-muted-foreground">Checking account status...</p>
      </div>

      <!-- Verification Iframe Modal -->
      <div
        v-else-if="!isUserVerified && showIframe && verificationLink"
        class="fixed inset-0 z-50 bg-background flex flex-col"
      >
        <div class="flex items-center justify-between p-4 border-b bg-card">
          <h2 class="font-semibold text-lg">Identity Verification</h2>
          <Button
            variant="ghost"
            size="sm"
            @click="
              () => {
                showIframe = false;
                handleRefreshStatus();
              }
            "
          >
            Close
          </Button>
        </div>
        <iframe
          :src="verificationLink"
          class="w-full h-full flex-1 border-none bg-background"
          allow="camera; microphone"
        />
      </div>

      <!-- Verification Pending Screen -->
      <div
        v-else-if="
          !isUserVerified &&
          !showIframe &&
          verificationStatus.toLowerCase() === 'in_progress'
        "
        class="text-center py-12 px-4 rounded-xl border border-dashed bg-card/50"
      >
        <div
          class="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4"
        >
          <ShieldAlert class="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
        </div>
        <h3 class="text-lg font-semibold text-foreground">
          Verification in Progress
        </h3>
        <p class="text-sm text-muted-foreground mt-2 max-w-[300px] mx-auto">
          Your identity verification is currently being processed. You will
          receive an email once it is complete.
        </p>
        <p class="text-xs text-muted-foreground mt-4">
          Current Status:
          <span class="font-medium text-foreground uppercase">{{
            verificationStatus
          }}</span>
        </p>
        <Button
          variant="outline"
          class="mt-6"
          @click="handleRefreshStatus"
          :disabled="currentUser.isFetching"
        >
          <Loader2
            v-if="currentUser.isFetching"
            class="w-4 h-4 mr-2 animate-spin"
          />
          <RotateCcw v-else class="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <!-- Verification Initial Prompt or Status Check -->
      <div
        v-else-if="!isUserVerified && !showIframe"
        class="text-center py-12 px-4 rounded-xl border border-dashed bg-card/50"
      >
        <div v-if="isRequestingVerification" class="flex flex-col items-center justify-center">
          <Loader2 class="w-8 h-8 text-primary animate-spin mb-3" />
          <p class="text-sm text-muted-foreground">Checking verification status...</p>
        </div>
        <div v-else class="flex flex-col items-center">
          <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-lg font-semibold text-foreground">Identity Verification Required</h3>
          <p class="text-sm text-muted-foreground mt-2 max-w-[300px] mx-auto">
            Before you can access your businesses, you need to verify your identity. This process is quick and secure.
          </p>
          <Button class="mt-6" @click="handleStartVerification" :disabled="isRequestingVerification">
            <Loader2 v-if="isRequestingVerification" class="w-4 h-4 mr-2 animate-spin" />
            {{ isRequestingVerification ? "Generating Link..." : "Verify Identity Now" }}
          </Button>
        </div>
      </div>

      <!-- Businesses Loading -->
      <div
        v-else-if="bizPending"
        class="flex flex-col items-center justify-center py-12"
      >
        <Loader2 class="w-8 h-8 text-primary animate-spin mb-3" />
        <p class="text-sm text-muted-foreground">Loading your businesses...</p>
      </div>

      <div
        v-else-if="businesses.length === 0"
        class="text-center py-12 px-4 rounded-xl border border-dashed bg-card/50"
      >
        <div
          class="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4"
        >
          <Building2 class="w-8 h-8 text-accent-foreground" />
        </div>
        <h3 class="text-lg font-semibold text-foreground">
          No businesses found
        </h3>
        <p class="text-sm text-muted-foreground mt-2 max-w-[250px] mx-auto">
          You haven't registered any businesses yet. Create one to get started.
        </p>
        <Button class="mt-6" @click="handleOnboardNew">
          <Plus class="w-4 h-4 mr-2" />
          Register Business
        </Button>
      </div>

      <div v-else class="space-y-3">
        <Card
          v-for="biz in businesses"
          :key="biz.id"
          class="shadow-sm border cursor-pointer hover:shadow-md hover:border-primary/30 transition-all bg-card"
          @click="handleSelectBusiness(biz)"
        >
          <CardContent class="p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                v-if="biz.logo"
                class="w-10 h-10 rounded-lg overflow-hidden border"
              >
                <img
                  :src="biz.logo"
                  :alt="biz.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center"
              >
                <Building2 class="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p class="font-medium text-foreground">{{ biz.name }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ biz.industry }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Badge
                :class="
                  roleColors[biz.role] ||
                  'bg-secondary text-secondary-foreground'
                "
              >
                {{ biz.role }}
              </Badge>
              <ChevronRight class="w-4 h-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        v-if="businesses.length > 0 && !bizPending"
        variant="outline"
        class="w-full mt-6"
        @click="handleOnboardNew"
      >
        <Plus class="w-4 h-4 mr-2" />
        Register Another Business
      </Button>
    </div>
  </div>
</template>
