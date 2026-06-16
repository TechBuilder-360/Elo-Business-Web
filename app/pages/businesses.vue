<script setup>
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, ChevronRight, Loader2 } from "lucide-vue-next";

import { useBusiness } from "@/composables/useBusiness";

definePageMeta({
  layout: false,
});

const { userBusinesses } = useBusiness();
const { data, isPending, isError } = userBusinesses;

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

      <div
        v-if="isPending"
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
        v-if="businesses.length > 0 && !isPending"
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
