<script setup>
import { computed } from "vue";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  Package,
  Wrench,
  MessageSquare,
  ArrowLeft,
} from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

definePageMeta({
  layout: false,
});

const business = {
  name: "Adeola's Kitchen",
  description:
    "Premium catering and food services. We deliver quality meals for events, offices, and private dining experiences across Lagos.",
  industry: "Food & Beverage",
  email: "hello@adeolaskitchen.com",
  phone: "+234 801 234 5678",
  website: "https://adeolaskitchen.com",
  address: "15 Admiralty Way, Lekki Phase 1",
  city: "Lagos",
  state: "Lagos",
  country: "Nigeria",
  logo: null,
  cover: null,
};

const products = [
  {
    id: "1",
    name: "Party Jollof Rice",
    description:
      "Our signature smoky party jollof rice, cooked with premium ingredients. Perfect for events of any size.",
    images: [],
  },
  {
    id: "2",
    name: "Grilled Chicken Platter",
    description:
      "Perfectly seasoned and grilled whole chicken served with sides.",
    images: [],
  },
  {
    id: "3",
    name: "Assorted Meat Pepper Soup",
    description:
      "Rich and spicy pepper soup with assorted cuts of premium meat.",
    images: [],
  },
];

const services = [
  {
    id: "1",
    name: "Event Catering",
    description:
      "Full-service catering for weddings, birthdays, corporate events and more.",
    images: [],
  },
  {
    id: "2",
    name: "Meal Prep Delivery",
    description:
      "Weekly meal prep packages delivered to your doorstep across Lagos.",
    images: [],
  },
];

const branches = [
  {
    id: "1",
    name: "Lekki Main",
    address: "15 Admiralty Way",
    city: "Lekki Phase 1",
    state: "Lagos",
    country: "Nigeria",
    phone: "+234 801 234 5678",
    isMain: true,
  },
  {
    id: "2",
    name: "Victoria Island",
    address: "22 Adeola Odeku Street",
    city: "Victoria Island",
    state: "Lagos",
    country: "Nigeria",
    phone: "+234 802 345 6789",
    isMain: false,
  },
];

const hours = [
  { day: "Monday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Tuesday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Wednesday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Thursday", open: "08:00", close: "20:00", isClosed: false },
  { day: "Friday", open: "08:00", close: "22:00", isClosed: false },
  { day: "Saturday", open: "09:00", close: "22:00", isClosed: false },
  { day: "Sunday", open: "00:00", close: "00:00", isClosed: true },
];

const reviews = [
  {
    id: "1",
    author: "Adebayo Ogunlesi",
    rating: 5,
    comment:
      "Excellent service and very professional team. Would highly recommend to anyone looking for quality.",
    date: "2026-03-18",
    helpful: 12,
  },
  {
    id: "2",
    author: "Fatima Ibrahim",
    rating: 4,
    comment:
      "Good experience overall. The delivery was a bit delayed but the product quality made up for it.",
    date: "2026-03-15",
    helpful: 5,
  },
  {
    id: "3",
    author: "Chinedu Okafor",
    rating: 5,
    comment:
      "Best in the business! I've been a loyal customer for over a year now.",
    date: "2026-03-10",
    helpful: 8,
  },
  {
    id: "4",
    author: "Amina Yusuf",
    rating: 3,
    comment: "Average experience. Customer support could be more responsive.",
    date: "2026-03-05",
    helpful: 2,
  },
  {
    id: "5",
    author: "Ngozi Eze",
    rating: 5,
    comment: "Absolutely wonderful! The attention to detail is impressive.",
    date: "2026-02-20",
    helpful: 15,
  },
];

const avgRating = computed(() => {
  return (
    reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
  ).toFixed(1);
});

const totalReviews = computed(() => reviews.length);

const isOpen = computed(() => {
  const now = new Date();
  const dayIndex = now.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = hours.find((h) => h.day === days[dayIndex]);
  if (!today || today.isClosed) return false;
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
  return currentTime >= today.open && currentTime <= today.close;
});

const handleBack = () => {
  useRouter().back();
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Hero / Cover -->
    <div class="relative">
      <div
        class="w-full h-48 md:h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-accent overflow-hidden"
      >
        <img
          v-if="business.cover"
          :src="business.cover"
          alt="Cover"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="container max-w-5xl mx-auto px-4">
        <div class="relative -mt-12 flex items-end gap-4 md:gap-6">
          <div
            class="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-card border-4 border-background shadow-lg flex items-center justify-center shrink-0 overflow-hidden"
          >
            <img
              v-if="business.logo"
              :src="business.logo"
              alt="Logo"
              class="w-full h-full object-cover"
            />
            <Building2 v-else class="w-10 h-10 text-primary" />
          </div>
          <div class="pb-2 flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-2xl md:text-3xl font-bold text-foreground">
                {{ business.name }}
              </h1>
              <Badge
                :variant="isOpen ? 'default' : 'secondary'"
                class="text-[10px]"
              >
                {{ isOpen ? "Open Now" : "Closed" }}
              </Badge>
            </div>
            <div class="flex items-center gap-3 mt-1">
              <Badge variant="secondary" class="text-xs text-foreground bg-accent">
                {{ business.industry }}
              </Badge>
              <div class="flex items-center gap-1">
                <!-- Stars -->
                <div class="flex gap-0.5">
                  <Star
                    v-for="i in [1, 2, 3, 4, 5]"
                    :key="i"
                    :class="[
                      'w-3.5 h-3.5',
                      i <= Math.round(Number(avgRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30',
                    ]"
                  />
                </div>
                <span class="text-xs text-muted-foreground">
                  {{ avgRating }} ({{ totalReviews }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back nav -->
    <div class="container max-w-5xl mx-auto px-4 mt-4">
      <Button
        variant="ghost"
        size="sm"
        class="text-xs gap-1.5 text-foreground"
        @click="handleBack"
      >
        <ArrowLeft class="w-3.5 h-3.5" /> Back
      </Button>
    </div>

    <main class="container max-w-5xl mx-auto px-4 py-6 space-y-8">
      <!-- About -->
      <section>
        <h2 class="text-lg font-semibold text-foreground mb-3">About</h2>
        <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
          <CardContent class="pt-5 pb-4 space-y-4">
            <p class="text-sm text-muted-foreground leading-relaxed">
              {{ business.description }}
            </p>
            <hr class="border-border/60" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-if="business.email" class="flex items-center gap-2 text-sm">
                <Mail class="w-4 h-4 text-primary shrink-0" />
                <span class="text-muted-foreground truncate">
                  {{ business.email }}
                </span>
              </div>
              <div v-if="business.phone" class="flex items-center gap-2 text-sm">
                <Phone class="w-4 h-4 text-primary shrink-0" />
                <span class="text-muted-foreground">
                  {{ business.phone }}
                </span>
              </div>
              <div
                v-if="business.website"
                class="flex items-center gap-2 text-sm"
              >
                <Globe class="w-4 h-4 text-primary shrink-0" />
                <a
                  :href="business.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:underline truncate"
                >
                  {{ business.website }}
                </a>
              </div>
              <div
                v-if="business.address"
                class="flex items-center gap-2 text-sm"
              >
                <MapPin class="w-4 h-4 text-primary shrink-0" />
                <span class="text-muted-foreground">
                  {{
                    [business.address, business.city, business.state]
                      .filter(Boolean)
                      .join(", ")
                  }}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <!-- Products -->
      <section>
        <h2
          class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
        >
          <Package class="w-5 h-5 text-primary" /> Products
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Card
            v-for="p in products"
            :key="p.id"
            class="border-0 shadow-md shadow-foreground/5 overflow-hidden group bg-card"
          >
            <div
              class="h-40 bg-muted flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="p.images.length > 0"
                :src="p.images[0]"
                :alt="p.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Package v-else class="w-10 h-10 text-muted-foreground/40" />
            </div>
            <CardContent class="pt-4 pb-4">
              <h3 class="font-semibold text-sm text-foreground">{{ p.name }}</h3>
              <p class="text-xs text-muted-foreground mt-1 line-clamp-2">
                {{ p.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Services -->
      <section>
        <h2
          class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
        >
          <Wrench class="w-5 h-5 text-primary" /> Services
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            v-for="s in services"
            :key="s.id"
            class="border-0 shadow-md shadow-foreground/5 overflow-hidden group bg-card"
          >
            <div
              class="h-36 bg-muted flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="s.images.length > 0"
                :src="s.images[0]"
                :alt="s.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Wrench v-else class="w-10 h-10 text-muted-foreground/40" />
            </div>
            <CardContent class="pt-4 pb-4">
              <h3 class="font-semibold text-sm text-foreground">{{ s.name }}</h3>
              <p class="text-xs text-muted-foreground mt-1 line-clamp-2">
                {{ s.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Branches & Hours side-by-side -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Branches -->
        <section>
          <h2
            class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
          >
            <MapPin class="w-5 h-5 text-primary" /> Locations
          </h2>
          <div class="space-y-3">
            <Card
              v-for="b in branches"
              :key="b.id"
              class="border-0 shadow-md shadow-foreground/5 bg-card"
            >
              <CardContent class="pt-4 pb-4">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-semibold text-sm text-foreground">{{ b.name }}</h3>
                  <Badge
                    v-if="b.isMain"
                    variant="secondary"
                    class="text-[10px] text-foreground bg-accent"
                  >
                    Main
                  </Badge>
                </div>
                <p class="text-xs text-muted-foreground">
                  {{
                    [b.address, b.city, b.state, b.country]
                      .filter(Boolean)
                      .join(", ")
                  }}
                </p>
                <div
                  v-if="b.phone"
                  class="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"
                >
                  <Phone class="w-3 h-3 text-primary" /> {{ b.phone }}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <!-- Hours -->
        <section>
          <h2
            class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
          >
            <Clock class="w-5 h-5 text-primary" /> Business Hours
          </h2>
          <Card class="border-0 shadow-md shadow-foreground/5 bg-card">
            <CardContent class="pt-4 pb-4 space-y-0">
              <div
                v-for="h in hours"
                :key="h.day"
                :class="[
                  'flex items-center justify-between py-2.5 border-b border-border/60 last:border-0',
                  (() => {
                    const days = [
                      'Sunday',
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                    ];
                    return days[new Date().getDay()] === h.day
                      ? 'bg-primary/5 -mx-4 px-4 rounded-md'
                      : '';
                  })(),
                ]"
              >
                <span
                  :class="[
                    'text-sm',
                    (() => {
                      const days = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                      ];
                      return days[new Date().getDay()] === h.day
                        ? 'font-semibold text-foreground'
                        : 'text-muted-foreground';
                    })(),
                  ]"
                >
                  {{ h.day }}
                  <span
                    v-if="
                      (() => {
                        const days = [
                          'Sunday',
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                          'Saturday',
                        ];
                        return days[new Date().getDay()] === h.day;
                      })()
                    "
                    class="text-[10px] text-primary ml-1 font-normal"
                  >
                    (Today)
                  </span>
                </span>
                <span
                  v-if="h.isClosed"
                  class="text-sm text-destructive font-medium"
                >
                  Closed
                </span>
                <span v-else class="text-sm tabular-nums text-foreground">
                  {{ h.open }} – {{ h.close }}
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <!-- Reviews -->
      <section>
        <h2
          class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
        >
          <MessageSquare class="w-5 h-5 text-primary" /> Reviews & Ratings
        </h2>

        <!-- Rating summary -->
        <Card class="border-0 shadow-md shadow-foreground/5 mb-4 bg-card">
          <CardContent class="pt-5 pb-4">
            <div class="flex items-center gap-6">
              <div class="text-center shrink-0">
                <p class="text-4xl font-bold tabular-nums text-foreground">
                  {{ avgRating }}
                </p>
                <div class="flex gap-0.5 justify-center">
                  <Star
                    v-for="i in [1, 2, 3, 4, 5]"
                    :key="i"
                    :class="[
                      'w-4 h-4',
                      i <= Math.round(Number(avgRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30',
                    ]"
                  />
                </div>
                <p class="text-xs text-muted-foreground mt-1">
                  {{ totalReviews }} reviews
                </p>
              </div>
              <div class="w-px h-16 bg-border/60" />
              <div class="flex-1 space-y-1.5">
                <div
                  v-for="s in [5, 4, 3, 2, 1]"
                  :key="s"
                  class="flex items-center gap-2"
                >
                  <span
                    class="text-xs w-3 text-right tabular-nums text-muted-foreground"
                  >
                    {{ s }}
                  </span>
                  <Star
                    class="w-3 h-3 fill-amber-400 text-amber-400 shrink-0"
                  />
                  <div
                    class="flex-1 h-2 bg-muted rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full bg-amber-400 rounded-full"
                      :style="{
                        width: `${
                          (reviews.filter((r) => r.rating === s).length /
                            totalReviews) *
                          100
                        }%`,
                      }"
                    />
                  </div>
                  <span
                    class="text-xs text-muted-foreground w-4 tabular-nums text-right"
                  >
                    {{ reviews.filter((r) => r.rating === s).length }}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Review cards -->
        <div class="space-y-3">
          <Card
            v-for="r in reviews"
            :key="r.id"
            class="border-0 shadow-md shadow-foreground/5 bg-card"
          >
            <CardContent class="pt-4 pb-4">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary"
                  >
                    {{
                      r.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-foreground">
                      {{ r.author }}
                    </p>
                    <p class="text-[11px] text-muted-foreground">
                      {{
                        new Date(r.date).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      }}
                    </p>
                  </div>
                </div>
                <div class="flex gap-0.5">
                  <Star
                    v-for="i in [1, 2, 3, 4, 5]"
                    :key="i"
                    :class="[
                      'w-3.5 h-3.5',
                      i <= r.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30',
                    ]"
                  />
                </div>
              </div>
              <p
                class="text-sm text-muted-foreground leading-relaxed mt-2"
              >
                {{ r.comment }}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-card mt-12">
      <div class="container max-w-5xl mx-auto px-4 py-6 text-center">
        <p class="text-xs text-muted-foreground">
          © {{ new Date().getFullYear() }} {{ business.name }}. All rights
          reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
