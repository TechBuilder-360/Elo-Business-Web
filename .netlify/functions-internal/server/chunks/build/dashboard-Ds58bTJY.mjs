import { computed, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, provide, h, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from './card-Cq6gP5nL.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { T as Tabs, b as TabsList, c as TabsTrigger } from './tabs-1FqyMY98.mjs';
import { Moon, Sun, Wallet, ShieldCheck, Settings, Eye, TrendingUp, Users } from 'lucide-vue-next';
import { d as useRoute$1, n as navigateTo } from './server.mjs';
import { u as useTheme } from './useTheme-CfcsnVmm.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'perfect-debounce';
import '@vue/shared';
import '@tanstack/vue-query';

const ChartContext = /* @__PURE__ */ Symbol("ChartContext");
const ChartContainer = {
  name: "ChartContainer",
  props: {
    config: { type: Object, default: () => ({}) },
    class: String
  },
  setup(props, { slots }) {
    provide(ChartContext, { config: props.config });
    return () => h("div", { class: ["relative w-full", props.class] }, slots.default?.());
  }
};
const drawGrid = (maxVal, yTicks) => {
  const lines = [];
  for (let i = 0; i <= yTicks; i++) {
    const y = 240 - i / yTicks * 200;
    lines.push(
      h("line", {
        key: `grid-${i}`,
        x1: 50,
        y1: y,
        x2: 480,
        y2: y,
        stroke: "currentColor",
        class: "text-muted/20 dark:text-muted/10",
        "stroke-dasharray": "3 3",
        "stroke-width": 1
      })
    );
  }
  return lines;
};
const drawYAxis = (maxVal, yTicks) => {
  const ticks = [];
  for (let i = 0; i <= yTicks; i++) {
    const val = Math.round(i / yTicks * maxVal);
    const y = 240 - i / yTicks * 200;
    ticks.push(
      h(
        "text",
        {
          key: `ytick-${i}`,
          x: 40,
          y: y + 4,
          "text-anchor": "end",
          class: "text-[10px] fill-muted-foreground font-medium select-none"
        },
        val >= 1e3 ? (val / 1e3).toFixed(1) + "k" : val
      )
    );
  }
  return ticks;
};
const BarChart = {
  name: "BarChart",
  props: {
    data: { type: Array, default: () => [] }
  },
  setup(props, { slots }) {
    const chartCtx = inject(ChartContext);
    return () => {
      const data = props.data;
      if (!data || data.length === 0) return h("svg");
      const barSlot = slots.default?.().find(
        (c) => c.type && (c.type.name === "Bar" || c.type === Bar)
      ) || { props: { dataKey: "visits" } };
      const dataKey = barSlot.props?.dataKey || "visits";
      const configColor = chartCtx?.config?.[dataKey]?.color || "var(--primary)";
      const values = data.map((d) => Number(d[dataKey]) || 0);
      const maxVal = Math.max(...values, 10) * 1.1;
      const yTicks = 4;
      const xAxisSlot = slots.default?.().find(
        (c) => c.type && (c.type.name === "XAxis" || c.type === XAxis)
      );
      const xKey = xAxisSlot?.props?.dataKey || "name";
      const N = data.length;
      const chartWidth = 430;
      const barWidth = Math.min(30, chartWidth / N * 0.6);
      const xStep = chartWidth / N;
      return h(
        "svg",
        {
          viewBox: "0 0 500 280",
          class: "w-full h-full text-foreground"
        },
        [
          ...drawGrid(maxVal, yTicks),
          ...drawYAxis(maxVal, yTicks),
          ...data.map((d, idx) => {
            const x = 50 + idx * xStep + xStep / 2;
            return h(
              "text",
              {
                key: `xtick-${idx}`,
                x,
                y: 265,
                "text-anchor": "middle",
                class: "text-[10px] fill-muted-foreground font-medium select-none"
              },
              String(d[xKey])
            );
          }),
          ...data.map((d, idx) => {
            const val = Number(d[dataKey]) || 0;
            const barHeight = val / maxVal * 200;
            const x = 50 + idx * xStep + (xStep - barWidth) / 2;
            const y = 240 - barHeight;
            return h("rect", {
              key: `bar-${idx}`,
              x,
              y,
              width: barWidth,
              height: Math.max(2, barHeight),
              rx: 4,
              ry: 4,
              fill: configColor,
              class: "transition-all duration-300 hover:opacity-80 cursor-pointer"
            });
          })
        ]
      );
    };
  }
};
const LineChart = {
  name: "LineChart",
  props: {
    data: { type: Array, default: () => [] }
  },
  setup(props, { slots }) {
    const chartCtx = inject(ChartContext);
    return () => {
      const data = props.data;
      if (!data || data.length === 0) return h("svg");
      const lineSlot = slots.default?.().find(
        (c) => c.type && (c.type.name === "Line" || c.type === Line)
      ) || { props: { dataKey: "revenue" } };
      const dataKey = lineSlot.props?.dataKey || "revenue";
      const configColor = chartCtx?.config?.[dataKey]?.color || "var(--primary)";
      const values = data.map((d) => Number(d[dataKey]) || 0);
      const maxVal = Math.max(...values, 10) * 1.1;
      const yTicks = 4;
      const xAxisSlot = slots.default?.().find(
        (c) => c.type && (c.type.name === "XAxis" || c.type === XAxis)
      );
      const xKey = xAxisSlot?.props?.dataKey || "name";
      const N = data.length;
      const xStep = 430 / (N - 1);
      const points = data.map((d, idx) => {
        const x = 50 + idx * xStep;
        const val = Number(d[dataKey]) || 0;
        const y = 240 - val / maxVal * 200;
        return { x, y };
      });
      const pathD = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
      return h(
        "svg",
        {
          viewBox: "0 0 500 280",
          class: "w-full h-full text-foreground"
        },
        [
          ...drawGrid(maxVal, yTicks),
          ...drawYAxis(maxVal, yTicks),
          ...data.map((d, idx) => {
            const x = 50 + idx * xStep;
            return h(
              "text",
              {
                key: `xtick-${idx}`,
                x,
                y: 265,
                "text-anchor": "middle",
                class: "text-[10px] fill-muted-foreground font-medium select-none"
              },
              String(d[xKey])
            );
          }),
          h("path", {
            d: pathD,
            fill: "none",
            stroke: configColor,
            "stroke-width": 2.5,
            class: "transition-all duration-300"
          }),
          ...points.map(
            (p, idx) => h("circle", {
              key: `dot-${idx}`,
              cx: p.x,
              cy: p.y,
              r: 4,
              fill: configColor,
              stroke: "var(--background)",
              "stroke-width": 1.5,
              class: "hover:scale-125 transition-transform cursor-pointer"
            })
          )
        ]
      );
    };
  }
};
const AreaChart = {
  name: "AreaChart",
  props: {
    data: { type: Array, default: () => [] }
  },
  setup(props, { slots }) {
    const chartCtx = inject(ChartContext);
    return () => {
      const data = props.data;
      if (!data || data.length === 0) return h("svg");
      const areaSlot = slots.default?.().find(
        (c) => c.type && (c.type.name === "Area" || c.type === Area)
      ) || { props: { dataKey: "customers" } };
      const dataKey = areaSlot.props?.dataKey || "customers";
      const configColor = chartCtx?.config?.[dataKey]?.color || "var(--primary)";
      const values = data.map((d) => Number(d[dataKey]) || 0);
      const maxVal = Math.max(...values, 10) * 1.1;
      const yTicks = 4;
      const xAxisSlot = slots.default?.().find(
        (c) => c.type && (c.type.name === "XAxis" || c.type === XAxis)
      );
      const xKey = xAxisSlot?.props?.dataKey || "name";
      const N = data.length;
      const xStep = 430 / (N - 1);
      const points = data.map((d, idx) => {
        const x = 50 + idx * xStep;
        const val = Number(d[dataKey]) || 0;
        const y = 240 - val / maxVal * 200;
        return { x, y };
      });
      const lineD = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
      const areaD = `${lineD} L ${points[N - 1].x} 240 L 50 240 Z`;
      return h(
        "svg",
        {
          viewBox: "0 0 500 280",
          class: "w-full h-full text-foreground"
        },
        [
          h("defs", [
            h(
              "linearGradient",
              { id: "areaGrad", x1: 0, y1: 0, x2: 0, y2: 1 },
              [
                h("stop", {
                  offset: "0%",
                  "stop-color": configColor,
                  "stop-opacity": 0.4
                }),
                h("stop", {
                  offset: "100%",
                  "stop-color": configColor,
                  "stop-opacity": 0.02
                })
              ]
            )
          ]),
          ...drawGrid(maxVal, yTicks),
          ...drawYAxis(maxVal, yTicks),
          ...data.map((d, idx) => {
            const x = 50 + idx * xStep;
            return h(
              "text",
              {
                key: `xtick-${idx}`,
                x,
                y: 265,
                "text-anchor": "middle",
                class: "text-[10px] fill-muted-foreground font-medium select-none"
              },
              String(d[xKey])
            );
          }),
          h("path", {
            d: areaD,
            fill: "url(#areaGrad)"
          }),
          h("path", {
            d: lineD,
            fill: "none",
            stroke: configColor,
            "stroke-width": 2.5
          })
        ]
      );
    };
  }
};
const Bar = {
  name: "Bar",
  props: { dataKey: String, fill: String, radius: Array },
  setup() {
    return () => null;
  }
};
const Line = {
  name: "Line",
  props: { dataKey: String, stroke: String, strokeWidth: Number, dot: Object },
  setup() {
    return () => null;
  }
};
const Area = {
  name: "Area",
  props: { dataKey: String, stroke: String, fill: String },
  setup() {
    return () => null;
  }
};
const XAxis = {
  name: "XAxis",
  props: { dataKey: String },
  setup() {
    return () => null;
  }
};
const YAxis = {
  name: "YAxis",
  setup() {
    return () => null;
  }
};
const CartesianGrid = {
  name: "CartesianGrid",
  props: { strokeDasharray: String },
  setup() {
    return () => null;
  }
};
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark, toggleTheme } = useTheme();
    const route = useRoute$1();
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
      { name: "Aug", visits: 480 }
    ];
    const engagementDataWeek = [
      { name: "Mon", visits: 45 },
      { name: "Tue", visits: 62 },
      { name: "Wed", visits: 58 },
      { name: "Thu", visits: 71 },
      { name: "Fri", visits: 80 },
      { name: "Sat", visits: 35 },
      { name: "Sun", visits: 28 }
    ];
    const engagementDataDay = [
      { name: "6am", visits: 5 },
      { name: "9am", visits: 18 },
      { name: "12pm", visits: 32 },
      { name: "3pm", visits: 28 },
      { name: "6pm", visits: 22 },
      { name: "9pm", visits: 12 }
    ];
    const revenueData = [
      { name: "Jan", revenue: 4200 },
      { name: "Feb", revenue: 5800 },
      { name: "Mar", revenue: 7200 },
      { name: "Apr", revenue: 6100 },
      { name: "May", revenue: 8400 },
      { name: "Jun", revenue: 9200 },
      { name: "Jul", revenue: 11e3 },
      { name: "Aug", revenue: 10500 }
    ];
    const customerData = [
      { name: "Jan", customers: 34 },
      { name: "Feb", customers: 52 },
      { name: "Mar", customers: 78 },
      { name: "Apr", customers: 95 },
      { name: "May", customers: 120 },
      { name: "Jun", customers: 148 },
      { name: "Jul", customers: 175 },
      { name: "Aug", customers: 203 }
    ];
    const engagementConfig = {
      visits: { label: "Visits", color: "hsl(321 8% 49%)" }
    };
    const revenueConfig = {
      revenue: { label: "Revenue ($)", color: "hsl(321 12% 42%)" }
    };
    const customerConfig = {
      customers: { label: "Customers", color: "hsl(321 10% 55%)" }
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
        query: { name: businessName.value }
      });
    };
    const handleSettingsNavigation = () => {
      navigateTo({
        path: "/settings",
        query: { name: businessName.value }
      });
    };
    const handleComplianceNavigation = () => {
      navigateTo({
        path: "/compliance",
        query: { name: businessName.value }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><header class="border-b bg-card sticky top-0 z-10"><div class="container max-w-8xl mx-auto flex items-center justify-between py-3 px-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><div><h1 class="text-lg font-bold leading-tight">${ssrInterpolate(businessName.value)}</h1><p class="text-xs text-muted-foreground">Dashboard</p></div></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        class: "h-8 w-8 text-foreground shrink-0",
        onClick: unref(toggleTheme)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isDark)) {
              _push2(ssrRenderComponent(unref(Moon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Sun), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(isDark) ? (openBlock(), createBlock(unref(Moon), {
                key: 0,
                class: "w-4 h-4"
              })) : (openBlock(), createBlock(unref(Sun), {
                key: 1,
                class: "w-4 h-4"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Badge), {
        variant: "outline",
        class: "border-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] bg-[hsl(var(--warning)/0.1)] gap-1.5 py-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-2 h-2 rounded-full bg-[hsl(var(--warning))] animate-pulse"${_scopeId}></span> Pending Approval `);
          } else {
            return [
              createVNode("span", { class: "w-2 h-2 rounded-full bg-[hsl(var(--warning))] animate-pulse" }),
              createTextVNode(" Pending Approval ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        class: "h-9 w-9 text-foreground",
        onClick: handleWalletNavigation
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Wallet), { class: "w-5 h-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Wallet), { class: "w-5 h-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        class: "h-9 w-9 text-foreground",
        onClick: handleComplianceNavigation,
        title: "Compliance"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShieldCheck), { class: "w-5 h-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ShieldCheck), { class: "w-5 h-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        class: "h-9 w-9 text-foreground",
        onClick: handleSettingsNavigation,
        title: "Settings"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Settings), { class: "w-5 h-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Settings), { class: "w-5 h-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="container max-w-8xl mx-auto py-6 px-4 space-y-6"><div class="grid grid-cols-1 sm:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Eye), { class: "w-5 h-5 text-accent-foreground" }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground font-medium"${_scopeId2}> Total Visits </p><p class="text-2xl font-bold text-foreground"${_scopeId2}>${ssrInterpolate(totalVisits.value.toLocaleString())}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                      createVNode(unref(Eye), { class: "w-5 h-5 text-accent-foreground" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground font-medium" }, " Total Visits "),
                      createVNode("p", { class: "text-2xl font-bold text-foreground" }, toDisplayString(totalVisits.value.toLocaleString()), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                    createVNode(unref(Eye), { class: "w-5 h-5 text-accent-foreground" })
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs text-muted-foreground font-medium" }, " Total Visits "),
                    createVNode("p", { class: "text-2xl font-bold text-foreground" }, toDisplayString(totalVisits.value.toLocaleString()), 1)
                  ])
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TrendingUp), { class: "w-5 h-5 text-accent-foreground" }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground font-medium"${_scopeId2}> Latest Revenue </p><p class="text-2xl font-bold text-foreground"${_scopeId2}> $${ssrInterpolate(latestRevenue.value.toLocaleString())}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                      createVNode(unref(TrendingUp), { class: "w-5 h-5 text-accent-foreground" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground font-medium" }, " Latest Revenue "),
                      createVNode("p", { class: "text-2xl font-bold text-foreground" }, " $" + toDisplayString(latestRevenue.value.toLocaleString()), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                    createVNode(unref(TrendingUp), { class: "w-5 h-5 text-accent-foreground" })
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs text-muted-foreground font-medium" }, " Latest Revenue "),
                    createVNode("p", { class: "text-2xl font-bold text-foreground" }, " $" + toDisplayString(latestRevenue.value.toLocaleString()), 1)
                  ])
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Users), { class: "w-5 h-5 text-accent-foreground" }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground font-medium"${_scopeId2}> Total Customers </p><p class="text-2xl font-bold text-foreground"${_scopeId2}>${ssrInterpolate(totalCustomers.value)}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                      createVNode(unref(Users), { class: "w-5 h-5 text-accent-foreground" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground font-medium" }, " Total Customers "),
                      createVNode("p", { class: "text-2xl font-bold text-foreground" }, toDisplayString(totalCustomers.value), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                    createVNode(unref(Users), { class: "w-5 h-5 text-accent-foreground" })
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs text-muted-foreground font-medium" }, " Total Customers "),
                    createVNode("p", { class: "text-2xl font-bold text-foreground" }, toDisplayString(totalCustomers.value), 1)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base text-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Business Engagements`);
                      } else {
                        return [
                          createTextVNode("Business Engagements")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Tabs), {
                    modelValue: engagementPeriod.value,
                    "onUpdate:modelValue": (val) => engagementPeriod.value = val
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(TabsList), { class: "h-8" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(TabsTrigger), {
                                value: "day",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Day `);
                                  } else {
                                    return [
                                      createTextVNode(" Day ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(TabsTrigger), {
                                value: "week",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Week `);
                                  } else {
                                    return [
                                      createTextVNode(" Week ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(TabsTrigger), {
                                value: "month",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Month `);
                                  } else {
                                    return [
                                      createTextVNode(" Month ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(TabsTrigger), {
                                  value: "day",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Day ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TabsTrigger), {
                                  value: "week",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Week ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TabsTrigger), {
                                  value: "month",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Month ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(TabsList), { class: "h-8" }, {
                            default: withCtx(() => [
                              createVNode(unref(TabsTrigger), {
                                value: "day",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Day ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(TabsTrigger), {
                                value: "week",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Week ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(TabsTrigger), {
                                value: "month",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Month ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Business Engagements")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Tabs), {
                      modelValue: engagementPeriod.value,
                      "onUpdate:modelValue": (val) => engagementPeriod.value = val
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(TabsList), { class: "h-8" }, {
                          default: withCtx(() => [
                            createVNode(unref(TabsTrigger), {
                              value: "day",
                              class: "text-xs px-2.5 h-6"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Day ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(TabsTrigger), {
                              value: "week",
                              class: "text-xs px-2.5 h-6"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Week ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(TabsTrigger), {
                              value: "month",
                              class: "text-xs px-2.5 h-6"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Month ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChartContainer), {
                    config: engagementConfig,
                    class: "h-[400px] w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(BarChart), { data: engagementData.value }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CartesianGrid), {
                                strokeDasharray: "3 3",
                                vertical: false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(XAxis), { dataKey: "name" }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(YAxis), null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Bar), {
                                dataKey: "visits",
                                fill: "var(--color-visits)",
                                radius: [6, 6, 0, 0]
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CartesianGrid), {
                                  strokeDasharray: "3 3",
                                  vertical: false
                                }),
                                createVNode(unref(XAxis), { dataKey: "name" }),
                                createVNode(unref(YAxis)),
                                createVNode(unref(Bar), {
                                  dataKey: "visits",
                                  fill: "var(--color-visits)",
                                  radius: [6, 6, 0, 0]
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(BarChart), { data: engagementData.value }, {
                            default: withCtx(() => [
                              createVNode(unref(CartesianGrid), {
                                strokeDasharray: "3 3",
                                vertical: false
                              }),
                              createVNode(unref(XAxis), { dataKey: "name" }),
                              createVNode(unref(YAxis)),
                              createVNode(unref(Bar), {
                                dataKey: "visits",
                                fill: "var(--color-visits)",
                                radius: [6, 6, 0, 0]
                              })
                            ]),
                            _: 1
                          }, 8, ["data"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChartContainer), {
                      config: engagementConfig,
                      class: "h-[400px] w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(BarChart), { data: engagementData.value }, {
                          default: withCtx(() => [
                            createVNode(unref(CartesianGrid), {
                              strokeDasharray: "3 3",
                              vertical: false
                            }),
                            createVNode(unref(XAxis), { dataKey: "name" }),
                            createVNode(unref(YAxis)),
                            createVNode(unref(Bar), {
                              dataKey: "visits",
                              fill: "var(--color-visits)",
                              radius: [6, 6, 0, 0]
                            })
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardHeader), { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Business Engagements")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Tabs), {
                    modelValue: engagementPeriod.value,
                    "onUpdate:modelValue": (val) => engagementPeriod.value = val
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(TabsList), { class: "h-8" }, {
                        default: withCtx(() => [
                          createVNode(unref(TabsTrigger), {
                            value: "day",
                            class: "text-xs px-2.5 h-6"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Day ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(TabsTrigger), {
                            value: "week",
                            class: "text-xs px-2.5 h-6"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Week ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(TabsTrigger), {
                            value: "month",
                            class: "text-xs px-2.5 h-6"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Month ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), null, {
                default: withCtx(() => [
                  createVNode(unref(ChartContainer), {
                    config: engagementConfig,
                    class: "h-[400px] w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(BarChart), { data: engagementData.value }, {
                        default: withCtx(() => [
                          createVNode(unref(CartesianGrid), {
                            strokeDasharray: "3 3",
                            vertical: false
                          }),
                          createVNode(unref(XAxis), { dataKey: "name" }),
                          createVNode(unref(YAxis)),
                          createVNode(unref(Bar), {
                            dataKey: "visits",
                            fill: "var(--color-visits)",
                            radius: [6, 6, 0, 0]
                          })
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base text-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Business Revenue`);
                      } else {
                        return [
                          createTextVNode("Business Revenue")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Business Revenue")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChartContainer), {
                    config: revenueConfig,
                    class: "h-[220px] w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(LineChart), { data: revenueData }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CartesianGrid), {
                                strokeDasharray: "3 3",
                                vertical: false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(XAxis), { dataKey: "name" }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(YAxis), null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Line), {
                                type: "monotone",
                                dataKey: "revenue",
                                stroke: "var(--color-revenue)",
                                strokeWidth: 2.5,
                                dot: { r: 4 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CartesianGrid), {
                                  strokeDasharray: "3 3",
                                  vertical: false
                                }),
                                createVNode(unref(XAxis), { dataKey: "name" }),
                                createVNode(unref(YAxis)),
                                createVNode(unref(Line), {
                                  type: "monotone",
                                  dataKey: "revenue",
                                  stroke: "var(--color-revenue)",
                                  strokeWidth: 2.5,
                                  dot: { r: 4 }
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(LineChart), { data: revenueData }, {
                            default: withCtx(() => [
                              createVNode(unref(CartesianGrid), {
                                strokeDasharray: "3 3",
                                vertical: false
                              }),
                              createVNode(unref(XAxis), { dataKey: "name" }),
                              createVNode(unref(YAxis)),
                              createVNode(unref(Line), {
                                type: "monotone",
                                dataKey: "revenue",
                                stroke: "var(--color-revenue)",
                                strokeWidth: 2.5,
                                dot: { r: 4 }
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChartContainer), {
                      config: revenueConfig,
                      class: "h-[220px] w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(LineChart), { data: revenueData }, {
                          default: withCtx(() => [
                            createVNode(unref(CartesianGrid), {
                              strokeDasharray: "3 3",
                              vertical: false
                            }),
                            createVNode(unref(XAxis), { dataKey: "name" }),
                            createVNode(unref(YAxis)),
                            createVNode(unref(Line), {
                              type: "monotone",
                              dataKey: "revenue",
                              stroke: "var(--color-revenue)",
                              strokeWidth: 2.5,
                              dot: { r: 4 }
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardHeader), { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Business Revenue")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), null, {
                default: withCtx(() => [
                  createVNode(unref(ChartContainer), {
                    config: revenueConfig,
                    class: "h-[220px] w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(LineChart), { data: revenueData }, {
                        default: withCtx(() => [
                          createVNode(unref(CartesianGrid), {
                            strokeDasharray: "3 3",
                            vertical: false
                          }),
                          createVNode(unref(XAxis), { dataKey: "name" }),
                          createVNode(unref(YAxis)),
                          createVNode(unref(Line), {
                            type: "monotone",
                            dataKey: "revenue",
                            stroke: "var(--color-revenue)",
                            strokeWidth: 2.5,
                            dot: { r: 4 }
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base text-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Customer Growth`);
                      } else {
                        return [
                          createTextVNode("Customer Growth")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Customer Growth")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChartContainer), {
                    config: customerConfig,
                    class: "h-[220px] w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(AreaChart), { data: customerData }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CartesianGrid), {
                                strokeDasharray: "3 3",
                                vertical: false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(XAxis), { dataKey: "name" }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(YAxis), null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Area), {
                                type: "monotone",
                                dataKey: "customers",
                                stroke: "var(--color-customers)",
                                fill: "url(#customerGradient)"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CartesianGrid), {
                                  strokeDasharray: "3 3",
                                  vertical: false
                                }),
                                createVNode(unref(XAxis), { dataKey: "name" }),
                                createVNode(unref(YAxis)),
                                createVNode(unref(Area), {
                                  type: "monotone",
                                  dataKey: "customers",
                                  stroke: "var(--color-customers)",
                                  fill: "url(#customerGradient)"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(AreaChart), { data: customerData }, {
                            default: withCtx(() => [
                              createVNode(unref(CartesianGrid), {
                                strokeDasharray: "3 3",
                                vertical: false
                              }),
                              createVNode(unref(XAxis), { dataKey: "name" }),
                              createVNode(unref(YAxis)),
                              createVNode(unref(Area), {
                                type: "monotone",
                                dataKey: "customers",
                                stroke: "var(--color-customers)",
                                fill: "url(#customerGradient)"
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChartContainer), {
                      config: customerConfig,
                      class: "h-[220px] w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AreaChart), { data: customerData }, {
                          default: withCtx(() => [
                            createVNode(unref(CartesianGrid), {
                              strokeDasharray: "3 3",
                              vertical: false
                            }),
                            createVNode(unref(XAxis), { dataKey: "name" }),
                            createVNode(unref(YAxis)),
                            createVNode(unref(Area), {
                              type: "monotone",
                              dataKey: "customers",
                              stroke: "var(--color-customers)",
                              fill: "url(#customerGradient)"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardHeader), { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Customer Growth")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), null, {
                default: withCtx(() => [
                  createVNode(unref(ChartContainer), {
                    config: customerConfig,
                    class: "h-[220px] w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(AreaChart), { data: customerData }, {
                        default: withCtx(() => [
                          createVNode(unref(CartesianGrid), {
                            strokeDasharray: "3 3",
                            vertical: false
                          }),
                          createVNode(unref(XAxis), { dataKey: "name" }),
                          createVNode(unref(YAxis)),
                          createVNode(unref(Area), {
                            type: "monotone",
                            dataKey: "customers",
                            stroke: "var(--color-customers)",
                            fill: "url(#customerGradient)"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-Ds58bTJY.mjs.map
