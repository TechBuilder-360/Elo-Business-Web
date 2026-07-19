<script setup>
import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  TrendingUp,
  Eye,
  Settings,
  Wallet,
} from "lucide-vue-next";
import {
  ChartContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "@/components/ui/chart";

definePageMeta({
  layout: false,
});

const route = useRoute();
const businessName = computed(() => route.query.name || "My Business");

const engagementPeriod = ref("month");

const engagementDataMonth = [
  { name: "Jan", visits: 120 },
  { name: "Feb", visits: 210 },
  { name: "Mar", visits: 340 },
  { name: "Apr", visits: 280 },
  { name: "May", visits: 390 },
  { name: "Jun", visits: 450 },
  { name: "Jul", visits: 520 },
  { name: "Aug", visits: 480 },
];

const engagementDataWeek = [
  { name: "Mon", visits: 45 },
  { name: "Tue", visits: 62 },
  { name: "Wed", visits: 58 },
  { name: "Thu", visits: 71 },
  { name: "Fri", visits: 80 },
  { name: "Sat", visits: 35 },
  { name: "Sun", visits: 28 },
];

const engagementDataDay = [
  { name: "6am", visits: 5 },
  { name: "9am", visits: 18 },
  { name: "12pm", visits: 32 },
  { name: "3pm", visits: 28 },
  { name: "6pm", visits: 22 },
  { name: "9pm", visits: 12 },
];

const revenueData = [
  { name: "Jan", revenue: 4200 },
  { name: "Feb", revenue: 5800 },
  { name: "Mar", revenue: 7200 },
  { name: "Apr", revenue: 6100 },
  { name: "May", revenue: 8400 },
  { name: "Jun", revenue: 9200 },
  { name: "Jul", revenue: 11000 },
  { name: "Aug", revenue: 10500 },
];

const customerData = [
  { name: "Jan", customers: 34 },
  { name: "Feb", customers: 52 },
  { name: "Mar", customers: 78 },
  { name: "Apr", customers: 95 },
  { name: "May", customers: 120 },
  { name: "Jun", customers: 148 },
  { name: "Jul", customers: 175 },
  { name: "Aug", customers: 203 },
];

const engagementConfig = {
  visits: { label: "Visits", color: "hsl(321 8% 49%)" },
};

const revenueConfig = {
  revenue: { label: "Revenue ($)", color: "hsl(321 12% 42%)" },
};

const customerConfig = {
  customers: { label: "Customers", color: "hsl(321 10% 55%)" },
};

const engagementData = computed(() => {
  if (engagementPeriod.value === "month") return engagementDataMonth;
  if (engagementPeriod.value === "week") return engagementDataWeek;
  return engagementDataDay;
});

const totalVisits = computed(() => {
  return engagementData.value.reduce((s, d) => s + d.visits, 0);
});

const latestRevenue = computed(() => {
  return revenueData[revenueData.length - 1].revenue;
});

const totalCustomers = computed(() => {
  return customerData[customerData.length - 1].customers;
});

const handleWalletNavigation = () => {
  navigateTo({
    path: "/wallet",
    query: { name: businessName.value },
  });
};

const handleSettingsNavigation = () => {
  navigateTo({
    path: "/settings",
    query: { name: businessName.value },
  });
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Header -->
    <header class="border-b bg-card sticky top-0 z-10">
      <div
        class="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
          >
            <Building2 class="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-lg font-bold leading-tight">
              {{ businessName }}
            </h1>
            <p class="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Badge
            variant="outline"
            class="border-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] bg-[hsl(var(--warning)/0.1)] gap-1.5 py-1"
          >
            <span
              class="w-2 h-2 rounded-full bg-[hsl(var(--warning))] animate-pulse"
            />
            Pending Approval
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            class="h-9 w-9 text-foreground"
            @click="handleWalletNavigation"
          >
            <Wallet class="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="h-9 w-9 text-foreground"
            @click="handleSettingsNavigation"
          >
            <Settings class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>

    <main class="container max-w-6xl mx-auto py-6 px-4 space-y-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardContent class="p-4 flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"
            >
              <Eye class="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p class="text-xs text-muted-foreground font-medium">Total Visits</p>
              <p class="text-2xl font-bold text-foreground">
                {{ totalVisits.toLocaleString() }}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardContent class="p-4 flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"
            >
              <TrendingUp class="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p class="text-xs text-muted-foreground font-medium">Latest Revenue</p>
              <p class="text-2xl font-bold text-foreground">
                ${{ latestRevenue.toLocaleString() }}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardContent class="p-4 flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"
            >
              <Users class="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p class="text-xs text-muted-foreground font-medium">Total Customers</p>
              <p class="text-2xl font-bold text-foreground">{{ totalCustomers }}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Engagement Chart -->
      <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
        <CardHeader
          class="flex flex-row items-center justify-between pb-2"
        >
          <CardTitle class="text-base text-foreground">Business Engagements</CardTitle>
          <Tabs
            :modelValue="engagementPeriod"
            @update:modelValue="(val) => (engagementPeriod = val)"
          >
            <TabsList class="h-8">
              <TabsTrigger value="day" class="text-xs px-2.5 h-6">
                Day
              </TabsTrigger>
              <TabsTrigger value="week" class="text-xs px-2.5 h-6">
                Week
              </TabsTrigger>
              <TabsTrigger value="month" class="text-xs px-2.5 h-6">
                Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ChartContainer
            :config="engagementConfig"
            class="h-[260px] w-full"
          >
            <BarChart :data="engagementData">
              <CartesianGrid strokeDasharray="3 3" :vertical="false" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="visits"
                fill="var(--color-visits)"
                :radius="[6, 6, 0, 0]"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <!-- Revenue & Customer Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardHeader class="pb-2">
            <CardTitle class="text-base text-foreground">Business Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer :config="revenueConfig" class="h-[220px] w-full">
              <LineChart :data="revenueData">
                <CartesianGrid strokeDasharray="3 3" :vertical="false" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  :strokeWidth="2.5"
                  :dot="{ r: 4 }"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardHeader class="pb-2">
            <CardTitle class="text-base text-foreground">Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer :config="customerConfig" class="h-[220px] w-full">
              <AreaChart :data="customerData">
                <CartesianGrid strokeDasharray="3 3" :vertical="false" />
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="customers"
                  stroke="var(--color-customers)"
                  fill="url(#customerGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
