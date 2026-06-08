<script setup>
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, Phone, Star } from "lucide-vue-next";
import { toast } from "@/utils/alert";

const branches = ref([]);
const form = ref({
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  phone: "",
});

const update = (key, value) => {
  form.value[key] = value;
};

const addBranch = () => {
  if (!form.value.name.trim()) {
    toast.error("Branch name is required");
    return;
  }
  if (!form.value.address.trim()) {
    toast.error("Address is required");
    return;
  }
  branches.value.push({
    id: crypto.randomUUID(),
    ...form.value,
    isMain: branches.value.length === 0,
  });
  form.value = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
  };
  toast.success("Branch added");
};

const removeBranch = (id) => {
  branches.value = branches.value.filter((b) => b.id !== id);
  toast.success("Branch removed");
};

const setMain = (id) => {
  branches.value = branches.value.map((b) => ({
    ...b,
    isMain: b.id === id,
  }));
  toast.success("Main branch updated");
};
</script>

<template>
  <div class="space-y-6">
    <Card class="border-0 shadow-md shadow-foreground/5">
      <CardHeader class="pb-3">
        <CardTitle class="text-base">Add Branch Location</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <Label>Branch Name</Label>
            <Input
              :modelValue="form.name"
              @update:modelValue="(val) => update('name', val)"
              placeholder="e.g. Main Office"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Phone</Label>
            <Input
              :modelValue="form.phone"
              @update:modelValue="(val) => update('phone', val)"
              placeholder="+1 234 567 890"
            />
          </div>
        </div>
        <div class="space-y-1.5">
          <Label>Street Address</Label>
          <Input
            :modelValue="form.address"
            @update:modelValue="(val) => update('address', val)"
          />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="space-y-1.5">
            <Label>City</Label>
            <Input
              :modelValue="form.city"
              @update:modelValue="(val) => update('city', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>State</Label>
            <Input
              :modelValue="form.state"
              @update:modelValue="(val) => update('state', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Country</Label>
            <Input
              :modelValue="form.country"
              @update:modelValue="(val) => update('country', val)"
            />
          </div>
          <div class="space-y-1.5">
            <Label>Zip Code</Label>
            <Input
              :modelValue="form.zipCode"
              @update:modelValue="(val) => update('zipCode', val)"
            />
          </div>
        </div>
        <Button @click="addBranch" size="sm">
          <Plus class="w-4 h-4 mr-2" />
          Add Branch
        </Button>
      </CardContent>
    </Card>

    <div v-if="branches.length > 0" class="space-y-3">
      <Card
        v-for="branch in branches"
        :key="branch.id"
        class="border-0 shadow-sm shadow-foreground/5"
      >
        <CardContent class="p-4 flex items-start gap-4">
          <div
            class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"
          >
            <MapPin class="w-5 h-5 text-accent-foreground" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="font-medium text-sm text-foreground">{{ branch.name }}</p>
              <Badge v-if="branch.isMain" variant="secondary" class="text-[10px] gap-1">
                <Star class="w-3 h-3 text-foreground" />
                Main
              </Badge>
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              {{
                [branch.address, branch.city, branch.state, branch.country]
                  .filter(Boolean)
                  .join(", ")
              }}
            </p>
            <p
              v-if="branch.phone"
              class="text-xs text-muted-foreground flex items-center gap-1 mt-1"
            >
              <Phone class="w-3 h-3" />
              {{ branch.phone }}
            </p>
          </div>
          <div class="flex gap-1">
            <Button
              v-if="!branch.isMain"
              variant="ghost"
              size="sm"
              class="text-xs h-7 text-foreground"
              @click="setMain(branch.id)"
            >
              Set Main
            </Button>
            <Button
              variant="ghost"
              size="icon"
              class="text-destructive h-8 w-8"
              @click="removeBranch(branch.id)"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    <p v-else class="text-sm text-muted-foreground text-center py-8">
      No branches added yet
    </p>
  </div>
</template>
