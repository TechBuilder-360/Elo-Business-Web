import { _ as __nuxt_component_0 } from './nuxt-link-CFAdaFZb.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CFqBlum2.mjs';
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from './card-Cq6gP5nL.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { I as Input } from './input-C1C1FSk7.mjs';
import { L as Label } from './label-CU-twOy-.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { Lock, ArrowRight } from 'lucide-vue-next';
import { n as navigateTo } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './useGraphQL-Bw_Hbd5v.mjs';
import '@tanstack/vue-query';
import 'sweetalert2';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'perfect-debounce';
import '@vue/shared';

const _sfc_main = {
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: ""
    });
    const { register } = useAuth();
    const isPending = register.isPending;
    const updateField = (key, value) => {
      form.value[key] = value;
    };
    const validate = () => {
      if (!form.value.firstName.trim()) return "First name is required";
      if (form.value.firstName.length > 50)
        return "First name must be less than 50 characters";
      if (!form.value.lastName.trim()) return "Last name is required";
      if (form.value.lastName.length > 50)
        return "Last name must be less than 50 characters";
      if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        return "Invalid email address";
      }
      if (form.value.email.length > 255)
        return "Email must be less than 255 characters";
      if (form.value.password.length < 8)
        return "Password must be at least 8 characters";
      if (form.value.password.length > 72)
        return "Password must be less than 72 characters";
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
      if (!passwordRegex.test(form.value.password)) {
        return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      }
      if (form.value.password !== form.value.confirmPassword) {
        return "Passwords do not match";
      }
      return null;
    };
    const handleSubmit = async () => {
      const error = validate();
      if (error) {
        toast.error(error);
        return;
      }
      try {
        const payload = {
          first_name: form.value.firstName,
          last_name: form.value.lastName,
          email_address: form.value.email,
          password: form.value.password
        };
        console.log("[Registration Payload]", JSON.stringify(payload, null, 2));
        await register.mutateAsync(payload);
        toast.success("Account created successfully! Please sign in.");
        await navigateTo("/");
      } catch (err) {
        const gqlMsg = err?.graphQLErrors?.[0]?.message;
        toast.error(gqlMsg || err.message || "Failed to create account");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[100dvh] overflow-y-auto bg-background flex items-center justify-center px-4 py-8" }, _attrs))}><div class="w-full max-w-md"><div class="flex flex-col items-center mb-8"><div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><h1 class="text-2xl font-bold text-foreground">Create your account</h1><p class="text-sm text-muted-foreground mt-1"> Get started in just a moment </p></div>`);
      _push(ssrRenderComponent(unref(Card), { class: "shadow-lg border-0 shadow-foreground/5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Sign Up`);
                      } else {
                        return [
                          createTextVNode("Sign Up")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CardDescription), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tell us a bit about yourself`);
                      } else {
                        return [
                          createTextVNode("Tell us a bit about yourself")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-lg" }, {
                      default: withCtx(() => [
                        createTextVNode("Sign Up")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CardDescription), null, {
                      default: withCtx(() => [
                        createTextVNode("Tell us a bit about yourself")
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
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), { for: "firstName" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`First name`);
                      } else {
                        return [
                          createTextVNode("First name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    id: "firstName",
                    modelValue: form.value.firstName,
                    "onUpdate:modelValue": (v) => updateField("firstName", v),
                    placeholder: "Jane"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), { for: "lastName" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Last name`);
                      } else {
                        return [
                          createTextVNode("Last name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    id: "lastName",
                    modelValue: form.value.lastName,
                    "onUpdate:modelValue": (v) => updateField("lastName", v),
                    placeholder: "Doe"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), { for: "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email address`);
                      } else {
                        return [
                          createTextVNode("Email address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    id: "email",
                    type: "email",
                    modelValue: form.value.email,
                    "onUpdate:modelValue": (v) => updateField("email", v),
                    placeholder: "you@example.com"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    id: "password",
                    type: "password",
                    modelValue: form.value.password,
                    "onUpdate:modelValue": (v) => updateField("password", v),
                    placeholder: "••••••••",
                    class: "pl-10"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), { for: "confirmPassword" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirm password`);
                      } else {
                        return [
                          createTextVNode("Confirm password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    id: "confirmPassword",
                    type: "password",
                    modelValue: form.value.confirmPassword,
                    "onUpdate:modelValue": (v) => updateField("confirmPassword", v),
                    placeholder: "••••••••",
                    class: "pl-10"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(Button), {
                    type: "submit",
                    class: "w-full",
                    disabled: unref(isPending)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(isPending) ? "Creating account..." : "Create account")} `);
                        if (!unref(isPending)) {
                          _push4(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 ml-2" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(isPending) ? "Creating account..." : "Create account") + " ", 1),
                          !unref(isPending) ? (openBlock(), createBlock(unref(ArrowRight), {
                            key: 0,
                            class: "w-4 h-4 ml-2"
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-center text-sm text-muted-foreground"${_scopeId2}> Already have an account? `);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/",
                    class: "text-primary font-medium hover:underline ml-1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Sign in `);
                      } else {
                        return [
                          createTextVNode(" Sign in ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</p></form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(Label), { for: "firstName" }, {
                            default: withCtx(() => [
                              createTextVNode("First name")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Input), {
                            id: "firstName",
                            modelValue: form.value.firstName,
                            "onUpdate:modelValue": (v) => updateField("firstName", v),
                            placeholder: "Jane"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(Label), { for: "lastName" }, {
                            default: withCtx(() => [
                              createTextVNode("Last name")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Input), {
                            id: "lastName",
                            modelValue: form.value.lastName,
                            "onUpdate:modelValue": (v) => updateField("lastName", v),
                            placeholder: "Doe"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(Label), { for: "email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email address")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          id: "email",
                          type: "email",
                          modelValue: form.value.email,
                          "onUpdate:modelValue": (v) => updateField("email", v),
                          placeholder: "you@example.com"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(Label), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(Input), {
                            id: "password",
                            type: "password",
                            modelValue: form.value.password,
                            "onUpdate:modelValue": (v) => updateField("password", v),
                            placeholder: "••••••••",
                            class: "pl-10"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(Label), { for: "confirmPassword" }, {
                          default: withCtx(() => [
                            createTextVNode("Confirm password")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "relative" }, [
                          createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                          createVNode(unref(Input), {
                            id: "confirmPassword",
                            type: "password",
                            modelValue: form.value.confirmPassword,
                            "onUpdate:modelValue": (v) => updateField("confirmPassword", v),
                            placeholder: "••••••••",
                            class: "pl-10"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode(unref(Button), {
                        type: "submit",
                        class: "w-full",
                        disabled: unref(isPending)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(isPending) ? "Creating account..." : "Create account") + " ", 1),
                          !unref(isPending) ? (openBlock(), createBlock(unref(ArrowRight), {
                            key: 0,
                            class: "w-4 h-4 ml-2"
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode("p", { class: "text-center text-sm text-muted-foreground" }, [
                        createTextVNode(" Already have an account? "),
                        createVNode(_component_NuxtLink, {
                          to: "/",
                          class: "text-primary font-medium hover:underline ml-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Sign in ")
                          ]),
                          _: 1
                        })
                      ])
                    ], 32)
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
                      createTextVNode("Sign Up")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardDescription), null, {
                    default: withCtx(() => [
                      createTextVNode("Tell us a bit about yourself")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(Label), { for: "firstName" }, {
                          default: withCtx(() => [
                            createTextVNode("First name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          id: "firstName",
                          modelValue: form.value.firstName,
                          "onUpdate:modelValue": (v) => updateField("firstName", v),
                          placeholder: "Jane"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(Label), { for: "lastName" }, {
                          default: withCtx(() => [
                            createTextVNode("Last name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          id: "lastName",
                          modelValue: form.value.lastName,
                          "onUpdate:modelValue": (v) => updateField("lastName", v),
                          placeholder: "Doe"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(Label), { for: "email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        id: "email",
                        type: "email",
                        modelValue: form.value.email,
                        "onUpdate:modelValue": (v) => updateField("email", v),
                        placeholder: "you@example.com"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(Label), { for: "password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                        createVNode(unref(Input), {
                          id: "password",
                          type: "password",
                          modelValue: form.value.password,
                          "onUpdate:modelValue": (v) => updateField("password", v),
                          placeholder: "••••••••",
                          class: "pl-10"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(Label), { for: "confirmPassword" }, {
                        default: withCtx(() => [
                          createTextVNode("Confirm password")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "relative" }, [
                        createVNode(unref(Lock), { class: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
                        createVNode(unref(Input), {
                          id: "confirmPassword",
                          type: "password",
                          modelValue: form.value.confirmPassword,
                          "onUpdate:modelValue": (v) => updateField("confirmPassword", v),
                          placeholder: "••••••••",
                          class: "pl-10"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode(unref(Button), {
                      type: "submit",
                      class: "w-full",
                      disabled: unref(isPending)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(isPending) ? "Creating account..." : "Create account") + " ", 1),
                        !unref(isPending) ? (openBlock(), createBlock(unref(ArrowRight), {
                          key: 0,
                          class: "w-4 h-4 ml-2"
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode("p", { class: "text-center text-sm text-muted-foreground" }, [
                      createTextVNode(" Already have an account? "),
                      createVNode(_component_NuxtLink, {
                        to: "/",
                        class: "text-primary font-medium hover:underline ml-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Sign in ")
                        ]),
                        _: 1
                      })
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-DTSEDJtP.mjs.map
