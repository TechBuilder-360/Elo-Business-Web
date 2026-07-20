import { computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from './card-Cq6gP5nL.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { T as Tabs, b as TabsList, c as TabsTrigger } from './tabs-1FqyMY98.mjs';
import { ArrowLeft, Wallet, EyeOff, Eye, ArrowDownLeft, ArrowUpRight, TrendingUp, ChevronRight, Landmark, Check, Copy } from 'lucide-vue-next';
import { b as useRoute$1, n as navigateTo } from './server.mjs';
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
    const ngnTransactions = [
      {
        id: "1",
        type: "credit",
        description: "Payment from Adewale B.",
        amount: 125e3,
        date: "2026-03-18",
        status: "completed",
        reference: "TXN-NGN-8271"
      },
      {
        id: "2",
        type: "debit",
        description: "Supplier — Kemi Fabrics",
        amount: 45e3,
        date: "2026-03-17",
        status: "completed",
        reference: "TXN-NGN-8270"
      },
      {
        id: "3",
        type: "credit",
        description: "Service fee — Hair styling",
        amount: 18500,
        date: "2026-03-16",
        status: "completed",
        reference: "TXN-NGN-8269"
      },
      {
        id: "4",
        type: "credit",
        description: "Product sale — Skincare set",
        amount: 32e3,
        date: "2026-03-15",
        status: "pending",
        reference: "TXN-NGN-8268"
      },
      {
        id: "5",
        type: "debit",
        description: "Withdrawal to GTBank",
        amount: 2e5,
        date: "2026-03-14",
        status: "completed",
        reference: "TXN-NGN-8267"
      },
      {
        id: "6",
        type: "credit",
        description: "Payment from Tunde M.",
        amount: 67e3,
        date: "2026-03-12",
        status: "completed",
        reference: "TXN-NGN-8266"
      },
      {
        id: "7",
        type: "debit",
        description: "Electricity — EKEDC",
        amount: 15800,
        date: "2026-03-10",
        status: "failed",
        reference: "TXN-NGN-8265"
      }
    ];
    const usdTransactions = [
      {
        id: "1",
        type: "credit",
        description: "Freelance — Morgan & Co.",
        amount: 2400,
        date: "2026-03-19",
        status: "completed",
        reference: "TXN-USD-4102"
      },
      {
        id: "2",
        type: "debit",
        description: "SaaS subscription — Notion",
        amount: 96,
        date: "2026-03-17",
        status: "completed",
        reference: "TXN-USD-4101"
      },
      {
        id: "3",
        type: "credit",
        description: "Consulting fee — Harper Ltd",
        amount: 1750,
        date: "2026-03-14",
        status: "completed",
        reference: "TXN-USD-4100"
      },
      {
        id: "4",
        type: "debit",
        description: "Domain renewal",
        amount: 14.99,
        date: "2026-03-12",
        status: "completed",
        reference: "TXN-USD-4099"
      },
      {
        id: "5",
        type: "credit",
        description: "Product sale — Int'l order",
        amount: 385,
        date: "2026-03-10",
        status: "pending",
        reference: "TXN-USD-4098"
      }
    ];
    const wallets = [
      {
        currency: "NGN",
        symbol: "₦",
        balance: 184732055e-2,
        totalRevenue: 3240500,
        totalSpent: 139317945e-2,
        pendingAmount: 32e3,
        transactions: ngnTransactions,
        accounts: [
          {
            id: "ngn-1",
            bankName: "GTBank",
            accountName: "Chidi Ventures Ltd",
            accountNumber: "0123456789",
            sortCode: "058",
            isPrimary: true
          },
          {
            id: "ngn-2",
            bankName: "Access Bank",
            accountName: "Chidi Ventures Ltd",
            accountNumber: "9876543210",
            sortCode: "044",
            isPrimary: false
          }
        ]
      },
      {
        currency: "USD",
        symbol: "$",
        balance: 8274.01,
        totalRevenue: 14535,
        totalSpent: 6260.99,
        pendingAmount: 385,
        transactions: usdTransactions,
        accounts: [
          {
            id: "usd-1",
            bankName: "Mercury",
            accountName: "Chidi Ventures Inc",
            accountNumber: "1928374650",
            routingNumber: "084009519",
            isPrimary: true
          }
        ]
      }
    ];
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
                    _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Revenue</p><p class="text-lg font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(formatAmount(selectedWallet.value.totalRevenue, selectedWallet.value.symbol))}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0" }, [
                        createVNode(unref(ArrowDownLeft), { class: "w-4 h-4 text-emerald-600" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Revenue"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(selectedWallet.value.totalRevenue, selectedWallet.value.symbol)), 1)
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
                      createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(selectedWallet.value.totalRevenue, selectedWallet.value.symbol)), 1)
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
                    _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Spent</p><p class="text-lg font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(formatAmount(selectedWallet.value.totalSpent, selectedWallet.value.symbol))}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0" }, [
                        createVNode(unref(ArrowUpRight), { class: "w-4 h-4 text-red-600" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Spent"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(selectedWallet.value.totalSpent, selectedWallet.value.symbol)), 1)
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
                      createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(selectedWallet.value.totalSpent, selectedWallet.value.symbol)), 1)
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
                    _push3(`</div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Pending</p><p class="text-lg font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(formatAmount(selectedWallet.value.pendingAmount, selectedWallet.value.symbol))}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0" }, [
                        createVNode(unref(TrendingUp), { class: "w-4 h-4 text-amber-600" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Pending"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(selectedWallet.value.pendingAmount, selectedWallet.value.symbol)), 1)
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
                      createVNode("p", { class: "text-lg font-bold tabular-nums text-foreground" }, toDisplayString(formatAmount(selectedWallet.value.pendingAmount, selectedWallet.value.symbol)), 1)
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
      } else {
        _push(`<div class="space-y-6 animate-in fade-in duration-300"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
        ssrRenderList(wallets, (w) => {
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
        _push(`<!--]--></div></div>`);
      }
      _push(`</main></div>`);
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
//# sourceMappingURL=wallet-DxqACR4-.mjs.map
