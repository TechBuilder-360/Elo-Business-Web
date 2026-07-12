<script setup>
import { ref, computed } from "vue";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
} from "lucide-vue-next";
import { format } from "date-fns";

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const businessName = computed(() => route.query.name || "Business");

const {
  businessDetail,
  uploadDocument,
  deleteDocument,
  kybDocuments,
  businessDocuments,
} = useBusiness();

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

// ──────────────────────────────────────────────
// Handlers: Info & Registration
// ──────────────────────────────────────────────

const handleSaveInfo = async () => {
  try {
    await businessDetail.mutateAsync({
      name: infoData.value.name,
      about: infoData.value.about,
      industry: infoData.value.industry,
      website: infoData.value.website,
    });
    toast.success("Business info updated successfully");
  } catch (error) {
    toast.error(error.message || "Failed to update business info");
  }
};

const handleSaveReg = async () => {
  try {
    await businessDetail.mutateAsync({
      registration_detail: {
        number: regData.value.number,
        country_of_incorporation: regData.value.country_of_incorporation,
        date_of_incorporation: regData.value.date_of_incorporation,
        tax_identification_number: regData.value.tax_identification_number,
      },
    });
    toast.success("Registration details updated successfully");
  } catch (error) {
    toast.error(error.message || "Failed to update registration details");
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
    
    // Reset upload form
    uploadData.value.document_id = "";
    uploadData.value.description = "";
    uploadData.value.fileObj = null;
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
  <div class="min-h-screen bg-background text-foreground pb-12">
    <!-- Header -->
    <header class="border-b bg-card sticky top-0 z-10">
      <div class="container max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
        <div class="flex items-center gap-4">
          <Button variant="ghost" size="icon" @click="navigateBack" class="h-8 w-8">
            <ArrowLeft class="w-4 h-4" />
          </Button>
          <div>
            <h1 class="text-lg font-bold leading-tight flex items-center gap-2">
              Compliance & Settings
            </h1>
            <p class="text-xs text-muted-foreground">{{ businessName }}</p>
          </div>
        </div>
      </div>
    </header>

    <main class="container max-w-5xl mx-auto py-8 px-4">
      <Tabs defaultValue="info" class="w-full">
        <TabsList class="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="info">Business Info</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <!-- Business Info Tab -->
        <TabsContent value="info" class="space-y-6">
          <Card class="border-0 shadow-lg shadow-foreground/5 bg-card">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your general business details</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <Label>Business Name</Label>
                <Input v-model="infoData.name" placeholder="Enter business name" />
              </div>
              <div class="space-y-2">
                <Label>Website</Label>
                <Input v-model="infoData.website" placeholder="https://example.com" />
              </div>
              <div class="space-y-2">
                <Label>Industry</Label>
                <Input v-model="infoData.industry" placeholder="e.g. Technology, Retail" />
              </div>
              <div class="space-y-2">
                <Label>About</Label>
                <Textarea v-model="infoData.about" placeholder="Describe your business" class="min-h-[120px]" />
              </div>
              
              <div class="flex justify-end pt-4 border-t">
                <Button @click="handleSaveInfo" :disabled="businessDetail.isPending">
                  <Loader2 v-if="businessDetail.isPending" class="w-4 h-4 mr-2 animate-spin" />
                  <Save v-else class="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Registration Tab -->
        <TabsContent value="registration" class="space-y-6">
          <Card class="border-0 shadow-lg shadow-foreground/5 bg-card">
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
              <CardDescription>Manage your corporate registration and tax info</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label>Registration Number (RC)</Label>
                  <Input v-model="regData.number" placeholder="RC-123456" />
                </div>
                <div class="space-y-2">
                  <Label>Tax ID (TIN)</Label>
                  <Input v-model="regData.tax_identification_number" placeholder="Enter TIN" />
                </div>
                <div class="space-y-2">
                  <Label>Country of Incorporation</Label>
                  <Input v-model="regData.country_of_incorporation" placeholder="e.g. Nigeria" />
                </div>
                <div class="space-y-2">
                  <Label>Date of Incorporation</Label>
                  <Input type="date" v-model="regData.date_of_incorporation" />
                </div>
              </div>

              <div class="flex justify-end pt-4 border-t mt-6">
                <Button @click="handleSaveReg" :disabled="businessDetail.isPending">
                  <Loader2 v-if="businessDetail.isPending" class="w-4 h-4 mr-2 animate-spin" />
                  <Save v-else class="w-4 h-4 mr-2" />
                  Save Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Documents Tab -->
        <TabsContent value="documents" class="space-y-6">
          <!-- Upload Section -->
          <Card class="border-0 shadow-lg shadow-foreground/5 bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>Submit compliance documents for verification</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label>Document Type *</Label>
                  <Select v-model="uploadData.document_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem 
                        v-for="doc in kybDocuments.data.value?.getKYBDocuments || []" 
                        :key="doc.id" 
                        :value="doc.id"
                      >
                        <div class="flex items-center gap-2">
                          {{ doc.name }}
                          <Badge v-if="doc.required" variant="secondary" class="text-[10px]">Required</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Input v-model="uploadData.description" placeholder="Add a note" />
                </div>
                <div class="space-y-2 md:col-span-2">
                  <Label>File *</Label>
                  <div class="flex items-center gap-4">
                    <Input 
                      type="file" 
                      ref="fileInput"
                      @change="handleFileSelect" 
                      class="flex-1 cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3" 
                    />
                  </div>
                  <p class="text-xs text-muted-foreground mt-1">Accepts images and PDF files up to 5MB.</p>
                </div>
              </div>

              <div class="flex justify-end pt-4">
                <Button @click="handleUploadDocument" :disabled="uploadDocument.isPending">
                  <Loader2 v-if="uploadDocument.isPending" class="w-4 h-4 mr-2 animate-spin" />
                  <UploadCloud v-else class="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>

          <!-- Uploaded Documents List -->
          <Card class="border-0 shadow-lg shadow-foreground/5 bg-card">
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div v-if="businessDocuments.isPending" class="py-8 flex justify-center">
                <Loader2 class="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
              <div v-else-if="!businessDocuments.data.value?.businessDocument?.length" class="py-12 text-center border-2 border-dashed rounded-lg bg-accent/20">
                <FileText class="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-foreground">No documents yet</h3>
                <p class="text-sm text-muted-foreground">Upload your first compliance document above</p>
              </div>
              <div v-else class="space-y-3">
                <div 
                  v-for="doc in businessDocuments.data.value?.businessDocument" 
                  :key="doc.id"
                  class="flex items-center justify-between p-4 rounded-lg border bg-accent/20 hover:bg-accent/40 transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p class="font-medium text-sm text-foreground">{{ doc.description || doc.document_id }}</p>
                      <a :href="doc.url" target="_blank" class="text-xs text-primary hover:underline mt-0.5 inline-block">
                        View Document
                      </a>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    class="text-destructive hover:bg-destructive/10"
                    @click="handleDeleteDocument(doc.id)"
                    :disabled="deleteDocument.isPending"
                  >
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>
