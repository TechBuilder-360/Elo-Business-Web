import { computed, mergeProps, unref, withCtx, createVNode, createTextVNode, ref, toDisplayString, openBlock, createBlock, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from './tabs-1FqyMY98.mjs';
import { ArrowLeft, Building2, Info, Users, ChevronRight, Lock, UserPlus, Shield, Trash2 } from 'lucide-vue-next';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { C as Card, a as CardContent } from './card-Cq6gP5nL.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { I as Input } from './input-C1C1FSk7.mjs';
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from './select-BENuuoNZ.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { b as useRoute$1, n as navigateTo } from './server.mjs';
import 'sweetalert2';
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

const Avatar = {
  name: "Avatar",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "div",
      {
        class: [
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted",
          props.class
        ]
      },
      slots.default?.()
    );
  }
};
const AvatarFallback = {
  name: "AvatarFallback",
  props: { class: String },
  setup(props, { slots }) {
    return () => h(
      "div",
      {
        class: [
          "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
          props.class
        ]
      },
      slots.default?.()
    );
  }
};
const _sfc_main$1 = {
  __name: "SettingsTeamMembersTab",
  __ssrInlineRender: true,
  props: {
    userRole: {
      type: String,
      default: "owner"
    }
  },
  setup(__props) {
    const props = __props;
    const mockTeamMembers = [
      { id: "1", name: "Adebayo Ogunlesi", email: "adebayo@example.com", role: "owner" },
      { id: "2", name: "Fatima Ibrahim", email: "fatima@example.com", role: "admin" },
      { id: "3", name: "Chinedu Okafor", email: "chinedu@example.com", role: "manager" },
      { id: "4", name: "Amina Yusuf", email: "amina@example.com", role: "staff" }
    ];
    const roleBadgeVariant = {
      owner: "default",
      admin: "default",
      manager: "secondary",
      staff: "outline"
    };
    const members = ref([...mockTeamMembers]);
    const inviteEmail = ref("");
    const canManageTeam = computed(() => {
      return props.userRole === "owner" || props.userRole === "admin";
    });
    const handleInvite = () => {
      if (!inviteEmail.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.value)) {
        toast.error("Please enter a valid email address");
        return;
      }
      toast.success(`Invitation sent to ${inviteEmail.value}`);
      inviteEmail.value = "";
    };
    const handleRemove = (id) => {
      members.value = members.value.filter((m) => m.id !== id);
      toast.success("Team member removed");
    };
    const updateRole = (member, newRole) => {
      members.value = members.value.map(
        (m) => m.id === member.id ? { ...m, role: newRole } : m
      );
      toast.success(`${member.name}'s role updated to ${newRole}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (!canManageTeam.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}><div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">`);
        _push(ssrRenderComponent(unref(Lock), { class: "w-7 h-7 text-muted-foreground" }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold mb-1">Access Restricted</h3><p class="text-sm text-muted-foreground max-w-sm"> You don&#39;t have permission to view team members. Contact your admin for access. </p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex gap-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      placeholder: "Email address",
                      modelValue: inviteEmail.value,
                      "onUpdate:modelValue": ($event) => inviteEmail.value = $event,
                      class: "flex-1"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Button), {
                      onClick: handleInvite,
                      size: "sm"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(UserPlus), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                          _push4(` Invite `);
                        } else {
                          return [
                            createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Invite ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        placeholder: "Email address",
                        modelValue: inviteEmail.value,
                        "onUpdate:modelValue": ($event) => inviteEmail.value = $event,
                        class: "flex-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(Button), {
                        onClick: handleInvite,
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Invite ")
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
                createVNode(unref(CardContent), { class: "p-4 flex gap-3" }, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      placeholder: "Email address",
                      modelValue: inviteEmail.value,
                      "onUpdate:modelValue": ($event) => inviteEmail.value = $event,
                      class: "flex-1"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(unref(Button), {
                      onClick: handleInvite,
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(UserPlus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Invite ")
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
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(members.value, (member) => {
          _push(ssrRenderComponent(unref(Card), {
            key: member.id,
            class: "border-0 shadow-sm shadow-foreground/5"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Avatar), { class: "h-10 w-10" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(AvatarFallback), { class: "bg-accent text-accent-foreground text-sm font-medium" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(member.name.split(" ").map((n) => n[0]).join(""))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(member.name.split(" ").map((n) => n[0]).join("")), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(AvatarFallback), { class: "bg-accent text-accent-foreground text-sm font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(member.name.split(" ").map((n) => n[0]).join("")), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="flex-1 min-w-0"${_scopeId2}><p class="font-medium text-sm truncate text-foreground"${_scopeId2}>${ssrInterpolate(member.name)}</p><p class="text-xs text-muted-foreground truncate"${_scopeId2}>${ssrInterpolate(member.email)}</p></div>`);
                      if (member.role === "owner") {
                        _push3(ssrRenderComponent(unref(Badge), {
                          variant: roleBadgeVariant[member.role],
                          class: "capitalize gap-1 text-foreground"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Shield), { class: "w-3 h-3 text-foreground" }, null, _parent4, _scopeId3));
                              _push4(` ${ssrInterpolate(member.role)}`);
                            } else {
                              return [
                                createVNode(unref(Shield), { class: "w-3 h-3 text-foreground" }),
                                createTextVNode(" " + toDisplayString(member.role), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Select), {
                          modelValue: member.role,
                          "onUpdate:modelValue": (val) => updateRole(member, val)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(SelectTrigger), { class: "w-[120px] h-8 text-xs capitalize" }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(SelectValue), null, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(SelectValue))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(unref(SelectContent), null, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(SelectItem), { value: "admin" }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`Admin`);
                                        } else {
                                          return [
                                            createTextVNode("Admin")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(ssrRenderComponent(unref(SelectItem), { value: "manager" }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`Manager`);
                                        } else {
                                          return [
                                            createTextVNode("Manager")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(ssrRenderComponent(unref(SelectItem), { value: "staff" }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`Staff`);
                                        } else {
                                          return [
                                            createTextVNode("Staff")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(SelectItem), { value: "admin" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Admin")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(SelectItem), { value: "manager" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Manager")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(SelectItem), { value: "staff" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Staff")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(SelectTrigger), { class: "w-[120px] h-8 text-xs capitalize" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(SelectValue))
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(SelectContent), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(SelectItem), { value: "admin" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Admin")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(SelectItem), { value: "manager" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Manager")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(SelectItem), { value: "staff" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Staff")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Button), {
                          variant: "ghost",
                          size: "icon",
                          class: "text-destructive h-8 w-8",
                          onClick: ($event) => handleRemove(member.id)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(Trash2), { class: "w-4 h-4" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                      }
                    } else {
                      return [
                        createVNode(unref(Avatar), { class: "h-10 w-10" }, {
                          default: withCtx(() => [
                            createVNode(unref(AvatarFallback), { class: "bg-accent text-accent-foreground text-sm font-medium" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(member.name.split(" ").map((n) => n[0]).join("")), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("p", { class: "font-medium text-sm truncate text-foreground" }, toDisplayString(member.name), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground truncate" }, toDisplayString(member.email), 1)
                        ]),
                        member.role === "owner" ? (openBlock(), createBlock(unref(Badge), {
                          key: 0,
                          variant: roleBadgeVariant[member.role],
                          class: "capitalize gap-1 text-foreground"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Shield), { class: "w-3 h-3 text-foreground" }),
                            createTextVNode(" " + toDisplayString(member.role), 1)
                          ]),
                          _: 2
                        }, 1032, ["variant"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(unref(Select), {
                            modelValue: member.role,
                            "onUpdate:modelValue": (val) => updateRole(member, val)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(SelectTrigger), { class: "w-[120px] h-8 text-xs capitalize" }, {
                                default: withCtx(() => [
                                  createVNode(unref(SelectValue))
                                ]),
                                _: 1
                              }),
                              createVNode(unref(SelectContent), null, {
                                default: withCtx(() => [
                                  createVNode(unref(SelectItem), { value: "admin" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Admin")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(SelectItem), { value: "manager" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Manager")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(SelectItem), { value: "staff" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Staff")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(Button), {
                            variant: "ghost",
                            size: "icon",
                            class: "text-destructive h-8 w-8",
                            onClick: ($event) => handleRemove(member.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-4 h-4" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(CardContent), { class: "p-4 flex items-center gap-4" }, {
                    default: withCtx(() => [
                      createVNode(unref(Avatar), { class: "h-10 w-10" }, {
                        default: withCtx(() => [
                          createVNode(unref(AvatarFallback), { class: "bg-accent text-accent-foreground text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(member.name.split(" ").map((n) => n[0]).join("")), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("p", { class: "font-medium text-sm truncate text-foreground" }, toDisplayString(member.name), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground truncate" }, toDisplayString(member.email), 1)
                      ]),
                      member.role === "owner" ? (openBlock(), createBlock(unref(Badge), {
                        key: 0,
                        variant: roleBadgeVariant[member.role],
                        class: "capitalize gap-1 text-foreground"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Shield), { class: "w-3 h-3 text-foreground" }),
                          createTextVNode(" " + toDisplayString(member.role), 1)
                        ]),
                        _: 2
                      }, 1032, ["variant"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode(unref(Select), {
                          modelValue: member.role,
                          "onUpdate:modelValue": (val) => updateRole(member, val)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(SelectTrigger), { class: "w-[120px] h-8 text-xs capitalize" }, {
                              default: withCtx(() => [
                                createVNode(unref(SelectValue))
                              ]),
                              _: 1
                            }),
                            createVNode(unref(SelectContent), null, {
                              default: withCtx(() => [
                                createVNode(unref(SelectItem), { value: "admin" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Admin")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(SelectItem), { value: "manager" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Manager")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(SelectItem), { value: "staff" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Staff")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(unref(Button), {
                          variant: "ghost",
                          size: "icon",
                          class: "text-destructive h-8 w-8",
                          onClick: ($event) => handleRemove(member.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]))
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
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/TeamMembersTab.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const businessName = computed(() => route.query.name || "My Business");
    const handleBack = () => {
      navigateTo({
        path: "/dashboard",
        query: { name: businessName.value }
      });
    };
    const handleEditBusinessInfo = () => {
      navigateTo({
        path: "/business-info",
        query: { name: businessName.value }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><header class="border-b bg-card sticky top-0 z-10"><div class="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4"><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        class: "h-9 w-9 text-foreground",
        onClick: handleBack
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
      _push(ssrRenderComponent(unref(Building2), { class: "w-5 h-5 text-primary-foreground" }, null, _parent));
      _push(`</div><div><h1 class="text-lg font-bold leading-tight">Settings</h1><p class="text-xs text-muted-foreground">${ssrInterpolate(businessName.value)}</p></div></div></div></header><main class="container max-w-6xl mx-auto py-6 px-4">`);
      _push(ssrRenderComponent(unref(Tabs), { defaultValue: "business-info" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), { class: "mb-6 flex-wrap h-auto gap-1 p-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "business-info",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Info), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Business Info `);
                      } else {
                        return [
                          createVNode(unref(Info), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Business Info ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "team",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Users), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Team `);
                      } else {
                        return [
                          createVNode(unref(Users), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Team ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TabsTrigger), {
                      value: "business-info",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Info), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Business Info ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), {
                      value: "team",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Users), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Team ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), { value: "business-info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Card), {
                    class: "border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow bg-card",
                    onClick: handleEditBusinessInfo
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardContent), { class: "flex items-center justify-between py-6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-center gap-3"${_scopeId4}><div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Info), { class: "w-5 h-5 text-primary" }, null, _parent5, _scopeId4));
                              _push5(`</div><div${_scopeId4}><p class="font-medium text-foreground"${_scopeId4}>Edit Business Information</p><p class="text-sm text-muted-foreground"${_scopeId4}> Update branding, details, products, branches, and hours </p></div></div>`);
                              _push5(ssrRenderComponent(unref(ChevronRight), { class: "w-5 h-5 text-muted-foreground" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("div", { class: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                                    createVNode(unref(Info), { class: "w-5 h-5 text-primary" })
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-medium text-foreground" }, "Edit Business Information"),
                                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Update branding, details, products, branches, and hours ")
                                  ])
                                ]),
                                createVNode(unref(ChevronRight), { class: "w-5 h-5 text-muted-foreground" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CardContent), { class: "flex items-center justify-between py-6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("div", { class: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                                  createVNode(unref(Info), { class: "w-5 h-5 text-primary" })
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-medium text-foreground" }, "Edit Business Information"),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, " Update branding, details, products, branches, and hours ")
                                ])
                              ]),
                              createVNode(unref(ChevronRight), { class: "w-5 h-5 text-muted-foreground" })
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
                    createVNode(unref(Card), {
                      class: "border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow bg-card",
                      onClick: handleEditBusinessInfo
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(CardContent), { class: "flex items-center justify-between py-6" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", { class: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                                createVNode(unref(Info), { class: "w-5 h-5 text-primary" })
                              ]),
                              createVNode("div", null, [
                                createVNode("p", { class: "font-medium text-foreground" }, "Edit Business Information"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Update branding, details, products, branches, and hours ")
                              ])
                            ]),
                            createVNode(unref(ChevronRight), { class: "w-5 h-5 text-muted-foreground" })
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
            _push2(ssrRenderComponent(unref(TabsContent), { value: "team" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, { userRole: "owner" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1, { userRole: "owner" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabsList), { class: "mb-6 flex-wrap h-auto gap-1 p-1" }, {
                default: withCtx(() => [
                  createVNode(unref(TabsTrigger), {
                    value: "business-info",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Info), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Business Info ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), {
                    value: "team",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Users), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Team ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), { value: "business-info" }, {
                default: withCtx(() => [
                  createVNode(unref(Card), {
                    class: "border-0 shadow-md shadow-foreground/5 cursor-pointer hover:shadow-lg transition-shadow bg-card",
                    onClick: handleEditBusinessInfo
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(CardContent), { class: "flex items-center justify-between py-6" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" }, [
                              createVNode(unref(Info), { class: "w-5 h-5 text-primary" })
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "font-medium text-foreground" }, "Edit Business Information"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Update branding, details, products, branches, and hours ")
                            ])
                          ]),
                          createVNode(unref(ChevronRight), { class: "w-5 h-5 text-muted-foreground" })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), { value: "team" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, { userRole: "owner" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-BnJ5miHF.mjs.map
