import { mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from './card-Cq6gP5nL.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { ShieldCheck, ExternalLink } from 'lucide-vue-next';

const _sfc_main = {
  __name: "verify-identity",
  __ssrInlineRender: true,
  setup(__props) {
    const handleLaunchVerification = () => {
      (void 0).open("https://example.com/verify", "_blank");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md"><div class="flex flex-col items-center mb-8"><div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><h1 class="text-2xl font-bold text-foreground">Verify your identity</h1><p class="text-sm text-muted-foreground mt-1"> Complete identity verification to continue </p></div>`);
      _push(ssrRenderComponent(unref(Card), { class: "shadow-lg border-0 shadow-foreground/5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Identity Verification Required `);
                      } else {
                        return [
                          createTextVNode(" Identity Verification Required ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CardDescription), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` We need to verify your identity before you can access the platform. This is a one-time process. `);
                      } else {
                        return [
                          createTextVNode(" We need to verify your identity before you can access the platform. This is a one-time process. ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-lg" }, {
                      default: withCtx(() => [
                        createTextVNode(" Identity Verification Required ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CardDescription), null, {
                      default: withCtx(() => [
                        createTextVNode(" We need to verify your identity before you can access the platform. This is a one-time process. ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), { class: "space-y-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-accent/50 rounded-lg p-4 space-y-3"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ShieldCheck), { class: "w-5 h-5 text-primary mt-0.5" }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><p class="text-sm font-medium text-foreground"${_scopeId2}> What you&#39;ll need </p><ul class="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside"${_scopeId2}><li${_scopeId2}>A valid government-issued ID</li><li${_scopeId2}>A clear selfie for facial verification</li><li${_scopeId2}>Proof of address (utility bill or bank statement)</li></ul></div></div></div>`);
                  _push3(ssrRenderComponent(unref(Button), {
                    onClick: handleLaunchVerification,
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Launch Verification `);
                        _push4(ssrRenderComponent(unref(ExternalLink), { class: "w-4 h-4 ml-2" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Launch Verification "),
                          createVNode(unref(ExternalLink), { class: "w-4 h-4 ml-2" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground text-center"${_scopeId2}> Verification is handled by our trusted third-party partner. Your data is encrypted and secure. </p>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-accent/50 rounded-lg p-4 space-y-3" }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode(unref(ShieldCheck), { class: "w-5 h-5 text-primary mt-0.5" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-foreground" }, " What you'll need "),
                          createVNode("ul", { class: "text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside" }, [
                            createVNode("li", null, "A valid government-issued ID"),
                            createVNode("li", null, "A clear selfie for facial verification"),
                            createVNode("li", null, "Proof of address (utility bill or bank statement)")
                          ])
                        ])
                      ])
                    ]),
                    createVNode(unref(Button), {
                      onClick: handleLaunchVerification,
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Launch Verification "),
                        createVNode(unref(ExternalLink), { class: "w-4 h-4 ml-2" })
                      ]),
                      _: 1
                    }),
                    createVNode("p", { class: "text-xs text-muted-foreground text-center" }, " Verification is handled by our trusted third-party partner. Your data is encrypted and secure. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardHeader), { class: "pb-4" }, {
                default: withCtx(() => [
                  createVNode(unref(CardTitle), { class: "text-lg" }, {
                    default: withCtx(() => [
                      createTextVNode(" Identity Verification Required ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardDescription), null, {
                    default: withCtx(() => [
                      createTextVNode(" We need to verify your identity before you can access the platform. This is a one-time process. ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), { class: "space-y-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "bg-accent/50 rounded-lg p-4 space-y-3" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(unref(ShieldCheck), { class: "w-5 h-5 text-primary mt-0.5" }),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-foreground" }, " What you'll need "),
                        createVNode("ul", { class: "text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside" }, [
                          createVNode("li", null, "A valid government-issued ID"),
                          createVNode("li", null, "A clear selfie for facial verification"),
                          createVNode("li", null, "Proof of address (utility bill or bank statement)")
                        ])
                      ])
                    ])
                  ]),
                  createVNode(unref(Button), {
                    onClick: handleLaunchVerification,
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Launch Verification "),
                      createVNode(unref(ExternalLink), { class: "w-4 h-4 ml-2" })
                    ]),
                    _: 1
                  }),
                  createVNode("p", { class: "text-xs text-muted-foreground text-center" }, " Verification is handled by our trusted third-party partner. Your data is encrypted and secure. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/verify-identity.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-identity-9tffoMPj.mjs.map
