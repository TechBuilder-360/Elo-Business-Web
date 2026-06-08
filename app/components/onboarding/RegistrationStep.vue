<script setup>
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText } from "lucide-vue-next";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  onChange: {
    type: Function,
    required: true,
  },
});

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "France",
  "India",
  "Other",
];

const updateReg = (updates) => {
  props.onChange({ registration: { ...props.data.registration, ...updates } });
};
</script>

<template>
  <div
    v-if="data.isRegistered !== 'yes'"
    class="flex flex-col items-center justify-center py-12 text-center"
  >
    <div
      class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4"
    >
      <FileText class="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 class="text-lg font-semibold mb-2">No Registration Details Needed</h3>
    <p class="text-muted-foreground text-sm max-w-sm">
      Since your business is not registered, you can skip this step and proceed
      to document upload.
    </p>
  </div>

  <div v-else class="space-y-6">
    <div class="space-y-2">
      <Label htmlFor="regNumber">Business Registration Number *</Label>
      <Input
        id="regNumber"
        placeholder="RC-123456"
        :modelValue="data.registration.regNumber"
        @update:modelValue="(val) => updateReg({ regNumber: val })"
      />
    </div>

    <div class="space-y-2">
      <Label>Country of Incorporation *</Label>
      <Select
        :modelValue="data.registration.countryOfIncorporation"
        @update:modelValue="(val) => updateReg({ countryOfIncorporation: val })"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="c in countries" :key="c" :value="c">
            {{ c }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- File Upload Field 1: CAC -->
    <div class="space-y-2">
      <Label htmlFor="cac">CAC Certificate *</Label>
      <label
        htmlFor="cac"
        class="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-input bg-muted/30 cursor-pointer hover:bg-muted/60 transition-colors"
      >
        <template v-if="data.registration.cacDocument">
          <FileText class="w-5 h-5 text-primary shrink-0" />
          <span class="text-sm truncate">{{
            data.registration.cacDocument.name
          }}</span>
        </template>
        <template v-else>
          <Upload class="w-5 h-5 text-muted-foreground shrink-0" />
          <span class="text-sm text-muted-foreground">Click to upload</span>
        </template>
        <input
          id="cac"
          type="file"
          class="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          @change="
            (e) => updateReg({ cacDocument: e.target.files?.[0] || null })
          "
        />
      </label>
    </div>

    <!-- File Upload Field 2: MEMART -->
    <div class="space-y-2">
      <Label htmlFor="memart">MEMART Document *</Label>
      <label
        htmlFor="memart"
        class="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-input bg-muted/30 cursor-pointer hover:bg-muted/60 transition-colors"
      >
        <template v-if="data.registration.memartDocument">
          <FileText class="w-5 h-5 text-primary shrink-0" />
          <span class="text-sm truncate">{{
            data.registration.memartDocument.name
          }}</span>
        </template>
        <template v-else>
          <Upload class="w-5 h-5 text-muted-foreground shrink-0" />
          <span class="text-sm text-muted-foreground">Click to upload</span>
        </template>
        <input
          id="memart"
          type="file"
          class="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          @change="
            (e) => updateReg({ memartDocument: e.target.files?.[0] || null })
          "
        />
      </label>
    </div>

    <!-- File Upload Field 3: Status Report -->
    <div class="space-y-2">
      <Label htmlFor="statusReport">Status Report *</Label>
      <label
        htmlFor="statusReport"
        class="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-input bg-muted/30 cursor-pointer hover:bg-muted/60 transition-colors"
      >
        <template v-if="data.registration.statusReport">
          <FileText class="w-5 h-5 text-primary shrink-0" />
          <span class="text-sm truncate">{{
            data.registration.statusReport.name
          }}</span>
        </template>
        <template v-else>
          <Upload class="w-5 h-5 text-muted-foreground shrink-0" />
          <span class="text-sm text-muted-foreground">Click to upload</span>
        </template>
        <input
          id="statusReport"
          type="file"
          class="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          @change="
            (e) => updateReg({ statusReport: e.target.files?.[0] || null })
          "
        />
      </label>
    </div>
  </div>
</template>
