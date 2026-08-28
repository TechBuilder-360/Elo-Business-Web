<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBusiness } from "@/composables/useBusiness";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Wallet as WalletIcon
} from "lucide-vue-next";
import AccountDetails from "@/components/wallet/AccountDetails.vue";
import { toast } from "@/utils/alert";

definePageMeta({
  layout: false,
});

const route = useRoute();
const currencyCode = route.params.currency.toUpperCase();
const businessName = computed(() => route.query.name || "My Business");

const showBalance = ref(true);
const txFilter = ref("all");
const isGeneratingAccount = ref(false);

const {
  getBusinessWalletQuery,
  getCurrenciesQuery,
  getNubanAccountsQuery,
  generateNubanAccount,
  getStablecoinsQuery,
  generateStablecoin,
} = useBusiness();
const { isDark, toggleTheme } = useTheme();

// Fetch Wallet
const { data: walletData, isPending: isWalletPending, isError } = getBusinessWalletQuery(currencyCode);

// Fetch Currencies to get symbol
const { data: fiatCurrencies } = getCurrenciesQuery(true);
const { data: cryptoCurrencies } = getCurrenciesQuery(false);

// Fetch Real NUBAN Accounts & Stablecoins from Backend
const { data: nubanData } = getNubanAccountsQuery();
const { data: stablecoinsData } = getStablecoinsQuery();

const currencyMap = computed(() => {
  const fiat = fiatCurrencies.value?.currencies || [];
  const crypto = cryptoCurrencies.value?.currencies || [];
  const map = {};
  fiat.forEach(c => map[c.code] = c);
  crypto.forEach(c => map[c.code] = c);
  return map;
});

const selectedWallet = computed(() => {
  const w = walletData.value?.business_wallet;
  if (!w) return null;
  const curr = currencyMap.value[w.currency] || {};
  const symbol = curr.symbol || w.currency;

  // Fiat mock bank accounts fallback map
  const fiatMockMap = {
    NGN: [
      { id: "ngn-1", bankName: "GTBank", accountName: "Elo Business Ltd", accountNumber: "0123456789", sortCode: "058", isPrimary: true },
    ],
    USD: [
      { id: "usd-1", bankName: "Mercury", accountName: "Elo Business Inc", accountNumber: "1928374650", routingNumber: "084009519", isPrimary: true },
    ],
  };

  // Crypto mock addresses fallback map
  const cryptoMockMap = {
    USDT: { id: "usdt-1", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", network: "ERC-20", isPrimary: true },
    USDC: { id: "usdc-1", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", network: "ERC-20", isPrimary: true },
  };

  const isFiat = w.is_fiat;
  const realNubans = nubanData.value?.business_nuban_accounts || [];
  const realCoins = stablecoinsData.value?.business_stablecoins || [];

  let accounts = [];
  if (isFiat) {
    const matched = realNubans.filter(a => !a.currency || a.currency.toUpperCase() === w.currency.toUpperCase());
    accounts = matched.length > 0 ? matched : (realNubans.length > 0 ? realNubans : (fiatMockMap[w.currency] || []));
  } else {
    const matched = realCoins.filter(s => s.wallet_id === w.id || (s.coin && s.coin.toUpperCase() === w.currency.toUpperCase()));
    accounts = matched.length > 0 ? matched : (realCoins.length > 0 ? realCoins : (cryptoMockMap[w.currency] ? [cryptoMockMap[w.currency]] : []));
  }

  return {
    ...w,
    symbol,
    isFiat,
    balance: w.available_balance || 0,
    totalRevenue: w.ledger_balance || 0,
    totalSpent: 0,
    pendingAmount: w.holding_balance || 0,
    accounts,
    transactions: [],
  };
});

const handleGenerateAccount = async () => {
  if (!selectedWallet.value) return;
  isGeneratingAccount.value = true;
  try {
    if (selectedWallet.value.isFiat) {
      await generateNubanAccount.mutateAsync("TREASURY");
      toast.success("Static NUBAN bank account generated successfully!");
    } else {
      await generateStablecoin.mutateAsync({
        wallet_id: selectedWallet.value.id,
        network: selectedWallet.value.currency === "USDT" ? "TRC20" : "ERC20",
      });
      toast.success("Stablecoin deposit address generated successfully!");
    }
  } catch (err) {
    console.error("Account generation error:", err);
    toast.error(err.message || "Failed to generate account details.");
  } finally {
    isGeneratingAccount.value = false;
  }
};

const formatAmount = (amount, symbol) => {
  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const statusColor = (status) => {
  switch (status) {
    case "completed": return "bg-emerald-500/10 text-emerald-700 border-emerald-200";
    case "pending": return "bg-amber-500/10 text-amber-700 border-amber-200";
    case "failed": return "bg-red-500/10 text-red-700 border-red-200";
    default: return "";
  }
};

const filteredTransactions = computed(() => {
  if (!selectedWallet.value || !selectedWallet.value.transactions) return [];
  if (txFilter.value === "all") return selectedWallet.value.transactions;
  return selectedWallet.value.transactions.filter((t) => t.type === txFilter.value);
});

const handleBack = () => {
  navigateTo({
    path: "/wallet",
    query: { name: businessName.value },
  });
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b bg-card sticky top-0 z-10">
      <div class="container max-w-8xl mx-auto flex items-center justify-between py-3 px-4">
        <div class="flex items-center gap-3">
          <Button variant="ghost" size="icon" class="h-9 w-9 text-foreground" @click="handleBack">
            <ArrowLeft class="w-4 h-4" />
          </Button>
          <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <WalletIcon class="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-lg font-bold leading-tight">{{ currencyCode }} Wallet</h1>
            <p class="text-xs text-muted-foreground">{{ businessName }}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" class="h-8 w-8 text-foreground shrink-0" @click="toggleTheme">
          <Moon v-if="isDark" class="w-4 h-4" />
          <Sun v-else class="w-4 h-4" />
        </Button>
      </div>
    </header>

    <main class="container max-w-8xl mx-auto py-6 px-4">
      <!-- Loading Skeleton -->
      <div v-if="isWalletPending" class="space-y-6 animate-pulse">
        <button class="flex items-center gap-1.5 text-sm text-muted-foreground opacity-50" disabled>
          <span>← All Wallets</span>
        </button>
        <div class="rounded-xl border-0 bg-card shadow-md shadow-foreground/5 overflow-hidden">
          <div class="bg-primary/5 p-6 pb-8">
            <div class="flex items-center justify-between mb-4">
              <div class="h-4 w-24 rounded bg-muted" />
              <div class="h-8 w-8 rounded-md bg-muted" />
            </div>
            <div class="h-10 w-48 rounded bg-muted mt-2" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="i in 3" :key="i" class="h-20 w-full rounded-xl bg-muted" />
        </div>
        <div class="h-40 w-full rounded-xl bg-muted" />
        <div class="h-64 w-full rounded-xl bg-muted" />
      </div>

      <!-- Error State -->
      <div v-else-if="isError || (!selectedWallet && !isWalletPending)" class="flex flex-col items-center justify-center py-20">
        <WalletIcon class="w-12 h-12 text-muted-foreground mb-4" />
        <p class="text-lg font-semibold text-foreground">Wallet not found</p>
        <p class="text-sm text-muted-foreground mb-6">Could not load details for {{ currencyCode }}</p>
        <Button @click="handleBack">Go Back</Button>
      </div>

      <!-- Wallet Content -->
      <div v-else class="space-y-6 animate-in fade-in duration-300">
        <Button
          variant="ghost"
          size="sm"
          class="gap-1.5 -ml-2 text-muted-foreground"
          @click="handleBack"
        >
          <ArrowLeft class="w-4 h-4" /> All Wallets
        </Button>

        <!-- Balance hero -->
        <Card class="border-0 shadow-md shadow-foreground/5 overflow-hidden bg-card">
          <div class="bg-primary/5 p-6 pb-8">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm font-medium text-muted-foreground">
                {{ selectedWallet.currency }} Balance
              </p>
              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 text-foreground"
                @click="showBalance = !showBalance"
              >
                <EyeOff v-if="showBalance" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </Button>
            </div>
            <p class="text-3xl font-bold tracking-tight text-foreground">
              {{
                showBalance
                  ? formatAmount(selectedWallet.balance, selectedWallet.symbol)
                  : `${selectedWallet.symbol}••••••`
              }}
            </p>
          </div>
        </Card>

        <!-- Stats row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardContent class="p-4 flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <ArrowDownLeft class="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Total Revenue</p>
                <p class="text-lg font-bold tabular-nums text-foreground">
                  {{ formatAmount(selectedWallet.totalRevenue, selectedWallet.symbol) }}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardContent class="p-4 flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                <ArrowUpRight class="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Total Spent</p>
                <p class="text-lg font-bold tabular-nums text-foreground">
                  {{ formatAmount(selectedWallet.totalSpent, selectedWallet.symbol) }}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardContent class="p-4 flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <TrendingUp class="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Pending</p>
                <p class="text-lg font-bold tabular-nums text-foreground">
                  {{ formatAmount(selectedWallet.pendingAmount, selectedWallet.symbol) }}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Account Details -->
        <AccountDetails
          :accounts="selectedWallet.accounts"
          :is-fiat="selectedWallet.isFiat"
          :is-generating="isGeneratingAccount"
          @add="handleGenerateAccount"
        />

        <!-- Transactions -->
        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-base text-foreground">Transactions</CardTitle>
            <Tabs :modelValue="txFilter" @update:modelValue="(val) => (txFilter = val)">
              <TabsList class="h-8">
                <TabsTrigger value="all" class="text-xs px-2.5 h-6">All</TabsTrigger>
                <TabsTrigger value="credit" class="text-xs px-2.5 h-6">Credits</TabsTrigger>
                <TabsTrigger value="debit" class="text-xs px-2.5 h-6">Debits</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent class="px-0 pb-2">
            <Table v-if="filteredTransactions.length > 0">
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead class="hidden sm:table-cell">Reference</TableHead>
                  <TableHead class="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead class="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="tx in filteredTransactions" :key="tx.id">
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <div :class="['w-7 h-7 rounded-full flex items-center justify-center shrink-0', tx.type === 'credit' ? 'bg-emerald-500/10' : 'bg-red-500/10']">
                        <ArrowDownLeft v-if="tx.type === 'credit'" class="w-3.5 h-3.5 text-emerald-600" />
                        <ArrowUpRight v-else class="w-3.5 h-3.5 text-red-600" />
                      </div>
                      <span class="text-sm text-foreground">{{ tx.description }}</span>
                    </div>
                  </TableCell>
                  <TableCell class="hidden sm:table-cell text-xs text-muted-foreground font-mono">
                    {{ tx.reference }}
                  </TableCell>
                  <TableCell class="hidden sm:table-cell text-xs text-muted-foreground">
                    {{ new Date(tx.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) }}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" :class="['text-[10px] capitalize font-medium', statusColor(tx.status)]">
                      {{ tx.status }}
                    </Badge>
                  </TableCell>
                  <TableCell :class="['text-right font-medium tabular-nums text-sm', tx.type === 'credit' ? 'text-emerald-700' : 'text-foreground']">
                    {{ tx.type === "credit" ? "+" : "−" }}{{ formatAmount(tx.amount, selectedWallet.symbol) }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div v-else class="p-8 text-center text-muted-foreground text-sm">
              No transactions found
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
