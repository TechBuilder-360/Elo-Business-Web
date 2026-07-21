import { computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, withDirectives, vModelSelect, createCommentVNode, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { u as useBusiness } from './useBusiness-BCRRRkfq.mjs';
import { useQueryClient } from '@tanstack/vue-query';
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from './card-Cq6gP5nL.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { T as Tabs, b as TabsList, c as TabsTrigger } from './tabs-1FqyMY98.mjs';
import { ArrowLeft, Wallet, EyeOff, Eye, ArrowDownLeft, ArrowUpRight, TrendingUp, ChevronRight, Landmark, Check, Copy } from 'lucide-vue-next';
import { b as useRoute$1, n as navigateTo } from './server.mjs';
import './useGraphQL-Bw_Hbd5v.mjs';
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

const Table = {
  name: "Table",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "div",
      { class: "relative w-full overflow-auto" },
      h(
        "table",
        { class: ["w-full caption-bottom text-sm", props.class] },
        slots.default?.()
      )
    );
  }
};
const TableHeader = {
  name: "TableHeader",
  props: { class: String },
  setup(props, { slots }) {
    return () => h("thead", { class: ["[&_tr]:border-b", props.class] }, slots.default?.());
  }
};
const TableBody = {
  name: "TableBody",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "tbody",
      { class: ["[&_tr:last-child]:border-0", props.class] },
      slots.default?.()
    );
  }
};
const TableRow = {
  name: "TableRow",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "tr",
      {
        class: [
          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
          props.class
        ]
      },
      slots.default?.()
    );
  }
};
const TableHead = {
  name: "TableHead",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "th",
      {
        class: [
          "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          props.class
        ]
      },
      slots.default?.()
    );
  }
};
const TableCell = {
  name: "TableCell",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "td",
      {
        class: [
          "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-foreground",
          props.class
        ]
      },
      slots.default?.()
    );
  }
};
const _sfc_main$1 = {
  __name: "WalletAccountDetails",
  __ssrInlineRender: true,
  props: {
    accounts: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const copiedId = ref(null);
    const handleCopy = (text, id) => {
      (void 0).clipboard.writeText(text);
      copiedId.value = id;
      setTimeout(() => {
        if (copiedId.value === id) {
          copiedId.value = null;
        }
      }, 1500);
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.accounts.length > 0) {
        _push(ssrRenderComponent(unref(Card), mergeProps({ class: "border-0 shadow-md shadow-foreground/5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base flex items-center gap-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Landmark), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                          _push4(` Account Details `);
                        } else {
                          return [
                            createVNode(unref(Landmark), { class: "w-4 h-4" }),
                            createTextVNode(" Account Details ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(CardTitle), { class: "text-base flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Landmark), { class: "w-4 h-4" }),
                          createTextVNode(" Account Details ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(CardContent), { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.accounts, (account) => {
                      _push3(`<div class="rounded-lg border border-border/60 p-4 space-y-3"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><div class="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Landmark), { class: "w-4 h-4 text-primary" }, null, _parent3, _scopeId2));
                      _push3(`</div><span class="text-sm font-semibold text-foreground"${_scopeId2}>${ssrInterpolate(account.bankName)}</span></div>`);
                      if (account.isPrimary) {
                        _push3(ssrRenderComponent(unref(Badge), {
                          variant: "secondary",
                          class: "text-[10px] text-foreground"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Primary `);
                            } else {
                              return [
                                createTextVNode(" Primary ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"${_scopeId2}><div class="flex items-center justify-between gap-2"${_scopeId2}><div${_scopeId2}><p class="text-[11px] text-muted-foreground"${_scopeId2}>Account Name</p><p class="text-sm font-medium font-mono tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(account.accountName)}</p></div></div><div class="flex items-center justify-between gap-2"${_scopeId2}><div${_scopeId2}><p class="text-[11px] text-muted-foreground"${_scopeId2}>Account Number</p><p class="text-sm font-medium font-mono tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(account.accountNumber)}</p></div>`);
                      _push3(ssrRenderComponent(unref(Button), {
                        variant: "ghost",
                        size: "icon",
                        class: "h-6 w-6 shrink-0 text-foreground",
                        onClick: ($event) => handleCopy(account.accountNumber, account.id + "-num")
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (copiedId.value === account.id + "-num") {
                              _push4(ssrRenderComponent(unref(Check), { class: "w-3 h-3 text-emerald-600" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 text-muted-foreground" }, null, _parent4, _scopeId3));
                            }
                          } else {
                            return [
                              copiedId.value === account.id + "-num" ? (openBlock(), createBlock(unref(Check), {
                                key: 0,
                                class: "w-3 h-3 text-emerald-600"
                              })) : (openBlock(), createBlock(unref(Copy), {
                                key: 1,
                                class: "w-3 h-3 text-muted-foreground"
                              }))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                      if (account.routingNumber) {
                        _push3(`<div class="flex items-center justify-between gap-2"${_scopeId2}><div${_scopeId2}><p class="text-[11px] text-muted-foreground"${_scopeId2}>Routing Number</p><p class="text-sm font-medium font-mono tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(account.routingNumber)}</p></div>`);
                        _push3(ssrRenderComponent(unref(Button), {
                          variant: "ghost",
                          size: "icon",
                          class: "h-6 w-6 shrink-0 text-foreground",
                          onClick: ($event) => handleCopy(account.routingNumber, account.id + "-route")
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              if (copiedId.value === account.id + "-route") {
                                _push4(ssrRenderComponent(unref(Check), { class: "w-3 h-3 text-emerald-600" }, null, _parent4, _scopeId3));
                              } else {
                                _push4(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 text-muted-foreground" }, null, _parent4, _scopeId3));
                              }
                            } else {
                              return [
                                copiedId.value === account.id + "-route" ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "w-3 h-3 text-emerald-600"
                                })) : (openBlock(), createBlock(unref(Copy), {
                                  key: 1,
                                  class: "w-3 h-3 text-muted-foreground"
                                }))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (account.sortCode) {
                        _push3(`<div class="flex items-center justify-between gap-2"${_scopeId2}><div${_scopeId2}><p class="text-[11px] text-muted-foreground"${_scopeId2}>Sort Code</p><p class="text-sm font-medium font-mono tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(account.sortCode)}</p></div>`);
                        _push3(ssrRenderComponent(unref(Button), {
                          variant: "ghost",
                          size: "icon",
                          class: "h-6 w-6 shrink-0 text-foreground",
                          onClick: ($event) => handleCopy(account.sortCode, account.id + "-sort")
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              if (copiedId.value === account.id + "-sort") {
                                _push4(ssrRenderComponent(unref(Check), { class: "w-3 h-3 text-emerald-600" }, null, _parent4, _scopeId3));
                              } else {
                                _push4(ssrRenderComponent(unref(Copy), { class: "w-3 h-3 text-muted-foreground" }, null, _parent4, _scopeId3));
                              }
                            } else {
                              return [
                                copiedId.value === account.id + "-sort" ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "w-3 h-3 text-emerald-600"
                                })) : (openBlock(), createBlock(unref(Copy), {
                                  key: 1,
                                  class: "w-3 h-3 text-muted-foreground"
                                }))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.accounts, (account) => {
                        return openBlock(), createBlock("div", {
                          key: account.id,
                          class: "rounded-lg border border-border/60 p-4 space-y-3"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("div", { class: "w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center" }, [
                                createVNode(unref(Landmark), { class: "w-4 h-4 text-primary" })
                              ]),
                              createVNode("span", { class: "text-sm font-semibold text-foreground" }, toDisplayString(account.bankName), 1)
                            ]),
                            account.isPrimary ? (openBlock(), createBlock(unref(Badge), {
                              key: 0,
                              variant: "secondary",
                              class: "text-[10px] text-foreground"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Primary ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
                            createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Account Name"),
                                createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.accountName), 1)
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Account Number"),
                                createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.accountNumber), 1)
                              ]),
                              createVNode(unref(Button), {
                                variant: "ghost",
                                size: "icon",
                                class: "h-6 w-6 shrink-0 text-foreground",
                                onClick: ($event) => handleCopy(account.accountNumber, account.id + "-num")
                              }, {
                                default: withCtx(() => [
                                  copiedId.value === account.id + "-num" ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "w-3 h-3 text-emerald-600"
                                  })) : (openBlock(), createBlock(unref(Copy), {
                                    key: 1,
                                    class: "w-3 h-3 text-muted-foreground"
                                  }))
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            account.routingNumber ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center justify-between gap-2"
                            }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Routing Number"),
                                createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.routingNumber), 1)
                              ]),
                              createVNode(unref(Button), {
                                variant: "ghost",
                                size: "icon",
                                class: "h-6 w-6 shrink-0 text-foreground",
                                onClick: ($event) => handleCopy(account.routingNumber, account.id + "-route")
                              }, {
                                default: withCtx(() => [
                                  copiedId.value === account.id + "-route" ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "w-3 h-3 text-emerald-600"
                                  })) : (openBlock(), createBlock(unref(Copy), {
                                    key: 1,
                                    class: "w-3 h-3 text-muted-foreground"
                                  }))
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])) : createCommentVNode("", true),
                            account.sortCode ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center justify-between gap-2"
                            }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Sort Code"),
                                createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.sortCode), 1)
                              ]),
                              createVNode(unref(Button), {
                                variant: "ghost",
                                size: "icon",
                                class: "h-6 w-6 shrink-0 text-foreground",
                                onClick: ($event) => handleCopy(account.sortCode, account.id + "-sort")
                              }, {
                                default: withCtx(() => [
                                  copiedId.value === account.id + "-sort" ? (openBlock(), createBlock(unref(Check), {
                                    key: 0,
                                    class: "w-3 h-3 text-emerald-600"
                                  })) : (openBlock(), createBlock(unref(Copy), {
                                    key: 1,
                                    class: "w-3 h-3 text-muted-foreground"
                                  }))
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardHeader), { class: "pb-3" }, {
                  default: withCtx(() => [
                    createVNode(unref(CardTitle), { class: "text-base flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Landmark), { class: "w-4 h-4" }),
                        createTextVNode(" Account Details ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(CardContent), { class: "space-y-3" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.accounts, (account) => {
                      return openBlock(), createBlock("div", {
                        key: account.id,
                        class: "rounded-lg border border-border/60 p-4 space-y-3"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", { class: "w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center" }, [
                              createVNode(unref(Landmark), { class: "w-4 h-4 text-primary" })
                            ]),
                            createVNode("span", { class: "text-sm font-semibold text-foreground" }, toDisplayString(account.bankName), 1)
                          ]),
                          account.isPrimary ? (openBlock(), createBlock(unref(Badge), {
                            key: 0,
                            variant: "secondary",
                            class: "text-[10px] text-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Primary ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Account Name"),
                              createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.accountName), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Account Number"),
                              createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.accountNumber), 1)
                            ]),
                            createVNode(unref(Button), {
                              variant: "ghost",
                              size: "icon",
                              class: "h-6 w-6 shrink-0 text-foreground",
                              onClick: ($event) => handleCopy(account.accountNumber, account.id + "-num")
                            }, {
                              default: withCtx(() => [
                                copiedId.value === account.id + "-num" ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "w-3 h-3 text-emerald-600"
                                })) : (openBlock(), createBlock(unref(Copy), {
                                  key: 1,
                                  class: "w-3 h-3 text-muted-foreground"
                                }))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          account.routingNumber ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center justify-between gap-2"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Routing Number"),
                              createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.routingNumber), 1)
                            ]),
                            createVNode(unref(Button), {
                              variant: "ghost",
                              size: "icon",
                              class: "h-6 w-6 shrink-0 text-foreground",
                              onClick: ($event) => handleCopy(account.routingNumber, account.id + "-route")
                            }, {
                              default: withCtx(() => [
                                copiedId.value === account.id + "-route" ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "w-3 h-3 text-emerald-600"
                                })) : (openBlock(), createBlock(unref(Copy), {
                                  key: 1,
                                  class: "w-3 h-3 text-muted-foreground"
                                }))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])) : createCommentVNode("", true),
                          account.sortCode ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex items-center justify-between gap-2"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-[11px] text-muted-foreground" }, "Sort Code"),
                              createVNode("p", { class: "text-sm font-medium font-mono tabular-nums text-foreground" }, toDisplayString(account.sortCode), 1)
                            ]),
                            createVNode(unref(Button), {
                              variant: "ghost",
                              size: "icon",
                              class: "h-6 w-6 shrink-0 text-foreground",
                              onClick: ($event) => handleCopy(account.sortCode, account.id + "-sort")
                            }, {
                              default: withCtx(() => [
                                copiedId.value === account.id + "-sort" ? (openBlock(), createBlock(unref(Check), {
                                  key: 0,
                                  class: "w-3 h-3 text-emerald-600"
                                })) : (openBlock(), createBlock(unref(Copy), {
                                  key: 1,
                                  class: "w-3 h-3 text-muted-foreground"
                                }))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/wallet/AccountDetails.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "wallet",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const businessName = computed(() => route.query.name || "My Business");
    const selectedWallet = ref(null);
    const showBalance = ref(true);
    const txFilter = ref("all");
    const { getWalletsQuery, getCurrenciesQuery, addWallet } = useBusiness();
    const qc = useQueryClient();
    const {
      data: walletsData,
      isPending: isWalletsPending,
      isError: isWalletsError,
      error: walletsError
    } = getWalletsQuery("TREASURY");
    const { data: currenciesData } = getCurrenciesQuery();
    const showAddWalletModal = ref(false);
    const selectedCurrencyCode = ref("");
    const isAddingWallet = ref(false);
    const fiatCurrencies = computed(
      () => currenciesData.value?.currencies?.filter((c) => c.is_fiat) || []
    );
    const handleAddWallet = async () => {
      if (!selectedCurrencyCode.value) return;
      isAddingWallet.value = true;
      const curr = fiatCurrencies.value.find((c) => c.code === selectedCurrencyCode.value) || {};
      const optimisticWallet = {
        id: `optimistic-${Date.now()}`,
        currency: selectedCurrencyCode.value,
        symbol: curr.symbol || selectedCurrencyCode.value
      };
      qc.setQueryData(["wallets", "TREASURY"], (old) => ({
        wallets: [
          ...old?.wallets || [],
          {
            id: optimisticWallet.id,
            currency: optimisticWallet.currency,
            available_balance: 0,
            ledger_balance: 0,
            holding_balance: 0,
            type: "TREASURY",
            active: true
          }
        ]
      }));
      showAddWalletModal.value = false;
      try {
        await addWallet.mutateAsync({
          currency_code: selectedCurrencyCode.value,
          wallet_type: "TREASURY"
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
      const fetchedWallets = walletsData.value?.wallets;
      if (!fetchedWallets) return [];
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
          transactions: [],
          // will wire up once transaction query is available
          accounts: []
        };
      });
    });
    const formatAmount = (amount, symbol) => {
      return `${symbol}${amount.toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
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
        (t) => t.type === txFilter.value
      );
    });
    const handleBackToDashboard = () => {
      navigateTo({
        path: "/dashboard",
        query: { name: businessName.value }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><header class="border-b bg-card sticky top-0 z-10"><div class="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        class: "h-9 w-9 text-foreground",
        onClick: handleBackToDashboard
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "w-4 h-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Wallet), { class: "w-5 h-5 text-primary-foreground" }, null, _parent));
      _push(`</div><div><h1 class="text-lg font-bold leading-tight">Wallet</h1><p class="text-xs text-muted-foreground">${ssrInterpolate(businessName.value)}</p></div></div></div></header><main class="container max-w-6xl mx-auto py-6 px-4">`);
      if (selectedWallet.value) {
        _push(`<div class="space-y-6">`);
        _push(ssrRenderComponent(unref(Button), {
          variant: "ghost",
          size: "sm",
          class: "gap-1.5 -ml-2 text-muted-foreground",
          onClick: ($event) => selectedWallet.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` All Wallets `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
                createTextVNode(" All Wallets ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 overflow-hidden bg-card" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="bg-primary/5 p-6 pb-8"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><p class="text-sm font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(selectedWallet.value.currency)} Balance </p>`);
              _push2(ssrRenderComponent(unref(Button), {
                variant: "ghost",
                size: "icon",
                class: "h-8 w-8 text-foreground",
                onClick: ($event) => showBalance.value = !showBalance.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (showBalance.value) {
                      _push3(ssrRenderComponent(unref(EyeOff), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      showBalance.value ? (openBlock(), createBlock(unref(EyeOff), {
                        key: 0,
                        class: "w-4 h-4"
                      })) : (openBlock(), createBlock(unref(Eye), {
                        key: 1,
                        class: "w-4 h-4"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><p class="text-3xl font-bold tracking-tight text-foreground"${_scopeId}>${ssrInterpolate(showBalance.value ? formatAmount(selectedWallet.value.balance, selectedWallet.value.symbol) : `${selectedWallet.value.symbol}••••••`)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "bg-primary/5 p-6 pb-8" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("p", { class: "text-sm font-medium text-muted-foreground" }, toDisplayString(selectedWallet.value.currency) + " Balance ", 1),
                    createVNode(unref(Button), {
                      variant: "ghost",
                      size: "icon",
                      class: "h-8 w-8 text-foreground",
                      onClick: ($event) => showBalance.value = !showBalance.value
                    }, {
                      default: withCtx(() => [
                        showBalance.value ? (openBlock(), createBlock(unref(EyeOff), {
                          key: 0,
                          class: "w-4 h-4"
                        })) : (openBlock(), createBlock(unref(Eye), {
                          key: 1,
                          class: "w-4 h-4"
                        }))
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  createVNode("p", { class: "text-3xl font-bold tracking-tight text-foreground" }, toDisplayString(showBalance.value ? formatAmount(selectedWallet.value.balance, selectedWallet.value.symbol) : `${selectedWallet.value.symbol}••••••`), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">`);
        _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-center gap-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ArrowDownLeft), { class: "w-4 h-4 text-emerald-600" }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Revenue</p><p class="text-lg font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(formatAmount(
                      selectedWallet.value.totalRevenue,
                      selectedWallet.value.symbol
                    ))}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0" }, [
                        createVNode(unref(ArrowDownLeft), { class: "w-4 h-4 text-emerald-600" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Revenue"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(
                          selectedWallet.value.totalRevenue,
                          selectedWallet.value.symbol
                        )), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardContent), { class: "p-4 flex items-center gap-3" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0" }, [
                      createVNode(unref(ArrowDownLeft), { class: "w-4 h-4 text-emerald-600" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Revenue"),
                      createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(
                        selectedWallet.value.totalRevenue,
                        selectedWallet.value.symbol
                      )), 1)
                    ])
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
              _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-center gap-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ArrowUpRight), { class: "w-4 h-4 text-red-600" }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Spent</p><p class="text-lg font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(formatAmount(
                      selectedWallet.value.totalSpent,
                      selectedWallet.value.symbol
                    ))}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0" }, [
                        createVNode(unref(ArrowUpRight), { class: "w-4 h-4 text-red-600" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Spent"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(
                          selectedWallet.value.totalSpent,
                          selectedWallet.value.symbol
                        )), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardContent), { class: "p-4 flex items-center gap-3" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0" }, [
                      createVNode(unref(ArrowUpRight), { class: "w-4 h-4 text-red-600" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Spent"),
                      createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(
                        selectedWallet.value.totalSpent,
                        selectedWallet.value.symbol
                      )), 1)
                    ])
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
              _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-center gap-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(TrendingUp), { class: "w-4 h-4 text-amber-600" }, null, _parent3, _scopeId2));
                    _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Pending</p><p class="text-lg font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(formatAmount(
                      selectedWallet.value.pendingAmount,
                      selectedWallet.value.symbol
                    ))}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0" }, [
                        createVNode(unref(TrendingUp), { class: "w-4 h-4 text-amber-600" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Pending"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(
                          selectedWallet.value.pendingAmount,
                          selectedWallet.value.symbol
                        )), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardContent), { class: "p-4 flex items-center gap-3" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0" }, [
                      createVNode(unref(TrendingUp), { class: "w-4 h-4 text-amber-600" })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Pending"),
                      createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(
                        selectedWallet.value.pendingAmount,
                        selectedWallet.value.symbol
                      )), 1)
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
        _push(ssrRenderComponent(_sfc_main$1, {
          accounts: selectedWallet.value.accounts
        }, null, _parent));
        _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardHeader), { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base text-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Transactions`);
                        } else {
                          return [
                            createTextVNode("Transactions")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Tabs), {
                      modelValue: txFilter.value,
                      "onUpdate:modelValue": (val) => txFilter.value = val
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(TabsList), { class: "h-8" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(TabsTrigger), {
                                  value: "all",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` All `);
                                    } else {
                                      return [
                                        createTextVNode(" All ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(TabsTrigger), {
                                  value: "credit",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Credits `);
                                    } else {
                                      return [
                                        createTextVNode(" Credits ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(TabsTrigger), {
                                  value: "debit",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Debits `);
                                    } else {
                                      return [
                                        createTextVNode(" Debits ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(TabsTrigger), {
                                    value: "all",
                                    class: "text-xs px-2.5 h-6"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" All ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(TabsTrigger), {
                                    value: "credit",
                                    class: "text-xs px-2.5 h-6"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Credits ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(TabsTrigger), {
                                    value: "debit",
                                    class: "text-xs px-2.5 h-6"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Debits ")
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
                                  value: "all",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" All ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TabsTrigger), {
                                  value: "credit",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Credits ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TabsTrigger), {
                                  value: "debit",
                                  class: "text-xs px-2.5 h-6"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Debits ")
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
                          createTextVNode("Transactions")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Tabs), {
                        modelValue: txFilter.value,
                        "onUpdate:modelValue": (val) => txFilter.value = val
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(TabsList), { class: "h-8" }, {
                            default: withCtx(() => [
                              createVNode(unref(TabsTrigger), {
                                value: "all",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" All ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(TabsTrigger), {
                                value: "credit",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Credits ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(TabsTrigger), {
                                value: "debit",
                                class: "text-xs px-2.5 h-6"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Debits ")
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
              _push2(ssrRenderComponent(unref(CardContent), { class: "px-0 pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Table), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(TableHeader), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(TableRow), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(TableHead), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Description`);
                                          } else {
                                            return [
                                              createTextVNode("Description")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Reference `);
                                          } else {
                                            return [
                                              createTextVNode(" Reference ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Date`);
                                          } else {
                                            return [
                                              createTextVNode("Date")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(TableHead), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Status`);
                                          } else {
                                            return [
                                              createTextVNode("Status")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(TableHead), { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Amount`);
                                          } else {
                                            return [
                                              createTextVNode("Amount")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(TableHead), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Description")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Reference ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(TableHead), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(TableHead), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Amount")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(TableRow), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(TableHead), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Description")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Reference ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(TableHead), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(TableHead), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Amount")
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(TableBody), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(filteredTransactions.value, (tx) => {
                                  _push5(ssrRenderComponent(unref(TableRow), {
                                    key: tx.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(TableCell), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="flex items-center gap-2"${_scopeId6}><div class="${ssrRenderClass([
                                                "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                                tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                                              ])}"${_scopeId6}>`);
                                              if (tx.type === "credit") {
                                                _push7(ssrRenderComponent(unref(ArrowDownLeft), { class: "w-3.5 h-3.5 text-emerald-600" }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(ssrRenderComponent(unref(ArrowUpRight), { class: "w-3.5 h-3.5 text-red-600" }, null, _parent7, _scopeId6));
                                              }
                                              _push7(`</div><span class="text-sm text-foreground"${_scopeId6}>${ssrInterpolate(tx.description)}</span></div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createVNode("div", {
                                                    class: [
                                                      "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                                      tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                                                    ]
                                                  }, [
                                                    tx.type === "credit" ? (openBlock(), createBlock(unref(ArrowDownLeft), {
                                                      key: 0,
                                                      class: "w-3.5 h-3.5 text-emerald-600"
                                                    })) : (openBlock(), createBlock(unref(ArrowUpRight), {
                                                      key: 1,
                                                      class: "w-3.5 h-3.5 text-red-600"
                                                    }))
                                                  ], 2),
                                                  createVNode("span", { class: "text-sm text-foreground" }, toDisplayString(tx.description), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground font-mono" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(tx.reference)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(tx.reference), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(new Date(tx.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short"
                                              }))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(new Date(tx.date).toLocaleDateString("en-GB", {
                                                  day: "numeric",
                                                  month: "short"
                                                })), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(TableCell), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(Badge), {
                                                variant: "outline",
                                                class: [
                                                  "text-[10px] capitalize font-medium",
                                                  statusColor(tx.status)
                                                ]
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(tx.status)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(tx.status), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(Badge), {
                                                  variant: "outline",
                                                  class: [
                                                    "text-[10px] capitalize font-medium",
                                                    statusColor(tx.status)
                                                  ]
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(tx.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(TableCell), {
                                          class: [
                                            "text-right font-medium tabular-nums text-sm",
                                            tx.type === "credit" ? "text-emerald-700" : "text-foreground"
                                          ]
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(tx.type === "credit" ? "+" : "−")}${ssrInterpolate(formatAmount(tx.amount, selectedWallet.value.symbol))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(tx.type === "credit" ? "+" : "−") + toDisplayString(formatAmount(tx.amount, selectedWallet.value.symbol)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(TableCell), null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                createVNode("div", {
                                                  class: [
                                                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                                    tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                                                  ]
                                                }, [
                                                  tx.type === "credit" ? (openBlock(), createBlock(unref(ArrowDownLeft), {
                                                    key: 0,
                                                    class: "w-3.5 h-3.5 text-emerald-600"
                                                  })) : (openBlock(), createBlock(unref(ArrowUpRight), {
                                                    key: 1,
                                                    class: "w-3.5 h-3.5 text-red-600"
                                                  }))
                                                ], 2),
                                                createVNode("span", { class: "text-sm text-foreground" }, toDisplayString(tx.description), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground font-mono" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(tx.reference), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(tx.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short"
                                              })), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(TableCell), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(Badge), {
                                                variant: "outline",
                                                class: [
                                                  "text-[10px] capitalize font-medium",
                                                  statusColor(tx.status)
                                                ]
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(tx.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(TableCell), {
                                            class: [
                                              "text-right font-medium tabular-nums text-sm",
                                              tx.type === "credit" ? "text-emerald-700" : "text-foreground"
                                            ]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(tx.type === "credit" ? "+" : "−") + toDisplayString(formatAmount(tx.amount, selectedWallet.value.symbol)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredTransactions.value, (tx) => {
                                    return openBlock(), createBlock(unref(TableRow), {
                                      key: tx.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(TableCell), null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode("div", {
                                                class: [
                                                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                                  tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                                                ]
                                              }, [
                                                tx.type === "credit" ? (openBlock(), createBlock(unref(ArrowDownLeft), {
                                                  key: 0,
                                                  class: "w-3.5 h-3.5 text-emerald-600"
                                                })) : (openBlock(), createBlock(unref(ArrowUpRight), {
                                                  key: 1,
                                                  class: "w-3.5 h-3.5 text-red-600"
                                                }))
                                              ], 2),
                                              createVNode("span", { class: "text-sm text-foreground" }, toDisplayString(tx.description), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground font-mono" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(tx.reference), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(tx.date).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "short"
                                            })), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(TableCell), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(Badge), {
                                              variant: "outline",
                                              class: [
                                                "text-[10px] capitalize font-medium",
                                                statusColor(tx.status)
                                              ]
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(tx.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(TableCell), {
                                          class: [
                                            "text-right font-medium tabular-nums text-sm",
                                            tx.type === "credit" ? "text-emerald-700" : "text-foreground"
                                          ]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(tx.type === "credit" ? "+" : "−") + toDisplayString(formatAmount(tx.amount, selectedWallet.value.symbol)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(TableHeader), null, {
                              default: withCtx(() => [
                                createVNode(unref(TableRow), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(TableHead), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Description")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Reference ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Date")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(TableHead), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(TableHead), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Amount")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(TableBody), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredTransactions.value, (tx) => {
                                  return openBlock(), createBlock(unref(TableRow), {
                                    key: tx.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(TableCell), null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode("div", {
                                              class: [
                                                "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                                tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                                              ]
                                            }, [
                                              tx.type === "credit" ? (openBlock(), createBlock(unref(ArrowDownLeft), {
                                                key: 0,
                                                class: "w-3.5 h-3.5 text-emerald-600"
                                              })) : (openBlock(), createBlock(unref(ArrowUpRight), {
                                                key: 1,
                                                class: "w-3.5 h-3.5 text-red-600"
                                              }))
                                            ], 2),
                                            createVNode("span", { class: "text-sm text-foreground" }, toDisplayString(tx.description), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground font-mono" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(tx.reference), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(tx.date).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short"
                                          })), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(TableCell), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Badge), {
                                            variant: "outline",
                                            class: [
                                              "text-[10px] capitalize font-medium",
                                              statusColor(tx.status)
                                            ]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(tx.status), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(TableCell), {
                                        class: [
                                          "text-right font-medium tabular-nums text-sm",
                                          tx.type === "credit" ? "text-emerald-700" : "text-foreground"
                                        ]
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(tx.type === "credit" ? "+" : "−") + toDisplayString(formatAmount(tx.amount, selectedWallet.value.symbol)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
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
                      createVNode(unref(Table), null, {
                        default: withCtx(() => [
                          createVNode(unref(TableHeader), null, {
                            default: withCtx(() => [
                              createVNode(unref(TableRow), null, {
                                default: withCtx(() => [
                                  createVNode(unref(TableHead), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Description")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Reference ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Date")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(TableHead), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(TableHead), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Amount")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(TableBody), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredTransactions.value, (tx) => {
                                return openBlock(), createBlock(unref(TableRow), {
                                  key: tx.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(TableCell), null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode("div", {
                                            class: [
                                              "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                              tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                                            ]
                                          }, [
                                            tx.type === "credit" ? (openBlock(), createBlock(unref(ArrowDownLeft), {
                                              key: 0,
                                              class: "w-3.5 h-3.5 text-emerald-600"
                                            })) : (openBlock(), createBlock(unref(ArrowUpRight), {
                                              key: 1,
                                              class: "w-3.5 h-3.5 text-red-600"
                                            }))
                                          ], 2),
                                          createVNode("span", { class: "text-sm text-foreground" }, toDisplayString(tx.description), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground font-mono" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(tx.reference), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(new Date(tx.date).toLocaleDateString("en-GB", {
                                          day: "numeric",
                                          month: "short"
                                        })), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(TableCell), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Badge), {
                                          variant: "outline",
                                          class: [
                                            "text-[10px] capitalize font-medium",
                                            statusColor(tx.status)
                                          ]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(tx.status), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(TableCell), {
                                      class: [
                                        "text-right font-medium tabular-nums text-sm",
                                        tx.type === "credit" ? "text-emerald-700" : "text-foreground"
                                      ]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(tx.type === "credit" ? "+" : "−") + toDisplayString(formatAmount(tx.amount, selectedWallet.value.symbol)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
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
                createVNode(unref(CardHeader), { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Transactions")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Tabs), {
                      modelValue: txFilter.value,
                      "onUpdate:modelValue": (val) => txFilter.value = val
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(TabsList), { class: "h-8" }, {
                          default: withCtx(() => [
                            createVNode(unref(TabsTrigger), {
                              value: "all",
                              class: "text-xs px-2.5 h-6"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" All ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(TabsTrigger), {
                              value: "credit",
                              class: "text-xs px-2.5 h-6"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Credits ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(TabsTrigger), {
                              value: "debit",
                              class: "text-xs px-2.5 h-6"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Debits ")
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
                createVNode(unref(CardContent), { class: "px-0 pb-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(Table), null, {
                      default: withCtx(() => [
                        createVNode(unref(TableHeader), null, {
                          default: withCtx(() => [
                            createVNode(unref(TableRow), null, {
                              default: withCtx(() => [
                                createVNode(unref(TableHead), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Description")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Reference ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TableHead), { class: "hidden sm:table-cell" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TableHead), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(TableHead), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Amount")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(TableBody), null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredTransactions.value, (tx) => {
                              return openBlock(), createBlock(unref(TableRow), {
                                key: tx.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(TableCell), null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("div", {
                                          class: [
                                            "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                            tx.type === "credit" ? "bg-emerald-500/10" : "bg-red-500/10"
                                          ]
                                        }, [
                                          tx.type === "credit" ? (openBlock(), createBlock(unref(ArrowDownLeft), {
                                            key: 0,
                                            class: "w-3.5 h-3.5 text-emerald-600"
                                          })) : (openBlock(), createBlock(unref(ArrowUpRight), {
                                            key: 1,
                                            class: "w-3.5 h-3.5 text-red-600"
                                          }))
                                        ], 2),
                                        createVNode("span", { class: "text-sm text-foreground" }, toDisplayString(tx.description), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground font-mono" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(tx.reference), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(TableCell), { class: "hidden sm:table-cell text-xs text-muted-foreground" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(new Date(tx.date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short"
                                      })), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(TableCell), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Badge), {
                                        variant: "outline",
                                        class: [
                                          "text-[10px] capitalize font-medium",
                                          statusColor(tx.status)
                                        ]
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(tx.status), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(TableCell), {
                                    class: [
                                      "text-right font-medium tabular-nums text-sm",
                                      tx.type === "credit" ? "text-emerald-700" : "text-foreground"
                                    ]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(tx.type === "credit" ? "+" : "−") + toDisplayString(formatAmount(tx.amount, selectedWallet.value.symbol)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
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
        _push(`</div>`);
      } else if (unref(isWalletsPending)) {
        _push(`<div class="space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
        ssrRenderList(2, (i) => {
          _push(`<div class="rounded-xl border-0 bg-card shadow-md shadow-foreground/5 p-5 animate-pulse"><div class="h-5 w-16 bg-muted rounded mb-4"></div><div class="h-3 w-24 bg-muted rounded mb-2"></div><div class="h-8 w-40 bg-muted rounded mb-4"></div><div class="flex gap-4 pt-3 border-t border-border/50"><div class="h-3 w-20 bg-muted rounded"></div><div class="h-3 w-20 bg-muted rounded"></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="space-y-6 animate-in fade-in duration-300"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
        if (wallets.value.length === 0) {
          _push(`<div class="col-span-2 flex flex-col items-center justify-center py-20 text-muted-foreground"><div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">`);
          _push(ssrRenderComponent(unref(Wallet), { class: "w-8 h-8 text-primary" }, null, _parent));
          _push(`</div><p class="text-base font-semibold text-foreground mb-1">No wallets yet</p><p class="text-sm mb-5">Create your first Treasury wallet to start transacting.</p>`);
          _push(ssrRenderComponent(unref(Button), {
            onClick: ($event) => showAddWalletModal.value = true,
            class: "gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-lg leading-none"${_scopeId}>+</span> Add Wallet `);
              } else {
                return [
                  createVNode("span", { class: "text-lg leading-none" }, "+"),
                  createTextVNode(" Add Wallet ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(wallets.value, (w) => {
          _push(ssrRenderComponent(unref(Card), {
            key: w.currency,
            class: "border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow active:scale-[0.98] transition-transform bg-card",
            onClick: ($event) => selectedWallet.value = w
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(CardContent), { class: "p-5" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center justify-between mb-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Badge), {
                        variant: "secondary",
                        class: "text-xs font-semibold text-foreground"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(w.currency)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(w.currency), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                      _push3(`</div><p class="text-xs text-muted-foreground mb-1"${_scopeId2}> Available Balance </p><p class="text-2xl font-bold tracking-tight tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(formatAmount(w.balance, w.symbol))}</p><div class="flex items-center gap-4 mt-4 pt-3 border-t border-border/50"${_scopeId2}><div class="flex items-center gap-1.5 text-xs text-muted-foreground"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(ArrowDownLeft), { class: "w-3 h-3 text-emerald-600" }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>${ssrInterpolate(formatAmount(w.totalRevenue, w.symbol))}</span></div><div class="flex items-center gap-1.5 text-xs text-muted-foreground"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(ArrowUpRight), { class: "w-3 h-3 text-red-600" }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>${ssrInterpolate(formatAmount(w.totalSpent, w.symbol))}</span></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode(unref(Badge), {
                            variant: "secondary",
                            class: "text-xs font-semibold text-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(w.currency), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(ChevronRight), { class: "w-4 h-4 text-muted-foreground" })
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground mb-1" }, " Available Balance "),
                        createVNode("p", { class: "text-2xl font-bold tracking-tight tabular-nums text-foreground" }, toDisplayString(formatAmount(w.balance, w.symbol)), 1),
                        createVNode("div", { class: "flex items-center gap-4 mt-4 pt-3 border-t border-border/50" }, [
                          createVNode("div", { class: "flex items-center gap-1.5 text-xs text-muted-foreground" }, [
                            createVNode(unref(ArrowDownLeft), { class: "w-3 h-3 text-emerald-600" }),
                            createVNode("span", null, toDisplayString(formatAmount(w.totalRevenue, w.symbol)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-1.5 text-xs text-muted-foreground" }, [
                            createVNode(unref(ArrowUpRight), { class: "w-3 h-3 text-red-600" }),
                            createVNode("span", null, toDisplayString(formatAmount(w.totalSpent, w.symbol)), 1)
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(CardContent), { class: "p-5" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode(unref(Badge), {
                          variant: "secondary",
                          class: "text-xs font-semibold text-foreground"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(w.currency), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(ChevronRight), { class: "w-4 h-4 text-muted-foreground" })
                      ]),
                      createVNode("p", { class: "text-xs text-muted-foreground mb-1" }, " Available Balance "),
                      createVNode("p", { class: "text-2xl font-bold tracking-tight tabular-nums text-foreground" }, toDisplayString(formatAmount(w.balance, w.symbol)), 1),
                      createVNode("div", { class: "flex items-center gap-4 mt-4 pt-3 border-t border-border/50" }, [
                        createVNode("div", { class: "flex items-center gap-1.5 text-xs text-muted-foreground" }, [
                          createVNode(unref(ArrowDownLeft), { class: "w-3 h-3 text-emerald-600" }),
                          createVNode("span", null, toDisplayString(formatAmount(w.totalRevenue, w.symbol)), 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-1.5 text-xs text-muted-foreground" }, [
                          createVNode(unref(ArrowUpRight), { class: "w-3 h-3 text-red-600" }),
                          createVNode("span", null, toDisplayString(formatAmount(w.totalSpent, w.symbol)), 1)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
        if (wallets.value.length > 0) {
          _push(`<div class="flex justify-end">`);
          _push(ssrRenderComponent(unref(Button), {
            variant: "outline",
            class: "gap-2",
            onClick: ($event) => showAddWalletModal.value = true
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-lg leading-none"${_scopeId}>+</span> Add Wallet `);
              } else {
                return [
                  createVNode("span", { class: "text-lg leading-none" }, "+"),
                  createTextVNode(" Add Wallet ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</main>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showAddWalletModal.value) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">`);
          _push2(ssrRenderComponent(unref(Card), { class: "w-full max-w-sm border-0 shadow-2xl bg-card" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(unref(CardTitle), { class: "text-base text-foreground" }, {
                        default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                          if (_push5) {
                            _push5(`Add Treasury Wallet`);
                          } else {
                            return [
                              createTextVNode("Add Treasury Wallet")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push4(`<p class="text-xs text-muted-foreground mt-1"${_scopeId2}>Select a currency to create your wallet</p>`);
                    } else {
                      return [
                        createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode("Add Treasury Wallet")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Select a currency to create your wallet")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push3(ssrRenderComponent(unref(CardContent), { class: "space-y-4" }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(`<div class="space-y-2"${_scopeId2}><label class="text-sm font-medium text-foreground"${_scopeId2}>Currency</label><select class="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"${_scopeId2}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(selectedCurrencyCode.value) ? ssrLooseContain(selectedCurrencyCode.value, "") : ssrLooseEqual(selectedCurrencyCode.value, "")) ? " selected" : ""}${_scopeId2}>Select currency...</option><!--[-->`);
                      ssrRenderList(fiatCurrencies.value, (c) => {
                        _push4(`<option${ssrRenderAttr("value", c.code)}${ssrIncludeBooleanAttr(Array.isArray(selectedCurrencyCode.value) ? ssrLooseContain(selectedCurrencyCode.value, c.code) : ssrLooseEqual(selectedCurrencyCode.value, c.code)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(c.symbol)} ${ssrInterpolate(c.name)} (${ssrInterpolate(c.code)}) </option>`);
                      });
                      _push4(`<!--]--></select></div><div class="flex gap-3 pt-2"${_scopeId2}>`);
                      _push4(ssrRenderComponent(unref(Button), {
                        variant: "outline",
                        class: "flex-1",
                        onClick: ($event) => showAddWalletModal.value = false
                      }, {
                        default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                          if (_push5) {
                            _push5(` Cancel `);
                          } else {
                            return [
                              createTextVNode(" Cancel ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push4(ssrRenderComponent(unref(Button), {
                        class: "flex-1",
                        disabled: !selectedCurrencyCode.value || isAddingWallet.value,
                        onClick: handleAddWallet
                      }, {
                        default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                          if (_push5) {
                            if (isAddingWallet.value) {
                              _push5(`<span${_scopeId3}>Creating...</span>`);
                            } else {
                              _push5(`<span${_scopeId3}>Create Wallet</span>`);
                            }
                          } else {
                            return [
                              isAddingWallet.value ? (openBlock(), createBlock("span", { key: 0 }, "Creating...")) : (openBlock(), createBlock("span", { key: 1 }, "Create Wallet"))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push4(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-sm font-medium text-foreground" }, "Currency"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => selectedCurrencyCode.value = $event,
                            class: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          }, [
                            createVNode("option", {
                              value: "",
                              disabled: ""
                            }, "Select currency..."),
                            (openBlock(true), createBlock(Fragment, null, renderList(fiatCurrencies.value, (c) => {
                              return openBlock(), createBlock("option", {
                                key: c.code,
                                value: c.code
                              }, toDisplayString(c.symbol) + " " + toDisplayString(c.name) + " (" + toDisplayString(c.code) + ") ", 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, selectedCurrencyCode.value]
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-3 pt-2" }, [
                          createVNode(unref(Button), {
                            variant: "outline",
                            class: "flex-1",
                            onClick: ($event) => showAddWalletModal.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(Button), {
                            class: "flex-1",
                            disabled: !selectedCurrencyCode.value || isAddingWallet.value,
                            onClick: handleAddWallet
                          }, {
                            default: withCtx(() => [
                              isAddingWallet.value ? (openBlock(), createBlock("span", { key: 0 }, "Creating...")) : (openBlock(), createBlock("span", { key: 1 }, "Create Wallet"))
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(CardHeader), { class: "pb-3" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Add Treasury Wallet")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Select a currency to create your wallet")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardContent), { class: "space-y-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-foreground" }, "Currency"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedCurrencyCode.value = $event,
                          class: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Select currency..."),
                          (openBlock(true), createBlock(Fragment, null, renderList(fiatCurrencies.value, (c) => {
                            return openBlock(), createBlock("option", {
                              key: c.code,
                              value: c.code
                            }, toDisplayString(c.symbol) + " " + toDisplayString(c.name) + " (" + toDisplayString(c.code) + ") ", 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedCurrencyCode.value]
                        ])
                      ]),
                      createVNode("div", { class: "flex gap-3 pt-2" }, [
                        createVNode(unref(Button), {
                          variant: "outline",
                          class: "flex-1",
                          onClick: ($event) => showAddWalletModal.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(Button), {
                          class: "flex-1",
                          disabled: !selectedCurrencyCode.value || isAddingWallet.value,
                          onClick: handleAddWallet
                        }, {
                          default: withCtx(() => [
                            isAddingWallet.value ? (openBlock(), createBlock("span", { key: 0 }, "Creating...")) : (openBlock(), createBlock("span", { key: 1 }, "Create Wallet"))
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wallet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wallet-B23wld1-.mjs.map
