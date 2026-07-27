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
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Building2,
  Loader2,
  Moon,
  Sun
} from "lucide-vue-next";
import BusinessInfoStep from "@/components/onboarding/BusinessInfoStep.vue";
import { useBusiness } from "@/composables/useBusiness";
import { useTheme } from "@/composables/useTheme";

definePageMeta({
  layout: false,
});

const { isDark, toggleTheme } = useTheme();
const { registerBusiness } = useBusiness();
const isSubmitting = registerBusiness.isPending;

const formData = ref({
  businessName: "",
  services: "",
  email: "",
  industry: "",
  residentCountry: "",
  businessType: "onsite",
  address: {
    number: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
});

const updateFormData = (updates) => {
  formData.value = { ...formData.value, ...updates };
};

const validateForm = () => {
  if (!formData.value.businessName.trim()) return "Business name is required";
  if (!formData.value.services.trim())
    return "Services description is required";
  if (
    !formData.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
  )
    return "A valid email is required";
  if (!formData.value.residentCountry) return "Please select a country";
  if (!formData.value.businessType) return "Please select business type";
  if (formData.value.businessType === "onsite") {
    if (!formData.value.address.street.trim())
      return "Street address is required";
    if (!formData.value.address.city.trim()) return "City is required";
    if (!formData.value.address.state.trim()) return "State is required";
        if (!formData.value.address.country.trim())
          return "Country is required";
  }
  return null;
};

const handleSubmit = async () => {
  const error = validateForm();
  if (error) {
    toast.error(error);
    return;
  }

  const payload = {
    name: formData.value.businessName,
    about: formData.value.services,
    email: formData.value.email,
    industry: formData.value.industry,
    on_site: formData.value.businessType === "onsite",
    role: {
      authorized_representative: true,
      authorized_representative_email: formData.value.email
    },
    address: {
      number:
        formData.value.businessType === "onsite"
          ? formData.value.address.number
          : "",
      street:
        formData.value.businessType === "onsite"
          ? formData.value.address.street
          : "",
      city:
        formData.value.businessType === "onsite"
          ? formData.value.address.city
          : "",
      state:
        formData.value.businessType === "onsite"
          ? formData.value.address.state
          : "",
      country:
        formData.value.businessType === "onsite"
          ? formData.value.address.country
          : formData.value.residentCountry,
      zip_code:
        formData.value.businessType === "onsite"
          ? formData.value.address.zipCode
          : "",
    },
  };

  try {
    const data = await registerBusiness.mutateAsync(payload);
    toast.success("Business onboarded successfully!");

    // Redirect back to businesses selection, which will now show the new business
    await navigateTo({
      path: "/businesses",
    });
  } catch (error) {
    const gqlMsg = error?.graphQLErrors?.[0]?.message;
    const fallbackMsg =
      error.message === "GraphQL error"
        ? "Failed to register business"
        : error.message;
    toast.error(gqlMsg || fallbackMsg);
  }
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="border-b bg-card">
      <div
        class="container max-w-4xl mx-auto flex items-center gap-3 py-4 px-4"
      >
        <div
          class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden"
        >
          <img :src="'/favicon_io/favicon_io/apple-touch-icon.png'" class="w-full h-full object-cover" alt="ELO" />
        </div>
        <div class="flex-1">
          <h1 class="text-lg font-bold text-foreground">Business Onboarding</h1>
          <p class="text-xs text-muted-foreground">
            Complete your business registration
          </p>
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

    <main class="container max-w-2xl mx-auto py-8 px-4">
      <Card class="shadow-lg border-0 shadow-foreground/5 bg-card">
        <CardHeader>
          <CardTitle class="text-xl text-foreground">Business Info</CardTitle>
          <CardDescription>
            <span>Enter your basic business information</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Single Step Form -->
          <BusinessInfoStep :data="formData" :onChange="updateFormData" />

          <div class="flex justify-end mt-8 pt-6 border-t border-border">
            <Button @click="handleSubmit" :disabled="isSubmitting">
              <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
              <Send v-else class="w-4 h-4 mr-2" />
              {{ isSubmitting ? "Submitting..." : "Complete Onboarding" }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
