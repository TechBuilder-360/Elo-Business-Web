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
import { useQueryClient } from "@tanstack/vue-query";
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
  Eye,
  Moon,
  Sun,
} from "lucide-vue-next";

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const businessName = computed(() => route.query.name || "Business");
const { isDark, toggleTheme } = useTheme();

const {
  userBusinesses,
  businessDetail,
  uploadDocument,
  deleteDocument,
  kybDocuments,
  businessDocuments,
  getBusinessDetailQuery,
} = useBusiness();
const qc = useQueryClient();

const activeBusinessId = ref(null);
if (import.meta.client) {
  activeBusinessId.value = localStorage.getItem("activeBusinessId");
}

const activeBusinessData = computed(() => {
  const list = userBusinesses.data.value?.myBusinesses || [];
  if (activeBusinessId.value)
    return list.find((b) => b.id === activeBusinessId.value) || null;
  return list[0] || null;
});

const computedActiveId = computed(
  () => activeBusinessData.value?.id || activeBusinessId.value,
);
const { data: fullBusinessDataResult, isPending: isDetailPending } =
  getBusinessDetailQuery(computedActiveId);
const fullBusinessData = computed(
  () => fullBusinessDataResult.value?.business || null,
);

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

const uploadData = ref({
  document_id: "",
  description: "",
  fileObj: null,
});

const fileInput = ref(null);

// activeBusinessData moved up

// Pre-fill infoData from the live API response
import { watch } from "vue";
watch(
  [activeBusinessData, fullBusinessData],
  ([active, full]) => {
    if (active) {
      infoData.value.name = active.name || businessName.value;
    }

    if (full) {
      infoData.value.name = full.name || infoData.value.name;
      infoData.value.about = full.about || "";
      infoData.value.industry = full.industry || "";
      infoData.value.website = full.email || ""; // Using email for website slot for now if needed, or map properly

      if (full.number) {
        regData.value.number = full.number;
      }
      if (full.country_of_incorporation) {
        regData.value.country_of_incorporation = full.country_of_incorporation;
      }
      if (full.date_of_incorporation) {
        const dateParts = full.date_of_incorporation.split("-");
        if (dateParts.length === 3) {
          if (dateParts[0].length === 4) {
            regData.value.date_of_incorporation = full.date_of_incorporation;
          } else {
            regData.value.date_of_incorporation = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
          }
        } else {
          regData.value.date_of_incorporation = full.date_of_incorporation;
        }
      }
      if (full.tax_identification_number) {
        regData.value.tax_identification_number =
          full.tax_identification_number;
      }
    }
  },
  { immediate: true },
);

watch(
  isDetailPending,
  (pending) => {
    if (!pending) {
      if (!fullBusinessData.value || !fullBusinessData.value.number) {
        isEditingProfile.value = true;
      } else {
        isEditingProfile.value = false;
      }
    }
  },
  { immediate: true },
);
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

  // Add weight for having at least one document
  total += 2;
  if (businessDocuments.data.value?.getDocuments?.length > 0) filled += 2;

  return Math.round((filled / total) * 100);
});

// ──────────────────────────────────────────────
// Handlers: Info & Registration
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
    // Invalidate the businessDetail query so the UI immediately reflects the new data
    qc.invalidateQueries({ queryKey: ["businessDetail", computedActiveId.value] });
  } catch (error) {
    toast.error(error.message || "Failed to save profile");
  }
};

// ──────────────────────────────────────────────
// Handlers: Documents
// ──────────────────────────────────────────────
const handleFileSelect = (e) => {
  if (e.target.files && e.target.files[0]) {
    uploadData.value.fileObj = e.target.files[0];
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
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
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
  router.back();
};
</script>

<template>
  <div class="min-h-screen bg-muted/30 text-foreground pb-12">
    <!-- Header -->
    <header class="border-b bg-background sticky top-0 z-20">
      <div
        class="container max-w-8xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8"
      >
        <div class="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            @click="navigateBack"
            class="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted"
          >
            <ArrowLeft class="w-4 h-4" />
          </Button>
          <div>
            <h1 class="text-xl font-bold tracking-tight">
              Compliance & Settings
            </h1>
            <p class="text-sm text-muted-foreground flex items-center gap-2">
              {{ businessName }}
            </p>
          </div>
        </div>

        <div class="hidden sm:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 text-foreground shrink-0"
            @click="toggleTheme"
          >
            <Moon v-if="isDark" class="w-4 h-4" />
            <Sun v-else class="w-4 h-4" />
          </Button>
          <div class="text-sm text-right">
            <p class="font-medium">Profile Completion</p>
            <p class="text-xs text-muted-foreground">
              {{ completionPercentage }}% Complete
            </p>
          </div>
          <div class="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div
              class="h-full bg-primary transition-all duration-500 ease-in-out"
              :style="{ width: `${completionPercentage}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <main class="container max-w-8xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar Navigation -->
        <aside class="md:w-64 shrink-0">
          <div class="sticky top-28 space-y-1">
            <!-- Mobile horizontal scrolling nav -->
            <div
              class="flex overflow-x-auto md:flex-col gap-2 pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
            >
              <button
                v-for="section in sections"
                :key="section.id"
                @click="activeSection = section.id"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap md:whitespace-normal shrink-0"
                :class="
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'hover:bg-muted text-muted-foreground'
                "
              >
                <component
                  :is="section.icon"
                  class="w-5 h-5"
                  :class="
                    activeSection === section.id
                      ? 'text-primary-foreground'
                      : 'text-foreground'
                  "
                />
                <div>
                  <p
                    class="font-medium text-sm"
                    :class="
                      activeSection === section.id
                        ? 'text-primary-foreground'
                        : 'text-foreground'
                    "
                  >
                    {{ section.label }}
                  </p>
                  <p
                    class="text-xs hidden md:block opacity-80"
                    :class="
                      activeSection === section.id
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground'
                    "
                  >
                    {{ section.desc }}
                  </p>
                </div>
              </button>
            </div>

            <!-- Mobile Progress Bar -->
            <div class="mt-6 p-4 rounded-xl bg-card border shadow-sm md:hidden">
              <div class="flex justify-between items-center mb-2">
                <p class="text-sm font-medium">Completion</p>
                <p class="text-sm font-bold text-primary">
                  {{ completionPercentage }}%
                </p>
              </div>
              <div class="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary transition-all duration-500 ease-in-out"
                  :style="{ width: `${completionPercentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Content Area -->
        <div class="flex-1 space-y-6 max-w-3xl">
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
              <Card class="border shadow-sm mb-4">
                <CardContent class="p-6">
                  <!-- Header with logo -->
                  <div class="flex items-center gap-4 mb-6 pb-6 border-b">
                    <div
                      class="w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0"
                    >
                      <img
                        v-if="activeBusinessData?.logo"
                        :src="activeBusinessData.logo"
                        :alt="activeBusinessData?.name"
                        class="w-full h-full object-cover"
                      />
                      <Building2 v-else class="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 class="text-lg font-bold">
                        {{ activeBusinessData?.name || businessName }}
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
                          infoData.industry ||
                          activeBusinessData?.industry ||
                          "—"
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
                      <p class="text-sm text-muted-foreground leading-relaxed">
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
                    <p class="text-sm font-mono">{{ regData.number || "—" }}</p>
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
                      <Label class="text-sm font-semibold"
                        >About Business</Label
                      >
                      <Textarea
                        v-model="infoData.about"
                        placeholder="Describe your business..."
                        class="min-h-[100px] resize-y"
                      />
                    </div>
                  </div>

                  <div class="flex justify-end pt-6 border-t">
                    <Button @click="profileStep = 2" class="min-w-[140px]">
                      Next Step
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
                        verify your entity. You must fill out all required
                        fields below before saving.
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
                      <Input
                        type="date"
                        v-model="regData.date_of_incorporation"
                      />
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
                          ? `${(uploadData.fileObj.size / 1024 / 1024).toFixed(2)} MB`
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
                  v-for="doc in businessDocuments.data.value?.getDocuments"
                  :key="doc.id"
                  class="flex items-center justify-between p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div class="flex items-center gap-4 overflow-hidden">
                    <div
                      class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                    >
                      <CheckCircle2 class="w-6 h-6 text-primary" />
                    </div>
                    <div class="truncate">
                      <p class="font-semibold text-sm text-foreground truncate">
                        {{ doc.description || doc.document_id }}
                      </p>
                      <a
                        :href="doc.url"
                        target="_blank"
                        class="text-[11px] font-medium text-primary hover:underline mt-0.5 inline-flex items-center gap-1"
                      >
                        View Secure File ↗
                      </a>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="handleDeleteDocument(doc.id)"
                    :disabled="deleteDocument.isPending.value"
                    title="Delete document"
                  >
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
