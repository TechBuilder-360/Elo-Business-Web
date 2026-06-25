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
import { ArrowLeft, ArrowRight, Send, Building2 } from "lucide-vue-next";
import StepIndicator from "@/components/onboarding/StepIndicator.vue";
import BusinessInfoStep from "@/components/onboarding/BusinessInfoStep.vue";
import RegistrationStep from "@/components/onboarding/RegistrationStep.vue";
import DocumentUploadStep from "@/components/onboarding/DocumentUploadStep.vue";
import ReviewStep from "@/components/onboarding/ReviewStep.vue";
import { useBusiness } from "@/composables/useBusiness";

definePageMeta({
  layout: false,
});

const { registerBusiness } = useBusiness();
const isSubmitting = registerBusiness.isPending;

const STEPS = ["Business Info", "Registration", "Documents", "Review"];

const currentStep = ref(0);
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
    state: "",
    country: "",
    zipCode: "",
  },
  isRegistered: "no",
  registration: {
    regNumber: "",
    countryOfIncorporation: "",
    dateOfIncorporation: "",
    cacDocument: null,
    memartDocument: null,
    statusReport: null,
  },
  documents: [],
});

const updateFormData = (updates) => {
  formData.value = { ...formData.value, ...updates };
};

const validateStep = (step) => {
  switch (step) {
    case 0:
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
        if (!formData.value.address.state.trim()) return "State is required";
        if (!formData.value.address.country.trim()) return "Country is required";
      }
      if (!formData.value.isRegistered)
        return "Please indicate if business is registered";
      return null;
    case 1:
      if (formData.value.isRegistered === "yes") {
        if (!formData.value.registration.regNumber.trim())
          return "Registration number is required";
        if (!formData.value.registration.countryOfIncorporation)
          return "Country of incorporation is required";
        if (!formData.value.registration.dateOfIncorporation)
          return "Date of incorporation is required";
        if (!formData.value.registration.cacDocument)
          return "CAC certificate is required";
        if (!formData.value.registration.memartDocument)
          return "MEMART document is required";
        if (!formData.value.registration.statusReport)
          return "Status report is required";
      }
      return null;
    default:
      return null;
  }
};

const handleNext = () => {
  const error = validateStep(currentStep.value);
  if (error) {
    toast.error(error);
    return;
  }
  currentStep.value = Math.min(currentStep.value + 1, STEPS.length - 1);
};

const handleBack = () => {
  currentStep.value = Math.max(currentStep.value - 1, 0);
};

const handleSubmit = async () => {
  const payload = {
    name: formData.value.businessName,
    about: formData.value.services,
    email: formData.value.email,
    industry: formData.value.industry,
    on_site: formData.value.businessType === "onsite",
    is_registered: formData.value.isRegistered === "yes",
    address: {
      number: formData.value.businessType === "onsite" ? formData.value.address.number : "",
      street: formData.value.businessType === "onsite" ? formData.value.address.street : "",
      state: formData.value.businessType === "onsite" ? formData.value.address.state : "",
      country: formData.value.businessType === "onsite" ? formData.value.address.country : formData.value.residentCountry,
      zip_code: formData.value.businessType === "onsite" ? formData.value.address.zipCode : ""
    },
    registration_detail: formData.value.isRegistered === "yes" ? {
      number: formData.value.registration.regNumber,
      country_of_incorporation: formData.value.registration.countryOfIncorporation,
      date_of_incorporation: formData.value.registration.dateOfIncorporation,
      certificate_of_incorporation: formData.value.registration.cacDocument,
      articles_of_association: formData.value.registration.memartDocument,
      status_certificate: formData.value.registration.statusReport,
    } : null,
    other_document: formData.value.documents.length > 0 ? formData.value.documents : null,
  };

  try {
    const data = await registerBusiness.mutateAsync(payload);
    toast.success("Business onboarded successfully!");
    
    // Redirect back to businesses selection, which will now show the new business
    await navigateTo({
      path: "/businesses"
    });
  } catch (error) {
    const gqlMsg = error?.graphQLErrors?.[0]?.message;
    const fallbackMsg = error.message === "GraphQL error" ? "Failed to register business" : error.message;
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
          class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
        >
          <Building2 class="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 class="text-lg font-bold text-foreground">Business Onboarding</h1>
          <p class="text-xs text-muted-foreground">
            Complete your business registration
          </p>
        </div>
      </div>
    </header>

    <main class="container max-w-2xl mx-auto py-8 px-4">
      <StepIndicator :steps="STEPS" :currentStep="currentStep" />

      <Card class="shadow-lg border-0 shadow-foreground/5 bg-card">
        <CardHeader>
          <CardTitle class="text-xl text-foreground">{{
            STEPS[currentStep]
          }}</CardTitle>
          <CardDescription>
            <span v-if="currentStep === 0"
              >Enter your basic business information</span
            >
            <span v-if="currentStep === 1"
              >Provide registration details if applicable</span
            >
            <span v-if="currentStep === 2"
              >Upload any supporting documents</span
            >
            <span v-if="currentStep === 3"
              >Review and submit your application</span
            >
          </CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Steps Switch -->
          <BusinessInfoStep
            v-if="currentStep === 0"
            :data="formData"
            :onChange="updateFormData"
          />
          <RegistrationStep
            v-if="currentStep === 1"
            :data="formData"
            :onChange="updateFormData"
          />
          <DocumentUploadStep
            v-if="currentStep === 2"
            :data="formData"
            :onChange="updateFormData"
          />
          <ReviewStep v-if="currentStep === 3" :data="formData" />

          <div class="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              @click="handleBack"
              :disabled="currentStep === 0"
            >
              <ArrowLeft class="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              v-if="currentStep < STEPS.length - 1"
              @click="handleNext"
            >
              Next
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
            <Button v-else @click="handleSubmit" :disabled="isSubmitting">
              <Send class="w-4 h-4 mr-2" />
              {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
