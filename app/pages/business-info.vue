<script setup>
import { ref, computed, watch } from "vue";
import {
  ArrowLeft,
  Building2,
  Save,
  Palette,
  Moon,
  Sun,
  Info,
  Package,
  MapPin,
  Clock,
  MessageSquare,
  Loader2,
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

import { useTheme } from "@/composables/useTheme";
import { useBusiness } from "@/composables/useBusiness";
import { Country } from "country-state-city";

const allCountries = Country.getAllCountries();

const route = useRoute();
const businessName = computed(() => route.query.name || "My Business");
const { isDark, toggleTheme } = useTheme();
const { getBusinessDetailQuery, businessDetail } = useBusiness();

const activeBusinessId = computed(() => {
  return route.query.id || (import.meta.client ? localStorage.getItem("activeBusinessId") : null);
});

const { data: detailData, isPending } = getBusinessDetailQuery(activeBusinessId);

const info = ref({
  name: businessName.value,
  description: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  taxId: "",
  rcNumber: "",
  countryOfInc: "",
  dateOfInc: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
});

watch(detailData, (newData) => {
  if (newData?.business) {
    const biz = newData.business;
    info.value = {
      name: biz.name || businessName.value,
      description: biz.about || "",
      email: biz.email || "",
      phone: biz.phone || "",
      website: biz.website || "",
      industry: biz.industry || "",
      taxId: biz.tax_identification_number || "",
      rcNumber: biz.number || "",
      countryOfInc: biz.country_of_incorporation || "",
      dateOfInc: biz.date_of_incorporation 
        ? biz.date_of_incorporation.split("-").reverse().join("-") 
        : "",
      address: biz.address?.street || "",
      city: biz.address?.city || "",
      state: biz.address?.state || "",
      country: biz.address?.country || "",
      zipCode: biz.address?.zip_code || "",
    };
  }
}, { immediate: true });

const update = (key, value) => {
  info.value[key] = value;
};

const handleSave = async () => {
  if (!info.value.name.trim()) {
    toast.error("Business name is required");
    return;
  }
  
  try {
    const parts = info.value.dateOfInc ? info.value.dateOfInc.split("-") : [];
    const formattedDate = parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : "";

    await businessDetail.mutateAsync({
      name: info.value.name,
      about: info.value.description,
      industry: info.value.industry,
      website: info.value.website,
      registration_detail: {
        number: info.value.rcNumber,
        country_of_incorporation: info.value.countryOfInc,
        date_of_incorporation: formattedDate,
        tax_identification_number: info.value.taxId,
      }
    });
    toast.success("Business information updated");
  } catch (error) {
    toast.error(error.message || "Failed to update business information");
  }
};

const handleBack = () => {
  navigateTo({
    path: "/settings",
    query: { name: businessName.value, id: activeBusinessId.value },
  });
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b bg-card sticky top-0 z-10">
      <div
        class="container max-w-8xl mx-auto flex items-center justify-between py-3 px-4"
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
            class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden"
          >
            <img :src="'/favicon_io/favicon_io/apple-touch-icon.png'" class="w-full h-full object-cover" alt="ELO" />
          </div>
          <div>
            <h1 class="text-lg font-bold leading-tight">
              Business Information
            </h1>
            <p class="text-xs text-muted-foreground">{{ businessName }}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-foreground shrink-0"
          @click="toggleTheme"
        >
          <Moon v-if="isDark" class="w-4 h-4" />
          <Sun v-else class="w-4 h-4" />
        </Button>
      </div>
    </header>

    <main class="container max-w-8xl mx-auto py-6 px-4">
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
          <!-- Details Skeleton -->
          <div v-if="isPending" class="space-y-6">
            <Card class="border-0 shadow-md shadow-foreground/5 bg-card overflow-hidden">
              <CardHeader class="pb-3 border-b border-border/50">
                <div class="h-5 w-48 bg-muted/80 animate-pulse rounded-md"></div>
              </CardHeader>
              <CardContent class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2.5">
                    <div class="h-4 w-28 bg-muted/50 animate-pulse rounded-sm"></div>
                    <div class="h-10 w-full bg-muted/80 animate-pulse rounded-md"></div>
                  </div>
                  <div class="space-y-2.5">
                    <div class="h-4 w-24 bg-muted/50 animate-pulse rounded-sm"></div>
                    <div class="h-10 w-full bg-muted/80 animate-pulse rounded-md"></div>
                  </div>
                </div>
                <div class="space-y-2.5">
                  <div class="h-4 w-32 bg-muted/50 animate-pulse rounded-sm"></div>
                  <div class="h-24 w-full bg-muted/80 animate-pulse rounded-md"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div v-for="i in 3" :key="i" class="space-y-2.5">
                    <div class="h-4 w-20 bg-muted/50 animate-pulse rounded-sm"></div>
                    <div class="h-10 w-full bg-muted/80 animate-pulse rounded-md"></div>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="i in 4" :key="i" class="space-y-2.5">
                    <div class="h-4 w-36 bg-muted/50 animate-pulse rounded-sm"></div>
                    <div class="h-10 w-full bg-muted/80 animate-pulse rounded-md"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
              <CardHeader class="pb-3 border-b border-border/50">
                <div class="h-5 w-40 bg-muted/80 animate-pulse rounded-md"></div>
              </CardHeader>
              <CardContent class="p-6 space-y-6">
                <div class="space-y-2.5">
                  <div class="h-4 w-32 bg-muted/50 animate-pulse rounded-sm"></div>
                  <div class="h-10 w-full bg-muted/80 animate-pulse rounded-md"></div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div v-for="i in 4" :key="i" class="space-y-2.5">
                    <div class="h-4 w-24 bg-muted/50 animate-pulse rounded-sm"></div>
                    <div class="h-10 w-full bg-muted/80 animate-pulse rounded-md"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div class="flex justify-end">
              <div class="h-10 w-32 bg-primary/20 animate-pulse rounded-md"></div>
            </div>
          </div>
          <!-- Actual Content -->
          <div v-else class="space-y-6 animate-in fade-in duration-500">
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <Label>Registration Number (RC)</Label>
                  <Input
                    :modelValue="info.rcNumber"
                    @update:modelValue="(v) => update('rcNumber', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>Tax ID (TIN)</Label>
                  <Input
                    :modelValue="info.taxId"
                    @update:modelValue="(v) => update('taxId', v)"
                  />
                </div>
                <div class="space-y-1.5">
                  <Label>Country of Incorporation</Label>
                  <Select
                    :modelValue="info.countryOfInc"
                    @update:modelValue="(v) => update('countryOfInc', v)"
                  >
                    <SelectTrigger>
                      <span :class="['block truncate flex-1 text-left', !info.countryOfInc && 'text-muted-foreground']">
                        {{ allCountries.find(c => c.isoCode === info.countryOfInc)?.name || 'Select country' }}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="c in allCountries"
                        :key="c.isoCode"
                        :value="c.isoCode"
                      >
                        {{ c.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-1.5">
                  <Label>Date of Incorporation</Label>
                  <Input
                    type="date"
                    :modelValue="info.dateOfInc"
                    @update:modelValue="(v) => update('dateOfInc', v)"
                  />
                </div>
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
                  <Select
                    :modelValue="info.country"
                    @update:modelValue="(v) => update('country', v)"
                  >
                    <SelectTrigger>
                      <span :class="['block truncate flex-1 text-left', !info.country && 'text-muted-foreground']">
                        {{ allCountries.find(c => c.isoCode === info.country)?.name || 'Select country' }}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="c in allCountries"
                        :key="c.isoCode"
                        :value="c.isoCode"
                      >
                        {{ c.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
