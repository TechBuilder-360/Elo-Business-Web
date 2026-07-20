<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useBusiness } from "@/composables/useBusiness";
import { toast } from "@/utils/alert";
import {
  ArrowLeft,
  Save,
  UploadCloud,
  Trash2,
  FileText,
  Loader2,
  AlertCircle,
  Building2,
  ShieldCheck,
  FolderOpen,
  CheckCircle2,
  Pencil,
} from "lucide-vue-next";

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const businessName = computed(() => route.query.name || "Business");

const {
  userBusinesses,
  businessDetail,
  getBusiness,
  uploadDocument,
  deleteDocument,
  kybDocuments,
  businessDocuments,
} = useBusiness();

// ──────────────────────────────────────────────
// Navigation State
// ──────────────────────────────────────────────
const activeSection = ref("profile"); // 'profile', 'documents'
const profileStep = ref(1); // 1 for General Info, 2 for Registration Details
const isUploadingDoc = ref(false); // Toggle for document upload form
const isEditingProfile = ref(false); // Toggle between view and edit mode for profile

const sections = [
  {
    id: "profile",
    label: "Business Profile",
    icon: Building2,
    desc: "General & Registration info",
  },
  {
    id: "documents",
    label: "Documents",
    icon: FolderOpen,
    desc: "Compliance files",
  },
];

// ──────────────────────────────────────────────
// Derive active business from already-fetched list
// ──────────────────────────────────────────────
const activeBusinessId = computed(() => {
  if (import.meta.client) {
    return localStorage.getItem("activeBusinessId");
  }
  return null;
});

const activeBusinessData = computed(() => {
  const list = userBusinesses.data.value?.myBusinesses || [];
  if (activeBusinessId.value) return list.find((b) => b.id === activeBusinessId.value) || null;
  return list[0] || null;
});

// Fetch full business details for the active business
const { data: businessFullData, isPending: isBusinessPending } = getBusiness(
  activeBusinessId.value
);

// ──────────────────────────────────────────────
// Data Models
// ──────────────────────────────────────────────
const infoData = ref({
  name: businessName.value,
  about: "",
  industry: "",
  website: "",
});

const regData = ref({
  number: "",
  country_of_incorporation: "",
  date_of_incorporation: "",
  tax_identification_number: "",
});

// Pre-fill infoData and regData from the live API response
watchEffect(() => {
  const fullBiz = businessFullData.value?.business;
  
  if (fullBiz) {
    infoData.value.name = fullBiz.name || activeBusinessData.value?.name || businessName.value;
    infoData.value.industry = fullBiz.industry || activeBusinessData.value?.industry || "";
    infoData.value.about = fullBiz.about || "";
    infoData.value.website = fullBiz.website || "";

    if (fullBiz.registration_detail) {
      regData.value.number = fullBiz.registration_detail.number || "";
      regData.value.country_of_incorporation = fullBiz.registration_detail.country_of_incorporation || "";
      
      // Convert backend DD-MM-YYYY to frontend YYYY-MM-DD
      if (fullBiz.registration_detail.date_of_incorporation) {
        const parts = fullBiz.registration_detail.date_of_incorporation.split("-");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          regData.value.date_of_incorporation = `${year}-${month}-${day}`;
        }
      }
      
      regData.value.tax_identification_number = fullBiz.registration_detail.tax_identification_number || "";
    }
  } else if (activeBusinessData.value) {
    infoData.value.name = activeBusinessData.value.name || businessName.value;
    infoData.value.industry = activeBusinessData.value.industry || "";
  }
});

const uploadData = ref({
  document_id: "",
  description: "",
  fileObj: null,
});

const fileInput = ref(null);

// ──────────────────────────────────────────────
// Progress Calculation
// ──────────────────────────────────────────────
const completionPercentage = computed(() => {
  let total = 8;
  let filled = 0;

  if (infoData.value.name) filled++;
  if (infoData.value.about) filled++;
  if (infoData.value.industry) filled++;
  if (infoData.value.website) filled++;

  if (regData.value.number) filled++;
  if (regData.value.country_of_incorporation) filled++;
  if (regData.value.date_of_incorporation) filled++;
  if (regData.value.tax_identification_number) filled++;

  return Math.round((filled / total) * 100);
});

// ──────────────────────────────────────────────
// Handlers
// ──────────────────────────────────────────────
const handleSaveProfile = async () => {
  // Client-side validation to prevent backend crash
  if (!regData.value.number) {
    return toast.error("Registration Number (RC) is required");
  }
  if (!regData.value.country_of_incorporation) {
    return toast.error("Country of Incorporation is required");
  }
  if (!regData.value.date_of_incorporation) {
    return toast.error("Date of Incorporation is required");
  }

  try {
    // Convert YYYY-MM-DD from the input to DD-MM-YYYY for Go backend
    const [year, month, day] = regData.value.date_of_incorporation.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    await businessDetail.mutateAsync({
      name: infoData.value.name,
      about: infoData.value.about,
      industry: infoData.value.industry,
      website: infoData.value.website,
      registration_detail: {
        number: regData.value.number,
        country_of_incorporation: regData.value.country_of_incorporation,
        date_of_incorporation: formattedDate,
        tax_identification_number: regData.value.tax_identification_number,
      },
    });
    toast.success("Profile saved successfully");
    isEditingProfile.value = false;
    profileStep.value = 1;
  } catch (error) {
    toast.error(error.message || "Failed to save profile");
  }
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result;
      if (base64String.includes(",")) {
        base64String = base64String.split(",")[1];
      }
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a PDF, JPG, or PNG.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }
    uploadData.value.fileObj = file;
  }
};

const handleUploadDocument = async () => {
  if (!uploadData.value.document_id) {
    return toast.error("Please select a document type");
  }
  if (!uploadData.value.fileObj) {
    return toast.error("Please select a file to upload");
  }

  try {
    const base64File = await fileToBase64(uploadData.value.fileObj);

    await uploadDocument.mutateAsync({
      document_id: uploadData.value.document_id,
      description: uploadData.value.description || "Uploaded document",
      file: base64File,
    });

    toast.success("Document uploaded successfully");

    // Reset upload form and hide it
    uploadData.value.document_id = "";
    uploadData.value.description = "";
    uploadData.value.fileObj = null;
    isUploadingDoc.value = false;
    if (fileInput.value) fileInput.value.value = "";
  } catch (error) {
    toast.error(error.message || "Failed to upload document");
  }
};

const handleDeleteDocument = async (id) => {
  try {
    await deleteDocument.mutateAsync({ id });
    toast.success("Document deleted successfully");
  } catch (error) {
    toast.error(error.message || "Failed to delete document");
  }
};

const navigateBack = () => {
  router.push("/dashboard");
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm shadow-sm"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div class="flex items-center gap-3">
          <Button variant="ghost" size="icon" @click="navigateBack">
            <ArrowLeft class="w-5 h-5 text-muted-foreground" />
          </Button>
          <div>
            <h1 class="text-lg font-bold text-foreground">
              Compliance & Settings
            </h1>
            <p class="text-xs text-muted-foreground hidden sm:block">
              Manage your business profile and documents
            </p>
          </div>
        </div>
      </div>
    </header>

    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8"
    >
      <!-- Sidebar Navigation -->
      <aside class="w-full md:w-64 shrink-0">
        <nav class="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
          <button
            v-for="section in sections"
            :key="section.id"
            @click="activeSection = section.id"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left whitespace-nowrap min-w-[200px] md:min-w-0"
            :class="[
              activeSection === section.id
                ? 'bg-primary/10 text-primary font-semibold border border-primary/20 shadow-sm'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
            ]"
          >
            <component :is="section.icon" class="w-5 h-5 shrink-0" />
            <div>
              <div class="text-sm">{{ section.label }}</div>
              <div
                class="text-[10px] opacity-70 hidden md:block mt-0.5 font-normal"
              >
                {{ section.desc }}
              </div>
            </div>
          </button>
        </nav>

        <!-- Completion Widget (Desktop) -->
        <div class="hidden md:block mt-8">
          <div class="bg-muted/40 rounded-2xl p-5 border shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-semibold">Profile Status</span>
              <span
                class="text-xs font-bold px-2 py-1 rounded-full bg-background"
                :class="
                  completionPercentage === 100
                    ? 'text-green-600'
                    : 'text-primary'
                "
              >
                {{ completionPercentage }}%
              </span>
            </div>
            <div class="w-full h-2.5 bg-background rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-500 ease-in-out"
                :class="
                  completionPercentage === 100 ? 'bg-green-500' : 'bg-primary'
                "
                :style="{ width: `${completionPercentage}%` }"
              ></div>
            </div>
            <p class="text-[11px] text-muted-foreground mt-3 leading-relaxed">
              Complete your profile to unlock full dashboard capabilities.
            </p>
          </div>
        </div>
      </aside>

      <!-- Content Area -->
      <div class="flex-1 max-w-3xl">
        <!-- Unified Business Profile Section -->
        <div
          v-if="activeSection === 'profile'"
          class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold tracking-tight">
                Business Profile
              </h2>
              <p class="text-muted-foreground mt-1">
                Update your general details and corporate registration
                information.
              </p>
            </div>
            <Button
              v-if="!isEditingProfile"
              @click="
                isEditingProfile = true;
                profileStep = 1;
              "
              variant="outline"
              size="sm"
              class="gap-2"
            >
              <Pencil class="w-4 h-4" />
              Edit Profile
            </Button>
            <Button
              v-else
              variant="ghost"
              size="sm"
              @click="
                isEditingProfile = false;
                profileStep = 1;
              "
            >
              Cancel
            </Button>
          </div>

          <!-- Read-only Business Detail View -->
          <div v-if="!isEditingProfile">
            <div v-if="isBusinessPending" class="py-10 flex justify-center">
              <Loader2 class="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
            <template v-else>
              <Card class="border shadow-sm mb-4">
                <CardContent class="p-6">
                  <!-- Header with logo -->
                  <div class="flex items-center gap-4 mb-6 pb-6 border-b">
                    <div
                      class="w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0"
                    >
                      <img
                        v-if="activeBusinessData?.logo || businessFullData?.business?.logo"
                        :src="businessFullData?.business?.logo || activeBusinessData?.logo"
                        :alt="activeBusinessData?.name"
                        class="w-full h-full object-cover"
                      />
                      <Building2
                        v-else
                        class="w-7 h-7 text-muted-foreground"
                      />
                    </div>
                    <div>
                      <h3 class="text-lg font-bold">
                        {{ infoData.name || businessName }}
                      </h3>
                      <span
                        class="text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                      >
                        {{ activeBusinessData?.role || "Owner" }}
                      </span>
                    </div>
                  </div>
                  <!-- Info grid -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-1">
                      <p
                        class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                      >
                        Industry
                      </p>
                      <p class="text-sm">
                        {{
                          infoData.industry || "—"
                        }}
                      </p>
                    </div>
                    <div class="space-y-1">
                      <p
                        class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                      >
                        Website
                      </p>
                      <a
                        :href="infoData.website"
                        target="_blank"
                        class="text-sm text-primary hover:underline"
                      >
                        {{ infoData.website || "—" }}
                      </a>
                    </div>
                    <div class="space-y-1 md:col-span-2">
                      <p
                        class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                      >
                        About
                      </p>
                      <p
                        class="text-sm text-muted-foreground leading-relaxed"
                      >
                        {{ infoData.about || "—" }}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card class="border shadow-sm">
                <CardHeader class="pb-2">
                  <CardTitle
                    class="text-base font-semibold flex items-center gap-2"
                  >
                    <ShieldCheck class="w-4 h-4 text-primary" />
                    Registration Details
                  </CardTitle>
                </CardHeader>
                <CardContent
                  class="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div class="space-y-1">
                    <p
                      class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                    >
                      RC Number
                    </p>
                    <p class="text-sm font-mono">
                      {{ regData.number || "—" }}
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p
                      class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                    >
                      Tax ID (TIN)
                    </p>
                    <p class="text-sm font-mono">
                      {{ regData.tax_identification_number || "—" }}
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p
                      class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                    >
                      Country of Incorporation
                    </p>
                    <p class="text-sm">
                      {{ regData.country_of_incorporation || "—" }}
                    </p>
                  </div>
                  <div class="space-y-1">
                    <p
                      class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                    >
                      Date of Incorporation
                    </p>
                    <p class="text-sm">
                      {{ regData.date_of_incorporation || "—" }}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </template>
          </div>

          <!-- Edit Wizard (shown when editing) -->
          <Card
            v-if="isEditingProfile"
            class="border shadow-sm relative overflow-hidden"
          >
            <!-- Progress indicator for steps -->
            <div
              class="flex items-center absolute top-0 left-0 right-0 h-1 bg-muted"
            >
              <div
                class="h-full bg-primary transition-all duration-500"
                :style="{ width: profileStep === 1 ? '50%' : '100%' }"
              ></div>
            </div>

            <CardContent class="p-6 space-y-8 pt-8">
              <!-- STEP 1: General Info -->
              <div
                v-if="profileStep === 1"
                class="space-y-6 animate-in slide-in-from-right-8 duration-300"
              >
                <div class="flex items-center justify-between border-b pb-2">
                  <h3 class="text-lg font-semibold">
                    Step 1: General Information
                  </h3>
                  <span
                    class="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md"
                    >1 of 2</span
                  >
                </div>

                <div class="grid gap-6">
                  <div class="space-y-2">
                    <Label class="text-sm font-semibold">Business Name</Label>
                    <Input
                      v-model="infoData.name"
                      disabled
                      placeholder="Enter business name"
                      class="max-w-md"
                    />
                    <p class="text-[11px] text-muted-foreground">
                      This is your official trading name (cannot be edited).
                    </p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <Label class="text-sm font-semibold">Website</Label>
                      <Input
                        v-model="infoData.website"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div class="space-y-2">
                      <Label class="text-sm font-semibold">Industry</Label>
                      <Input
                        v-model="infoData.industry"
                        placeholder="e.g. Technology, Retail"
                      />
                    </div>
                  </div>

                  <div class="space-y-2">
                    <Label class="text-sm font-semibold">About Business</Label>
                    <Textarea
                      v-model="infoData.about"
                      placeholder="Describe your business..."
                      class="min-h-[100px] resize-y"
                    />
                  </div>
                </div>

                <div class="flex justify-end pt-6 border-t">
                  <Button @click="profileStep = 2" class="min-w-[140px]">
                    Next Step: Registration
                    <ArrowLeft class="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </div>

              <!-- STEP 2: Registration Details -->
              <div
                v-if="profileStep === 2"
                class="space-y-6 animate-in slide-in-from-right-8 duration-300"
              >
                <div class="flex items-center justify-between border-b pb-2">
                  <h3 class="text-lg font-semibold">
                    Step 2: Registration Details
                  </h3>
                  <span
                    class="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md"
                    >2 of 2</span
                  >
                </div>

                <div
                  class="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3"
                >
                  <AlertCircle class="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 class="text-sm font-semibold text-foreground">
                      Required for Compliance
                    </h4>
                    <p
                      class="text-xs text-muted-foreground mt-1 leading-relaxed"
                    >
                      These details are strictly required by the backend to
                      verify your entity. You must fill out all required fields
                      below before saving.
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div class="space-y-2">
                    <Label class="text-sm font-semibold"
                      >Registration Number (RC)
                      <span class="text-destructive">*</span></Label
                    >
                    <Input
                      v-model="regData.number"
                      placeholder="e.g. RC-123456"
                    />
                    <p class="text-[11px] text-muted-foreground">
                      Your corporate affairs commission number.
                    </p>
                  </div>
                  <div class="space-y-2">
                    <Label class="text-sm font-semibold">Tax ID (TIN)</Label>
                    <Input
                      v-model="regData.tax_identification_number"
                      placeholder="Enter TIN"
                    />
                  </div>
                  <div class="space-y-2">
                    <Label class="text-sm font-semibold"
                      >Country of Incorporation
                      <span class="text-destructive">*</span></Label
                    >
                    <Input
                      v-model="regData.country_of_incorporation"
                      placeholder="e.g. Nigeria"
                    />
                  </div>
                  <div class="space-y-2">
                    <Label class="text-sm font-semibold"
                      >Date of Incorporation
                      <span class="text-destructive">*</span></Label
                    >
                    <Input type="date" v-model="regData.date_of_incorporation" />
                  </div>
                </div>

                <div class="flex items-center justify-between pt-6 border-t">
                  <Button variant="outline" @click="profileStep = 1">
                    <ArrowLeft class="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    @click="handleSaveProfile"
                    :disabled="businessDetail.isPending.value"
                    class="min-w-[140px]"
                  >
                    <Loader2
                      v-if="businessDetail.isPending.value"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                    <Save v-else class="w-4 h-4 mr-2" />
                    Save Full Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Documents Section -->
        <div
          v-if="activeSection === 'documents'"
          class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div>
            <h2 class="text-2xl font-bold tracking-tight">
              Compliance Documents
            </h2>
            <p class="text-muted-foreground mt-1">
              Upload and manage necessary verification files.
            </p>
          </div>

          <!-- Upload New Document Form -->
          <Card
            v-if="isUploadingDoc"
            class="border-2 border-dashed border-primary/20 shadow-none bg-primary/5 animate-in fade-in zoom-in-95 duration-200"
          >
            <CardHeader class="pb-4">
              <CardTitle class="text-lg flex items-center gap-2">
                <UploadCloud class="w-5 h-5 text-primary" />
                Upload New Document
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-2">
                  <Label class="text-sm font-semibold"
                    >Document Type
                    <span class="text-destructive">*</span></Label
                  >
                  <Select v-model="uploadData.document_id">
                    <SelectTrigger class="bg-background">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="doc in kybDocuments.data.value
                          ?.getKYBDocuments || []"
                        :key="doc.id"
                        :value="doc.id"
                      >
                        <div
                          class="flex items-center justify-between w-full pr-2"
                        >
                          <span>{{ doc.name }}</span>
                          <Badge
                            v-if="doc.required"
                            variant="secondary"
                            class="text-[9px] h-4 px-1 ml-2"
                            >Req</Badge
                          >
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div class="space-y-2">
                  <Label class="text-sm font-semibold"
                    >Description (Optional)</Label
                  >
                  <Input
                    v-model="uploadData.description"
                    placeholder="Brief note about the file"
                    class="bg-background"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label class="text-sm font-semibold"
                  >File <span class="text-destructive">*</span></Label
                >
                <div
                  @click="triggerFileInput"
                  class="border-2 border-dashed rounded-xl p-6 bg-background hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center group"
                >
                  <div
                    class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  >
                    <FileText class="w-6 h-6 text-primary" />
                  </div>
                  <p class="font-medium text-sm mb-1">
                    {{
                      uploadData.fileObj
                        ? uploadData.fileObj.name
                        : "Click to select a file"
                    }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{
                      uploadData.fileObj
                        ? `${(uploadData.fileObj.size / 1024 / 1024).toFixed(
                            2,
                          )} MB`
                        : "PDF, JPG, or PNG up to 5MB"
                    }}
                  </p>
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileSelect"
                    class="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between pt-2">
                <Button variant="ghost" @click="isUploadingDoc = false"
                  >Cancel</Button
                >
                <Button
                  @click="handleUploadDocument"
                  :disabled="
                    uploadDocument.isPending.value || !uploadData.fileObj
                  "
                  class="min-w-[120px]"
                >
                  <Loader2
                    v-if="uploadDocument.isPending.value"
                    class="w-4 h-4 mr-2 animate-spin"
                  />
                  <UploadCloud v-else class="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </CardContent>
          </Card>

          <!-- Uploaded Documents List -->
          <div class="pt-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold flex items-center gap-2">
                Uploaded Files
                <Badge variant="secondary" class="rounded-full">{{
                  businessDocuments.data.value?.getDocuments?.length || 0
                }}</Badge>
              </h3>
              <Button
                v-if="!isUploadingDoc"
                @click="isUploadingDoc = true"
                size="sm"
                class="gap-2"
              >
                <UploadCloud class="w-4 h-4" />
                Upload New Document
              </Button>
            </div>

            <div
              v-if="businessDocuments.isPending.value"
              class="py-12 flex justify-center bg-card rounded-xl border shadow-sm"
            >
              <Loader2 class="w-8 h-8 animate-spin text-muted-foreground" />
            </div>

            <div
              v-else-if="!businessDocuments.data.value?.getDocuments?.length"
              class="py-16 text-center border rounded-xl bg-card shadow-sm"
            >
              <div
                class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4"
              >
                <FolderOpen class="w-8 h-8 text-muted-foreground/60" />
              </div>
              <h3 class="text-lg font-semibold text-foreground">
                No documents uploaded
              </h3>
              <p class="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                Files you upload will appear here securely for verification.
              </p>
            </div>

            <div v-else class="grid gap-3">
              <div
                v-for="doc in businessDocuments.data.value.getDocuments"
                :key="doc.id"
                class="flex items-center justify-between p-4 rounded-xl border bg-card hover:shadow-sm transition-shadow group"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                  >
                    <FileText class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-sm">
                      {{
                        kybDocuments.data.value?.getKYBDocuments?.find(
                          (d) => d.id === doc.document_id,
                        )?.name || "Document"
                      }}
                    </h4>
                    <p class="text-xs text-muted-foreground line-clamp-1">
                      {{ doc.description || "No description" }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <a :href="doc.url" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" class="h-8 text-xs">
                      View
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8 text-destructive hover:bg-destructive/10"
                    @click="handleDeleteDocument(doc.id)"
                    :disabled="deleteDocument.isPending.value"
                  >
                    <Loader2
                      v-if="deleteDocument.isPending.value"
                      class="w-4 h-4 animate-spin"
                    />
                    <Trash2 v-else class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
