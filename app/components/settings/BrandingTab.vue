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
import { Camera, ImageIcon, Trash2, Upload } from "lucide-vue-next";
import { toast } from "@/utils/alert";

const logo = ref(null);
const cover = ref(null);
const logoRef = ref(null);
const coverRef = ref(null);

const handleFile = (e, targetRef, label) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image must be under 5MB");
    return;
  }
  const url = URL.createObjectURL(file);
  if (targetRef === "logo") logo.value = url;
  if (targetRef === "cover") cover.value = url;
  toast.success(`${label} updated`);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Cover Image -->
    <Card class="border-0 shadow-md shadow-foreground/5 overflow-hidden">
      <CardHeader class="pb-3">
        <CardTitle class="text-base">Cover Image</CardTitle>
        <CardDescription>Recommended size: 1200 × 400px</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div
          class="relative w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group"
          @click="coverRef?.click()"
        >
          <template v-if="cover">
            <img :src="cover" alt="Cover" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Camera class="w-8 h-8 text-background" />
            </div>
          </template>
          <div
            v-else
            class="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <ImageIcon class="w-10 h-10" />
            <span class="text-sm font-medium">Click to upload cover image</span>
          </div>
        </div>
        <input
          ref="coverRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="(e) => handleFile(e, 'cover', 'Cover image')"
        />
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="coverRef?.click()">
            <Upload class="w-3.5 h-3.5 mr-1.5" />
            {{ cover ? "Change" : "Upload" }}
          </Button>
          <Button
            v-if="cover"
            variant="outline"
            size="sm"
            @click="
              () => {
                cover = null;
                toast.success('Cover image removed');
              }
            "
          >
            <Trash2 class="w-3.5 h-3.5 mr-1.5" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Logo -->
    <Card class="border-0 shadow-md shadow-foreground/5">
      <CardHeader class="pb-3">
        <CardTitle class="text-base">Business Logo</CardTitle>
        <CardDescription
          >Recommended size: 400 × 400px (square)</CardDescription
        >
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center gap-6">
          <div
            class="relative w-28 h-28 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group shrink-0"
            @click="logoRef?.click()"
          >
            <template v-if="logo">
              <img :src="logo" alt="Logo" class="w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
              >
                <Camera class="w-6 h-6 text-background" />
              </div>
            </template>
            <div
              v-else
              class="flex flex-col items-center gap-1 text-muted-foreground"
            >
              <Camera class="w-8 h-8" />
              <span class="text-[10px] font-medium">Upload</span>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">
              Your logo appears on your business profile, invoices, and
              customer-facing pages.
            </p>
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="logoRef?.click()">
                <Upload class="w-3.5 h-3.5 mr-1.5" />
                {{ logo ? "Change" : "Upload" }}
              </Button>
              <Button
                v-if="logo"
                variant="outline"
                size="sm"
                @click="
                  () => {
                    logo = null;
                    toast.success('Logo removed');
                  }
                "
              >
                <Trash2 class="w-3.5 h-3.5 mr-1.5" />
                Remove
              </Button>
            </div>
          </div>
        </div>
        <input
          ref="logoRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="(e) => handleFile(e, 'logo', 'Logo')"
        />
      </CardContent>
    </Card>
  </div>
</template>
