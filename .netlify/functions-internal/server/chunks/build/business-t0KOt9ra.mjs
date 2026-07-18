import { computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { Building2, Star, ArrowLeft, Mail, Phone, Globe, MapPin, Package, Wrench, Clock, MessageSquare } from 'lucide-vue-next';
import { C as Card, a as CardContent } from './card-Cq6gP5nL.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { d as useRouter$1 } from './server.mjs';
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

const _sfc_main = {
  __name: "business",
  __ssrInlineRender: true,
  setup(__props) {
    const business = {
      name: "Adeola's Kitchen",
      description: "Premium catering and food services. We deliver quality meals for events, offices, and private dining experiences across Lagos.",
      industry: "Food & Beverage",
      email: "hello@adeolaskitchen.com",
      phone: "+234 801 234 5678",
      website: "https://adeolaskitchen.com",
      address: "15 Admiralty Way, Lekki Phase 1",
      city: "Lagos",
      state: "Lagos"
    };
    const products = [
      {
        id: "1",
        name: "Party Jollof Rice",
        description: "Our signature smoky party jollof rice, cooked with premium ingredients. Perfect for events of any size.",
        images: []
      },
      {
        id: "2",
        name: "Grilled Chicken Platter",
        description: "Perfectly seasoned and grilled whole chicken served with sides.",
        images: []
      },
      {
        id: "3",
        name: "Assorted Meat Pepper Soup",
        description: "Rich and spicy pepper soup with assorted cuts of premium meat.",
        images: []
      }
    ];
    const services = [
      {
        id: "1",
        name: "Event Catering",
        description: "Full-service catering for weddings, birthdays, corporate events and more.",
        images: []
      },
      {
        id: "2",
        name: "Meal Prep Delivery",
        description: "Weekly meal prep packages delivered to your doorstep across Lagos.",
        images: []
      }
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
        isMain: true
      },
      {
        id: "2",
        name: "Victoria Island",
        address: "22 Adeola Odeku Street",
        city: "Victoria Island",
        state: "Lagos",
        country: "Nigeria",
        phone: "+234 802 345 6789",
        isMain: false
      }
    ];
    const hours = [
      { day: "Monday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Tuesday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Wednesday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Thursday", open: "08:00", close: "20:00", isClosed: false },
      { day: "Friday", open: "08:00", close: "22:00", isClosed: false },
      { day: "Saturday", open: "09:00", close: "22:00", isClosed: false },
      { day: "Sunday", open: "00:00", close: "00:00", isClosed: true }
    ];
    const reviews = [
      {
        id: "1",
        author: "Adebayo Ogunlesi",
        rating: 5,
        comment: "Excellent service and very professional team. Would highly recommend to anyone looking for quality.",
        date: "2026-03-18",
        helpful: 12
      },
      {
        id: "2",
        author: "Fatima Ibrahim",
        rating: 4,
        comment: "Good experience overall. The delivery was a bit delayed but the product quality made up for it.",
        date: "2026-03-15",
        helpful: 5
      },
      {
        id: "3",
        author: "Chinedu Okafor",
        rating: 5,
        comment: "Best in the business! I've been a loyal customer for over a year now.",
        date: "2026-03-10",
        helpful: 8
      },
      {
        id: "4",
        author: "Amina Yusuf",
        rating: 3,
        comment: "Average experience. Customer support could be more responsive.",
        date: "2026-03-05",
        helpful: 2
      },
      {
        id: "5",
        author: "Ngozi Eze",
        rating: 5,
        comment: "Absolutely wonderful! The attention to detail is impressive.",
        date: "2026-02-20",
        helpful: 15
      }
    ];
    const avgRating = computed(() => {
      return (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
    });
    const totalReviews = computed(() => reviews.length);
    const isOpen = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const dayIndex = now.getDay();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const today = hours.find((h) => h.day === days[dayIndex]);
      if (!today || today.isClosed) return false;
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      return currentTime >= today.open && currentTime <= today.close;
    });
    const handleBack = () => {
      useRouter$1().back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><div class="relative"><div class="w-full h-48 md:h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-accent overflow-hidden">`);
      {
        _push(`<!---->`);
      }
      _push(`</div><div class="container max-w-5xl mx-auto px-4"><div class="relative -mt-12 flex items-end gap-4 md:gap-6"><div class="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-card border-4 border-background shadow-lg flex items-center justify-center shrink-0 overflow-hidden">`);
      {
        _push(ssrRenderComponent(unref(Building2), { class: "w-10 h-10 text-primary" }, null, _parent));
      }
      _push(`</div><div class="pb-2 flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap"><h1 class="text-2xl md:text-3xl font-bold text-foreground">${ssrInterpolate(business.name)}</h1>`);
      _push(ssrRenderComponent(unref(Badge), {
        variant: isOpen.value ? "default" : "secondary",
        class: "text-[10px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(isOpen.value ? "Open Now" : "Closed")}`);
          } else {
            return [
              createTextVNode(toDisplayString(isOpen.value ? "Open Now" : "Closed"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-3 mt-1">`);
      _push(ssrRenderComponent(unref(Badge), {
        variant: "secondary",
        class: "text-xs text-foreground bg-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(business.industry)}`);
          } else {
            return [
              createTextVNode(toDisplayString(business.industry), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-1"><div class="flex gap-0.5"><!--[-->`);
      ssrRenderList([1, 2, 3, 4, 5], (i) => {
        _push(ssrRenderComponent(unref(Star), {
          key: i,
          class: [
            "w-3.5 h-3.5",
            i <= Math.round(Number(avgRating.value)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
          ]
        }, null, _parent));
      });
      _push(`<!--]--></div><span class="text-xs text-muted-foreground">${ssrInterpolate(avgRating.value)} (${ssrInterpolate(totalReviews.value)}) </span></div></div></div></div></div></div><div class="container max-w-5xl mx-auto px-4 mt-4">`);
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "sm",
        class: "text-xs gap-1.5 text-foreground",
        onClick: handleBack
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-3.5 h-3.5" }, null, _parent2, _scopeId));
            _push2(` Back `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "w-3.5 h-3.5" }),
              createTextVNode(" Back ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><main class="container max-w-5xl mx-auto px-4 py-6 space-y-8"><section><h2 class="text-lg font-semibold text-foreground mb-3">About</h2>`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "pt-5 pb-4 space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-sm text-muted-foreground leading-relaxed"${_scopeId2}>${ssrInterpolate(business.description)}</p><hr class="border-border/60"${_scopeId2}><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"${_scopeId2}>`);
                  {
                    _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Mail), { class: "w-4 h-4 text-primary shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-muted-foreground truncate"${_scopeId2}>${ssrInterpolate(business.email)}</span></div>`);
                  }
                  {
                    _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Phone), { class: "w-4 h-4 text-primary shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(business.phone)}</span></div>`);
                  }
                  {
                    _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Globe), { class: "w-4 h-4 text-primary shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<a${ssrRenderAttr("href", business.website)} target="_blank" rel="noopener noreferrer" class="text-primary hover:underline truncate"${_scopeId2}>${ssrInterpolate(business.website)}</a></div>`);
                  }
                  {
                    _push3(`<div class="flex items-center gap-2 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(MapPin), { class: "w-4 h-4 text-primary shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate([business.address, business.city, business.state].filter(Boolean).join(", "))}</span></div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(business.description), 1),
                    createVNode("hr", { class: "border-border/60" }),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
                      (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 text-sm"
                      }, [
                        createVNode(unref(Mail), { class: "w-4 h-4 text-primary shrink-0" }),
                        createVNode("span", { class: "text-muted-foreground truncate" }, toDisplayString(business.email), 1)
                      ])),
                      (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-2 text-sm"
                      }, [
                        createVNode(unref(Phone), { class: "w-4 h-4 text-primary shrink-0" }),
                        createVNode("span", { class: "text-muted-foreground" }, toDisplayString(business.phone), 1)
                      ])),
                      (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex items-center gap-2 text-sm"
                      }, [
                        createVNode(unref(Globe), { class: "w-4 h-4 text-primary shrink-0" }),
                        createVNode("a", {
                          href: business.website,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: "text-primary hover:underline truncate"
                        }, toDisplayString(business.website), 9, ["href"])
                      ])),
                      (openBlock(), createBlock("div", {
                        key: 3,
                        class: "flex items-center gap-2 text-sm"
                      }, [
                        createVNode(unref(MapPin), { class: "w-4 h-4 text-primary shrink-0" }),
                        createVNode("span", { class: "text-muted-foreground" }, toDisplayString([business.address, business.city, business.state].filter(Boolean).join(", ")), 1)
                      ]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "pt-5 pb-4 space-y-4" }, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(business.description), 1),
                  createVNode("hr", { class: "border-border/60" }),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
                    (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(unref(Mail), { class: "w-4 h-4 text-primary shrink-0" }),
                      createVNode("span", { class: "text-muted-foreground truncate" }, toDisplayString(business.email), 1)
                    ])),
                    (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(unref(Phone), { class: "w-4 h-4 text-primary shrink-0" }),
                      createVNode("span", { class: "text-muted-foreground" }, toDisplayString(business.phone), 1)
                    ])),
                    (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(unref(Globe), { class: "w-4 h-4 text-primary shrink-0" }),
                      createVNode("a", {
                        href: business.website,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "text-primary hover:underline truncate"
                      }, toDisplayString(business.website), 9, ["href"])
                    ])),
                    (openBlock(), createBlock("div", {
                      key: 3,
                      class: "flex items-center gap-2 text-sm"
                    }, [
                      createVNode(unref(MapPin), { class: "w-4 h-4 text-primary shrink-0" }),
                      createVNode("span", { class: "text-muted-foreground" }, toDisplayString([business.address, business.city, business.state].filter(Boolean).join(", ")), 1)
                    ]))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section><h2 class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Package), { class: "w-5 h-5 text-primary" }, null, _parent));
      _push(` Products </h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(products, (p) => {
        _push(ssrRenderComponent(unref(Card), {
          key: p.id,
          class: "border-0 shadow-md shadow-foreground/5 overflow-hidden group bg-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="h-40 bg-muted flex items-center justify-center overflow-hidden"${_scopeId}>`);
              if (p.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", p.images[0])}${ssrRenderAttr("alt", p.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
              } else {
                _push2(ssrRenderComponent(unref(Package), { class: "w-10 h-10 text-muted-foreground/40" }, null, _parent2, _scopeId));
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(unref(CardContent), { class: "pt-4 pb-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h3 class="font-semibold text-sm text-foreground"${_scopeId2}>${ssrInterpolate(p.name)}</h3><p class="text-xs text-muted-foreground mt-1 line-clamp-2"${_scopeId2}>${ssrInterpolate(p.description)}</p>`);
                  } else {
                    return [
                      createVNode("h3", { class: "font-semibold text-sm text-foreground" }, toDisplayString(p.name), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground mt-1 line-clamp-2" }, toDisplayString(p.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "h-40 bg-muted flex items-center justify-center overflow-hidden" }, [
                  p.images.length > 0 ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: p.images[0],
                    alt: p.name,
                    class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                    key: 1,
                    class: "w-10 h-10 text-muted-foreground/40"
                  }))
                ]),
                createVNode(unref(CardContent), { class: "pt-4 pb-4" }, {
                  default: withCtx(() => [
                    createVNode("h3", { class: "font-semibold text-sm text-foreground" }, toDisplayString(p.name), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground mt-1 line-clamp-2" }, toDisplayString(p.description), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section><h2 class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Wrench), { class: "w-5 h-5 text-primary" }, null, _parent));
      _push(` Services </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(services, (s) => {
        _push(ssrRenderComponent(unref(Card), {
          key: s.id,
          class: "border-0 shadow-md shadow-foreground/5 overflow-hidden group bg-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="h-36 bg-muted flex items-center justify-center overflow-hidden"${_scopeId}>`);
              if (s.images.length > 0) {
                _push2(`<img${ssrRenderAttr("src", s.images[0])}${ssrRenderAttr("alt", s.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
              } else {
                _push2(ssrRenderComponent(unref(Wrench), { class: "w-10 h-10 text-muted-foreground/40" }, null, _parent2, _scopeId));
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(unref(CardContent), { class: "pt-4 pb-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h3 class="font-semibold text-sm text-foreground"${_scopeId2}>${ssrInterpolate(s.name)}</h3><p class="text-xs text-muted-foreground mt-1 line-clamp-2"${_scopeId2}>${ssrInterpolate(s.description)}</p>`);
                  } else {
                    return [
                      createVNode("h3", { class: "font-semibold text-sm text-foreground" }, toDisplayString(s.name), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground mt-1 line-clamp-2" }, toDisplayString(s.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "h-36 bg-muted flex items-center justify-center overflow-hidden" }, [
                  s.images.length > 0 ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: s.images[0],
                    alt: s.name,
                    class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Wrench), {
                    key: 1,
                    class: "w-10 h-10 text-muted-foreground/40"
                  }))
                ]),
                createVNode(unref(CardContent), { class: "pt-4 pb-4" }, {
                  default: withCtx(() => [
                    createVNode("h3", { class: "font-semibold text-sm text-foreground" }, toDisplayString(s.name), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground mt-1 line-clamp-2" }, toDisplayString(s.description), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><section><h2 class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5 text-primary" }, null, _parent));
      _push(` Locations </h2><div class="space-y-3"><!--[-->`);
      ssrRenderList(branches, (b) => {
        _push(ssrRenderComponent(unref(Card), {
          key: b.id,
          class: "border-0 shadow-md shadow-foreground/5 bg-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardContent), { class: "pt-4 pb-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2 mb-1"${_scopeId2}><h3 class="font-semibold text-sm text-foreground"${_scopeId2}>${ssrInterpolate(b.name)}</h3>`);
                    if (b.isMain) {
                      _push3(ssrRenderComponent(unref(Badge), {
                        variant: "secondary",
                        class: "text-[10px] text-foreground bg-accent"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Main `);
                          } else {
                            return [
                              createTextVNode(" Main ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate([b.address, b.city, b.state, b.country].filter(Boolean).join(", "))}</p>`);
                    if (b.phone) {
                      _push3(`<div class="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Phone), { class: "w-3 h-3 text-primary" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(b.phone)}</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                        createVNode("h3", { class: "font-semibold text-sm text-foreground" }, toDisplayString(b.name), 1),
                        b.isMain ? (openBlock(), createBlock(unref(Badge), {
                          key: 0,
                          variant: "secondary",
                          class: "text-[10px] text-foreground bg-accent"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Main ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString([b.address, b.city, b.state, b.country].filter(Boolean).join(", ")), 1),
                      b.phone ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"
                      }, [
                        createVNode(unref(Phone), { class: "w-3 h-3 text-primary" }),
                        createTextVNode(" " + toDisplayString(b.phone), 1)
                      ])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardContent), { class: "pt-4 pb-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                      createVNode("h3", { class: "font-semibold text-sm text-foreground" }, toDisplayString(b.name), 1),
                      b.isMain ? (openBlock(), createBlock(unref(Badge), {
                        key: 0,
                        variant: "secondary",
                        class: "text-[10px] text-foreground bg-accent"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Main ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString([b.address, b.city, b.state, b.country].filter(Boolean).join(", ")), 1),
                    b.phone ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"
                    }, [
                      createVNode(unref(Phone), { class: "w-3 h-3 text-primary" }),
                      createTextVNode(" " + toDisplayString(b.phone), 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section><h2 class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Clock), { class: "w-5 h-5 text-primary" }, null, _parent));
      _push(` Business Hours </h2>`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "pt-4 pb-4 space-y-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(hours, (h) => {
                    _push3(`<div class="${ssrRenderClass([
                      "flex items-center justify-between py-2.5 border-b border-border/60 last:border-0",
                      (() => {
                        const days = [
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday"
                        ];
                        return days[(/* @__PURE__ */ new Date()).getDay()] === h.day ? "bg-primary/5 -mx-4 px-4 rounded-md" : "";
                      })()
                    ])}"${_scopeId2}><span class="${ssrRenderClass([
                      "text-sm",
                      (() => {
                        const days = [
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday"
                        ];
                        return days[(/* @__PURE__ */ new Date()).getDay()] === h.day ? "font-semibold text-foreground" : "text-muted-foreground";
                      })()
                    ])}"${_scopeId2}>${ssrInterpolate(h.day)} `);
                    if ((() => {
                      const days = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                      ];
                      return days[(/* @__PURE__ */ new Date()).getDay()] === h.day;
                    })()) {
                      _push3(`<span class="text-[10px] text-primary ml-1 font-normal"${_scopeId2}> (Today) </span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</span>`);
                    if (h.isClosed) {
                      _push3(`<span class="text-sm text-destructive font-medium"${_scopeId2}> Closed </span>`);
                    } else {
                      _push3(`<span class="text-sm tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(h.open)} – ${ssrInterpolate(h.close)}</span>`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(hours, (h) => {
                      return createVNode("div", {
                        key: h.day,
                        class: [
                          "flex items-center justify-between py-2.5 border-b border-border/60 last:border-0",
                          (() => {
                            const days = [
                              "Sunday",
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday"
                            ];
                            return days[(/* @__PURE__ */ new Date()).getDay()] === h.day ? "bg-primary/5 -mx-4 px-4 rounded-md" : "";
                          })()
                        ]
                      }, [
                        createVNode("span", {
                          class: [
                            "text-sm",
                            (() => {
                              const days = [
                                "Sunday",
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday"
                              ];
                              return days[(/* @__PURE__ */ new Date()).getDay()] === h.day ? "font-semibold text-foreground" : "text-muted-foreground";
                            })()
                          ]
                        }, [
                          createTextVNode(toDisplayString(h.day) + " ", 1),
                          (() => {
                            const days = [
                              "Sunday",
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday"
                            ];
                            return days[(/* @__PURE__ */ new Date()).getDay()] === h.day;
                          })() ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-[10px] text-primary ml-1 font-normal"
                          }, " (Today) ")) : createCommentVNode("", true)
                        ], 2),
                        h.isClosed ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-sm text-destructive font-medium"
                        }, " Closed ")) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-sm tabular-nums text-foreground"
                        }, toDisplayString(h.open) + " – " + toDisplayString(h.close), 1))
                      ], 2);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "pt-4 pb-4 space-y-0" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(hours, (h) => {
                    return createVNode("div", {
                      key: h.day,
                      class: [
                        "flex items-center justify-between py-2.5 border-b border-border/60 last:border-0",
                        (() => {
                          const days = [
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                          ];
                          return days[(/* @__PURE__ */ new Date()).getDay()] === h.day ? "bg-primary/5 -mx-4 px-4 rounded-md" : "";
                        })()
                      ]
                    }, [
                      createVNode("span", {
                        class: [
                          "text-sm",
                          (() => {
                            const days = [
                              "Sunday",
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday"
                            ];
                            return days[(/* @__PURE__ */ new Date()).getDay()] === h.day ? "font-semibold text-foreground" : "text-muted-foreground";
                          })()
                        ]
                      }, [
                        createTextVNode(toDisplayString(h.day) + " ", 1),
                        (() => {
                          const days = [
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                          ];
                          return days[(/* @__PURE__ */ new Date()).getDay()] === h.day;
                        })() ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-[10px] text-primary ml-1 font-normal"
                        }, " (Today) ")) : createCommentVNode("", true)
                      ], 2),
                      h.isClosed ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-sm text-destructive font-medium"
                      }, " Closed ")) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-sm tabular-nums text-foreground"
                      }, toDisplayString(h.open) + " – " + toDisplayString(h.close), 1))
                    ], 2);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div><section><h2 class="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(MessageSquare), { class: "w-5 h-5 text-primary" }, null, _parent));
      _push(` Reviews &amp; Ratings </h2>`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 mb-4 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "pt-5 pb-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-6"${_scopeId2}><div class="text-center shrink-0"${_scopeId2}><p class="text-4xl font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(avgRating.value)}</p><div class="flex gap-0.5 justify-center"${_scopeId2}><!--[-->`);
                  ssrRenderList([1, 2, 3, 4, 5], (i) => {
                    _push3(ssrRenderComponent(unref(Star), {
                      key: i,
                      class: [
                        "w-4 h-4",
                        i <= Math.round(Number(avgRating.value)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                      ]
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div><p class="text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(totalReviews.value)} reviews </p></div><div class="w-px h-16 bg-border/60"${_scopeId2}></div><div class="flex-1 space-y-1.5"${_scopeId2}><!--[-->`);
                  ssrRenderList([5, 4, 3, 2, 1], (s) => {
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}><span class="text-xs w-3 text-right tabular-nums text-muted-foreground"${_scopeId2}>${ssrInterpolate(s)}</span>`);
                    _push3(ssrRenderComponent(unref(Star), { class: "w-3 h-3 fill-amber-400 text-amber-400 shrink-0" }, null, _parent3, _scopeId2));
                    _push3(`<div class="flex-1 h-2 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full bg-amber-400 rounded-full" style="${ssrRenderStyle({
                      width: `${reviews.filter((r) => r.rating === s).length / totalReviews.value * 100}%`
                    })}"${_scopeId2}></div></div><span class="text-xs text-muted-foreground w-4 tabular-nums text-right"${_scopeId2}>${ssrInterpolate(reviews.filter((r) => r.rating === s).length)}</span></div>`);
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-6" }, [
                      createVNode("div", { class: "text-center shrink-0" }, [
                        createVNode("p", { class: "text-4xl font-bold tabular-nums text-foreground" }, toDisplayString(avgRating.value), 1),
                        createVNode("div", { class: "flex gap-0.5 justify-center" }, [
                          (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 4, 5], (i) => {
                            return createVNode(unref(Star), {
                              key: i,
                              class: [
                                "w-4 h-4",
                                i <= Math.round(Number(avgRating.value)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                              ]
                            }, null, 8, ["class"]);
                          }), 64))
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(totalReviews.value) + " reviews ", 1)
                      ]),
                      createVNode("div", { class: "w-px h-16 bg-border/60" }),
                      createVNode("div", { class: "flex-1 space-y-1.5" }, [
                        (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (s) => {
                          return createVNode("div", {
                            key: s,
                            class: "flex items-center gap-2"
                          }, [
                            createVNode("span", { class: "text-xs w-3 text-right tabular-nums text-muted-foreground" }, toDisplayString(s), 1),
                            createVNode(unref(Star), { class: "w-3 h-3 fill-amber-400 text-amber-400 shrink-0" }),
                            createVNode("div", { class: "flex-1 h-2 bg-muted rounded-full overflow-hidden" }, [
                              createVNode("div", {
                                class: "h-full bg-amber-400 rounded-full",
                                style: {
                                  width: `${reviews.filter((r) => r.rating === s).length / totalReviews.value * 100}%`
                                }
                              }, null, 4)
                            ]),
                            createVNode("span", { class: "text-xs text-muted-foreground w-4 tabular-nums text-right" }, toDisplayString(reviews.filter((r) => r.rating === s).length), 1)
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "pt-5 pb-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-6" }, [
                    createVNode("div", { class: "text-center shrink-0" }, [
                      createVNode("p", { class: "text-4xl font-bold tabular-nums text-foreground" }, toDisplayString(avgRating.value), 1),
                      createVNode("div", { class: "flex gap-0.5 justify-center" }, [
                        (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 4, 5], (i) => {
                          return createVNode(unref(Star), {
                            key: i,
                            class: [
                              "w-4 h-4",
                              i <= Math.round(Number(avgRating.value)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                            ]
                          }, null, 8, ["class"]);
                        }), 64))
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(totalReviews.value) + " reviews ", 1)
                    ]),
                    createVNode("div", { class: "w-px h-16 bg-border/60" }),
                    createVNode("div", { class: "flex-1 space-y-1.5" }, [
                      (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (s) => {
                        return createVNode("div", {
                          key: s,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode("span", { class: "text-xs w-3 text-right tabular-nums text-muted-foreground" }, toDisplayString(s), 1),
                          createVNode(unref(Star), { class: "w-3 h-3 fill-amber-400 text-amber-400 shrink-0" }),
                          createVNode("div", { class: "flex-1 h-2 bg-muted rounded-full overflow-hidden" }, [
                            createVNode("div", {
                              class: "h-full bg-amber-400 rounded-full",
                              style: {
                                width: `${reviews.filter((r) => r.rating === s).length / totalReviews.value * 100}%`
                              }
                            }, null, 4)
                          ]),
                          createVNode("span", { class: "text-xs text-muted-foreground w-4 tabular-nums text-right" }, toDisplayString(reviews.filter((r) => r.rating === s).length), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="space-y-3"><!--[-->`);
      ssrRenderList(reviews, (r) => {
        _push(ssrRenderComponent(unref(Card), {
          key: r.id,
          class: "border-0 shadow-md shadow-foreground/5 bg-card"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardContent), { class: "pt-4 pb-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-start justify-between gap-2"${_scopeId2}><div class="flex items-center gap-2.5"${_scopeId2}><div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary"${_scopeId2}>${ssrInterpolate(r.author.split(" ").map((n) => n[0]).join(""))}</div><div${_scopeId2}><p class="text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(r.author)}</p><p class="text-[11px] text-muted-foreground"${_scopeId2}>${ssrInterpolate(new Date(r.date).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }))}</p></div></div><div class="flex gap-0.5"${_scopeId2}><!--[-->`);
                    ssrRenderList([1, 2, 3, 4, 5], (i) => {
                      _push3(ssrRenderComponent(unref(Star), {
                        key: i,
                        class: [
                          "w-3.5 h-3.5",
                          i <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        ]
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div></div><p class="text-sm text-muted-foreground leading-relaxed mt-2"${_scopeId2}>${ssrInterpolate(r.comment)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                        createVNode("div", { class: "flex items-center gap-2.5" }, [
                          createVNode("div", { class: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary" }, toDisplayString(r.author.split(" ").map((n) => n[0]).join("")), 1),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(r.author), 1),
                            createVNode("p", { class: "text-[11px] text-muted-foreground" }, toDisplayString(new Date(r.date).toLocaleDateString("en-NG", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-0.5" }, [
                          (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 4, 5], (i) => {
                            return createVNode(unref(Star), {
                              key: i,
                              class: [
                                "w-3.5 h-3.5",
                                i <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                              ]
                            }, null, 8, ["class"]);
                          }), 64))
                        ])
                      ]),
                      createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed mt-2" }, toDisplayString(r.comment), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardContent), { class: "pt-4 pb-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                      createVNode("div", { class: "flex items-center gap-2.5" }, [
                        createVNode("div", { class: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary" }, toDisplayString(r.author.split(" ").map((n) => n[0]).join("")), 1),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(r.author), 1),
                          createVNode("p", { class: "text-[11px] text-muted-foreground" }, toDisplayString(new Date(r.date).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex gap-0.5" }, [
                        (openBlock(), createBlock(Fragment, null, renderList([1, 2, 3, 4, 5], (i) => {
                          return createVNode(unref(Star), {
                            key: i,
                            class: [
                              "w-3.5 h-3.5",
                              i <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                            ]
                          }, null, 8, ["class"]);
                        }), 64))
                      ])
                    ]),
                    createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed mt-2" }, toDisplayString(r.comment), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section></main><footer class="border-t bg-card mt-12"><div class="container max-w-5xl mx-auto px-4 py-6 text-center"><p class="text-xs text-muted-foreground"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ${ssrInterpolate(business.name)}. All rights reserved. </p></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/business.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=business-t0KOt9ra.mjs.map
