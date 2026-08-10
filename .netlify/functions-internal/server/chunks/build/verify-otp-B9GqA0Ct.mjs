import { ref, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, createTextVNode, toDisplayString, computed, provide, h, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-DuyIS8an.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { I as Input } from './input-C1C1FSk7.mjs';
import { L as Label } from './label-CU-twOy-.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { Lock, ArrowRight, X, Eye, EyeOff, RotateCcw } from 'lucide-vue-next';
import { d as useRoute$1, n as navigateTo } from './server.mjs';
import './useGraphQL-DodhfSHO.mjs';
import '@tanstack/vue-query';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'sweetalert2';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'perfect-debounce';
import '@vue/shared';

const OTPContext = /* @__PURE__ */ Symbol("OTPContext");
const InputOTP = {
  name: "InputOTP",
  props: {
    maxLength: { type: Number, default: 6 },
    modelValue: { type: String, default: "" },
    value: { type: String, default: "" },
    onChange: Function
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const inputRef = ref(null);
    const currentValue = computed(
      () => props.modelValue !== void 0 ? props.modelValue : props.value
    );
    const onInput = (e) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, props.maxLength);
      emit("update:modelValue", val);
      if (props.onChange) props.onChange(val);
    };
    const focusInput = () => {
      inputRef.value?.focus();
    };
    provide(OTPContext, {
      currentValue,
      focusInput
    });
    return () => h(
      "div",
      {
        onClick: focusInput,
        class: "relative cursor-text flex items-center justify-center"
      },
      [
        h("input", {
          ref: inputRef,
          type: "text",
          inputMode: "numeric",
          pattern: "[0-9]*",
          value: currentValue.value,
          onInput,
          class: "absolute inset-0 w-full h-full opacity-0 cursor-default z-10"
        }),
        slots.default?.()
      ]
    );
  }
};
const InputOTPGroup = {
  name: "InputOTPGroup",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "div",
      { class: ["flex items-center gap-2", props.class] },
      slots.default?.()
    );
  }
};
const InputOTPSlot = {
  name: "InputOTPSlot",
  props: {
    index: { type: Number, required: true },
    class: String
  },
  setup(props) {
    const ctx = inject(OTPContext);
    const char = computed(() => ctx?.currentValue.value[props.index] || "");
    const isFocused = computed(
      () => ctx?.currentValue.value.length === props.index
    );
    return () => h(
      "div",
      {
        class: [
          "relative flex h-10 w-10 items-center justify-center border border-input text-sm transition-all rounded-md bg-transparent text-foreground",
          isFocused.value && "ring-1 ring-ring border-ring font-semibold",
          props.class
        ]
      },
      char.value
    );
  }
};
const _sfc_main = {
  __name: "verify-otp",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const email = route.query.email || "your email";
    const identifier = ref(route.query.identifier);
    const otp = ref("");
    const { login, requestOtp } = useAuth();
    const isPending = login.isPending;
    const isResendModalOpen = ref(false);
    const resendPassword = ref("");
    const showResendPassword = ref(false);
    const isResending = requestOtp.isPending;
    const handleVerify = async () => {
      if (otp.value.length !== 6) {
        toast.error("Please enter the complete 6-digit code");
        return;
      }
      if (!identifier.value) {
        toast.error("Invalid session. Please login again.");
        navigateTo("/");
        return;
      }
      try {
        await login.mutateAsync({
          otp: String(otp.value),
          identifier: String(identifier.value)
        });
        toast.success("Login successful");
        await navigateTo("/businesses");
      } catch (error) {
        const gqlMsg = error?.graphQLErrors?.[0]?.message;
        const fallbackMsg = error.message === "GraphQL error" ? "Failed to verify OTP" : error.message;
        toast.error(gqlMsg || fallbackMsg);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex w-full bg-background" }, _attrs))}><div class="hidden lg:flex flex-1 relative bg-zinc-950 text-white overflow-hidden flex-col justify-between p-12"><div class="absolute inset-0 bg-cover bg-center opacity-70 z-0" style="${ssrRenderStyle({ "background-image": 'url("/elo_login_bg.svg")' })}"></div><div class="relative z-10 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><span class="text-xl font-bold tracking-tight">ELO Business</span></div><div class="relative z-10 max-w-lg"><div class="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8 ring-1 ring-white/20 shadow-2xl">`);
      _push(ssrRenderComponent(unref(Lock), { class: "w-10 h-10 text-white/80" }, null, _parent));
      _push(`</div><h2 class="text-4xl font-extrabold tracking-tight mb-4"> One step away. </h2><p class="text-lg text-zinc-400"> Enter your 6-digit code to confirm your identity and access your account. </p></div><div class="relative z-10 text-sm text-zinc-500 font-medium"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ELO. All rights reserved. </div></div><div class="flex-1 flex items-center justify-center p-6 lg:p-12 relative"><div class="absolute top-8 left-8 lg:hidden flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><span class="font-bold">ELO</span></div><div class="w-full max-w-sm space-y-8"><div class="text-center lg:text-left"><div class="lg:hidden w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">`);
      _push(ssrRenderComponent(unref(Lock), { class: "w-8 h-8 text-primary" }, null, _parent));
      _push(`</div><h1 class="text-3xl font-bold tracking-tight text-foreground"> Check your inbox </h1><p class="text-sm text-muted-foreground mt-2"> We sent a 6-digit code to <span class="font-semibold text-foreground">${ssrInterpolate(unref(email))}</span></p></div><div class="space-y-6"><div class="flex justify-center lg:justify-start">`);
      _push(ssrRenderComponent(unref(InputOTP), {
        maxLength: 6,
        modelValue: otp.value,
        "onUpdate:modelValue": (val) => otp.value = val,
        class: "gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(InputOTPGroup), { class: "gap-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(6, (i) => {
                    _push3(ssrRenderComponent(unref(InputOTPSlot), {
                      key: i,
                      index: i - 1,
                      class: "h-12 w-12 text-lg font-bold rounded-xl border-2 border-muted transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                      return createVNode(unref(InputOTPSlot), {
                        key: i,
                        index: i - 1,
                        class: "h-12 w-12 text-lg font-bold rounded-xl border-2 border-muted transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                      }, null, 8, ["index"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(InputOTPGroup), { class: "gap-2" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                    return createVNode(unref(InputOTPSlot), {
                      key: i,
                      index: i - 1,
                      class: "h-12 w-12 text-lg font-bold rounded-xl border-2 border-muted transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                    }, null, 8, ["index"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Button), {
        onClick: handleVerify,
        class: "w-full h-11 font-medium transition-all active:scale-[0.98]",
        disabled: unref(isPending) || otp.value.length !== 6
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isPending)) {
              _push2(`<span class="flex items-center"${_scopeId}><svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Verifying... </span>`);
            } else {
              _push2(`<span class="flex items-center justify-center"${_scopeId}> Verify Code `);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 ml-2" }, null, _parent2, _scopeId));
              _push2(`</span>`);
            }
          } else {
            return [
              unref(isPending) ? (openBlock(), createBlock("span", {
                key: 0,
                class: "flex items-center"
              }, [
                (openBlock(), createBlock("svg", {
                  class: "animate-spin -ml-1 mr-3 h-4 w-4 text-white",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("circle", {
                    class: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  createVNode("path", {
                    class: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ])),
                createTextVNode(" Verifying... ")
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "flex items-center justify-center"
              }, [
                createTextVNode(" Verify Code "),
                createVNode(unref(ArrowRight), { class: "w-4 h-4 ml-2" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-center text-sm text-muted-foreground"> Didn&#39;t receive a code? <button type="button" class="font-semibold text-primary hover:text-primary/80 transition-colors ml-1 underline-offset-4 hover:underline"> Resend </button></p></div></div></div>`);
      if (isResendModalOpen.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">`);
        if (isResendModalOpen.value) {
          _push(`<div class="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"><div class="flex items-center justify-between p-6 pb-4 border-b border-border"><div><h3 class="font-semibold text-foreground">Resend Code</h3><p class="text-xs text-muted-foreground mt-0.5"> Confirm your password to resend. </p></div><button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">`);
          _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
          _push(`</button></div><form class="p-6 space-y-4"><div class="space-y-2 group">`);
          _push(ssrRenderComponent(unref(Label), {
            for: "resend-password",
            class: "text-sm font-medium transition-colors group-focus-within:text-primary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Password`);
              } else {
                return [
                  createTextVNode("Password")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="relative">`);
          _push(ssrRenderComponent(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" }, null, _parent));
          _push(ssrRenderComponent(unref(Input), {
            id: "resend-password",
            type: showResendPassword.value ? "text" : "password",
            modelValue: resendPassword.value,
            "onUpdate:modelValue": ($event) => resendPassword.value = $event,
            placeholder: "••••••••",
            class: "pl-10 pr-10 h-11 border-muted bg-background hover:bg-accent/50 focus-visible:ring-primary focus-visible:border-primary transition-all"
          }, null, _parent));
          _push(`<button type="button" class="absolute right-3 top-3 text-muted-foreground hover:text-foreground focus:outline-none transition-colors">`);
          if (showResendPassword.value) {
            _push(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(EyeOff), { class: "w-4 h-4" }, null, _parent));
          }
          _push(`</button></div></div><div class="flex gap-3 pt-2">`);
          _push(ssrRenderComponent(unref(Button), {
            type: "button",
            variant: "outline",
            class: "flex-1",
            onClick: ($event) => isResendModalOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Cancel `);
              } else {
                return [
                  createTextVNode(" Cancel ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Button), {
            type: "submit",
            class: "flex-1 transition-all active:scale-[0.98]",
            disabled: unref(isResending) || !resendPassword.value
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (unref(isResending)) {
                  _push2(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
                } else {
                  _push2(ssrRenderComponent(unref(RotateCcw), { class: "w-3.5 h-3.5 mr-2" }, null, _parent2, _scopeId));
                }
                _push2(` ${ssrInterpolate(unref(isResending) ? "Sending..." : "Resend")}`);
              } else {
                return [
                  unref(isResending) ? (openBlock(), createBlock("svg", {
                    key: 0,
                    class: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("circle", {
                      class: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      "stroke-width": "4"
                    }),
                    createVNode("path", {
                      class: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    })
                  ])) : (openBlock(), createBlock(unref(RotateCcw), {
                    key: 1,
                    class: "w-3.5 h-3.5 mr-2"
                  })),
                  createTextVNode(" " + toDisplayString(unref(isResending) ? "Sending..." : "Resend"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/verify-otp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-otp-B9GqA0Ct.mjs.map
