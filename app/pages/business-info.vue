<script setup>
import { ref, computed } from "vue";
import {
  ArrowLeft,
  Building2,
  Save,
  Palette,
  Info,
  Package,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/utils/alert";
import BrandingTab from "@/components/settings/BrandingTab.vue";
import ProductsServicesTab from "@/components/settings/ProductsServicesTab.vue";
import BranchesTab from "@/components/settings/BranchesTab.vue";
import BusinessHoursTab from "@/components/settings/BusinessHoursTab.vue";
import ReviewsTab from "@/components/settings/ReviewsTab.vue";

definePageMeta({
  layout: false,
});

const route = useRoute();
const businessName = computed(() => route.query.name || "My Business");

const info = ref({
  name: businessName.value,
  description: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  taxId: "TAX-12345678",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
});

const update = (key, value) => {
  info.value[key] = value;
};

const handleSave = () => {
  if (!info.value.name.trim()) {
    toast.error("Business name is required");
    return;
  }
  toast.success("Business information updated");
};

const handleBack = () => {
  navigateTo({
    path: "/settings",
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
            <h1 class="text-lg font-bold leading-tight">
              Business Information
            </h1>
            <p class="text-xs text-muted-foreground">{{ businessName }}</p>
          </div>
        </div>
      </div>
    </header>

    <main class="container max-w-6xl mx-auto py-6 px-4">
      <Tabs defaultValue="details">
        <TabsList class="mb-6 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="details" class="gap-1.5 text-xs">
            <Info class="w-3.5 h-3.5" />
            Details
          </TabsTrigger>
          <TabsTrigger value="branding" class="gap-1.5 text-xs">
            <Palette class="w-3.5 h-3.5" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="products-services" class="gap-1.5 text-xs">
            <Package class="w-3.5 h-3.5" />
            Products & Services
          </TabsTrigger>
          <TabsTrigger value="branches" class="gap-1.5 text-xs">
            <MapPin class="w-3.5 h-3.5" />
            Branches
          </TabsTrigger>
          <TabsTrigger value="hours" class="gap-1.5 text-xs">
            <Clock class="w-3.5 h-3.5" />
            Hours
          </TabsTrigger>
          <TabsTrigger value="reviews" class="gap-1.5 text-xs">
            <MessageSquare class="w-3.5 h-3.5" />
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" class="space-y-6">
          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardHeader class="pb-3">
              <CardTitle class="text-base text-foreground">General Information</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <Label>Business Name</Label>
                  <Input
                    :modelValue="info.name"
                    @update:modelValue="(v) => update('name', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>Industry</Label>
                  <Select
                    :modelValue="info.industry"
                    @update:modelValue="(v) => update('industry', v)"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="i in [
                          'Technology',
                          'Retail',
                          'Healthcare',
                          'Food & Beverage',
                          'Education',
                          'Finance',
                          'Other',
                        ]"
                        :key="i"
                        :value="i.toLowerCase()"
                      >
                        {{ i }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div class="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  :modelValue="info.description"
                  @update:modelValue="(v) => update('description', v)"
                  placeholder="Brief description of your business"
                  :rows="3"
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    :modelValue="info.email"
                    @update:modelValue="(v) => update('email', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>Phone</Label>
                  <Input
                    :modelValue="info.phone"
                    @update:modelValue="(v) => update('phone', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>Website</Label>
                  <Input
                    :modelValue="info.website"
                    @update:modelValue="(v) => update('website', v)"
                    placeholder="https://"
                  />
                </div>
              </div>
              <div class="space-y-1.5">
                <Label>Tax ID / Registration Number</Label>
                <Input
                  :modelValue="info.taxId"
                  disabled
                  class="disabled:bg-muted"
                />
              </div>
            </CardContent>
          </Card>

          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardHeader class="pb-3">
              <CardTitle class="text-base text-foreground">Business Address</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-1.5">
                <Label>Street Address</Label>
                <Input
                  :modelValue="info.address"
                  @update:modelValue="(v) => update('address', v)"
                />
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="space-y-1.5">
                  <Label>City</Label>
                  <Input
                    :modelValue="info.city"
                    @update:modelValue="(v) => update('city', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>State</Label>
                  <Input
                    :modelValue="info.state"
                    @update:modelValue="(v) => update('state', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>Country</Label>
                  <Input
                    :modelValue="info.country"
                    @update:modelValue="(v) => update('country', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>Zip Code</Label>
                  <Input
                    :modelValue="info.zipCode"
                    @update:modelValue="(v) => update('zipCode', v)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div class="flex justify-end">
            <Button @click="handleSave">
              <Save class="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="branding">
          <BrandingTab />
        </TabsContent>
        <TabsContent value="products-services">
          <ProductsServicesTab />
        </TabsContent>
        <TabsContent value="branches">
          <BranchesTab />
        </TabsContent>
        <TabsContent value="hours">
          <BusinessHoursTab />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>
