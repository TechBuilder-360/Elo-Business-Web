<script setup>
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-vue-next";
import { toast } from "@/utils/alert";

const props = defineProps({
  businessName: {
    type: String,
    required: true,
  },
});

const info = ref({
  name: props.businessName,
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
</script>

<template>
  <div class="space-y-6">
    <Card class="border-0 shadow-md shadow-foreground/5">
      <CardHeader class="pb-3">
        <CardTitle class="text-base">General Information</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <Label>Business Name</Label>
            <Input
              :modelValue="info.name"
              @update:modelValue="(val) => update('name', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Industry</Label>
            <Select
              :modelValue="info.industry"
              @update:modelValue="(val) => update('industry', val)"
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
            @update:modelValue="(val) => update('description', val)"
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
              @update:modelValue="(val) => update('email', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Phone</Label>
            <Input
              :modelValue="info.phone"
              @update:modelValue="(val) => update('phone', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Website</Label>
            <Input
              :modelValue="info.website"
              @update:modelValue="(val) => update('website', val)"
              placeholder="https://"
            />
          </div>
        </div>
        <div class="space-y-1.5">
          <Label>Tax ID / Registration Number</Label>
          <Input :modelValue="info.taxId" disabled class="disabled:bg-muted" />
        </div>
      </CardContent>
    </Card>

    <Card class="border-0 shadow-md shadow-foreground/5">
      <CardHeader class="pb-3">
        <CardTitle class="text-base">Business Address</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-1.5">
          <Label>Street Address</Label>
          <Input
            :modelValue="info.address"
            @update:modelValue="(val) => update('address', val)"
          />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="space-y-1.5">
            <Label>City</Label>
            <Input
              :modelValue="info.city"
              @update:modelValue="(val) => update('city', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>State</Label>
            <Input
              :modelValue="info.state"
              @update:modelValue="(val) => update('state', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Country</Label>
            <Input
              :modelValue="info.country"
              @update:modelValue="(val) => update('country', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Zip Code</Label>
            <Input
              :modelValue="info.zipCode"
              @update:modelValue="(val) => update('zipCode', val)"
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
</template>
