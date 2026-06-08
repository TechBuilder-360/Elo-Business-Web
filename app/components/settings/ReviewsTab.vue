<script setup>
import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, ThumbsUp } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockReviews = [
  {
    id: "1",
    author: "Adebayo Ogunlesi",
    rating: 5,
    comment:
      "Excellent service and very professional team. Would highly recommend to anyone looking for quality.",
    date: "2026-03-18",
    helpful: 12,
    replied: true,
  },
  {
    id: "2",
    author: "Fatima Ibrahim",
    rating: 4,
    comment:
      "Good experience overall. The delivery was a bit delayed but the product quality made up for it.",
    date: "2026-03-15",
    helpful: 5,
    replied: false,
  },
  {
    id: "3",
    author: "Chinedu Okafor",
    rating: 5,
    comment:
      "Best in the business! I've been a loyal customer for over a year now.",
    date: "2026-03-10",
    helpful: 8,
    replied: true,
  },
  {
    id: "4",
    author: "Amina Yusuf",
    rating: 3,
    comment: "Average experience. Customer support could be more responsive.",
    date: "2026-03-05",
    helpful: 2,
    replied: false,
  },
  {
    id: "5",
    author: "Emeka Nwosu",
    rating: 2,
    comment: "Had some issues with the order accuracy. Hoping for improvement.",
    date: "2026-02-28",
    helpful: 1,
    replied: true,
  },
  {
    id: "6",
    author: "Ngozi Eze",
    rating: 5,
    comment: "Absolutely wonderful! The attention to detail is impressive.",
    date: "2026-02-20",
    helpful: 15,
    replied: false,
  },
];

const filter = ref("all");

const filtered = computed(() => {
  if (filter.value === "all") return mockReviews;
  return mockReviews.filter((r) => r.rating === Number(filter.value));
});

const avg = computed(() => {
  return (
    mockReviews.reduce((a, r) => a + r.rating, 0) / mockReviews.length
  ).toFixed(1);
});

const dist = computed(() => {
  return [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: mockReviews.filter((r) => r.rating === s).length,
  }));
});
</script>

<template>
  <div class="space-y-6">
    <!-- Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="border-0 shadow-md shadow-foreground/5">
        <CardContent class="pt-6 text-center flex flex-col items-center">
          <p class="text-4xl font-bold tabular-nums text-foreground">{{ avg }}</p>
          <div class="flex gap-0.5 mt-2">
            <Star
              v-for="i in 5"
              :key="i"
              class="w-5 h-5"
              :class="
                i <= Math.round(Number(avg))
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/30'
              "
            />
          </div>
          <p class="text-xs text-muted-foreground mt-1">
            {{ mockReviews.length }} reviews
          </p>
        </CardContent>
      </Card>

      <Card class="border-0 shadow-md shadow-foreground/5 md:col-span-2">
        <CardContent class="pt-6 space-y-2">
          <div v-for="d in dist" :key="d.star" class="flex items-center gap-2">
            <span class="text-xs w-3 text-right tabular-nums text-foreground">
              {{ d.star }}
            </span>
            <Star class="w-3 h-3 fill-amber-400 text-amber-400" />
            <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                class="h-full bg-amber-400 rounded-full transition-all"
                :style="{
                  width: `${
                    mockReviews.length
                      ? (d.count / mockReviews.length) * 100
                      : 0
                  }%`,
                }"
              />
            </div>
            <span
              class="text-xs text-muted-foreground w-6 tabular-nums text-right"
            >
              {{ d.count }}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filter -->
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold flex items-center gap-1.5 text-foreground">
        <MessageSquare class="w-4 h-4" /> Reviews
      </h3>
      <Select :modelValue="filter" @update:modelValue="(val) => (filter = val)">
        <SelectTrigger class="w-36 h-8 text-xs">
          <SelectValue placeholder="All Ratings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ratings</SelectItem>
          <SelectItem
            v-for="s in [5, 4, 3, 2, 1]"
            :key="s"
            :value="String(s)"
          >
            {{ s }} Stars
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Reviews List -->
    <div class="space-y-3">
      <Card
        v-if="filtered.length === 0"
        class="border-0 shadow-md shadow-foreground/5"
      >
        <CardContent
          class="py-12 text-center text-sm text-muted-foreground"
        >
          No reviews match this filter.
        </CardContent>
      </Card>

      <Card
        v-for="review in filtered"
        :key="review.id"
        class="border-0 shadow-md shadow-foreground/5"
      >
        <CardContent class="pt-5 pb-4 space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <div
                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary"
              >
                {{
                  review.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                }}
              </div>
              <div>
                <p class="text-sm font-medium leading-tight text-foreground">
                  {{ review.author }}
                </p>
                <p class="text-[11px] text-muted-foreground">
                  {{
                    new Date(review.date).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex gap-0.5">
                <Star
                  v-for="i in 5"
                  :key="i"
                  class="w-3.5 h-3.5"
                  :class="
                    i <= review.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/30'
                  "
                />
              </div>
              <Badge v-if="review.replied" variant="secondary" class="text-[10px] text-foreground">
                Replied
              </Badge>
            </div>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed">
            {{ review.comment }}
          </p>
          <div class="flex items-center gap-1 pt-1">
            <Button
              variant="ghost"
              size="sm"
              class="h-7 text-xs text-muted-foreground gap-1"
            >
              <ThumbsUp class="w-3 h-3" /> {{ review.helpful }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
