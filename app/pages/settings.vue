<script setup>
import { computed } from "vue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building2, ArrowLeft, Users, Info, ChevronRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TeamMembersTab from "@/components/settings/TeamMembersTab.vue";

definePageMeta({
  layout: false,
});

const route = useRoute();
const businessName = computed(() => route.query.name || "My Business");

const handleBack = () => {
  navigateTo({
    path: "/dashboard",
    query: { name: businessName.value },
  });
};

const handleEditBusinessInfo = () => {
  navigateTo({
    path: "/business-info",
    query: { name: businessName.value },
  });
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b bg-card sticky top-0 z-10">
      <div
        class="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4"
      >
        <div class="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            class="h-9 w-9 text-foreground"
            @click="handleBack"
          >
            <ArrowLeft class="w-4 h-4" />
          </Button>
          <div
            class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
          >
            <Building2 class="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-lg font-bold leading-tight">Settings</h1>
            <p class="text-xs text-muted-foreground">{{ businessName }}</p>
          </div>
        </div>
      </div>
    </header>

    <main class="container max-w-6xl mx-auto py-6 px-4">
      <Tabs defaultValue="business-info">
        <TabsList class="mb-6 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="business-info" class="gap-1.5 text-xs">
            <Info class="w-3.5 h-3.5" />
            Business Info
          </TabsTrigger>
          <TabsTrigger value="team" class="gap-1.5 text-xs">
            <Users class="w-3.5 h-3.5" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business-info">
          <Card
            class="border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow bg-card"
            @click="handleEditBusinessInfo"
          >
            <CardContent class="flex items-center justify-between py-6">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <Info class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-foreground">Edit Business Information</p>
                  <p class="text-sm text-muted-foreground">
                    Update branding, details, products, branches, and hours
                  </p>
                </div>
              </div>
              <ChevronRight class="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <TeamMembersTab userRole="owner" />
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>
