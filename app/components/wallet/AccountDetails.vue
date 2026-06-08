<script setup>
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, Copy, Check } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

defineProps({
  accounts: {
    type: Array,
    required: true,
  },
});

const copiedId = ref(null);

const handleCopy = (text, id) => {
  navigator.clipboard.writeText(text);
  copiedId.value = id;
  setTimeout(() => {
    if (copiedId.value === id) {
      copiedId.value = null;
    }
  }, 1500);
};
</script>

<template>
  <Card v-if="accounts.length > 0" class="border-0 shadow-md shadow-foreground/5">
    <CardHeader class="pb-3">
      <CardTitle class="text-base flex items-center gap-2">
        <Landmark class="w-4 h-4" />
        Account Details
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-3">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="rounded-lg border border-border/60 p-4 space-y-3"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Landmark class="w-4 h-4 text-primary" />
            </div>
            <span class="text-sm font-semibold text-foreground">
              {{ account.bankName }}
            </span>
          </div>
          <Badge v-if="account.isPrimary" variant="secondary" class="text-[10px] text-foreground">
            Primary
          </Badge>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Account Name -->
          <div class="flex items-center justify-between gap-2">
            <div>
              <p class="text-[11px] text-muted-foreground">Account Name</p>
              <p class="text-sm font-medium font-mono tabular-nums text-foreground">
                {{ account.accountName }}
              </p>
            </div>
          </div>

          <!-- Account Number -->
          <div class="flex items-center justify-between gap-2">
            <div>
              <p class="text-[11px] text-muted-foreground">Account Number</p>
              <p class="text-sm font-medium font-mono tabular-nums text-foreground">
                {{ account.accountNumber }}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="h-6 w-6 shrink-0 text-foreground"
              @click="handleCopy(account.accountNumber, account.id + '-num')"
            >
              <Check v-if="copiedId === account.id + '-num'" class="w-3 h-3 text-emerald-600" />
              <Copy v-else class="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>

          <!-- Routing Number -->
          <div v-if="account.routingNumber" class="flex items-center justify-between gap-2">
            <div>
              <p class="text-[11px] text-muted-foreground">Routing Number</p>
              <p class="text-sm font-medium font-mono tabular-nums text-foreground">
                {{ account.routingNumber }}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="h-6 w-6 shrink-0 text-foreground"
              @click="handleCopy(account.routingNumber, account.id + '-route')"
            >
              <Check v-if="copiedId === account.id + '-route'" class="w-3 h-3 text-emerald-600" />
              <Copy v-else class="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>

          <!-- Sort Code -->
          <div v-if="account.sortCode" class="flex items-center justify-between gap-2">
            <div>
              <p class="text-[11px] text-muted-foreground">Sort Code</p>
              <p class="text-sm font-medium font-mono tabular-nums text-foreground">
                {{ account.sortCode }}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="h-6 w-6 shrink-0 text-foreground"
              @click="handleCopy(account.sortCode, account.id + '-sort')"
            >
              <Check v-if="copiedId === account.id + '-sort'" class="w-3 h-3 text-emerald-600" />
              <Copy v-else class="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
