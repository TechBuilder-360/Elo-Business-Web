<script setup>
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText } from "lucide-vue-next";

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

const fileInputRef = ref(null);

const handleFiles = (files) => {
  if (!files) return;
  const newDocs = Array.from(files).map((file) => ({
    id: crypto.randomUUID(),
    name: file.name,
    file,
    type: file.type,
  }));
  props.onChange({ documents: [...props.data.documents, ...newDocs] });
};

const removeDoc = (id) => {
  props.onChange({
    documents: props.data.documents.filter((d) => d.id !== id),
  });
};
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <Label>Upload Supporting Documents</Label>
      <p class="text-sm text-muted-foreground">
        Upload any additional documents such as utility bills, tax certificates,
        or business permits.
      </p>
    </div>

    <div
      class="border-2 border-dashed border-input rounded-xl p-8 text-center hover:border-primary/50 hover:bg-accent/30 transition-colors cursor-pointer"
      @click="fileInputRef?.click()"
      @dragover.prevent
      @drop.prevent="(e) => handleFiles(e.dataTransfer.files)"
    >
      <Upload class="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
      <p class="text-sm font-medium mb-1">
        Drag & drop files here or click to browse
      </p>
      <p class="text-xs text-muted-foreground">
        PDF, DOC, DOCX, JPG, PNG (max 10MB each)
      </p>
      <input
        ref="fileInputRef"
        type="file"
        multiple
        class="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        @change="(e) => handleFiles(e.target.files)"
      />
    </div>

    <div v-if="data.documents.length > 0" class="space-y-3">
      <Label>Uploaded Documents ({ data.documents.length })</Label>
      <div class="space-y-2">
        <div
          v-for="doc in data.documents"
          :key="doc.id"
          class="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
        >
          <div class="flex items-center gap-3">
            <FileText class="w-5 h-5 text-primary shrink-0" />
            <div>
              <p class="text-sm font-medium truncate max-w-[250px]">
                {{ doc.name }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ (doc.file.size / 1024).toFixed(1) }} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            class="shrink-0"
            @click="removeDoc(doc.id)"
          >
            <X class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
