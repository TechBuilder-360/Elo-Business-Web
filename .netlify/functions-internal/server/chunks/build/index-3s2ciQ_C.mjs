import { _ as __nuxt_component_0 } from './nuxt-link-CFAdaFZb.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CFqBlum2.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { I as Input } from './input-C1C1FSk7.mjs';
import { L as Label } from './label-CU-twOy-.mjs';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-vue-next';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'perfect-debounce';
import '@vue/shared';
import '@tanstack/vue-query';
import './useGraphQL-Bw_Hbd5v.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const { requestOtp } = useAuth();
    const isPending = requestOtp.isPending;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex w-full bg-background" }, _attrs))}><div class="hidden lg:flex flex-1 relative bg-zinc-950 text-white overflow-hidden flex-col justify-between p-12"><div class="absolute inset-0 bg-cover bg-center opacity-70 z-0" style="${ssrRenderStyle({ "background-image": "url('/elo_login_bg.svg')" })}"></div><div class="relative z-10 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><span class="text-xl font-bold tracking-tight">ELO Business</span></div><div class="relative z-10 max-w-lg"><div class="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8 ring-1 ring-white/20 shadow-2xl overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><h2 class="text-4xl font-extrabold tracking-tight">ELO Business</h2></div><div class="relative z-10 text-sm text-zinc-500 font-medium"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ELO. All rights reserved. </div></div><div class="flex-1 flex items-center justify-center p-6 lg:p-12 relative"><div class="absolute top-8 left-8 lg:hidden flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><span class="font-bold">ELO</span></div><div class="w-full max-w-sm space-y-8"><div class="text-center lg:text-left"><h1 class="text-3xl font-bold tracking-tight text-foreground"> Welcome back </h1><p class="text-sm text-muted-foreground mt-2"> Enter your credentials to access your account </p></div><form class="space-y-6"><div class="space-y-4"><div class="space-y-2 group">`);
      _push(ssrRenderComponent(unref(Label), {
        for: "email",
        class: "text-sm font-medium transition-colors group-focus-within:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Email Address`);
          } else {
            return [
              createTextVNode("Email Address")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative">`);
      _push(ssrRenderComponent(unref(Mail), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" }, null, _parent));
      _push(ssrRenderComponent(unref(Input), {
        id: "email",
        type: "email",
        placeholder: "name@example.com",
        modelValue: email.value,
        "onUpdate:modelValue": ($event) => email.value = $event,
        class: "pl-10 h-11 border-muted bg-background hover:bg-accent/50 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm"
      }, null, _parent));
      _push(`</div></div><div class="space-y-2 group"><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(unref(Label), {
        for: "password",
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
      _push(`</div><div class="relative">`);
      _push(ssrRenderComponent(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" }, null, _parent));
      _push(ssrRenderComponent(unref(Input), {
        id: "password",
        type: showPassword.value ? "text" : "password",
        placeholder: "••••••••",
        modelValue: password.value,
        "onUpdate:modelValue": ($event) => password.value = $event,
        class: "pl-10 pr-10 h-11 border-muted bg-background hover:bg-accent/50 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm"
      }, null, _parent));
      _push(`<button type="button" class="absolute right-3 top-3 text-muted-foreground hover:text-foreground focus:outline-none transition-colors">`);
      if (showPassword.value) {
        _push(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(EyeOff), { class: "w-4 h-4" }, null, _parent));
      }
      _push(`</button></div></div></div>`);
      _push(ssrRenderComponent(unref(Button), {
        type: "submit",
        class: "w-full h-11 font-medium transition-all active:scale-[0.98]",
        disabled: unref(isPending)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isPending)) {
              _push2(`<span class="flex items-center"${_scopeId}><svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Signing in... </span>`);
            } else {
              _push2(`<span class="flex items-center justify-center"${_scopeId}> Continue `);
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
                createTextVNode(" Signing in... ")
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "flex items-center justify-center"
              }, [
                createTextVNode(" Continue "),
                createVNode(unref(ArrowRight), { class: "w-4 h-4 ml-2" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-center text-sm text-muted-foreground"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "font-semibold text-primary hover:text-primary/80 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign up `);
          } else {
            return [
              createTextVNode(" Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-3s2ciQ_C.mjs.map
