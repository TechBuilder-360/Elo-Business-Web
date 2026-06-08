<script setup>
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Package, Wrench, ImagePlus, X } from "lucide-vue-next";
import { toast } from "@/utils/alert";

const MAX_IMAGES = 5;

const products = ref([]);
const services = ref([]);
const newProduct = ref({ name: "", description: "" });
const newService = ref({ name: "", description: "" });
const newProductImages = ref([]);
const newServiceImages = ref([]);
const productImgRef = ref(null);
const serviceImgRef = ref(null);

const handleImages = (e, currentImages, setter) => {
  const files = Array.from(e.target.files || []);
  const remaining = MAX_IMAGES - currentImages.length;
  if (remaining <= 0) {
    toast.error(`Maximum ${MAX_IMAGES} images allowed`);
    return;
  }
  const valid = files
    .filter((f) => {
      if (!f.type.startsWith("image/")) {
        toast.error(`${f.name} is not an image`);
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 5MB`);
        return false;
      }
      return true;
    })
    .slice(0, remaining);
  const urls = valid.map((f) => URL.createObjectURL(f));
  setter([...currentImages, ...urls]);
  e.target.value = "";
};

const removeImage = (currentImages, index, setter) => {
  setter(currentImages.filter((_, i) => i !== index));
};

const addProduct = () => {
  if (!newProduct.value.name.trim()) {
    toast.error("Product name is required");
    return;
  }
  products.value.push({
    id: crypto.randomUUID(),
    name: newProduct.value.name,
    description: newProduct.value.description,
    images: [...newProductImages.value],
  });
  newProduct.value = { name: "", description: "" };
  newProductImages.value = [];
  toast.success("Product added");
};

const addService = () => {
  if (!newService.value.name.trim()) {
    toast.error("Service name is required");
    return;
  }
  services.value.push({
    id: crypto.randomUUID(),
    name: newService.value.name,
    description: newService.value.description,
    images: [...newServiceImages.value],
  });
  newService.value = { name: "", description: "" };
  newServiceImages.value = [];
  toast.success("Service added");
};

const removeProduct = (id) => {
  products.value = products.value.filter((x) => x.id !== id);
  toast.success("Product removed");
};

const removeService = (id) => {
  services.value = services.value.filter((x) => x.id !== id);
  toast.success("Service removed");
};
</script>

<template>
  <Tabs defaultValue="products">
    <TabsList class="mb-4">
      <TabsTrigger value="products" class="gap-1.5">
        <Package class="w-4 h-4" />
        Products
      </TabsTrigger>
      <TabsTrigger value="services" class="gap-1.5">
        <Wrench class="w-4 h-4" />
        Services
      </TabsTrigger>
    </TabsList>

    <!-- PRODUCTS TAB CONTENT -->
    <TabsContent value="products" class="space-y-4">
      <Card class="border-0 shadow-md shadow-foreground/5">
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Add Product</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="space-y-1.5">
            <Label>Name</Label>
            <Input v-model="newProduct.name" placeholder="Product name" />
          </div>
          <div class="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              v-model="newProduct.description"
              placeholder="Describe this product"
              :rows="2"
            />
          </div>

          <!-- Image Picker -->
          <div class="space-y-1.5">
            <Label>
              Images ({{ newProductImages.length }}/{{ MAX_IMAGES }})
            </Label>
            <div class="flex gap-2 flex-wrap">
              <div
                v-for="(img, i) in newProductImages"
                :key="i"
                class="relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
              >
                <img :src="img" alt="" class="w-full h-full object-cover" />
                <button
                  type="button"
                  class="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  @click="
                    removeImage(
                      newProductImages,
                      i,
                      (val) => (newProductImages = val),
                    )
                  "
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
              <button
                v-if="newProductImages.length < MAX_IMAGES"
                type="button"
                class="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors"
                @click="productImgRef?.click()"
              >
                <ImagePlus class="w-5 h-5" />
              </button>
            </div>
            <input
              ref="productImgRef"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="
                (e) =>
                  handleImages(
                    e,
                    newProductImages,
                    (val) => (newProductImages = val),
                  )
              "
            />
          </div>

          <Button @click="addProduct" size="sm">
            <Plus class="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </CardContent>
      </Card>

      <div v-if="products.length > 0" class="space-y-3">
        <Card
          v-for="item in products"
          :key="item.id"
          class="border-0 shadow-sm shadow-foreground/5"
        >
          <CardContent class="p-4 flex items-start gap-4">
            <div
              class="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden"
            >
              <img
                v-if="item.images.length > 0"
                :src="item.images[0]"
                alt=""
                class="w-full h-full object-cover"
              />
              <ImagePlus v-else class="w-6 h-6 text-muted-foreground" />
            </div>
            <div class="flex-1 min-w-0 space-y-1.5">
              <p class="font-medium text-sm text-foreground">{{ item.name }}</p>
              <p class="text-xs text-muted-foreground line-clamp-2">
                {{ item.description || "No description" }}
              </p>
              <div v-if="item.images.length > 1" class="flex gap-1.5 flex-wrap">
                <div
                  v-for="(img, idx) in item.images.slice(1)"
                  :key="idx"
                  class="w-12 h-12 rounded-md overflow-hidden border border-border"
                >
                  <img :src="img" alt="" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="text-destructive h-8 w-8"
              @click="removeProduct(item.id)"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      <p v-else class="text-sm text-muted-foreground text-center py-8">
        No products added yet
      </p>
    </TabsContent>

    <!-- SERVICES TAB CONTENT -->
    <TabsContent value="services" class="space-y-4">
      <Card class="border-0 shadow-md shadow-foreground/5">
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Add Service</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="space-y-1.5">
            <Label>Name</Label>
            <Input v-model="newService.name" placeholder="Service name" />
          </div>
          <div class="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              v-model="newService.description"
              placeholder="Describe this service"
              :rows="2"
            />
          </div>

          <!-- Image Picker -->
          <div class="space-y-1.5">
            <Label>
              Images ({{ newServiceImages.length }}/{{ MAX_IMAGES }})
            </Label>
            <div class="flex gap-2 flex-wrap">
              <div
                v-for="(img, i) in newServiceImages"
                :key="i"
                class="relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
              >
                <img :src="img" alt="" class="w-full h-full object-cover" />
                <button
                  type="button"
                  class="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  @click="
                    removeImage(
                      newServiceImages,
                      i,
                      (val) => (newServiceImages = val),
                    )
                  "
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
              <button
                v-if="newServiceImages.length < MAX_IMAGES"
                type="button"
                class="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors"
                @click="serviceImgRef?.click()"
              >
                <ImagePlus class="w-5 h-5" />
              </button>
            </div>
            <input
              ref="serviceImgRef"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="
                (e) =>
                  handleImages(
                    e,
                    newServiceImages,
                    (val) => (newServiceImages = val),
                  )
              "
            />
          </div>

          <Button @click="addService" size="sm">
            <Plus class="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </CardContent>
      </Card>

      <div v-if="services.length > 0" class="space-y-3">
        <Card
          v-for="item in services"
          :key="item.id"
          class="border-0 shadow-sm shadow-foreground/5"
        >
          <CardContent class="p-4 flex items-start gap-4">
            <div
              class="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden"
            >
              <img
                v-if="item.images.length > 0"
                :src="item.images[0]"
                alt=""
                class="w-full h-full object-cover"
              />
              <ImagePlus v-else class="w-6 h-6 text-muted-foreground" />
            </div>
            <div class="flex-1 min-w-0 space-y-1.5">
              <p class="font-medium text-sm text-foreground">{{ item.name }}</p>
              <p class="text-xs text-muted-foreground line-clamp-2">
                {{ item.description || "No description" }}
              </p>
              <div v-if="item.images.length > 1" class="flex gap-1.5 flex-wrap">
                <div
                  v-for="(img, idx) in item.images.slice(1)"
                  :key="idx"
                  class="w-12 h-12 rounded-md overflow-hidden border border-border"
                >
                  <img :src="img" alt="" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="text-destructive h-8 w-8"
              @click="removeService(item.id)"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      <p v-else class="text-sm text-muted-foreground text-center py-8">
        No services added yet
      </p>
    </TabsContent>
  </Tabs>
</template>
