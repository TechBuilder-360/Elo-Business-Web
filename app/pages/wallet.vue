<script setup>
import { ref, computed } from "vue";
import { useBusiness } from "@/composables/useBusiness";
import { useQueryClient } from "@tanstack/vue-query";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building2,
  ArrowLeft,
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  ChevronRight,
  Eye,
  EyeOff,
  Moon,
  Sun,
} from "lucide-vue-next";
import AccountDetails from "@/components/wallet/AccountDetails.vue";

definePageMeta({
  layout: false,
});

const route = useRoute();
const businessName = computed(() => route.query.name || "My Business");

const selectedWallet = ref(null);
const showBalance = ref(true);
const txFilter = ref("all");
const activeTab = ref("fiat");

const { getWalletsQuery, getCurrenciesQuery, addWallet } = useBusiness();
const qc = useQueryClient();
const {
  data: walletsData,
  isPending: isWalletsPending,
  isError: isWalletsError,
  error: walletsError,
} = getWalletsQuery("TREASURY");
const { data: currenciesData } = getCurrenciesQuery();

// Add Wallet modal state
const showAddWalletModal = ref(false);
const selectedCurrencyCode = ref("");
const isAddingWallet = ref(false);

const fiatCurrencies = computed(
  () => currenciesData.value?.currencies?.filter((c) => c.is_fiat) || [],
);

const handleAddWallet = async () => {
  if (!selectedCurrencyCode.value) return;
  isAddingWallet.value = true;
  // Optimistic update — add a placeholder wallet immediately
  const curr =
    fiatCurrencies.value.find((c) => c.code === selectedCurrencyCode.value) ||
    {};
  const optimisticWallet = {
    id: `optimistic-${Date.now()}`,
    currency: selectedCurrencyCode.value,
    symbol: curr.symbol || selectedCurrencyCode.value,
    balance: 0,
    totalRevenue: 0,
    totalSpent: 0,
    pendingAmount: 0,
    transactions: [],
    accounts: [],
  };
  qc.setQueryData(["wallets", "TREASURY"], (old) => ({
    wallets: [
      ...(old?.wallets || []),
      {
        id: optimisticWallet.id,
        currency: optimisticWallet.currency,
        available_balance: 0,
        ledger_balance: 0,
        holding_balance: 0,
        type: "TREASURY",
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
    // Refetch real data to replace the optimistic entry
    qc.invalidateQueries({ queryKey: ["wallets", "TREASURY"] });
    selectedCurrencyCode.value = "";
  } catch (err) {
    // Roll back optimistic update on failure
    qc.invalidateQueries({ queryKey: ["wallets", "TREASURY"] });
    console.error("Add wallet failed:", err);
  } finally {
    isAddingWallet.value = false;
  }
};

const wallets = computed(() => {
  const fetchedWallets = walletsData.value?.wallets;
  if (!fetchedWallets) return []; // still loading
  const currList = currenciesData.value?.currencies || [];

  return fetchedWallets.map((w) => {
    const curr = currList.find((c) => c.code === w.currency) || {};
    const symbol = curr.symbol || w.currency;
    return {
      id: w.id,
      currency: w.currency,
      symbol,
      balance: w.available_balance || 0,
      totalRevenue: w.ledger_balance || 0,
      totalSpent: 0,
      pendingAmount: w.holding_balance || 0,
      transactions: [], // will wire up once transaction query is available
      accounts: [],
    };
  });
});

const formatAmount = (amount, symbol) => {
  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const statusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-500/10 text-amber-700 border-amber-200";
    case "failed":
      return "bg-red-500/10 text-red-700 border-red-200";
    default:
      return "";
  }
};

const filteredTransactions = computed(() => {
  if (!selectedWallet.value) return [];
  if (txFilter.value === "all") return selectedWallet.value.transactions;
  return selectedWallet.value.transactions.filter(
    (t) => t.type === txFilter.value,
  );
});

const handleBackToDashboard = () => {
  navigateTo({
    path: "/dashboard",
    query: { name: businessName.value },
  });
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b bg-card sticky top-0 z-10">
      <div
        class="container max-w-8xl mx-auto flex items-center justify-between py-3 px-4"
      >
        <div class="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            class="h-9 w-9 text-foreground"
            @click="handleBackToDashboard"
          >
            <ArrowLeft class="w-4 h-4" />
          </Button>
          <div
            class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
          >
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
      <div v-if="selectedWallet" class="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          class="gap-1.5 -ml-2 text-muted-foreground"
          @click="selectedWallet = null"
        >
          <ArrowLeft class="w-4 h-4" /> All Wallets
        </Button>

        <!-- Balance hero -->
        <Card
          class="border-0 shadow-md shadow-foreground/5 overflow-hidden bg-card"
        >
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
              <div
                class="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0"
              >
                <ArrowDownLeft class="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Total Revenue</p>
                <p class="text-lg font-bold tabular-nums text-foreground">
                  {{
                    formatAmount(
                      selectedWallet.totalRevenue,
                      selectedWallet.symbol,
                    )
                  }}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardContent class="p-4 flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0"
              >
                <ArrowUpRight class="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Total Spent</p>
                <p class="text-lg font-bold tabular-nums text-foreground">
                  {{
                    formatAmount(
                      selectedWallet.totalSpent,
                      selectedWallet.symbol,
                    )
                  }}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardContent class="p-4 flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"
              >
                <TrendingUp class="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p class="text-xs text-muted-foreground">Pending</p>
                <p class="text-lg font-bold tabular-nums text-foreground">
                  {{
                    formatAmount(
                      selectedWallet.pendingAmount,
                      selectedWallet.symbol,
                    )
                  }}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Account Details -->
        <AccountDetails
          :accounts="selectedWallet.accounts"
          :isFiat="selectedWallet.is_fiat"
        />

        <!-- Transactions -->
        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-base text-foreground"
              >Transactions</CardTitle
            >
            <Tabs
              :modelValue="txFilter"
              @update:modelValue="(val) => (txFilter = val)"
            >
              <TabsList class="h-8">
                <TabsTrigger value="all" class="text-xs px-2.5 h-6">
                  All
                </TabsTrigger>
                <TabsTrigger value="credit" class="text-xs px-2.5 h-6">
                  Credits
                </TabsTrigger>
                <TabsTrigger value="debit" class="text-xs px-2.5 h-6">
                  Debits
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent class="px-0 pb-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead class="hidden sm:table-cell">
                    Reference
                  </TableHead>
                  <TableHead class="hidden sm:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead class="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="tx in filteredTransactions" :key="tx.id">
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <div
                        :class="[
                          'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
                          tx.type === 'credit'
                            ? 'bg-emerald-500/10'
                            : 'bg-red-500/10',
                        ]"
                      >
                        <ArrowDownLeft
                          v-if="tx.type === 'credit'"
                          class="w-3.5 h-3.5 text-emerald-600"
                        />
                        <ArrowUpRight v-else class="w-3.5 h-3.5 text-red-600" />
                      </div>
                      <span class="text-sm text-foreground">{{
                        tx.description
                      }}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    class="hidden sm:table-cell text-xs text-muted-foreground font-mono"
                  >
                    {{ tx.reference }}
                  </TableCell>
                  <TableCell
                    class="hidden sm:table-cell text-xs text-muted-foreground"
                  >
                    {{
                      new Date(tx.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })
                    }}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      :class="[
                        'text-[10px] capitalize font-medium',
                        statusColor(tx.status),
                      ]"
                    >
                      {{ tx.status }}
                    </Badge>
                  </TableCell>
                  <TableCell
                    :class="[
                      'text-right font-medium tabular-nums text-sm',
                      tx.type === 'credit'
                        ? 'text-emerald-700'
                        : 'text-foreground',
                    ]"
                  >
                    {{ tx.type === "credit" ? "+" : "−"
                    }}{{ formatAmount(tx.amount, selectedWallet.symbol) }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <!-- Loading skeleton while wallet query is pending -->
      <div v-else-if="isWalletsPending" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="i in 2"
            :key="i"
            class="rounded-xl border-0 bg-card shadow-md shadow-foreground/5 p-5 animate-pulse"
          >
            <div class="h-5 w-16 bg-muted rounded mb-4"></div>
            <div class="h-3 w-24 bg-muted rounded mb-2"></div>
            <div class="h-8 w-40 bg-muted rounded mb-4"></div>
            <div class="flex gap-4 pt-3 border-t border-border/50">
              <div class="h-3 w-20 bg-muted rounded"></div>
              <div class="h-3 w-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="space-y-6 animate-in fade-in duration-300">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Empty state if no wallets after loading -->
          <div
            v-if="wallets.length === 0"
            class="col-span-2 flex flex-col items-center justify-center py-20 text-muted-foreground"
          >
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <WalletIcon class="w-8 h-8 text-primary" />
            </div>
            <p class="text-base font-semibold text-foreground mb-1">No wallets yet</p>
            <p class="text-sm mb-5">Create your first Treasury wallet to start transacting.</p>
            <Button @click="showAddWalletModal = true" class="gap-2">
              <span class="text-lg leading-none">+</span> Add Wallet
            </Button>
          </div>
          <Card
            v-for="w in filteredWallets"
            :key="w.currency"
            class="border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow active:scale-[0.98] transition-transform bg-card"
            @click="selectedWallet = w"
          >
            <CardContent class="p-5">
              <div class="flex items-center justify-between mb-4">
                <Badge
                  variant="secondary"
                  class="text-xs font-semibold text-foreground"
                >
                  {{ w.currency }}
                </Badge>
                <ChevronRight class="w-4 h-4 text-muted-foreground" />
              </div>
              <p class="text-xs text-muted-foreground mb-1">
                Available Balance
              </p>
              <p
                class="text-2xl font-bold tracking-tight tabular-nums text-foreground"
              >
                {{ formatAmount(w.balance, w.symbol) }}
              </p>
              <div
                class="flex items-center gap-4 mt-4 pt-3 border-t border-border/50"
              >
                <div
                  class="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <ArrowDownLeft class="w-3 h-3 text-emerald-600" />
                  <span>{{ formatAmount(w.totalRevenue, w.symbol) }}</span>
                </div>
                <div
                  class="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <ArrowUpRight class="w-3 h-3 text-red-600" />
                  <span>{{ formatAmount(w.totalSpent, w.symbol) }}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Add Wallet button shown when wallets exist -->
        <div v-if="wallets.length > 0" class="flex justify-end">
          <Button variant="outline" class="gap-2" @click="showAddWalletModal = true">
            <span class="text-lg leading-none">+</span> Add Wallet
          </Button>
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
          <CardHeader class="pb-3">
            <CardTitle class="text-base text-foreground">Add Treasury Wallet</CardTitle>
            <p class="text-xs text-muted-foreground mt-1">Select a currency to create your wallet</p>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Currency</label>
              <select
                v-model="selectedCurrencyCode"
                class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>Select currency...</option>
                <option
                  v-for="c in fiatCurrencies"
                  :key="c.code"
                  :value="c.code"
                >
                  {{ c.symbol }} {{ c.name }} ({{ c.code }})
                </option>
              </select>
            </div>
            <div class="flex gap-3 pt-2">
              <Button
                variant="outline"
                class="flex-1"
                @click="showAddWalletModal = false"
              >
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
  </div>
</template>
