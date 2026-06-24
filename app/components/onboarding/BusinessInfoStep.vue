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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const industries = [
  "Technology",
  "Food & Beverage",
  "Retail",
  "Healthcare",
  "Logistics",
  "Finance",
  "Education",
  "Manufacturing",
  "Entertainment",
  "Other"
];
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <Label htmlFor="businessName">Business Name *</Label>
      <Input
        id="businessName"
        placeholder="Enter your business name"
        :modelValue="data.businessName"
        @update:modelValue="(val) => onChange({ businessName: val })"
      />
    </div>

    <div class="space-y-2">
      <Label htmlFor="services">Services Offered *</Label>
      <Textarea
        id="services"
        placeholder="Describe the services your business provides"
        :modelValue="data.services"
        @update:modelValue="(val) => onChange({ services: val })"
        class="min-h-[100px]"
      />
    </div>

    <div class="space-y-2">
      <Label htmlFor="email">Business Email Address *</Label>
      <Input
        id="email"
        type="email"
        placeholder="business@example.com"
        :modelValue="data.email"
        @update:modelValue="(val) => onChange({ email: val })"
      />
    </div>

    <div class="space-y-2">
      <Label>Resident Country *</Label>
      <Select
        :modelValue="data.residentCountry"
        @update:modelValue="(val) => onChange({ residentCountry: val })"
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

    <div class="space-y-2">
      <Label>Industry *</Label>
      <Select
        :modelValue="data.industry"
        @update:modelValue="(val) => onChange({ industry: val })"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="ind in industries" :key="ind" :value="ind">
            {{ ind }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="space-y-3">
      <Label>Business Type *</Label>
      <RadioGroup
        :modelValue="data.businessType"
        @update:modelValue="(val) => onChange({ businessType: val })"
        class="flex gap-6"
      >
        <div class="flex items-center space-x-2">
          <RadioGroupItem value="onsite" id="onsite" />
          <Label htmlFor="onsite" class="cursor-pointer">Onsite</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem value="offsite" id="offsite" />
          <Label htmlFor="offsite" class="cursor-pointer">Offsite</Label>
        </div>
      </RadioGroup>
    </div>

    <div
      v-if="data.businessType === 'onsite'"
      class="space-y-4 p-4 rounded-lg bg-accent/50 border border-accent"
    >
      <h4 class="text-sm font-semibold text-accent-foreground">
        Business Address
      </h4>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label htmlFor="addressNumber">Number</Label>
          <Input
            id="addressNumber"
            placeholder="123"
            :modelValue="data.address.number"
            @update:modelValue="
              (val) => onChange({ address: { ...data.address, number: val } })
            "
          />
        </div>
        <div class="space-y-2 col-span-2">
          <Label htmlFor="street">Street</Label>
          <Input
            id="street"
            placeholder="Main Street"
            :modelValue="data.address.street"
            @update:modelValue="
              (val) => onChange({ address: { ...data.address, street: val } })
            "
          />
        </div>
        <div class="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="Lagos"
            :modelValue="data.address.state"
            @update:modelValue="
              (val) => onChange({ address: { ...data.address, state: val } })
            "
          />
        </div>
        <div class="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="Nigeria"
            :modelValue="data.address.country"
            @update:modelValue="
              (val) => onChange({ address: { ...data.address, country: val } })
            "
          />
        </div>
        <div class="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            placeholder="100001"
            :modelValue="data.address.zipCode"
            @update:modelValue="
              (val) => onChange({ address: { ...data.address, zipCode: val } })
            "
          />
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <Label>Is your business registered? *</Label>
      <RadioGroup
        :modelValue="data.isRegistered"
        @update:modelValue="(val) => onChange({ isRegistered: val })"
        class="flex gap-6"
      >
        <div class="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="reg-yes" />
          <Label htmlFor="reg-yes" class="cursor-pointer">Yes</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem value="no" id="reg-no" />
          <Label htmlFor="reg-no" class="cursor-pointer">No</Label>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>
