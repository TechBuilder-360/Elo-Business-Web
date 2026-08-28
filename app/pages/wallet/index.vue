<script setup>
import { ref, computed } from "vue";
import { useBusiness } from "@/composables/useBusiness";
import { useQueryClient } from "@tanstack/vue-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-vue-next";
import AccountDetails from "@/components/wallet/AccountDetails.vue";
import { toast } from "@/utils/alert";

definePageMeta({
  layout: false,
});

const route = useRoute();
const businessName = computed(() => route.query.name || "My Business");

const activeTab = ref("fiat");
const navigatingTo = ref(null);

const {
  getWalletsQuery,
  getCurrenciesQuery,
  addWallet,
  getNubanAccountsQuery,
  generateNubanAccount,
  getStablecoinsQuery,
  generateStablecoin,
} = useBusiness();
const { isDark, toggleTheme } = useTheme();
const qc = useQueryClient();

// Fetch fiat and crypto wallets separately — backend requires the filter argument
const {
  data: fiatWalletsData,
  isPending: isFiatWalletsPending,
} = getWalletsQuery(true);
const {
  data: cryptoWalletsData,
  isPending: isCryptoWalletsPending,
} = getWalletsQuery(false);
const { data: fiatCurrencies } = getCurrenciesQuery(true);
const { data: cryptoCurrencies } = getCurrenciesQuery(false);

const currenciesData = computed(() => {
  const fiat = fiatCurrencies.value?.currencies || [];
  const crypto = cryptoCurrencies.value?.currencies || [];
  return { currencies: [...fiat, ...crypto] };
});

const isWalletsPending = computed(() => isFiatWalletsPending.value || isCryptoWalletsPending.value);

const allFetchedWallets = computed(() => [
  ...(fiatWalletsData.value?.business_wallets || []),
  ...(cryptoWalletsData.value?.business_wallets || []),
]);

// Add Wallet modal state
const showAddWalletModal = ref(false);
const selectedCurrencyCode = ref("");
const isAddingWallet = ref(false);

// Network Selection Modal state for stablecoins
const showNetworkModal = ref(false);
const selectedNetwork = ref("TRC20");
const availableNetworks = [
  { label: "TRON (TRC20)", value: "TRC20" },
  { label: "TRON (TRC-20)", value: "TRC-20" },
  { label: "TRON Network", value: "TRON" },
  { label: "ETHEREUM (ERC20)", value: "ERC20" },
  { label: "ETHEREUM (ERC-20)", value: "ERC-20" },
  { label: "ETHEREUM Network", value: "ETHEREUM" },
  { label: "POLYGON Network", value: "POLYGON" },
  { label: "SOLANA Network", value: "SOLANA" },
  { label: "BINANCE (BEP20)", value: "BEP20" },
];

// Fetch Static NUBAN Accounts & Stablecoins
const { data: nubanData } = getNubanAccountsQuery();
const { data: stablecoinsData } = getStablecoinsQuery();

const nubanAccounts = computed(() => nubanData.value?.business_nuban_accounts || []);
const stablecoins = computed(() => stablecoinsData.value?.business_stablecoins || []);

const isGeneratingAccount = ref(false);

const handleGenerateAccount = async () => {
  if (activeTab.value === "crypto") {
    showNetworkModal.value = true;
    return;
  }
  isGeneratingAccount.value = true;
  try {
    await generateNubanAccount.mutateAsync("TREASURY");
    toast.success("Static NUBAN bank account generated successfully!");
  } catch (err) {
    console.error("Generate account error:", err);
    const msg = err?.message || "Failed to generate account details.";
    if (msg.includes("not implemented")) {
      toast.error("Static NUBAN generation feature is currently being finalized on the backend server.");
    } else {
      toast.error(msg);
    }
  } finally {
    isGeneratingAccount.value = false;
  }
};

const submitGenerateStablecoin = async () => {
  showNetworkModal.value = false;
  isGeneratingAccount.value = true;
  try {
    const firstCrypto = allFetchedWallets.value.find((w) => !w.is_fiat);
    if (!firstCrypto) {
      toast.error("No active crypto wallet found. Please create a crypto wallet first.");
      return;
    }
    await generateStablecoin.mutateAsync({
      wallet_id: firstCrypto.id,
      network: selectedNetwork.value,
    });
    toast.success(`Stablecoin deposit address (${selectedNetwork.value}) generated successfully!`);
  } catch (err) {
    console.error("Generate stablecoin error:", err);
    const msg = err?.message || "Failed to generate stablecoin address.";
    if (msg.includes("network not found")) {
      toast.error(`Network '${selectedNetwork.value}' is not supported by the backend. Please select another network.`);
    } else {
      toast.error(msg);
    }
  } finally {
    isGeneratingAccount.value = false;
  }
};

const groupedCurrencies = computed(() => ({
  fiat: fiatCurrencies.value?.currencies || [],
  crypto: cryptoCurrencies.value?.currencies || [],
}));

const activeCurrencies = computed(() =>
  activeTab.value === "fiat" ? groupedCurrencies.value.fiat : groupedCurrencies.value.crypto
);

const handleAddWallet = async () => {
  if (!selectedCurrencyCode.value) return;
  isAddingWallet.value = true;
  const allCurr = currenciesData.value?.currencies || [];
  const curr = allCurr.find((c) => c.code === selectedCurrencyCode.value) || {};
  // Optimistically update both fiat and crypto cache keys
  qc.setQueryData(["wallets", true], (old) => ({
    business_wallets: [
      ...(old?.business_wallets || []),
      {
        id: `optimistic-${Date.now()}`,
        currency: selectedCurrencyCode.value,
        available_balance: 0,
        ledger_balance: 0,
        holding_balance: 0,
        is_fiat: curr.is_fiat !== undefined ? curr.is_fiat : true,
        active: true,
      },
    ],
  }));
  qc.setQueryData(["wallets", false], (old) => ({
    business_wallets: [
      ...(old?.business_wallets || []),
      {
        id: `optimistic-${Date.now()}`,
        currency: selectedCurrencyCode.value,
        available_balance: 0,
        ledger_balance: 0,
        holding_balance: 0,
        is_fiat: curr.is_fiat !== undefined ? curr.is_fiat : true,
        active: true,
      },
    ],
  }));
  showAddWalletModal.value = false;
  try {
    await addWallet.mutateAsync({
      currency_code: selectedCurrencyCode.value,
      wallet_type: "TREASURY",
    });
    qc.invalidateQueries({ queryKey: ["wallets", "TREASURY"] });
    selectedCurrencyCode.value = "";
  } catch (err) {
    qc.invalidateQueries({ queryKey: ["wallets", "TREASURY"] });
    console.error("Add wallet failed:", err);
  } finally {
    isAddingWallet.value = false;
  }
};

const wallets = computed(() => {
  const fetchedWallets = allFetchedWallets.value;
  if (!fetchedWallets.length) return [];
  const currList = currenciesData.value?.currencies || [];
  return fetchedWallets.map((w) => {
    const curr = currList.find((c) => c.code === w.currency) || {};
    const symbol = curr.symbol || w.currency;
    const is_fiat = w.is_fiat !== undefined ? w.is_fiat : false;
    return {
      id: w.id,
      currency: w.currency,
      symbol,
      is_fiat,
      balance: w.available_balance || 0,
      ledgerBalance: w.ledger_balance || 0,
      holdingBalance: w.holding_balance || 0,
    };
  });
});

const filteredWallets = computed(() =>
  activeTab.value === "fiat"
    ? wallets.value.filter((w) => w.is_fiat)
    : wallets.value.filter((w) => !w.is_fiat)
);

const formatAmount = (amount, symbol) => {
  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const handleBackToDashboard = () => {
  navigateTo({ path: "/dashboard", query: { name: businessName.value } });
};

const handleWalletClick = async (w) => {
  navigatingTo.value = w.currency;
  await navigateTo({ path: `/wallet/${w.currency}`, query: { name: businessName.value } });
  navigatingTo.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b bg-card sticky top-0 z-10">
      <div class="container max-w-8xl mx-auto flex items-center justify-between py-3 px-4">
        <div class="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            class="h-9 w-9 text-foreground"
            @click="handleBackToDashboard"
          >
            <ArrowLeft class="w-4 h-4" />
          </Button>
          <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <WalletIcon class="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-lg font-bold leading-tight">Wallet</h1>
            <p class="text-xs text-muted-foreground">{{ businessName }}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-foreground shrink-0"
          @click="toggleTheme"
        >
          <Moon v-if="isDark" class="w-4 h-4" />
          <Sun v-else class="w-4 h-4" />
        </Button>
      </div>
    </header>

    <main class="container max-w-8xl mx-auto py-6 px-4">
      <!-- Loading skeleton while wallet query is pending -->
      <div v-if="isWalletsPending" class="space-y-6">
        <div class="flex gap-2 mb-4">
          <div class="h-9 w-28 rounded-md bg-muted animate-pulse" />
          <div class="h-9 w-32 rounded-md bg-muted animate-pulse" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="i in 4"
            :key="i"
            class="rounded-xl border-0 bg-card shadow-md shadow-foreground/5 p-5 animate-pulse"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="h-5 w-16 rounded bg-muted" />
              <div class="h-4 w-4 rounded bg-muted" />
            </div>
            <div class="h-3 w-24 rounded bg-muted mb-2" />
            <div class="h-8 w-40 rounded bg-muted mb-4" />
            <div class="flex gap-4 pt-3 border-t border-border/50">
              <div class="h-3 w-20 rounded bg-muted" />
              <div class="h-3 w-20 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>

      <!-- Wallet list -->
      <div v-else class="space-y-6 animate-in fade-in duration-300">
        <Tabs :modelValue="activeTab" @update:modelValue="(val) => (activeTab = val)" class="w-full">
          <TabsList class="mb-4">
            <TabsTrigger value="fiat">Fiat Wallets</TabsTrigger>
            <TabsTrigger value="crypto">Crypto Wallets</TabsTrigger>
          </TabsList>
        </Tabs>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Empty state if no wallets after loading -->
          <div
            v-if="filteredWallets.length === 0"
            class="col-span-2 flex flex-col items-center justify-center py-20 text-muted-foreground"
          >
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <WalletIcon class="w-8 h-8 text-primary" />
            </div>
            <p class="text-base font-semibold text-foreground mb-1">No wallets yet</p>
            <p class="text-sm mb-5">Create your first Treasury wallet to start transacting.</p>
            <Button @click="showAddWalletModal = true" class="gap-2">
              <span class="text-lg leading-none">+</span> Add {{ activeTab === 'fiat' ? 'Fiat' : 'Crypto' }} Wallet
            </Button>
          </div>

          <!-- Wallet cards -->
          <Card
            v-for="w in filteredWallets"
            :key="w.currency"
            :class="[
              'relative border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] bg-card overflow-hidden',
              navigatingTo === w.currency ? 'pointer-events-none' : ''
            ]"
            @click="handleWalletClick(w)"
          >
            <!-- Loading overlay when navigating -->
            <div
              v-if="navigatingTo === w.currency"
              class="absolute inset-0 z-10 bg-card/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div class="flex items-center gap-2 text-sm text-primary font-medium">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Opening...
              </div>
            </div>
            <CardContent class="p-5">
              <div class="flex items-center justify-between mb-4">
                <Badge variant="secondary" class="text-xs font-semibold text-foreground">
                  {{ w.currency }}
                </Badge>
                <ChevronRight class="w-4 h-4 text-muted-foreground" />
              </div>
              <p class="text-xs text-muted-foreground mb-1">Available Balance</p>
              <p class="text-2xl font-bold tracking-tight tabular-nums text-foreground">
                {{ formatAmount(w.balance, w.symbol) }}
              </p>
              <div class="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
                <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowDownLeft class="w-3 h-3 text-emerald-600" />
                  <span>{{ formatAmount(w.ledgerBalance, w.symbol) }}</span>
                </div>
                <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowUpRight class="w-3 h-3 text-red-600" />
                  <span>{{ formatAmount(w.holdingBalance, w.symbol) }}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Add Wallet button shown when wallets exist -->
        <div v-if="filteredWallets.length > 0" class="flex justify-end">
          <Button variant="outline" class="gap-2" @click="showAddWalletModal = true">
            <span class="text-lg leading-none">+</span> Add {{ activeTab === 'fiat' ? 'Fiat' : 'Crypto' }} Wallet
          </Button>
        </div>

        <!-- Static NUBAN Accounts / Deposit Addresses Section -->
        <div class="pt-4">
          <AccountDetails
            :accounts="activeTab === 'fiat' ? nubanAccounts : stablecoins"
            :is-fiat="activeTab === 'fiat'"
            :is-generating="isGeneratingAccount"
            @add="handleGenerateAccount"
          />
        </div>
      </div>
    </main>

    <!-- Add Wallet Modal -->
    <Teleport to="body">
      <div
        v-if="showAddWalletModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        @click.self="showAddWalletModal = false"
      >
        <Card class="w-full max-w-sm border-0 shadow-2xl bg-card">
          <CardContent class="p-6 space-y-4">
            <div>
              <h2 class="text-base font-semibold text-foreground">
                Add {{ activeTab === 'fiat' ? 'Fiat' : 'Crypto' }} Wallet
              </h2>
              <p class="text-xs text-muted-foreground mt-1">Select a currency to create your wallet</p>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Currency</label>
              <select
                v-model="selectedCurrencyCode"
                class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>Select currency...</option>
                <option v-for="c in activeCurrencies" :key="c.code" :value="c.code">
                  {{ c.symbol }} {{ c.name }} ({{ c.code }})
                </option>
              </select>
            </div>
            <div class="flex gap-3 pt-2">
              <Button variant="outline" class="flex-1" @click="showAddWalletModal = false">
                Cancel
              </Button>
              <Button
                class="flex-1"
                :disabled="!selectedCurrencyCode || isAddingWallet"
                @click="handleAddWallet"
              >
                <span v-if="isAddingWallet">Creating...</span>
                <span v-else>Create Wallet</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Teleport>

    <!-- Select Network Modal for Stablecoin Address Generation -->
    <Teleport to="body">
      <div
        v-if="showNetworkModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        @click.self="showNetworkModal = false"
      >
        <Card class="w-full max-w-sm border-0 shadow-2xl bg-card">
          <CardContent class="p-6 space-y-4">
            <div>
              <h2 class="text-base font-semibold text-foreground">
                Select Network
              </h2>
              <p class="text-xs text-muted-foreground mt-1">Choose the blockchain network to generate deposit address</p>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Network</label>
              <select
                v-model="selectedNetwork"
                class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option v-for="net in availableNetworks" :key="net.value" :value="net.value">
                  {{ net.label }}
                </option>
              </select>
            </div>
            <div class="flex gap-3 pt-2">
              <Button variant="outline" class="flex-1" @click="showNetworkModal = false">
                Cancel
              </Button>
              <Button
                class="flex-1"
                :disabled="isGeneratingAccount"
                @click="submitGenerateStablecoin"
              >
                Generate Address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Teleport>
  </div>
</template>

