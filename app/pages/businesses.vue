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

onMounted(() => {
  const handleMessage = (event) => {
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
  <div class="min-h-screen bg-background">

    <!-- Verification Iframe Modal (Full Screen) -->
    <div
      v-if="!isUserVerified && showIframe && verificationLink"
      class="fixed inset-0 z-50 bg-background flex flex-col"
    >
      <div class="flex items-center justify-between p-4 border-b bg-card shadow-sm">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <ShieldAlert class="w-4 h-4 text-primary-foreground" />
          </div>
          <h2 class="font-semibold text-foreground">Identity Verification</h2>
        </div>
        <Button variant="ghost" size="sm" @click="() => { showIframe = false; handleRefreshStatus(); }">
          Close
        </Button>
      </div>
      <iframe :src="verificationLink" class="w-full h-full flex-1 border-none bg-background" allow="camera; microphone" />
    </div>

    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Building2 class="w-4 h-4 text-primary-foreground" />
          </div>
          <span class="font-bold text-foreground text-sm sm:text-base">ELO Business</span>
        </div>
        <Button v-if="isUserVerified && businesses.length > 0" size="sm" class="gap-2" @click="handleOnboardNew">
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">Add Business</span>
        </Button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      <!-- User Loading -->
      <div v-if="userLoading" class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Loader2 class="w-6 h-6 text-primary animate-spin" />
        </div>
        <p class="text-sm text-muted-foreground">Checking your account...</p>
      </div>

      <!-- Verification: In Progress -->
      <div
        v-else-if="!isUserVerified && !showIframe && verificationStatus.toLowerCase() === 'in_progress'"
        class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <div class="w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-500/20 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert class="w-10 h-10 text-yellow-500" />
        </div>
        <h2 class="text-2xl font-bold text-foreground">Verification in Progress</h2>
        <p class="text-sm text-muted-foreground mt-3 max-w-sm">
          Your identity is being reviewed. You will be notified once complete.
        </p>
        <p class="text-xs text-muted-foreground mt-2">
          Status: <span class="font-semibold text-foreground uppercase tracking-wider">{{ verificationStatus }}</span>
        </p>
        <Button variant="outline" class="mt-8 gap-2" @click="handleRefreshStatus" :disabled="currentUser.isFetching">
          <Loader2 v-if="currentUser.isFetching" class="w-4 h-4 animate-spin" />
          <RotateCcw v-else class="w-4 h-4" />
          Refresh Status
        </Button>
      </div>

      <!-- Verification: Initial Prompt -->
      <div
        v-else-if="!isUserVerified && !showIframe"
        class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <div v-if="isRequestingVerification" class="flex flex-col items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Loader2 class="w-7 h-7 text-primary animate-spin" />
          </div>
          <p class="text-sm text-muted-foreground">Checking verification status...</p>
        </div>
        <div v-else class="flex flex-col items-center">
          <div class="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert class="w-10 h-10 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-foreground">Verify Your Identity</h2>
          <p class="text-sm text-muted-foreground mt-3 max-w-sm">
            Before accessing your businesses, you need to complete a quick identity verification.
          </p>
          <Button class="mt-8 gap-2 h-11 px-8" @click="handleStartVerification" :disabled="isRequestingVerification">
            <ShieldAlert class="w-4 h-4" />
            Verify Identity Now
          </Button>
        </div>
      </div>

      <!-- Businesses: Skeleton Loading -->
      <div v-else-if="bizPending">
        <div class="mb-8">
          <div class="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2"></div>
          <div class="h-4 w-32 bg-muted/60 rounded-lg animate-pulse"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="n in 3" :key="n" class="rounded-2xl border bg-card p-6 space-y-4 animate-pulse">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-muted"></div>
              <div class="space-y-2 flex-1">
                <div class="h-4 bg-muted rounded w-3/4"></div>
                <div class="h-3 bg-muted/60 rounded w-1/2"></div>
              </div>
            </div>
            <div class="h-3 bg-muted/40 rounded w-full"></div>
            <div class="h-8 bg-muted/30 rounded-lg w-1/3"></div>
          </div>
        </div>
      </div>

      <!-- Businesses: Empty State -->
      <div
        v-else-if="businesses.length === 0"
        class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <div class="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-muted-foreground/20">
          <Building2 class="w-12 h-12 text-muted-foreground/40" />
        </div>
        <h2 class="text-2xl font-bold text-foreground">No businesses yet</h2>
        <p class="text-sm text-muted-foreground mt-3 max-w-sm">
          You haven't registered a business. Get started by adding your first one.
        </p>
        <Button class="mt-8 gap-2 h-11 px-8" @click="handleOnboardNew">
          <Plus class="w-4 h-4" />
          Register a Business
        </Button>
      </div>

      <!-- Businesses: Grid -->
      <div v-else>
        <div class="mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-foreground">Your Businesses</h1>
          <p class="text-sm text-muted-foreground mt-1">Select a business to continue</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="biz in businesses"
            :key="biz.id"
            class="group relative rounded-2xl border bg-card p-6 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 hover:border-primary/30 transition-all duration-300"
            @click="handleSelectBusiness(biz)"
          >
            <!-- Logo + Role Badge -->
            <div class="flex items-start justify-between mb-4">
              <div v-if="biz.logo" class="w-12 h-12 rounded-xl overflow-hidden border shadow-sm">
                <img :src="biz.logo" :alt="biz.name" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Building2 class="w-6 h-6 text-primary" />
              </div>
              <span
                class="text-xs font-semibold px-2.5 py-1 rounded-full"
                :class="roleColors[biz.role] || 'bg-secondary text-secondary-foreground'"
              >
                {{ biz.role }}
              </span>
            </div>

            <!-- Business Info -->
            <div class="space-y-1 mb-4">
              <h3 class="font-semibold text-foreground text-base leading-tight">{{ biz.name }}</h3>
              <p v-if="biz.industry" class="text-xs text-muted-foreground">{{ biz.industry }}</p>
            </div>

            <!-- Footer -->
            <div class="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium gap-1">
              Open dashboard
              <ChevronRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-center">
          <Button variant="outline" class="gap-2" @click="handleOnboardNew">
            <Plus class="w-4 h-4" />
            Register Another Business
          </Button>
        </div>
      </div>

    </main>
  </div>
</template>
