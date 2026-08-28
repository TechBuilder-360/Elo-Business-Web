<script setup>
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, Copy, Check, Wallet as WalletIcon, Loader2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

defineProps({
  accounts: {
    type: Array,
    default: () => [],
  },
  isFiat: {
    type: Boolean,
    default: true,
  },
  isGenerating: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["add"]);

const copiedId = ref(null);

const handleCopy = (text, id) => {
  if (!text) return;
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
  <Card class="border-0 shadow-md shadow-foreground/5">
    <CardHeader class="pb-3">
      <CardTitle class="text-base flex items-center gap-2">
        <Landmark v-if="isFiat" class="w-4 h-4 text-primary" />
        <WalletIcon v-else class="w-4 h-4 text-primary" />
        {{ isFiat ? 'Bank Account Details' : 'Wallet Deposit Address' }}
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-3">
      <!-- Account Cards -->
      <div
        v-for="(account, index) in accounts"
        :key="account.id || index"
        class="rounded-lg border border-border/60 p-4 space-y-3 bg-card/50"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Landmark v-if="isFiat" class="w-4 h-4 text-primary" />
              <WalletIcon v-else class="w-4 h-4 text-primary" />
            </div>
            <span class="text-sm font-semibold text-foreground">
              {{ isFiat ? (account.bank_name || account.bankName || 'Standard Bank') : ((account.network || account.coin || 'Crypto') + ' Network') }}
            </span>
          </div>
          <Badge v-if="account.isPrimary || index === 0" variant="secondary" class="text-[10px] text-foreground">
            Primary
          </Badge>
        </div>

        <div v-if="isFiat" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Account Name -->
          <div v-if="account.account_name || account.accountName" class="flex items-center justify-between gap-2">
            <div>
              <p class="text-[11px] text-muted-foreground">Account Name</p>
              <p class="text-sm font-medium font-mono tabular-nums text-foreground">
                {{ account.account_name || account.accountName }}
              </p>
            </div>
          </div>

          <!-- Account Number -->
          <div v-if="account.account_number || account.accountNumber" class="flex items-center justify-between gap-2">
            <div>
              <p class="text-[11px] text-muted-foreground">Account Number</p>
              <p class="text-sm font-medium font-mono tabular-nums text-foreground">
                {{ account.account_number || account.accountNumber }}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="h-6 w-6 shrink-0 text-foreground"
              @click="handleCopy(account.account_number || account.accountNumber, (account.id || index) + '-num')"
            >
              <Check v-if="copiedId === (account.id || index) + '-num'" class="w-3 h-3 text-emerald-600" />
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
              @click="handleCopy(account.routingNumber, (account.id || index) + '-route')"
            >
              <Check v-if="copiedId === (account.id || index) + '-route'" class="w-3 h-3 text-emerald-600" />
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
              @click="handleCopy(account.sortCode, (account.id || index) + '-sort')"
            >
              <Check v-if="copiedId === (account.id || index) + '-sort'" class="w-3 h-3 text-emerald-600" />
              <Copy v-else class="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 gap-3">
          <!-- Crypto Address -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex-1 overflow-hidden pr-4">
              <p class="text-[11px] text-muted-foreground">Wallet Address</p>
              <p class="text-sm font-medium font-mono text-foreground truncate">
                {{ account.address }}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="h-6 w-6 shrink-0 text-foreground"
              @click="handleCopy(account.address, (account.id || index) + '-addr')"
            >
              <Check v-if="copiedId === (account.id || index) + '-addr'" class="w-3 h-3 text-emerald-600" />
              <Copy v-else class="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!accounts || accounts.length === 0" class="text-center py-4 text-xs text-muted-foreground">
        No {{ isFiat ? 'bank account details' : 'wallet address' }} found. Click below to generate one.
      </div>
      
      <!-- Add Account Button -->
      <Button
        variant="outline"
        class="w-full border-dashed transition-all hover:bg-primary/5"
        :disabled="isGenerating"
        @click="$emit('add')"
      >
        <Loader2 v-if="isGenerating" class="w-4 h-4 animate-spin mr-2" />
        <span v-else class="text-lg leading-none mr-2">+</span>
        {{ isGenerating ? (isFiat ? 'Generating Account...' : 'Generating Address...') : (isFiat ? 'Generate Bank Account' : 'Generate Wallet Address') }}
      </Button>
    </CardContent>
  </Card>
</template>
