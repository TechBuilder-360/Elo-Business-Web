<script setup>
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  MapPin,
  Building2,
  Globe,
  CheckCircle2,
} from "lucide-vue-next";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="space-y-6">
    <div
      class="p-4 rounded-lg bg-accent/50 border border-accent flex items-start gap-3"
    >
      <CheckCircle2 class="w-5 h-5 text-primary mt-0.5 shrink-0" />
      <div>
        <p class="text-sm font-semibold text-accent-foreground">
          Review Your Information
        </p>
        <p class="text-xs text-muted-foreground mt-1">
          Please confirm all details are correct before submitting your business
          onboarding application.
        </p>
      </div>
    </div>

    <!-- Business Information Section -->
    <div class="space-y-3">
      <div class="flex items-center gap-2 text-primary">
        <Building2 class="w-4 h-4" />
        <h4 class="font-semibold text-sm">Business Information</h4>
      </div>
      <div class="pl-6 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Business Name</span>
          <span class="font-medium text-right max-w-[60%]">{{
            data.businessName || "—"
          }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Services</span>
          <span class="font-medium text-right max-w-[60%]">{{
            data.services || "—"
          }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Email</span>
          <span class="font-medium text-right max-w-[60%]">{{
            data.email || "—"
          }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Resident Country</span>
          <span class="font-medium text-right max-w-[60%]">{{
            data.residentCountry || "—"
          }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Business Type</span>
          <span class="font-medium text-right max-w-[60%]">
            {{ data.businessType === "onsite" ? "Onsite" : "Offsite" }}
          </span>
        </div>
        <div v-if="data.isRegistered === 'yes'" class="pt-1">
          <Badge variant="secondary">Registered Business</Badge>
        </div>
      </div>
    </div>

    <!-- Business Address Section -->
    <div v-if="data.businessType === 'onsite'" class="space-y-3">
      <div class="flex items-center gap-2 text-primary">
        <MapPin class="w-4 h-4" />
        <h4 class="font-semibold text-sm">Business Address</h4>
      </div>
      <div class="pl-6 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Address</span>
          <span class="font-medium text-right max-w-[60%]">
            {{ data.address.number }} {{ data.address.street }}
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">State</span>
          <span class="font-medium text-right max-w-[60%]">{{
            data.address.state || "—"
          }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Country</span>
          <span class="font-medium text-right max-w-[60%]">{{
            data.address.country || "—"
          }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Zip Code</span>
          <span class="font-medium text-right max-w-[60%]">{{
            data.address.zipCode || "—"
          }}</span>
        </div>
      </div>
    </div>

    <!-- Registration Details Section -->
    <div v-if="data.isRegistered === 'yes'" class="space-y-3">
      <div class="flex items-center gap-2 text-primary">
        <Globe class="w-4 h-4" />
        <h4 class="font-semibold text-sm">Registration Details</h4>
      </div>
      <div class="pl-6 space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Reg. Number</span>
          <span class="font-medium text-right max-w-[60%]">
            {{ data.registration.regNumber || "—" }}
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Country of Incorporation</span>
          <span class="font-medium text-right max-w-[60%]">
            {{ data.registration.countryOfIncorporation || "—" }}
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">CAC</span>
          <span class="font-medium text-right max-w-[60%]">
            {{ data.registration.cacDocument?.name || "Not uploaded" }}
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">MEMART</span>
          <span class="font-medium text-right max-w-[60%]">
            {{ data.registration.memartDocument?.name || "Not uploaded" }}
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Status Report</span>
          <span class="font-medium text-right max-w-[60%]">
            {{ data.registration.statusReport?.name || "Not uploaded" }}
          </span>
        </div>
      </div>
    </div>

    <!-- Documents Section -->
    <div v-if="data.documents.length > 0" class="space-y-3">
      <div class="flex items-center gap-2 text-primary">
        <FileText class="w-4 h-4" />
        <h4 class="font-semibold text-sm">
          Documents ({{ data.documents.length }})
        </h4>
      </div>
      <div class="pl-6 space-y-2">
        <div
          v-for="doc in data.documents"
          :key="doc.id"
          class="flex items-center gap-2 text-sm text-foreground"
        >
          <FileText class="w-3.5 h-3.5 text-muted-foreground" />
          <span>{{ doc.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
