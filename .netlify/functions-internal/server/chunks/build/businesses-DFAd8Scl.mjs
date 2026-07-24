import { computed, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { ShieldAlert, Plus, LogOut, Loader2, RotateCcw, Building2, ChevronRight } from 'lucide-vue-next';
import { u as useBusiness } from './useBusiness-DQCdHk0S.mjs';
import { a as useGQLQuery, u as useGQLMutation } from './useGraphQL-DodhfSHO.mjs';
import { u as useAuth } from './useAuth-DuyIS8an.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { n as navigateTo } from './server.mjs';
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

const useVerification = () => {
  const USER_QUERY = `
    query CurrentUser {
      currentUserProfile: me {
        first_name
        last_name
        display_name
        is_verified
        disabled
        disable_reason
      }
    }
  `;
  const userQuery = useGQLQuery(["currentUser"], USER_QUERY);
  const REQUEST_VERIFICATION_MUTATION = `
    mutation RequestVerification($input: verificationPayload!) {
      requestUserVerification(input: $input) {
        ... on VerificationSuccess {
          link
          status
        }
        ... on VerificationError {
          code
          message
        }
      }
    }
  `;
  const requestVerificationMutation = useGQLMutation(
    REQUEST_VERIFICATION_MUTATION,
    {
      onError: (err) => {
        console.error("Verification Request error:", err);
      }
    }
  );
  const requestOriginal = requestVerificationMutation.mutateAsync.bind(
    requestVerificationMutation
  );
  requestVerificationMutation.mutateAsync = async ({ entity }) => {
    return await requestOriginal({ input: { entity } });
  };
  return {
    currentUser: userQuery,
    requestVerification: requestVerificationMutation
  };
};
const _sfc_main = {
  __name: "businesses",
  __ssrInlineRender: true,
  setup(__props) {
    const { logout } = useAuth();
    const { currentUser, requestVerification } = useVerification();
    const isUserVerified = computed(
      () => currentUser.data.value?.currentUserProfile?.is_verified === true
    );
    const handleLogout = () => {
      logout();
    };
    const userLoading = currentUser.isPending;
    const { userBusinesses } = useBusiness({ enabled: isUserVerified });
    const { data, isPending: bizPending, isError } = userBusinesses;
    const businesses = computed(() => {
      return data.value?.myBusinesses || [];
    });
    const roleColors = {
      Owner: "bg-primary text-primary-foreground",
      Manager: "bg-accent text-accent-foreground",
      Staff: "bg-secondary text-secondary-foreground"
    };
    const handleOnboardNew = () => {
      navigateTo("/onboard");
    };
    const verificationLink = ref("");
    const verificationStatus = ref("");
    const isRequestingVerification = ref(false);
    const showIframe = ref(false);
    ref(false);
    watch(
      () => currentUser.data.value?.currentUserProfile,
      async (user) => {
        if (user && !user.is_verified) {
          if (!verificationStatus.value && !isRequestingVerification.value) {
            isRequestingVerification.value = true;
            try {
              const res = await requestVerification.mutateAsync({
                entity: "USER_VERIFICATION"
              });
              const verificationRes = res.requestUserVerification;
              if (verificationRes) {
                verificationStatus.value = verificationRes.status || "unverified";
                verificationLink.value = verificationRes.link || "";
              }
            } catch (err) {
              console.error(err);
            } finally {
              isRequestingVerification.value = false;
            }
          }
        }
      },
      { immediate: true }
    );
    const handleStartVerification = async () => {
      if (verificationLink.value) {
        showIframe.value = true;
        return;
      }
      isRequestingVerification.value = true;
      try {
        const res = await requestVerification.mutateAsync({
          entity: "USER_VERIFICATION"
        });
        const verificationRes = res.requestUserVerification;
        if (verificationRes?.link) {
          verificationLink.value = verificationRes.link;
          verificationStatus.value = verificationRes.status || "unverified";
          if (verificationStatus.value.toLowerCase() !== "in_progress" && verificationStatus.value.toLowerCase() !== "processing") {
            showIframe.value = true;
          }
        } else if (verificationRes?.message) {
          toast.error(verificationRes.message);
        } else {
          toast.error("Failed to generate verification link.");
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err?.graphQLErrors?.[0]?.message || "An error occurred while starting verification."
        );
      } finally {
        isRequestingVerification.value = false;
      }
    };
    const handleRefreshStatus = () => {
      currentUser.refetch();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background" }, _attrs))}>`);
      if (!isUserVerified.value && showIframe.value && verificationLink.value) {
        _push(`<div class="fixed inset-0 z-50 bg-background flex flex-col"><div class="flex items-center justify-between p-4 border-b bg-card shadow-sm"><div class="flex items-center gap-2"><div class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(ShieldAlert), { class: "w-4 h-4 text-primary-foreground" }, null, _parent));
        _push(`</div><h2 class="font-semibold text-foreground">Identity Verification</h2></div>`);
        _push(ssrRenderComponent(unref(Button), {
          variant: "ghost",
          size: "sm",
          onClick: () => {
            showIframe.value = false;
            handleRefreshStatus();
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Close `);
            } else {
              return [
                createTextVNode(" Close ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><iframe${ssrRenderAttr("src", verificationLink.value)} class="w-full h-full flex-1 border-none bg-background" allow="camera; microphone"></iframe></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm"><div class="max-w-8xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><span class="font-bold text-foreground text-sm sm:text-base">ELO Business</span></div><div class="flex items-center gap-2">`);
      if (isUserVerified.value && businesses.value.length > 0) {
        _push(ssrRenderComponent(unref(Button), {
          size: "sm",
          class: "gap-2",
          onClick: handleOnboardNew
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`<span class="hidden sm:inline"${_scopeId}>Add Business</span>`);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-4 h-4" }),
                createVNode("span", { class: "hidden sm:inline" }, "Add Business")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "sm",
        class: "gap-2 text-muted-foreground hover:text-foreground",
        onClick: handleLogout
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`<span class="hidden sm:inline"${_scopeId}>Log out</span>`);
          } else {
            return [
              createVNode(unref(LogOut), { class: "w-4 h-4" }),
              createVNode("span", { class: "hidden sm:inline" }, "Log out")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="max-w-8xl mx-auto px-4 sm:px-6 py-8 sm:py-12">`);
      if (unref(userLoading)) {
        _push(`<div class="flex flex-col items-center justify-center min-h-[60vh] gap-4"><div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(unref(Loader2), { class: "w-6 h-6 text-primary animate-spin" }, null, _parent));
        _push(`</div><p class="text-sm text-muted-foreground">Checking your account...</p></div>`);
      } else if (!isUserVerified.value && !showIframe.value && verificationStatus.value.toLowerCase() === "in_progress") {
        _push(`<div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"><div class="w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-500/20 flex items-center justify-center mx-auto mb-6">`);
        _push(ssrRenderComponent(unref(ShieldAlert), { class: "w-10 h-10 text-yellow-500" }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-foreground"> Verification in Progress </h2><p class="text-sm text-muted-foreground mt-3 max-w-sm"> Your identity is being reviewed. You will be notified once complete. </p><p class="text-xs text-muted-foreground mt-2"> Status: <span class="font-semibold text-foreground uppercase tracking-wider">${ssrInterpolate(verificationStatus.value)}</span></p>`);
        _push(ssrRenderComponent(unref(Button), {
          variant: "outline",
          class: "mt-8 gap-2",
          onClick: handleRefreshStatus,
          disabled: unref(currentUser).isFetching
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(currentUser).isFetching) {
                _push2(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 animate-spin" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(RotateCcw), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              }
              _push2(` Refresh Status `);
            } else {
              return [
                unref(currentUser).isFetching ? (openBlock(), createBlock(unref(Loader2), {
                  key: 0,
                  class: "w-4 h-4 animate-spin"
                })) : (openBlock(), createBlock(unref(RotateCcw), {
                  key: 1,
                  class: "w-4 h-4"
                })),
                createTextVNode(" Refresh Status ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (!isUserVerified.value && !showIframe.value) {
        _push(`<div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">`);
        if (isRequestingVerification.value) {
          _push(`<div class="flex flex-col items-center gap-4"><div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">`);
          _push(ssrRenderComponent(unref(Loader2), { class: "w-7 h-7 text-primary animate-spin" }, null, _parent));
          _push(`</div><p class="text-sm text-muted-foreground"> Checking verification status... </p></div>`);
        } else {
          _push(`<div class="flex flex-col items-center"><div class="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6">`);
          _push(ssrRenderComponent(unref(ShieldAlert), { class: "w-10 h-10 text-primary" }, null, _parent));
          _push(`</div><h2 class="text-2xl font-bold text-foreground"> Verify Your Identity </h2><p class="text-sm text-muted-foreground mt-3 max-w-sm"> Before accessing your businesses, you need to complete a quick identity verification. </p>`);
          _push(ssrRenderComponent(unref(Button), {
            class: "mt-8 gap-2 h-11 px-8",
            onClick: handleStartVerification,
            disabled: isRequestingVerification.value
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(ShieldAlert), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(` Verify Identity Now `);
              } else {
                return [
                  createVNode(unref(ShieldAlert), { class: "w-4 h-4" }),
                  createTextVNode(" Verify Identity Now ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
      } else if (unref(bizPending)) {
        _push(`<div><div class="mb-8"><div class="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2"></div><div class="h-4 w-32 bg-muted/60 rounded-lg animate-pulse"></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(3, (n) => {
          _push(`<div class="rounded-2xl border bg-card p-6 space-y-4 animate-pulse"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-muted"></div><div class="space-y-2 flex-1"><div class="h-4 bg-muted rounded w-3/4"></div><div class="h-3 bg-muted/60 rounded w-1/2"></div></div></div><div class="h-3 bg-muted/40 rounded w-full"></div><div class="h-8 bg-muted/30 rounded-lg w-1/3"></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (businesses.value.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"><div class="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-muted-foreground/20">`);
        _push(ssrRenderComponent(unref(Building2), { class: "w-12 h-12 text-muted-foreground/40" }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-foreground">No businesses yet</h2><p class="text-sm text-muted-foreground mt-3 max-w-sm"> You haven&#39;t registered a business. Get started by adding your first one. </p>`);
        _push(ssrRenderComponent(unref(Button), {
          class: "mt-8 gap-2 h-11 px-8",
          onClick: handleOnboardNew
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Register a Business `);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-4 h-4" }),
                createTextVNode(" Register a Business ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="mb-8"><h1 class="text-2xl sm:text-3xl font-bold text-foreground"> Your Businesses </h1><p class="text-sm text-muted-foreground mt-1"> Select a business to continue </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(businesses.value, (biz) => {
          _push(`<div class="group relative rounded-2xl border bg-card p-6 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 hover:border-primary/30 transition-all duration-300"><div class="flex items-start justify-between mb-4">`);
          if (biz.logo) {
            _push(`<div class="w-12 h-12 rounded-xl overflow-hidden border shadow-sm"><img${ssrRenderAttr("src", biz.logo)}${ssrRenderAttr("alt", biz.name)} class="w-full h-full object-cover"></div>`);
          } else {
            _push(`<div class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">`);
            _push(ssrRenderComponent(unref(Building2), { class: "w-6 h-6 text-primary" }, null, _parent));
            _push(`</div>`);
          }
          _push(`<span class="${ssrRenderClass([
            roleColors[biz.role] || "bg-secondary text-secondary-foreground",
            "text-xs font-semibold px-2.5 py-1 rounded-full"
          ])}">${ssrInterpolate(biz.role)}</span></div><div class="space-y-1 mb-4"><h3 class="font-semibold text-foreground text-base leading-tight">${ssrInterpolate(biz.name)}</h3>`);
          if (biz.industry) {
            _push(`<p class="text-xs text-muted-foreground">${ssrInterpolate(biz.industry)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium gap-1"> Open dashboard `);
          _push(ssrRenderComponent(unref(ChevronRight), { class: "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div><div class="mt-8 flex justify-center">`);
        _push(ssrRenderComponent(unref(Button), {
          variant: "outline",
          class: "gap-2",
          onClick: handleOnboardNew
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Register Another Business `);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-4 h-4" }),
                createTextVNode(" Register Another Business ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/businesses.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=businesses-DFAd8Scl.mjs.map
