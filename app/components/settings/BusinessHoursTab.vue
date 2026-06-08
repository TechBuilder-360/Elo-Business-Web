<script setup>
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Clock } from "lucide-vue-next";
import { toast } from "@/utils/alert";

const defaultBusinessHours = [
  { day: "Monday", open: "09:00", close: "17:00", isClosed: false },
  { day: "Tuesday", open: "09:00", close: "17:00", isClosed: false },
  { day: "Wednesday", open: "09:00", close: "17:00", isClosed: false },
  { day: "Thursday", open: "09:00", close: "17:00", isClosed: false },
  { day: "Friday", open: "09:00", close: "17:00", isClosed: false },
  { day: "Saturday", open: "09:00", close: "17:00", isClosed: true },
  { day: "Sunday", open: "09:00", close: "17:00", isClosed: true },
];

const hours = ref([...defaultBusinessHours]);

const updateDay = (index, field, value) => {
  hours.value[index] = { ...hours.value[index], [field]: value };
};

const handleSave = () => toast.success("Business hours updated");
</script>

<template>
  <div class="space-y-6">
    <Card class="border-0 shadow-md shadow-foreground/5">
      <CardHeader class="pb-3">
        <CardTitle class="text-base flex items-center gap-2">
          <Clock class="w-4 h-4" />
          Operating Hours
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div
          v-for="(h, i) in hours"
          :key="h.day"
          class="flex items-center gap-4 py-2 border-b border-border last:border-0"
        >
          <span class="w-24 text-sm font-medium text-foreground">{{ h.day }}</span>
          <div class="flex items-center gap-2">
            <Switch
              :checked="!h.isClosed"
              @update:checked="(v) => updateDay(i, 'isClosed', !v)"
            />
            <span class="text-xs text-muted-foreground w-10">
              {{ h.isClosed ? "Closed" : "Open" }}
            </span>
          </div>
          <div v-if="!h.isClosed" class="flex items-center gap-2 flex-1">
            <Input
              type="time"
              :modelValue="h.open"
              @update:modelValue="(val) => updateDay(i, 'open', val)"
              class="w-32 h-8 text-xs"
            />
            <span class="text-xs text-muted-foreground">to</span>
            <Input
              type="time"
              :modelValue="h.close"
              @update:modelValue="(val) => updateDay(i, 'close', val)"
              class="w-32 h-8 text-xs"
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="flex justify-end">
      <Button @click="handleSave">
        <Save class="w-4 h-4 mr-2" />
        Save Hours
      </Button>
    </div>
  </div>
</template>
