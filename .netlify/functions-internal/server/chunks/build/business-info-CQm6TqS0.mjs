import { computed, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, Fragment, renderList, createCommentVNode, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { ArrowLeft, Moon, Sun, Info, Palette, Package, MapPin, Clock, MessageSquare, Save, Camera, ImageIcon, Upload, Trash2, Wrench, X, ImagePlus, Plus, Star, Phone, ThumbsUp } from 'lucide-vue-next';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent, b as CardDescription } from './card-Cq6gP5nL.mjs';
import { I as Input } from './input-C1C1FSk7.mjs';
import { T as Textarea } from './textarea-CCpVUKiI.mjs';
import { L as Label } from './label-CU-twOy-.mjs';
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from './select-BENuuoNZ.mjs';
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from './tabs-1FqyMY98.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { u as useTheme } from './useTheme-CfcsnVmm.mjs';
import { d as useRoute$1, n as navigateTo } from './server.mjs';
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

const _sfc_main$5 = {
  __name: "SettingsBrandingTab",
  __ssrInlineRender: true,
  setup(__props) {
    const logo = ref(null);
    const cover = ref(null);
    const logoRef = ref(null);
    const coverRef = ref(null);
    const handleFile = (e, targetRef, label) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be under 5MB");
        return;
      }
      const url = URL.createObjectURL(file);
      if (targetRef === "logo") logo.value = url;
      if (targetRef === "cover") cover.value = url;
      toast.success(`${label} updated`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cover Image`);
                      } else {
                        return [
                          createTextVNode("Cover Image")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CardDescription), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Recommended size: 1200 × 400px`);
                      } else {
                        return [
                          createTextVNode("Recommended size: 1200 × 400px")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Cover Image")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CardDescription), null, {
                      default: withCtx(() => [
                        createTextVNode("Recommended size: 1200 × 400px")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group"${_scopeId2}>`);
                  if (cover.value) {
                    _push3(`<!--[--><img${ssrRenderAttr("src", cover.value)} alt="Cover" class="w-full h-full object-cover"${_scopeId2}><div class="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Camera), { class: "w-8 h-8 text-background" }, null, _parent3, _scopeId2));
                    _push3(`</div><!--]-->`);
                  } else {
                    _push3(`<div class="flex flex-col items-center gap-2 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ImageIcon), { class: "w-10 h-10" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm font-medium"${_scopeId2}>Click to upload cover image</span></div>`);
                  }
                  _push3(`</div><input type="file" accept="image/*" class="hidden"${_scopeId2}><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Button), {
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => coverRef.value?.click()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(cover.value ? "Change" : "Upload")}`);
                      } else {
                        return [
                          createVNode(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }),
                          createTextVNode(" " + toDisplayString(cover.value ? "Change" : "Upload"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (cover.value) {
                    _push3(ssrRenderComponent(unref(Button), {
                      variant: "outline",
                      size: "sm",
                      onClick: () => {
                        cover.value = null;
                        unref(toast).success("Cover image removed");
                      }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent4, _scopeId3));
                          _push4(` Remove `);
                        } else {
                          return [
                            createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                            createTextVNode(" Remove ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "relative w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group",
                      onClick: ($event) => coverRef.value?.click()
                    }, [
                      cover.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("img", {
                          src: cover.value,
                          alt: "Cover",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" }, [
                          createVNode(unref(Camera), { class: "w-8 h-8 text-background" })
                        ])
                      ], 64)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col items-center gap-2 text-muted-foreground"
                      }, [
                        createVNode(unref(ImageIcon), { class: "w-10 h-10" }),
                        createVNode("span", { class: "text-sm font-medium" }, "Click to upload cover image")
                      ]))
                    ], 8, ["onClick"]),
                    createVNode("input", {
                      ref_key: "coverRef",
                      ref: coverRef,
                      type: "file",
                      accept: "image/*",
                      class: "hidden",
                      onChange: (e) => handleFile(e, "cover", "Cover image")
                    }, null, 40, ["onChange"]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(unref(Button), {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => coverRef.value?.click()
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }),
                          createTextVNode(" " + toDisplayString(cover.value ? "Change" : "Upload"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      cover.value ? (openBlock(), createBlock(unref(Button), {
                        key: 0,
                        variant: "outline",
                        size: "sm",
                        onClick: () => {
                          cover.value = null;
                          unref(toast).success("Cover image removed");
                        }
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                          createTextVNode(" Remove ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
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
                  createVNode(unref(CardTitle), { class: "text-base" }, {
                    default: withCtx(() => [
                      createTextVNode("Cover Image")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardDescription), null, {
                    default: withCtx(() => [
                      createTextVNode("Recommended size: 1200 × 400px")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: "relative w-full h-48 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group",
                    onClick: ($event) => coverRef.value?.click()
                  }, [
                    cover.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("img", {
                        src: cover.value,
                        alt: "Cover",
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" }, [
                        createVNode(unref(Camera), { class: "w-8 h-8 text-background" })
                      ])
                    ], 64)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex flex-col items-center gap-2 text-muted-foreground"
                    }, [
                      createVNode(unref(ImageIcon), { class: "w-10 h-10" }),
                      createVNode("span", { class: "text-sm font-medium" }, "Click to upload cover image")
                    ]))
                  ], 8, ["onClick"]),
                  createVNode("input", {
                    ref_key: "coverRef",
                    ref: coverRef,
                    type: "file",
                    accept: "image/*",
                    class: "hidden",
                    onChange: (e) => handleFile(e, "cover", "Cover image")
                  }, null, 40, ["onChange"]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(unref(Button), {
                      variant: "outline",
                      size: "sm",
                      onClick: ($event) => coverRef.value?.click()
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }),
                        createTextVNode(" " + toDisplayString(cover.value ? "Change" : "Upload"), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    cover.value ? (openBlock(), createBlock(unref(Button), {
                      key: 0,
                      variant: "outline",
                      size: "sm",
                      onClick: () => {
                        cover.value = null;
                        unref(toast).success("Cover image removed");
                      }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                        createTextVNode(" Remove ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Business Logo`);
                      } else {
                        return [
                          createTextVNode("Business Logo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(CardDescription), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Recommended size: 400 × 400px (square)`);
                      } else {
                        return [
                          createTextVNode("Recommended size: 400 × 400px (square)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Business Logo")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CardDescription), null, {
                      default: withCtx(() => [
                        createTextVNode("Recommended size: 400 × 400px (square)")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-6"${_scopeId2}><div class="relative w-28 h-28 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group shrink-0"${_scopeId2}>`);
                  if (logo.value) {
                    _push3(`<!--[--><img${ssrRenderAttr("src", logo.value)} alt="Logo" class="w-full h-full object-cover"${_scopeId2}><div class="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Camera), { class: "w-6 h-6 text-background" }, null, _parent3, _scopeId2));
                    _push3(`</div><!--]-->`);
                  } else {
                    _push3(`<div class="flex flex-col items-center gap-1 text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Camera), { class: "w-8 h-8" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-[10px] font-medium"${_scopeId2}>Upload</span></div>`);
                  }
                  _push3(`</div><div class="space-y-2"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}> Your logo appears on your business profile, invoices, and customer-facing pages. </p><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Button), {
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => logoRef.value?.click()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(logo.value ? "Change" : "Upload")}`);
                      } else {
                        return [
                          createVNode(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }),
                          createTextVNode(" " + toDisplayString(logo.value ? "Change" : "Upload"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (logo.value) {
                    _push3(ssrRenderComponent(unref(Button), {
                      variant: "outline",
                      size: "sm",
                      onClick: () => {
                        logo.value = null;
                        unref(toast).success("Logo removed");
                      }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }, null, _parent4, _scopeId3));
                          _push4(` Remove `);
                        } else {
                          return [
                            createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                            createTextVNode(" Remove ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div></div><input type="file" accept="image/*" class="hidden"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-6" }, [
                      createVNode("div", {
                        class: "relative w-28 h-28 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group shrink-0",
                        onClick: ($event) => logoRef.value?.click()
                      }, [
                        logo.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("img", {
                            src: logo.value,
                            alt: "Logo",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl" }, [
                            createVNode(unref(Camera), { class: "w-6 h-6 text-background" })
                          ])
                        ], 64)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex flex-col items-center gap-1 text-muted-foreground"
                        }, [
                          createVNode(unref(Camera), { class: "w-8 h-8" }),
                          createVNode("span", { class: "text-[10px] font-medium" }, "Upload")
                        ]))
                      ], 8, ["onClick"]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, " Your logo appears on your business profile, invoices, and customer-facing pages. "),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(Button), {
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => logoRef.value?.click()
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }),
                              createTextVNode(" " + toDisplayString(logo.value ? "Change" : "Upload"), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          logo.value ? (openBlock(), createBlock(unref(Button), {
                            key: 0,
                            variant: "outline",
                            size: "sm",
                            onClick: () => {
                              logo.value = null;
                              unref(toast).success("Logo removed");
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                              createTextVNode(" Remove ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("input", {
                      ref_key: "logoRef",
                      ref: logoRef,
                      type: "file",
                      accept: "image/*",
                      class: "hidden",
                      onChange: (e) => handleFile(e, "logo", "Logo")
                    }, null, 40, ["onChange"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardHeader), { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(CardTitle), { class: "text-base" }, {
                    default: withCtx(() => [
                      createTextVNode("Business Logo")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardDescription), null, {
                    default: withCtx(() => [
                      createTextVNode("Recommended size: 400 × 400px (square)")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-6" }, [
                    createVNode("div", {
                      class: "relative w-28 h-28 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer group shrink-0",
                      onClick: ($event) => logoRef.value?.click()
                    }, [
                      logo.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("img", {
                          src: logo.value,
                          alt: "Logo",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl" }, [
                          createVNode(unref(Camera), { class: "w-6 h-6 text-background" })
                        ])
                      ], 64)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col items-center gap-1 text-muted-foreground"
                      }, [
                        createVNode(unref(Camera), { class: "w-8 h-8" }),
                        createVNode("span", { class: "text-[10px] font-medium" }, "Upload")
                      ]))
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Your logo appears on your business profile, invoices, and customer-facing pages. "),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(unref(Button), {
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => logoRef.value?.click()
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Upload), { class: "w-3.5 h-3.5 mr-1.5" }),
                            createTextVNode(" " + toDisplayString(logo.value ? "Change" : "Upload"), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        logo.value ? (openBlock(), createBlock(unref(Button), {
                          key: 0,
                          variant: "outline",
                          size: "sm",
                          onClick: () => {
                            logo.value = null;
                            unref(toast).success("Logo removed");
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-3.5 h-3.5 mr-1.5" }),
                            createTextVNode(" Remove ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("input", {
                    ref_key: "logoRef",
                    ref: logoRef,
                    type: "file",
                    accept: "image/*",
                    class: "hidden",
                    onChange: (e) => handleFile(e, "logo", "Logo")
                  }, null, 40, ["onChange"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/BrandingTab.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const MAX_IMAGES = 5;
const _sfc_main$4 = {
  __name: "SettingsProductsServicesTab",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const services = ref([]);
    const newProduct = ref({ name: "", description: "" });
    const newService = ref({ name: "", description: "" });
    const newProductImages = ref([]);
    const newServiceImages = ref([]);
    const productImgRef = ref(null);
    const serviceImgRef = ref(null);
    const handleImages = (e, currentImages, setter) => {
      const files = Array.from(e.target.files || []);
      const remaining = MAX_IMAGES - currentImages.length;
      if (remaining <= 0) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }
      const valid = files.filter((f) => {
        if (!f.type.startsWith("image/")) {
          toast.error(`${f.name} is not an image`);
          return false;
        }
        if (f.size > 5 * 1024 * 1024) {
          toast.error(`${f.name} exceeds 5MB`);
          return false;
        }
        return true;
      }).slice(0, remaining);
      const urls = valid.map((f) => URL.createObjectURL(f));
      setter([...currentImages, ...urls]);
      e.target.value = "";
    };
    const removeImage = (currentImages, index, setter) => {
      setter(currentImages.filter((_, i) => i !== index));
    };
    const addProduct = () => {
      if (!newProduct.value.name.trim()) {
        toast.error("Product name is required");
        return;
      }
      products.value.push({
        id: crypto.randomUUID(),
        name: newProduct.value.name,
        description: newProduct.value.description,
        images: [...newProductImages.value]
      });
      newProduct.value = { name: "", description: "" };
      newProductImages.value = [];
      toast.success("Product added");
    };
    const addService = () => {
      if (!newService.value.name.trim()) {
        toast.error("Service name is required");
        return;
      }
      services.value.push({
        id: crypto.randomUUID(),
        name: newService.value.name,
        description: newService.value.description,
        images: [...newServiceImages.value]
      });
      newService.value = { name: "", description: "" };
      newServiceImages.value = [];
      toast.success("Service added");
    };
    const removeProduct = (id) => {
      products.value = products.value.filter((x) => x.id !== id);
      toast.success("Product removed");
    };
    const removeService = (id) => {
      services.value = services.value.filter((x) => x.id !== id);
      toast.success("Service removed");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Tabs), mergeProps({ defaultValue: "products" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), { class: "mb-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "products",
                    class: "gap-1.5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Package), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(` Products `);
                      } else {
                        return [
                          createVNode(unref(Package), { class: "w-4 h-4" }),
                          createTextVNode(" Products ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "services",
                    class: "gap-1.5"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Wrench), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(` Services `);
                      } else {
                        return [
                          createVNode(unref(Wrench), { class: "w-4 h-4" }),
                          createTextVNode(" Services ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TabsTrigger), {
                      value: "products",
                      class: "gap-1.5"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Package), { class: "w-4 h-4" }),
                        createTextVNode(" Products ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), {
                      value: "services",
                      class: "gap-1.5"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Wrench), { class: "w-4 h-4" }),
                        createTextVNode(" Services ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), {
              value: "products",
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), { class: "text-base" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Add Product`);
                                  } else {
                                    return [
                                      createTextVNode("Add Product")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), { class: "text-base" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Add Product")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(CardContent), { class: "space-y-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Name`);
                                  } else {
                                    return [
                                      createTextVNode("Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: newProduct.value.name,
                                "onUpdate:modelValue": ($event) => newProduct.value.name = $event,
                                placeholder: "Product name"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Description`);
                                  } else {
                                    return [
                                      createTextVNode("Description")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Textarea), {
                                modelValue: newProduct.value.description,
                                "onUpdate:modelValue": ($event) => newProduct.value.description = $event,
                                placeholder: "Describe this product",
                                rows: 2
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Images (${ssrInterpolate(newProductImages.value.length)}/${ssrInterpolate(MAX_IMAGES)}) `);
                                  } else {
                                    return [
                                      createTextVNode(" Images (" + toDisplayString(newProductImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="flex gap-2 flex-wrap"${_scopeId4}><!--[-->`);
                              ssrRenderList(newProductImages.value, (img, i) => {
                                _push5(`<div class="relative w-16 h-16 rounded-lg overflow-hidden border border-border group"${_scopeId4}><img${ssrRenderAttr("src", img)} alt="" class="w-full h-full object-cover"${_scopeId4}><button type="button" class="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(X), { class: "w-3 h-3" }, null, _parent5, _scopeId4));
                                _push5(`</button></div>`);
                              });
                              _push5(`<!--]-->`);
                              if (newProductImages.value.length < MAX_IMAGES) {
                                _push5(`<button type="button" class="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(ImagePlus), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                                _push5(`</button>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><input type="file" accept="image/*" multiple class="hidden"${_scopeId4}></div>`);
                              _push5(ssrRenderComponent(unref(Button), {
                                onClick: addProduct,
                                size: "sm"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    _push6(` Add Product `);
                                  } else {
                                    return [
                                      createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                      createTextVNode(" Add Product ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Name")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: newProduct.value.name,
                                    "onUpdate:modelValue": ($event) => newProduct.value.name = $event,
                                    placeholder: "Product name"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Description")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Textarea), {
                                    modelValue: newProduct.value.description,
                                    "onUpdate:modelValue": ($event) => newProduct.value.description = $event,
                                    placeholder: "Describe this product",
                                    rows: 2
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Images (" + toDisplayString(newProductImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(newProductImages.value, (img, i) => {
                                      return openBlock(), createBlock("div", {
                                        key: i,
                                        class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                      }, [
                                        createVNode("img", {
                                          src: img,
                                          alt: "",
                                          class: "w-full h-full object-cover"
                                        }, null, 8, ["src"]),
                                        createVNode("button", {
                                          type: "button",
                                          class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                          onClick: ($event) => removeImage(
                                            newProductImages.value,
                                            i,
                                            (val) => newProductImages.value = val
                                          )
                                        }, [
                                          createVNode(unref(X), { class: "w-3 h-3" })
                                        ], 8, ["onClick"])
                                      ]);
                                    }), 128)),
                                    newProductImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      type: "button",
                                      class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                      onClick: ($event) => productImgRef.value?.click()
                                    }, [
                                      createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("input", {
                                    ref_key: "productImgRef",
                                    ref: productImgRef,
                                    type: "file",
                                    accept: "image/*",
                                    multiple: "",
                                    class: "hidden",
                                    onChange: (e) => handleImages(
                                      e,
                                      newProductImages.value,
                                      (val) => newProductImages.value = val
                                    )
                                  }, null, 40, ["onChange"])
                                ]),
                                createVNode(unref(Button), {
                                  onClick: addProduct,
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Add Product ")
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
                          createVNode(unref(CardHeader), { class: "pb-3" }, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), { class: "text-base" }, {
                                default: withCtx(() => [
                                  createTextVNode("Add Product")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), { class: "space-y-3" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: newProduct.value.name,
                                  "onUpdate:modelValue": ($event) => newProduct.value.name = $event,
                                  placeholder: "Product name"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Description")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Textarea), {
                                  modelValue: newProduct.value.description,
                                  "onUpdate:modelValue": ($event) => newProduct.value.description = $event,
                                  placeholder: "Describe this product",
                                  rows: 2
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Images (" + toDisplayString(newProductImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(newProductImages.value, (img, i) => {
                                    return openBlock(), createBlock("div", {
                                      key: i,
                                      class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                    }, [
                                      createVNode("img", {
                                        src: img,
                                        alt: "",
                                        class: "w-full h-full object-cover"
                                      }, null, 8, ["src"]),
                                      createVNode("button", {
                                        type: "button",
                                        class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                        onClick: ($event) => removeImage(
                                          newProductImages.value,
                                          i,
                                          (val) => newProductImages.value = val
                                        )
                                      }, [
                                        createVNode(unref(X), { class: "w-3 h-3" })
                                      ], 8, ["onClick"])
                                    ]);
                                  }), 128)),
                                  newProductImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                    onClick: ($event) => productImgRef.value?.click()
                                  }, [
                                    createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true)
                                ]),
                                createVNode("input", {
                                  ref_key: "productImgRef",
                                  ref: productImgRef,
                                  type: "file",
                                  accept: "image/*",
                                  multiple: "",
                                  class: "hidden",
                                  onChange: (e) => handleImages(
                                    e,
                                    newProductImages.value,
                                    (val) => newProductImages.value = val
                                  )
                                }, null, 40, ["onChange"])
                              ]),
                              createVNode(unref(Button), {
                                onClick: addProduct,
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" Add Product ")
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
                  if (products.value.length > 0) {
                    _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(products.value, (item) => {
                      _push3(ssrRenderComponent(unref(Card), {
                        key: item.id,
                        class: "border-0 shadow-sm shadow-foreground/5"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden"${_scopeId4}>`);
                                  if (item.images.length > 0) {
                                    _push5(`<img${ssrRenderAttr("src", item.images[0])} alt="" class="w-full h-full object-cover"${_scopeId4}>`);
                                  } else {
                                    _push5(ssrRenderComponent(unref(ImagePlus), { class: "w-6 h-6 text-muted-foreground" }, null, _parent5, _scopeId4));
                                  }
                                  _push5(`</div><div class="flex-1 min-w-0 space-y-1.5"${_scopeId4}><p class="font-medium text-sm text-foreground"${_scopeId4}>${ssrInterpolate(item.name)}</p><p class="text-xs text-muted-foreground line-clamp-2"${_scopeId4}>${ssrInterpolate(item.description || "No description")}</p>`);
                                  if (item.images.length > 1) {
                                    _push5(`<div class="flex gap-1.5 flex-wrap"${_scopeId4}><!--[-->`);
                                    ssrRenderList(item.images.slice(1), (img, idx) => {
                                      _push5(`<div class="w-12 h-12 rounded-md overflow-hidden border border-border"${_scopeId4}><img${ssrRenderAttr("src", img)} alt="" class="w-full h-full object-cover"${_scopeId4}></div>`);
                                    });
                                    _push5(`<!--]--></div>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(unref(Button), {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "text-destructive h-8 w-8",
                                    onClick: ($event) => removeProduct(item.id)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Trash2), { class: "w-4 h-4" })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                      item.images.length > 0 ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: item.images[0],
                                        alt: "",
                                        class: "w-full h-full object-cover"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                        key: 1,
                                        class: "w-6 h-6 text-muted-foreground"
                                      }))
                                    ]),
                                    createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                      createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                      createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                      item.images.length > 1 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex gap-1.5 flex-wrap"
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                          return openBlock(), createBlock("div", {
                                            key: idx,
                                            class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                          }, [
                                            createVNode("img", {
                                              src: img,
                                              alt: "",
                                              class: "w-full h-full object-cover"
                                            }, null, 8, ["src"])
                                          ]);
                                        }), 128))
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode(unref(Button), {
                                      variant: "ghost",
                                      size: "icon",
                                      class: "text-destructive h-8 w-8",
                                      onClick: ($event) => removeProduct(item.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), { class: "w-4 h-4" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                    item.images.length > 0 ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: item.images[0],
                                      alt: "",
                                      class: "w-full h-full object-cover"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                      key: 1,
                                      class: "w-6 h-6 text-muted-foreground"
                                    }))
                                  ]),
                                  createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                    createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                    item.images.length > 1 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex gap-1.5 flex-wrap"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                        return openBlock(), createBlock("div", {
                                          key: idx,
                                          class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                        }, [
                                          createVNode("img", {
                                            src: img,
                                            alt: "",
                                            class: "w-full h-full object-cover"
                                          }, null, 8, ["src"])
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode(unref(Button), {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "text-destructive h-8 w-8",
                                    onClick: ($event) => removeProduct(item.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<p class="text-sm text-muted-foreground text-center py-8"${_scopeId2}> No products added yet </p>`);
                  }
                } else {
                  return [
                    createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), { class: "text-base" }, {
                              default: withCtx(() => [
                                createTextVNode("Add Product")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), { class: "space-y-3" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: newProduct.value.name,
                                "onUpdate:modelValue": ($event) => newProduct.value.name = $event,
                                placeholder: "Product name"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Description")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Textarea), {
                                modelValue: newProduct.value.description,
                                "onUpdate:modelValue": ($event) => newProduct.value.description = $event,
                                placeholder: "Describe this product",
                                rows: 2
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Images (" + toDisplayString(newProductImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(newProductImages.value, (img, i) => {
                                  return openBlock(), createBlock("div", {
                                    key: i,
                                    class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                  }, [
                                    createVNode("img", {
                                      src: img,
                                      alt: "",
                                      class: "w-full h-full object-cover"
                                    }, null, 8, ["src"]),
                                    createVNode("button", {
                                      type: "button",
                                      class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                      onClick: ($event) => removeImage(
                                        newProductImages.value,
                                        i,
                                        (val) => newProductImages.value = val
                                      )
                                    }, [
                                      createVNode(unref(X), { class: "w-3 h-3" })
                                    ], 8, ["onClick"])
                                  ]);
                                }), 128)),
                                newProductImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  type: "button",
                                  class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                  onClick: ($event) => productImgRef.value?.click()
                                }, [
                                  createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              createVNode("input", {
                                ref_key: "productImgRef",
                                ref: productImgRef,
                                type: "file",
                                accept: "image/*",
                                multiple: "",
                                class: "hidden",
                                onChange: (e) => handleImages(
                                  e,
                                  newProductImages.value,
                                  (val) => newProductImages.value = val
                                )
                              }, null, 40, ["onChange"])
                            ]),
                            createVNode(unref(Button), {
                              onClick: addProduct,
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Add Product ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    products.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(products.value, (item) => {
                        return openBlock(), createBlock(unref(Card), {
                          key: item.id,
                          class: "border-0 shadow-sm shadow-foreground/5"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                  item.images.length > 0 ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: item.images[0],
                                    alt: "",
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                    key: 1,
                                    class: "w-6 h-6 text-muted-foreground"
                                  }))
                                ]),
                                createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                  createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                  item.images.length > 1 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex gap-1.5 flex-wrap"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                      return openBlock(), createBlock("div", {
                                        key: idx,
                                        class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                      }, [
                                        createVNode("img", {
                                          src: img,
                                          alt: "",
                                          class: "w-full h-full object-cover"
                                        }, null, 8, ["src"])
                                      ]);
                                    }), 128))
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode(unref(Button), {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "text-destructive h-8 w-8",
                                  onClick: ($event) => removeProduct(item.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-sm text-muted-foreground text-center py-8"
                    }, " No products added yet "))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), {
              value: "services",
              class: "space-y-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), { class: "text-base" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Add Service`);
                                  } else {
                                    return [
                                      createTextVNode("Add Service")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), { class: "text-base" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Add Service")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(CardContent), { class: "space-y-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Name`);
                                  } else {
                                    return [
                                      createTextVNode("Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: newService.value.name,
                                "onUpdate:modelValue": ($event) => newService.value.name = $event,
                                placeholder: "Service name"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Description`);
                                  } else {
                                    return [
                                      createTextVNode("Description")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Textarea), {
                                modelValue: newService.value.description,
                                "onUpdate:modelValue": ($event) => newService.value.description = $event,
                                placeholder: "Describe this service",
                                rows: 2
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Images (${ssrInterpolate(newServiceImages.value.length)}/${ssrInterpolate(MAX_IMAGES)}) `);
                                  } else {
                                    return [
                                      createTextVNode(" Images (" + toDisplayString(newServiceImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="flex gap-2 flex-wrap"${_scopeId4}><!--[-->`);
                              ssrRenderList(newServiceImages.value, (img, i) => {
                                _push5(`<div class="relative w-16 h-16 rounded-lg overflow-hidden border border-border group"${_scopeId4}><img${ssrRenderAttr("src", img)} alt="" class="w-full h-full object-cover"${_scopeId4}><button type="button" class="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(X), { class: "w-3 h-3" }, null, _parent5, _scopeId4));
                                _push5(`</button></div>`);
                              });
                              _push5(`<!--]-->`);
                              if (newServiceImages.value.length < MAX_IMAGES) {
                                _push5(`<button type="button" class="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(ImagePlus), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                                _push5(`</button>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><input type="file" accept="image/*" multiple class="hidden"${_scopeId4}></div>`);
                              _push5(ssrRenderComponent(unref(Button), {
                                onClick: addService,
                                size: "sm"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    _push6(` Add Service `);
                                  } else {
                                    return [
                                      createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                      createTextVNode(" Add Service ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Name")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: newService.value.name,
                                    "onUpdate:modelValue": ($event) => newService.value.name = $event,
                                    placeholder: "Service name"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Description")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Textarea), {
                                    modelValue: newService.value.description,
                                    "onUpdate:modelValue": ($event) => newService.value.description = $event,
                                    placeholder: "Describe this service",
                                    rows: 2
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Images (" + toDisplayString(newServiceImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(newServiceImages.value, (img, i) => {
                                      return openBlock(), createBlock("div", {
                                        key: i,
                                        class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                      }, [
                                        createVNode("img", {
                                          src: img,
                                          alt: "",
                                          class: "w-full h-full object-cover"
                                        }, null, 8, ["src"]),
                                        createVNode("button", {
                                          type: "button",
                                          class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                          onClick: ($event) => removeImage(
                                            newServiceImages.value,
                                            i,
                                            (val) => newServiceImages.value = val
                                          )
                                        }, [
                                          createVNode(unref(X), { class: "w-3 h-3" })
                                        ], 8, ["onClick"])
                                      ]);
                                    }), 128)),
                                    newServiceImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      type: "button",
                                      class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                      onClick: ($event) => serviceImgRef.value?.click()
                                    }, [
                                      createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("input", {
                                    ref_key: "serviceImgRef",
                                    ref: serviceImgRef,
                                    type: "file",
                                    accept: "image/*",
                                    multiple: "",
                                    class: "hidden",
                                    onChange: (e) => handleImages(
                                      e,
                                      newServiceImages.value,
                                      (val) => newServiceImages.value = val
                                    )
                                  }, null, 40, ["onChange"])
                                ]),
                                createVNode(unref(Button), {
                                  onClick: addService,
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Add Service ")
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
                          createVNode(unref(CardHeader), { class: "pb-3" }, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), { class: "text-base" }, {
                                default: withCtx(() => [
                                  createTextVNode("Add Service")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), { class: "space-y-3" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: newService.value.name,
                                  "onUpdate:modelValue": ($event) => newService.value.name = $event,
                                  placeholder: "Service name"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Description")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Textarea), {
                                  modelValue: newService.value.description,
                                  "onUpdate:modelValue": ($event) => newService.value.description = $event,
                                  placeholder: "Describe this service",
                                  rows: 2
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Images (" + toDisplayString(newServiceImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(newServiceImages.value, (img, i) => {
                                    return openBlock(), createBlock("div", {
                                      key: i,
                                      class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                    }, [
                                      createVNode("img", {
                                        src: img,
                                        alt: "",
                                        class: "w-full h-full object-cover"
                                      }, null, 8, ["src"]),
                                      createVNode("button", {
                                        type: "button",
                                        class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                        onClick: ($event) => removeImage(
                                          newServiceImages.value,
                                          i,
                                          (val) => newServiceImages.value = val
                                        )
                                      }, [
                                        createVNode(unref(X), { class: "w-3 h-3" })
                                      ], 8, ["onClick"])
                                    ]);
                                  }), 128)),
                                  newServiceImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                    onClick: ($event) => serviceImgRef.value?.click()
                                  }, [
                                    createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true)
                                ]),
                                createVNode("input", {
                                  ref_key: "serviceImgRef",
                                  ref: serviceImgRef,
                                  type: "file",
                                  accept: "image/*",
                                  multiple: "",
                                  class: "hidden",
                                  onChange: (e) => handleImages(
                                    e,
                                    newServiceImages.value,
                                    (val) => newServiceImages.value = val
                                  )
                                }, null, 40, ["onChange"])
                              ]),
                              createVNode(unref(Button), {
                                onClick: addService,
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" Add Service ")
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
                  if (services.value.length > 0) {
                    _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(services.value, (item) => {
                      _push3(ssrRenderComponent(unref(Card), {
                        key: item.id,
                        class: "border-0 shadow-sm shadow-foreground/5"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden"${_scopeId4}>`);
                                  if (item.images.length > 0) {
                                    _push5(`<img${ssrRenderAttr("src", item.images[0])} alt="" class="w-full h-full object-cover"${_scopeId4}>`);
                                  } else {
                                    _push5(ssrRenderComponent(unref(ImagePlus), { class: "w-6 h-6 text-muted-foreground" }, null, _parent5, _scopeId4));
                                  }
                                  _push5(`</div><div class="flex-1 min-w-0 space-y-1.5"${_scopeId4}><p class="font-medium text-sm text-foreground"${_scopeId4}>${ssrInterpolate(item.name)}</p><p class="text-xs text-muted-foreground line-clamp-2"${_scopeId4}>${ssrInterpolate(item.description || "No description")}</p>`);
                                  if (item.images.length > 1) {
                                    _push5(`<div class="flex gap-1.5 flex-wrap"${_scopeId4}><!--[-->`);
                                    ssrRenderList(item.images.slice(1), (img, idx) => {
                                      _push5(`<div class="w-12 h-12 rounded-md overflow-hidden border border-border"${_scopeId4}><img${ssrRenderAttr("src", img)} alt="" class="w-full h-full object-cover"${_scopeId4}></div>`);
                                    });
                                    _push5(`<!--]--></div>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(unref(Button), {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "text-destructive h-8 w-8",
                                    onClick: ($event) => removeService(item.id)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Trash2), { class: "w-4 h-4" })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                      item.images.length > 0 ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: item.images[0],
                                        alt: "",
                                        class: "w-full h-full object-cover"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                        key: 1,
                                        class: "w-6 h-6 text-muted-foreground"
                                      }))
                                    ]),
                                    createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                      createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                      createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                      item.images.length > 1 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex gap-1.5 flex-wrap"
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                          return openBlock(), createBlock("div", {
                                            key: idx,
                                            class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                          }, [
                                            createVNode("img", {
                                              src: img,
                                              alt: "",
                                              class: "w-full h-full object-cover"
                                            }, null, 8, ["src"])
                                          ]);
                                        }), 128))
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createVNode(unref(Button), {
                                      variant: "ghost",
                                      size: "icon",
                                      class: "text-destructive h-8 w-8",
                                      onClick: ($event) => removeService(item.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), { class: "w-4 h-4" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                    item.images.length > 0 ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: item.images[0],
                                      alt: "",
                                      class: "w-full h-full object-cover"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                      key: 1,
                                      class: "w-6 h-6 text-muted-foreground"
                                    }))
                                  ]),
                                  createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                    createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                    item.images.length > 1 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex gap-1.5 flex-wrap"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                        return openBlock(), createBlock("div", {
                                          key: idx,
                                          class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                        }, [
                                          createVNode("img", {
                                            src: img,
                                            alt: "",
                                            class: "w-full h-full object-cover"
                                          }, null, 8, ["src"])
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode(unref(Button), {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "text-destructive h-8 w-8",
                                    onClick: ($event) => removeService(item.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<p class="text-sm text-muted-foreground text-center py-8"${_scopeId2}> No services added yet </p>`);
                  }
                } else {
                  return [
                    createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), { class: "text-base" }, {
                              default: withCtx(() => [
                                createTextVNode("Add Service")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), { class: "space-y-3" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: newService.value.name,
                                "onUpdate:modelValue": ($event) => newService.value.name = $event,
                                placeholder: "Service name"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Description")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Textarea), {
                                modelValue: newService.value.description,
                                "onUpdate:modelValue": ($event) => newService.value.description = $event,
                                placeholder: "Describe this service",
                                rows: 2
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode(" Images (" + toDisplayString(newServiceImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(newServiceImages.value, (img, i) => {
                                  return openBlock(), createBlock("div", {
                                    key: i,
                                    class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                  }, [
                                    createVNode("img", {
                                      src: img,
                                      alt: "",
                                      class: "w-full h-full object-cover"
                                    }, null, 8, ["src"]),
                                    createVNode("button", {
                                      type: "button",
                                      class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                      onClick: ($event) => removeImage(
                                        newServiceImages.value,
                                        i,
                                        (val) => newServiceImages.value = val
                                      )
                                    }, [
                                      createVNode(unref(X), { class: "w-3 h-3" })
                                    ], 8, ["onClick"])
                                  ]);
                                }), 128)),
                                newServiceImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  type: "button",
                                  class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                  onClick: ($event) => serviceImgRef.value?.click()
                                }, [
                                  createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              createVNode("input", {
                                ref_key: "serviceImgRef",
                                ref: serviceImgRef,
                                type: "file",
                                accept: "image/*",
                                multiple: "",
                                class: "hidden",
                                onChange: (e) => handleImages(
                                  e,
                                  newServiceImages.value,
                                  (val) => newServiceImages.value = val
                                )
                              }, null, 40, ["onChange"])
                            ]),
                            createVNode(unref(Button), {
                              onClick: addService,
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Add Service ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    services.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(services.value, (item) => {
                        return openBlock(), createBlock(unref(Card), {
                          key: item.id,
                          class: "border-0 shadow-sm shadow-foreground/5"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                  item.images.length > 0 ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: item.images[0],
                                    alt: "",
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                    key: 1,
                                    class: "w-6 h-6 text-muted-foreground"
                                  }))
                                ]),
                                createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                  createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                  item.images.length > 1 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex gap-1.5 flex-wrap"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                      return openBlock(), createBlock("div", {
                                        key: idx,
                                        class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                      }, [
                                        createVNode("img", {
                                          src: img,
                                          alt: "",
                                          class: "w-full h-full object-cover"
                                        }, null, 8, ["src"])
                                      ]);
                                    }), 128))
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode(unref(Button), {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "text-destructive h-8 w-8",
                                  onClick: ($event) => removeService(item.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-sm text-muted-foreground text-center py-8"
                    }, " No services added yet "))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabsList), { class: "mb-4" }, {
                default: withCtx(() => [
                  createVNode(unref(TabsTrigger), {
                    value: "products",
                    class: "gap-1.5"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Package), { class: "w-4 h-4" }),
                      createTextVNode(" Products ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), {
                    value: "services",
                    class: "gap-1.5"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Wrench), { class: "w-4 h-4" }),
                      createTextVNode(" Services ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), {
                value: "products",
                class: "space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), { class: "pb-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Add Product")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Name")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: newProduct.value.name,
                              "onUpdate:modelValue": ($event) => newProduct.value.name = $event,
                              placeholder: "Product name"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Description")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Textarea), {
                              modelValue: newProduct.value.description,
                              "onUpdate:modelValue": ($event) => newProduct.value.description = $event,
                              placeholder: "Describe this product",
                              rows: 2
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode(" Images (" + toDisplayString(newProductImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(newProductImages.value, (img, i) => {
                                return openBlock(), createBlock("div", {
                                  key: i,
                                  class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                }, [
                                  createVNode("img", {
                                    src: img,
                                    alt: "",
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                    onClick: ($event) => removeImage(
                                      newProductImages.value,
                                      i,
                                      (val) => newProductImages.value = val
                                    )
                                  }, [
                                    createVNode(unref(X), { class: "w-3 h-3" })
                                  ], 8, ["onClick"])
                                ]);
                              }), 128)),
                              newProductImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                key: 0,
                                type: "button",
                                class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                onClick: ($event) => productImgRef.value?.click()
                              }, [
                                createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            createVNode("input", {
                              ref_key: "productImgRef",
                              ref: productImgRef,
                              type: "file",
                              accept: "image/*",
                              multiple: "",
                              class: "hidden",
                              onChange: (e) => handleImages(
                                e,
                                newProductImages.value,
                                (val) => newProductImages.value = val
                              )
                            }, null, 40, ["onChange"])
                          ]),
                          createVNode(unref(Button), {
                            onClick: addProduct,
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Add Product ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  products.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(products.value, (item) => {
                      return openBlock(), createBlock(unref(Card), {
                        key: item.id,
                        class: "border-0 shadow-sm shadow-foreground/5"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                item.images.length > 0 ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: item.images[0],
                                  alt: "",
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                  key: 1,
                                  class: "w-6 h-6 text-muted-foreground"
                                }))
                              ]),
                              createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                item.images.length > 1 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex gap-1.5 flex-wrap"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                    return openBlock(), createBlock("div", {
                                      key: idx,
                                      class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                    }, [
                                      createVNode("img", {
                                        src: img,
                                        alt: "",
                                        class: "w-full h-full object-cover"
                                      }, null, 8, ["src"])
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode(unref(Button), {
                                variant: "ghost",
                                size: "icon",
                                class: "text-destructive h-8 w-8",
                                onClick: ($event) => removeProduct(item.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-sm text-muted-foreground text-center py-8"
                  }, " No products added yet "))
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), {
                value: "services",
                class: "space-y-4"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), { class: "pb-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode("Add Service")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), { class: "space-y-3" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Name")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: newService.value.name,
                              "onUpdate:modelValue": ($event) => newService.value.name = $event,
                              placeholder: "Service name"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Description")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Textarea), {
                              modelValue: newService.value.description,
                              "onUpdate:modelValue": ($event) => newService.value.description = $event,
                              placeholder: "Describe this service",
                              rows: 2
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode(" Images (" + toDisplayString(newServiceImages.value.length) + "/" + toDisplayString(MAX_IMAGES) + ") ", 1)
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(newServiceImages.value, (img, i) => {
                                return openBlock(), createBlock("div", {
                                  key: i,
                                  class: "relative w-16 h-16 rounded-lg overflow-hidden border border-border group"
                                }, [
                                  createVNode("img", {
                                    src: img,
                                    alt: "",
                                    class: "w-full h-full object-cover"
                                  }, null, 8, ["src"]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                    onClick: ($event) => removeImage(
                                      newServiceImages.value,
                                      i,
                                      (val) => newServiceImages.value = val
                                    )
                                  }, [
                                    createVNode(unref(X), { class: "w-3 h-3" })
                                  ], 8, ["onClick"])
                                ]);
                              }), 128)),
                              newServiceImages.value.length < MAX_IMAGES ? (openBlock(), createBlock("button", {
                                key: 0,
                                type: "button",
                                class: "w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors",
                                onClick: ($event) => serviceImgRef.value?.click()
                              }, [
                                createVNode(unref(ImagePlus), { class: "w-5 h-5" })
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            createVNode("input", {
                              ref_key: "serviceImgRef",
                              ref: serviceImgRef,
                              type: "file",
                              accept: "image/*",
                              multiple: "",
                              class: "hidden",
                              onChange: (e) => handleImages(
                                e,
                                newServiceImages.value,
                                (val) => newServiceImages.value = val
                              )
                            }, null, 40, ["onChange"])
                          ]),
                          createVNode(unref(Button), {
                            onClick: addService,
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Add Service ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  services.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(services.value, (item) => {
                      return openBlock(), createBlock(unref(Card), {
                        key: item.id,
                        class: "border-0 shadow-sm shadow-foreground/5"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden" }, [
                                item.images.length > 0 ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: item.images[0],
                                  alt: "",
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock(unref(ImagePlus), {
                                  key: 1,
                                  class: "w-6 h-6 text-muted-foreground"
                                }))
                              ]),
                              createVNode("div", { class: "flex-1 min-w-0 space-y-1.5" }, [
                                createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(item.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground line-clamp-2" }, toDisplayString(item.description || "No description"), 1),
                                item.images.length > 1 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex gap-1.5 flex-wrap"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.images.slice(1), (img, idx) => {
                                    return openBlock(), createBlock("div", {
                                      key: idx,
                                      class: "w-12 h-12 rounded-md overflow-hidden border border-border"
                                    }, [
                                      createVNode("img", {
                                        src: img,
                                        alt: "",
                                        class: "w-full h-full object-cover"
                                      }, null, 8, ["src"])
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode(unref(Button), {
                                variant: "ghost",
                                size: "icon",
                                class: "text-destructive h-8 w-8",
                                onClick: ($event) => removeService(item.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-sm text-muted-foreground text-center py-8"
                  }, " No services added yet "))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/ProductsServicesTab.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "SettingsBranchesTab",
  __ssrInlineRender: true,
  setup(__props) {
    const branches = ref([]);
    const form = ref({
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phone: ""
    });
    const update = (key, value) => {
      form.value[key] = value;
    };
    const addBranch = () => {
      if (!form.value.name.trim()) {
        toast.error("Branch name is required");
        return;
      }
      if (!form.value.address.trim()) {
        toast.error("Address is required");
        return;
      }
      branches.value.push({
        id: crypto.randomUUID(),
        ...form.value,
        isMain: branches.value.length === 0
      });
      form.value = {
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phone: ""
      };
      toast.success("Branch added");
    };
    const removeBranch = (id) => {
      branches.value = branches.value.filter((b) => b.id !== id);
      toast.success("Branch removed");
    };
    const setMain = (id) => {
      branches.value = branches.value.map((b) => ({
        ...b,
        isMain: b.id === id
      }));
      toast.success("Main branch updated");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Add Branch Location`);
                      } else {
                        return [
                          createTextVNode("Add Branch Location")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Add Branch Location")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3"${_scopeId2}><div class="space-y-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Branch Name`);
                      } else {
                        return [
                          createTextVNode("Branch Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    modelValue: form.value.name,
                    "onUpdate:modelValue": (val) => update("name", val),
                    placeholder: "e.g. Main Office"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    modelValue: form.value.phone,
                    "onUpdate:modelValue": (val) => update("phone", val),
                    placeholder: "+1 234 567 890"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Street Address`);
                      } else {
                        return [
                          createTextVNode("Street Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    modelValue: form.value.address,
                    "onUpdate:modelValue": (val) => update("address", val)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-3"${_scopeId2}><div class="space-y-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`City`);
                      } else {
                        return [
                          createTextVNode("City")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    modelValue: form.value.city,
                    "onUpdate:modelValue": (val) => update("city", val)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`State`);
                      } else {
                        return [
                          createTextVNode("State")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    modelValue: form.value.state,
                    "onUpdate:modelValue": (val) => update("state", val)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Country`);
                      } else {
                        return [
                          createTextVNode("Country")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    modelValue: form.value.country,
                    "onUpdate:modelValue": (val) => update("country", val)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1.5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Label), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Zip Code`);
                      } else {
                        return [
                          createTextVNode("Zip Code")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    modelValue: form.value.zipCode,
                    "onUpdate:modelValue": (val) => update("zipCode", val)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(Button), {
                    onClick: addBranch,
                    size: "sm"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Add Branch `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Add Branch ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-1.5" }, [
                        createVNode(unref(Label), null, {
                          default: withCtx(() => [
                            createTextVNode("Branch Name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": (val) => update("name", val),
                          placeholder: "e.g. Main Office"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-1.5" }, [
                        createVNode(unref(Label), null, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          modelValue: form.value.phone,
                          "onUpdate:modelValue": (val) => update("phone", val),
                          placeholder: "+1 234 567 890"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-1.5" }, [
                      createVNode(unref(Label), null, {
                        default: withCtx(() => [
                          createTextVNode("Street Address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        modelValue: form.value.address,
                        "onUpdate:modelValue": (val) => update("address", val)
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-3" }, [
                      createVNode("div", { class: "space-y-1.5" }, [
                        createVNode(unref(Label), null, {
                          default: withCtx(() => [
                            createTextVNode("City")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          modelValue: form.value.city,
                          "onUpdate:modelValue": (val) => update("city", val)
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-1.5" }, [
                        createVNode(unref(Label), null, {
                          default: withCtx(() => [
                            createTextVNode("State")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          modelValue: form.value.state,
                          "onUpdate:modelValue": (val) => update("state", val)
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-1.5" }, [
                        createVNode(unref(Label), null, {
                          default: withCtx(() => [
                            createTextVNode("Country")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          modelValue: form.value.country,
                          "onUpdate:modelValue": (val) => update("country", val)
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-1.5" }, [
                        createVNode(unref(Label), null, {
                          default: withCtx(() => [
                            createTextVNode("Zip Code")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Input), {
                          modelValue: form.value.zipCode,
                          "onUpdate:modelValue": (val) => update("zipCode", val)
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode(unref(Button), {
                      onClick: addBranch,
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Add Branch ")
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
              createVNode(unref(CardHeader), { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(CardTitle), { class: "text-base" }, {
                    default: withCtx(() => [
                      createTextVNode("Add Branch Location")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-3" }, [
                    createVNode("div", { class: "space-y-1.5" }, [
                      createVNode(unref(Label), null, {
                        default: withCtx(() => [
                          createTextVNode("Branch Name")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": (val) => update("name", val),
                        placeholder: "e.g. Main Office"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-1.5" }, [
                      createVNode(unref(Label), null, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        modelValue: form.value.phone,
                        "onUpdate:modelValue": (val) => update("phone", val),
                        placeholder: "+1 234 567 890"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-1.5" }, [
                    createVNode(unref(Label), null, {
                      default: withCtx(() => [
                        createTextVNode("Street Address")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Input), {
                      modelValue: form.value.address,
                      "onUpdate:modelValue": (val) => update("address", val)
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-3" }, [
                    createVNode("div", { class: "space-y-1.5" }, [
                      createVNode(unref(Label), null, {
                        default: withCtx(() => [
                          createTextVNode("City")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        modelValue: form.value.city,
                        "onUpdate:modelValue": (val) => update("city", val)
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-1.5" }, [
                      createVNode(unref(Label), null, {
                        default: withCtx(() => [
                          createTextVNode("State")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        modelValue: form.value.state,
                        "onUpdate:modelValue": (val) => update("state", val)
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-1.5" }, [
                      createVNode(unref(Label), null, {
                        default: withCtx(() => [
                          createTextVNode("Country")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        modelValue: form.value.country,
                        "onUpdate:modelValue": (val) => update("country", val)
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-1.5" }, [
                      createVNode(unref(Label), null, {
                        default: withCtx(() => [
                          createTextVNode("Zip Code")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Input), {
                        modelValue: form.value.zipCode,
                        "onUpdate:modelValue": (val) => update("zipCode", val)
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode(unref(Button), {
                    onClick: addBranch,
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Add Branch ")
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
      if (branches.value.length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(branches.value, (branch) => {
          _push(ssrRenderComponent(unref(Card), {
            key: branch.id,
            class: "border-0 shadow-sm shadow-foreground/5"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5 text-accent-foreground" }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="flex-1 min-w-0"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><p class="font-medium text-sm text-foreground"${_scopeId2}>${ssrInterpolate(branch.name)}</p>`);
                      if (branch.isMain) {
                        _push3(ssrRenderComponent(unref(Badge), {
                          variant: "secondary",
                          class: "text-[10px] gap-1"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Star), { class: "w-3 h-3 text-foreground" }, null, _parent4, _scopeId3));
                              _push4(` Main `);
                            } else {
                              return [
                                createVNode(unref(Star), { class: "w-3 h-3 text-foreground" }),
                                createTextVNode(" Main ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><p class="text-xs text-muted-foreground mt-0.5"${_scopeId2}>${ssrInterpolate([branch.address, branch.city, branch.state, branch.country].filter(Boolean).join(", "))}</p>`);
                      if (branch.phone) {
                        _push3(`<p class="text-xs text-muted-foreground flex items-center gap-1 mt-1"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Phone), { class: "w-3 h-3" }, null, _parent3, _scopeId2));
                        _push3(` ${ssrInterpolate(branch.phone)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="flex gap-1"${_scopeId2}>`);
                      if (!branch.isMain) {
                        _push3(ssrRenderComponent(unref(Button), {
                          variant: "ghost",
                          size: "sm",
                          class: "text-xs h-7 text-foreground",
                          onClick: ($event) => setMain(branch.id)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Set Main `);
                            } else {
                              return [
                                createTextVNode(" Set Main ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(unref(Button), {
                        variant: "ghost",
                        size: "icon",
                        class: "text-destructive h-8 w-8",
                        onClick: ($event) => removeBranch(branch.id)
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
                    } else {
                      return [
                        createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                          createVNode(unref(MapPin), { class: "w-5 h-5 text-accent-foreground" })
                        ]),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(branch.name), 1),
                            branch.isMain ? (openBlock(), createBlock(unref(Badge), {
                              key: 0,
                              variant: "secondary",
                              class: "text-[10px] gap-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Star), { class: "w-3 h-3 text-foreground" }),
                                createTextVNode(" Main ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, toDisplayString([branch.address, branch.city, branch.state, branch.country].filter(Boolean).join(", ")), 1),
                          branch.phone ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-muted-foreground flex items-center gap-1 mt-1"
                          }, [
                            createVNode(unref(Phone), { class: "w-3 h-3" }),
                            createTextVNode(" " + toDisplayString(branch.phone), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex gap-1" }, [
                          !branch.isMain ? (openBlock(), createBlock(unref(Button), {
                            key: 0,
                            variant: "ghost",
                            size: "sm",
                            class: "text-xs h-7 text-foreground",
                            onClick: ($event) => setMain(branch.id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Set Main ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(unref(Button), {
                            variant: "ghost",
                            size: "icon",
                            class: "text-destructive h-8 w-8",
                            onClick: ($event) => removeBranch(branch.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "w-4 h-4" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(CardContent), { class: "p-4 flex items-start gap-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0" }, [
                        createVNode(unref(MapPin), { class: "w-5 h-5 text-accent-foreground" })
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(branch.name), 1),
                          branch.isMain ? (openBlock(), createBlock(unref(Badge), {
                            key: 0,
                            variant: "secondary",
                            class: "text-[10px] gap-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Star), { class: "w-3 h-3 text-foreground" }),
                              createTextVNode(" Main ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, toDisplayString([branch.address, branch.city, branch.state, branch.country].filter(Boolean).join(", ")), 1),
                        branch.phone ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground flex items-center gap-1 mt-1"
                        }, [
                          createVNode(unref(Phone), { class: "w-3 h-3" }),
                          createTextVNode(" " + toDisplayString(branch.phone), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex gap-1" }, [
                        !branch.isMain ? (openBlock(), createBlock(unref(Button), {
                          key: 0,
                          variant: "ghost",
                          size: "sm",
                          class: "text-xs h-7 text-foreground",
                          onClick: ($event) => setMain(branch.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Set Main ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode(unref(Button), {
                          variant: "ghost",
                          size: "icon",
                          class: "text-destructive h-8 w-8",
                          onClick: ($event) => removeBranch(branch.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "w-4 h-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
      } else {
        _push(`<p class="text-sm text-muted-foreground text-center py-8"> No branches added yet </p>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/BranchesTab.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Switch = {
  name: "Switch",
  props: {
    modelValue: Boolean,
    checked: Boolean,
    onCheckedChange: Function,
    class: String,
    disabled: Boolean
  },
  emits: ["update:modelValue", "update:checked"],
  setup(props, { emit }) {
    const isChecked = () => props.modelValue !== void 0 ? props.modelValue : props.checked;
    const toggle = () => {
      if (props.disabled) return;
      const nextValue = !isChecked();
      emit("update:modelValue", nextValue);
      emit("update:checked", nextValue);
      if (props.onCheckedChange) props.onCheckedChange(nextValue);
    };
    return () => h(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": isChecked(),
        disabled: props.disabled,
        onClick: toggle,
        class: [
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          isChecked() ? "bg-primary" : "bg-input",
          props.class
        ]
      },
      h("span", {
        class: [
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
          isChecked() ? "translate-x-4" : "translate-x-0"
        ]
      })
    );
  }
};
const _sfc_main$2 = {
  __name: "SettingsBusinessHoursTab",
  __ssrInlineRender: true,
  setup(__props) {
    const defaultBusinessHours = [
      { day: "Monday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Tuesday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Wednesday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Thursday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Friday", open: "09:00", close: "17:00", isClosed: false },
      { day: "Saturday", open: "09:00", close: "17:00", isClosed: true },
      { day: "Sunday", open: "09:00", close: "17:00", isClosed: true }
    ];
    const hours = ref([...defaultBusinessHours]);
    const updateDay = (index, field, value) => {
      hours.value[index] = { ...hours.value[index], [field]: value };
    };
    const handleSave = () => toast.success("Business hours updated");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Clock), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                        _push4(` Operating Hours `);
                      } else {
                        return [
                          createVNode(unref(Clock), { class: "w-4 h-4" }),
                          createTextVNode(" Operating Hours ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-base flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Clock), { class: "w-4 h-4" }),
                        createTextVNode(" Operating Hours ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(CardContent), { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(hours.value, (h2, i) => {
                    _push3(`<div class="flex items-center gap-4 py-2 border-b border-border last:border-0"${_scopeId2}><span class="w-24 text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(h2.day)}</span><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Switch), {
                      checked: !h2.isClosed,
                      "onUpdate:checked": (v) => updateDay(i, "isClosed", !v)
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-xs text-muted-foreground w-10"${_scopeId2}>${ssrInterpolate(h2.isClosed ? "Closed" : "Open")}</span></div>`);
                    if (!h2.isClosed) {
                      _push3(`<div class="flex items-center gap-2 flex-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Input), {
                        type: "time",
                        modelValue: h2.open,
                        "onUpdate:modelValue": (val) => updateDay(i, "open", val),
                        class: "w-32 h-8 text-xs"
                      }, null, _parent3, _scopeId2));
                      _push3(`<span class="text-xs text-muted-foreground"${_scopeId2}>to</span>`);
                      _push3(ssrRenderComponent(unref(Input), {
                        type: "time",
                        modelValue: h2.close,
                        "onUpdate:modelValue": (val) => updateDay(i, "close", val),
                        class: "w-32 h-8 text-xs"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(hours.value, (h2, i) => {
                      return openBlock(), createBlock("div", {
                        key: h2.day,
                        class: "flex items-center gap-4 py-2 border-b border-border last:border-0"
                      }, [
                        createVNode("span", { class: "w-24 text-sm font-medium text-foreground" }, toDisplayString(h2.day), 1),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Switch), {
                            checked: !h2.isClosed,
                            "onUpdate:checked": (v) => updateDay(i, "isClosed", !v)
                          }, null, 8, ["checked", "onUpdate:checked"]),
                          createVNode("span", { class: "text-xs text-muted-foreground w-10" }, toDisplayString(h2.isClosed ? "Closed" : "Open"), 1)
                        ]),
                        !h2.isClosed ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2 flex-1"
                        }, [
                          createVNode(unref(Input), {
                            type: "time",
                            modelValue: h2.open,
                            "onUpdate:modelValue": (val) => updateDay(i, "open", val),
                            class: "w-32 h-8 text-xs"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "to"),
                          createVNode(unref(Input), {
                            type: "time",
                            modelValue: h2.close,
                            "onUpdate:modelValue": (val) => updateDay(i, "close", val),
                            class: "w-32 h-8 text-xs"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])) : createCommentVNode("", true)
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
                      createVNode(unref(Clock), { class: "w-4 h-4" }),
                      createTextVNode(" Operating Hours ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), { class: "space-y-4" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(hours.value, (h2, i) => {
                    return openBlock(), createBlock("div", {
                      key: h2.day,
                      class: "flex items-center gap-4 py-2 border-b border-border last:border-0"
                    }, [
                      createVNode("span", { class: "w-24 text-sm font-medium text-foreground" }, toDisplayString(h2.day), 1),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(Switch), {
                          checked: !h2.isClosed,
                          "onUpdate:checked": (v) => updateDay(i, "isClosed", !v)
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("span", { class: "text-xs text-muted-foreground w-10" }, toDisplayString(h2.isClosed ? "Closed" : "Open"), 1)
                      ]),
                      !h2.isClosed ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-2 flex-1"
                      }, [
                        createVNode(unref(Input), {
                          type: "time",
                          modelValue: h2.open,
                          "onUpdate:modelValue": (val) => updateDay(i, "open", val),
                          class: "w-32 h-8 text-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "text-xs text-muted-foreground" }, "to"),
                        createVNode(unref(Input), {
                          type: "time",
                          modelValue: h2.close,
                          "onUpdate:modelValue": (val) => updateDay(i, "close", val),
                          class: "w-32 h-8 text-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : createCommentVNode("", true)
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
      _push(`<div class="flex justify-end">`);
      _push(ssrRenderComponent(unref(Button), { onClick: handleSave }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Save Hours `);
          } else {
            return [
              createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
              createTextVNode(" Save Hours ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/BusinessHoursTab.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SettingsReviewsTab",
  __ssrInlineRender: true,
  setup(__props) {
    const mockReviews = [
      {
        id: "1",
        author: "Adebayo Ogunlesi",
        rating: 5,
        comment: "Excellent service and very professional team. Would highly recommend to anyone looking for quality.",
        date: "2026-03-18",
        helpful: 12,
        replied: true
      },
      {
        id: "2",
        author: "Fatima Ibrahim",
        rating: 4,
        comment: "Good experience overall. The delivery was a bit delayed but the product quality made up for it.",
        date: "2026-03-15",
        helpful: 5,
        replied: false
      },
      {
        id: "3",
        author: "Chinedu Okafor",
        rating: 5,
        comment: "Best in the business! I've been a loyal customer for over a year now.",
        date: "2026-03-10",
        helpful: 8,
        replied: true
      },
      {
        id: "4",
        author: "Amina Yusuf",
        rating: 3,
        comment: "Average experience. Customer support could be more responsive.",
        date: "2026-03-05",
        helpful: 2,
        replied: false
      },
      {
        id: "5",
        author: "Emeka Nwosu",
        rating: 2,
        comment: "Had some issues with the order accuracy. Hoping for improvement.",
        date: "2026-02-28",
        helpful: 1,
        replied: true
      },
      {
        id: "6",
        author: "Ngozi Eze",
        rating: 5,
        comment: "Absolutely wonderful! The attention to detail is impressive.",
        date: "2026-02-20",
        helpful: 15,
        replied: false
      }
    ];
    const filter = ref("all");
    const filtered = computed(() => {
      if (filter.value === "all") return mockReviews;
      return mockReviews.filter((r) => r.rating === Number(filter.value));
    });
    const avg = computed(() => {
      return (mockReviews.reduce((a, r) => a + r.rating, 0) / mockReviews.length).toFixed(1);
    });
    const dist = computed(() => {
      return [5, 4, 3, 2, 1].map((s) => ({
        star: s,
        count: mockReviews.filter((r) => r.rating === s).length
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "pt-6 text-center flex flex-col items-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-4xl font-bold tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(avg.value)}</p><div class="flex gap-0.5 mt-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(5, (i) => {
                    _push3(ssrRenderComponent(unref(Star), {
                      key: i,
                      class: [
                        "w-5 h-5",
                        i <= Math.round(Number(avg.value)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                      ]
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div><p class="text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(mockReviews.length)} reviews </p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-4xl font-bold tabular-nums text-foreground" }, toDisplayString(avg.value), 1),
                    createVNode("div", { class: "flex gap-0.5 mt-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                        return createVNode(unref(Star), {
                          key: i,
                          class: [
                            "w-5 h-5",
                            i <= Math.round(Number(avg.value)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                          ]
                        }, null, 8, ["class"]);
                      }), 64))
                    ]),
                    createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(mockReviews.length) + " reviews ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "pt-6 text-center flex flex-col items-center" }, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-4xl font-bold tabular-nums text-foreground" }, toDisplayString(avg.value), 1),
                  createVNode("div", { class: "flex gap-0.5 mt-2" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                      return createVNode(unref(Star), {
                        key: i,
                        class: [
                          "w-5 h-5",
                          i <= Math.round(Number(avg.value)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        ]
                      }, null, 8, ["class"]);
                    }), 64))
                  ]),
                  createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, toDisplayString(mockReviews.length) + " reviews ", 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 md:col-span-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardContent), { class: "pt-6 space-y-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(dist.value, (d) => {
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}><span class="text-xs w-3 text-right tabular-nums text-foreground"${_scopeId2}>${ssrInterpolate(d.star)}</span>`);
                    _push3(ssrRenderComponent(unref(Star), { class: "w-3 h-3 fill-amber-400 text-amber-400" }, null, _parent3, _scopeId2));
                    _push3(`<div class="flex-1 h-2 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full bg-amber-400 rounded-full transition-all" style="${ssrRenderStyle({
                      width: `${mockReviews.length ? d.count / mockReviews.length * 100 : 0}%`
                    })}"${_scopeId2}></div></div><span class="text-xs text-muted-foreground w-6 tabular-nums text-right"${_scopeId2}>${ssrInterpolate(d.count)}</span></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(dist.value, (d) => {
                      return openBlock(), createBlock("div", {
                        key: d.star,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode("span", { class: "text-xs w-3 text-right tabular-nums text-foreground" }, toDisplayString(d.star), 1),
                        createVNode(unref(Star), { class: "w-3 h-3 fill-amber-400 text-amber-400" }),
                        createVNode("div", { class: "flex-1 h-2 bg-muted rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full bg-amber-400 rounded-full transition-all",
                            style: {
                              width: `${mockReviews.length ? d.count / mockReviews.length * 100 : 0}%`
                            }
                          }, null, 4)
                        ]),
                        createVNode("span", { class: "text-xs text-muted-foreground w-6 tabular-nums text-right" }, toDisplayString(d.count), 1)
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CardContent), { class: "pt-6 space-y-2" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(dist.value, (d) => {
                    return openBlock(), createBlock("div", {
                      key: d.star,
                      class: "flex items-center gap-2"
                    }, [
                      createVNode("span", { class: "text-xs w-3 text-right tabular-nums text-foreground" }, toDisplayString(d.star), 1),
                      createVNode(unref(Star), { class: "w-3 h-3 fill-amber-400 text-amber-400" }),
                      createVNode("div", { class: "flex-1 h-2 bg-muted rounded-full overflow-hidden" }, [
                        createVNode("div", {
                          class: "h-full bg-amber-400 rounded-full transition-all",
                          style: {
                            width: `${mockReviews.length ? d.count / mockReviews.length * 100 : 0}%`
                          }
                        }, null, 4)
                      ]),
                      createVNode("span", { class: "text-xs text-muted-foreground w-6 tabular-nums text-right" }, toDisplayString(d.count), 1)
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
      _push(`</div><div class="flex items-center justify-between"><h3 class="text-sm font-semibold flex items-center gap-1.5 text-foreground">`);
      _push(ssrRenderComponent(unref(MessageSquare), { class: "w-4 h-4" }, null, _parent));
      _push(` Reviews </h3>`);
      _push(ssrRenderComponent(unref(Select), {
        modelValue: filter.value,
        "onUpdate:modelValue": (val) => filter.value = val
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectTrigger), { class: "w-36 h-8 text-xs" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectValue), { placeholder: "All Ratings" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SelectValue), { placeholder: "All Ratings" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SelectContent), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectItem), { value: "all" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`All Ratings`);
                      } else {
                        return [
                          createTextVNode("All Ratings")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList([5, 4, 3, 2, 1], (s) => {
                    _push3(ssrRenderComponent(unref(SelectItem), {
                      key: s,
                      value: String(s)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(s)} Stars `);
                        } else {
                          return [
                            createTextVNode(toDisplayString(s) + " Stars ", 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(unref(SelectItem), { value: "all" }, {
                      default: withCtx(() => [
                        createTextVNode("All Ratings")
                      ]),
                      _: 1
                    }),
                    (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (s) => {
                      return createVNode(unref(SelectItem), {
                        key: s,
                        value: String(s)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(s) + " Stars ", 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SelectTrigger), { class: "w-36 h-8 text-xs" }, {
                default: withCtx(() => [
                  createVNode(unref(SelectValue), { placeholder: "All Ratings" })
                ]),
                _: 1
              }),
              createVNode(unref(SelectContent), null, {
                default: withCtx(() => [
                  createVNode(unref(SelectItem), { value: "all" }, {
                    default: withCtx(() => [
                      createTextVNode("All Ratings")
                    ]),
                    _: 1
                  }),
                  (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (s) => {
                    return createVNode(unref(SelectItem), {
                      key: s,
                      value: String(s)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(s) + " Stars ", 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-3">`);
      if (filtered.value.length === 0) {
        _push(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardContent), { class: "py-12 text-center text-sm text-muted-foreground" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` No reviews match this filter. `);
                  } else {
                    return [
                      createTextVNode(" No reviews match this filter. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardContent), { class: "py-12 text-center text-sm text-muted-foreground" }, {
                  default: withCtx(() => [
                    createTextVNode(" No reviews match this filter. ")
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
      _push(`<!--[-->`);
      ssrRenderList(filtered.value, (review) => {
        _push(ssrRenderComponent(unref(Card), {
          key: review.id,
          class: "border-0 shadow-md shadow-foreground/5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CardContent), { class: "pt-5 pb-4 space-y-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-start justify-between gap-2"${_scopeId2}><div class="flex items-center gap-2.5"${_scopeId2}><div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary"${_scopeId2}>${ssrInterpolate(review.author.split(" ").map((n) => n[0]).join(""))}</div><div${_scopeId2}><p class="text-sm font-medium leading-tight text-foreground"${_scopeId2}>${ssrInterpolate(review.author)}</p><p class="text-[11px] text-muted-foreground"${_scopeId2}>${ssrInterpolate(new Date(review.date).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }))}</p></div></div><div class="flex items-center gap-2"${_scopeId2}><div class="flex gap-0.5"${_scopeId2}><!--[-->`);
                    ssrRenderList(5, (i) => {
                      _push3(ssrRenderComponent(unref(Star), {
                        key: i,
                        class: [
                          "w-3.5 h-3.5",
                          i <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        ]
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                    if (review.replied) {
                      _push3(ssrRenderComponent(unref(Badge), {
                        variant: "secondary",
                        class: "text-[10px] text-foreground"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Replied `);
                          } else {
                            return [
                              createTextVNode(" Replied ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div><p class="text-sm text-muted-foreground leading-relaxed"${_scopeId2}>${ssrInterpolate(review.comment)}</p><div class="flex items-center gap-1 pt-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Button), {
                      variant: "ghost",
                      size: "sm",
                      class: "h-7 text-xs text-muted-foreground gap-1"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ThumbsUp), { class: "w-3 h-3" }, null, _parent4, _scopeId3));
                          _push4(` ${ssrInterpolate(review.helpful)}`);
                        } else {
                          return [
                            createVNode(unref(ThumbsUp), { class: "w-3 h-3" }),
                            createTextVNode(" " + toDisplayString(review.helpful), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                        createVNode("div", { class: "flex items-center gap-2.5" }, [
                          createVNode("div", { class: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary" }, toDisplayString(review.author.split(" ").map((n) => n[0]).join("")), 1),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium leading-tight text-foreground" }, toDisplayString(review.author), 1),
                            createVNode("p", { class: "text-[11px] text-muted-foreground" }, toDisplayString(new Date(review.date).toLocaleDateString("en-NG", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("div", { class: "flex gap-0.5" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                              return createVNode(unref(Star), {
                                key: i,
                                class: [
                                  "w-3.5 h-3.5",
                                  i <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                                ]
                              }, null, 8, ["class"]);
                            }), 64))
                          ]),
                          review.replied ? (openBlock(), createBlock(unref(Badge), {
                            key: 0,
                            variant: "secondary",
                            class: "text-[10px] text-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Replied ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(review.comment), 1),
                      createVNode("div", { class: "flex items-center gap-1 pt-1" }, [
                        createVNode(unref(Button), {
                          variant: "ghost",
                          size: "sm",
                          class: "h-7 text-xs text-muted-foreground gap-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ThumbsUp), { class: "w-3 h-3" }),
                            createTextVNode(" " + toDisplayString(review.helpful), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CardContent), { class: "pt-5 pb-4 space-y-2" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                      createVNode("div", { class: "flex items-center gap-2.5" }, [
                        createVNode("div", { class: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary" }, toDisplayString(review.author.split(" ").map((n) => n[0]).join("")), 1),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium leading-tight text-foreground" }, toDisplayString(review.author), 1),
                          createVNode("p", { class: "text-[11px] text-muted-foreground" }, toDisplayString(new Date(review.date).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex gap-0.5" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                            return createVNode(unref(Star), {
                              key: i,
                              class: [
                                "w-3.5 h-3.5",
                                i <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                              ]
                            }, null, 8, ["class"]);
                          }), 64))
                        ]),
                        review.replied ? (openBlock(), createBlock(unref(Badge), {
                          key: 0,
                          variant: "secondary",
                          class: "text-[10px] text-foreground"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Replied ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(review.comment), 1),
                    createVNode("div", { class: "flex items-center gap-1 pt-1" }, [
                      createVNode(unref(Button), {
                        variant: "ghost",
                        size: "sm",
                        class: "h-7 text-xs text-muted-foreground gap-1"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ThumbsUp), { class: "w-3 h-3" }),
                          createTextVNode(" " + toDisplayString(review.helpful), 1)
                        ]),
                        _: 2
                      }, 1024)
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
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/ReviewsTab.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "business-info",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const businessName = computed(() => route.query.name || "My Business");
    const { isDark, toggleTheme } = useTheme();
    const info = ref({
      name: businessName.value,
      description: "",
      email: "",
      phone: "",
      website: "",
      industry: "",
      taxId: "TAX-12345678",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: ""
    });
    const update = (key, value) => {
      info.value[key] = value;
    };
    const handleSave = () => {
      if (!info.value.name.trim()) {
        toast.error("Business name is required");
        return;
      }
      toast.success("Business information updated");
    };
    const handleBack = () => {
      navigateTo({
        path: "/settings",
        query: { name: businessName.value }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground" }, _attrs))}><header class="border-b bg-card sticky top-0 z-10"><div class="container max-w-8xl mx-auto flex items-center justify-between py-3 px-4"><div class="flex items-center gap-3">`);
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
      _push(`<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><div><h1 class="text-lg font-bold leading-tight"> Business Information </h1><p class="text-xs text-muted-foreground">${ssrInterpolate(businessName.value)}</p></div></div>`);
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
      _push(`</div></header><main class="container max-w-8xl mx-auto py-6 px-4">`);
      _push(ssrRenderComponent(unref(Tabs), { defaultValue: "details" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), { class: "mb-6 flex-wrap h-auto gap-1 p-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "details",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Info), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Details `);
                      } else {
                        return [
                          createVNode(unref(Info), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Details ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "branding",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Palette), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Branding `);
                      } else {
                        return [
                          createVNode(unref(Palette), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Branding ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "products-services",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Package), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Products &amp; Services `);
                      } else {
                        return [
                          createVNode(unref(Package), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Products & Services ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "branches",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(MapPin), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Branches `);
                      } else {
                        return [
                          createVNode(unref(MapPin), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Branches ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "hours",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Clock), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Hours `);
                      } else {
                        return [
                          createVNode(unref(Clock), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Hours ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), {
                    value: "reviews",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(MessageSquare), { class: "w-3.5 h-3.5" }, null, _parent4, _scopeId3));
                        _push4(` Reviews `);
                      } else {
                        return [
                          createVNode(unref(MessageSquare), { class: "w-3.5 h-3.5" }),
                          createTextVNode(" Reviews ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TabsTrigger), {
                      value: "details",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Info), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Details ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), {
                      value: "branding",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Palette), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Branding ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), {
                      value: "products-services",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Package), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Products & Services ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), {
                      value: "branches",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(MapPin), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Branches ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), {
                      value: "hours",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Clock), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Hours ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), {
                      value: "reviews",
                      class: "gap-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(MessageSquare), { class: "w-3.5 h-3.5" }),
                        createTextVNode(" Reviews ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), {
              value: "details",
              class: "space-y-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), { class: "text-base text-foreground" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`General Information`);
                                  } else {
                                    return [
                                      createTextVNode("General Information")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                                  default: withCtx(() => [
                                    createTextVNode("General Information")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(CardContent), { class: "space-y-4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId4}><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Business Name`);
                                  } else {
                                    return [
                                      createTextVNode("Business Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.name,
                                "onUpdate:modelValue": (v) => update("name", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Industry`);
                                  } else {
                                    return [
                                      createTextVNode("Industry")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Select), {
                                modelValue: info.value.industry,
                                "onUpdate:modelValue": (v) => update("industry", v)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(SelectTrigger), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(SelectValue), { placeholder: "Select industry" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(SelectValue), { placeholder: "Select industry" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(SelectContent), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList([
                                            "Technology",
                                            "Retail",
                                            "Healthcare",
                                            "Food & Beverage",
                                            "Education",
                                            "Finance",
                                            "Other"
                                          ], (i) => {
                                            _push7(ssrRenderComponent(unref(SelectItem), {
                                              key: i,
                                              value: i.toLowerCase()
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(i)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(i), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(), createBlock(Fragment, null, renderList([
                                              "Technology",
                                              "Retail",
                                              "Healthcare",
                                              "Food & Beverage",
                                              "Education",
                                              "Finance",
                                              "Other"
                                            ], (i) => {
                                              return createVNode(unref(SelectItem), {
                                                key: i,
                                                value: i.toLowerCase()
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(i), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["value"]);
                                            }), 64))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(SelectTrigger), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(SelectValue), { placeholder: "Select industry" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(SelectContent), null, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList([
                                            "Technology",
                                            "Retail",
                                            "Healthcare",
                                            "Food & Beverage",
                                            "Education",
                                            "Finance",
                                            "Other"
                                          ], (i) => {
                                            return createVNode(unref(SelectItem), {
                                              key: i,
                                              value: i.toLowerCase()
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(i), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["value"]);
                                          }), 64))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Description`);
                                  } else {
                                    return [
                                      createTextVNode("Description")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Textarea), {
                                modelValue: info.value.description,
                                "onUpdate:modelValue": (v) => update("description", v),
                                placeholder: "Brief description of your business",
                                rows: 3
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId4}><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Email`);
                                  } else {
                                    return [
                                      createTextVNode("Email")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                type: "email",
                                modelValue: info.value.email,
                                "onUpdate:modelValue": (v) => update("email", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Phone`);
                                  } else {
                                    return [
                                      createTextVNode("Phone")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.phone,
                                "onUpdate:modelValue": (v) => update("phone", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Website`);
                                  } else {
                                    return [
                                      createTextVNode("Website")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.website,
                                "onUpdate:modelValue": (v) => update("website", v),
                                placeholder: "https://"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tax ID / Registration Number`);
                                  } else {
                                    return [
                                      createTextVNode("Tax ID / Registration Number")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.taxId,
                                disabled: "",
                                class: "disabled:bg-muted"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Business Name")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: info.value.name,
                                      "onUpdate:modelValue": (v) => update("name", v)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Industry")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Select), {
                                      modelValue: info.value.industry,
                                      "onUpdate:modelValue": (v) => update("industry", v)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(SelectTrigger), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(SelectValue), { placeholder: "Select industry" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(SelectContent), null, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(Fragment, null, renderList([
                                              "Technology",
                                              "Retail",
                                              "Healthcare",
                                              "Food & Beverage",
                                              "Education",
                                              "Finance",
                                              "Other"
                                            ], (i) => {
                                              return createVNode(unref(SelectItem), {
                                                key: i,
                                                value: i.toLowerCase()
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(i), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["value"]);
                                            }), 64))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Description")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Textarea), {
                                    modelValue: info.value.description,
                                    "onUpdate:modelValue": (v) => update("description", v),
                                    placeholder: "Brief description of your business",
                                    rows: 3
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Email")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      type: "email",
                                      modelValue: info.value.email,
                                      "onUpdate:modelValue": (v) => update("email", v)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Phone")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: info.value.phone,
                                      "onUpdate:modelValue": (v) => update("phone", v)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Website")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: info.value.website,
                                      "onUpdate:modelValue": (v) => update("website", v),
                                      placeholder: "https://"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tax ID / Registration Number")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.taxId,
                                    disabled: "",
                                    class: "disabled:bg-muted"
                                  }, null, 8, ["modelValue"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CardHeader), { class: "pb-3" }, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("General Information")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), { class: "space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Business Name")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.name,
                                    "onUpdate:modelValue": (v) => update("name", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Industry")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Select), {
                                    modelValue: info.value.industry,
                                    "onUpdate:modelValue": (v) => update("industry", v)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(SelectTrigger), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(SelectValue), { placeholder: "Select industry" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(SelectContent), null, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList([
                                            "Technology",
                                            "Retail",
                                            "Healthcare",
                                            "Food & Beverage",
                                            "Education",
                                            "Finance",
                                            "Other"
                                          ], (i) => {
                                            return createVNode(unref(SelectItem), {
                                              key: i,
                                              value: i.toLowerCase()
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(i), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["value"]);
                                          }), 64))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Description")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Textarea), {
                                  modelValue: info.value.description,
                                  "onUpdate:modelValue": (v) => update("description", v),
                                  placeholder: "Brief description of your business",
                                  rows: 3
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Email")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    type: "email",
                                    modelValue: info.value.email,
                                    "onUpdate:modelValue": (v) => update("email", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Phone")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.phone,
                                    "onUpdate:modelValue": (v) => update("phone", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Website")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.website,
                                    "onUpdate:modelValue": (v) => update("website", v),
                                    placeholder: "https://"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tax ID / Registration Number")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.taxId,
                                  disabled: "",
                                  class: "disabled:bg-muted"
                                }, null, 8, ["modelValue"])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), { class: "text-base text-foreground" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Business Address`);
                                  } else {
                                    return [
                                      createTextVNode("Business Address")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Business Address")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(CardContent), { class: "space-y-4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Street Address`);
                                  } else {
                                    return [
                                      createTextVNode("Street Address")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.address,
                                "onUpdate:modelValue": (v) => update("address", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId4}><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`City`);
                                  } else {
                                    return [
                                      createTextVNode("City")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.city,
                                "onUpdate:modelValue": (v) => update("city", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`State`);
                                  } else {
                                    return [
                                      createTextVNode("State")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.state,
                                "onUpdate:modelValue": (v) => update("state", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Country`);
                                  } else {
                                    return [
                                      createTextVNode("Country")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.country,
                                "onUpdate:modelValue": (v) => update("country", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-1.5"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Zip Code`);
                                  } else {
                                    return [
                                      createTextVNode("Zip Code")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: info.value.zipCode,
                                "onUpdate:modelValue": (v) => update("zipCode", v)
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Street Address")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.address,
                                    "onUpdate:modelValue": (v) => update("address", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("City")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: info.value.city,
                                      "onUpdate:modelValue": (v) => update("city", v)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("State")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: info.value.state,
                                      "onUpdate:modelValue": (v) => update("state", v)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Country")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: info.value.country,
                                      "onUpdate:modelValue": (v) => update("country", v)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-1.5" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Zip Code")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: info.value.zipCode,
                                      "onUpdate:modelValue": (v) => update("zipCode", v)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CardHeader), { class: "pb-3" }, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode("Business Address")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), { class: "space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Street Address")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.address,
                                  "onUpdate:modelValue": (v) => update("address", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("City")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.city,
                                    "onUpdate:modelValue": (v) => update("city", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("State")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.state,
                                    "onUpdate:modelValue": (v) => update("state", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Country")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.country,
                                    "onUpdate:modelValue": (v) => update("country", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-1.5" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Zip Code")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: info.value.zipCode,
                                    "onUpdate:modelValue": (v) => update("zipCode", v)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Button), { onClick: handleSave }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        _push4(` Save Changes `);
                      } else {
                        return [
                          createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Save Changes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("General Information")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Business Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.name,
                                  "onUpdate:modelValue": (v) => update("name", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Industry")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Select), {
                                  modelValue: info.value.industry,
                                  "onUpdate:modelValue": (v) => update("industry", v)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(SelectTrigger), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(SelectValue), { placeholder: "Select industry" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(SelectContent), null, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList([
                                          "Technology",
                                          "Retail",
                                          "Healthcare",
                                          "Food & Beverage",
                                          "Education",
                                          "Finance",
                                          "Other"
                                        ], (i) => {
                                          return createVNode(unref(SelectItem), {
                                            key: i,
                                            value: i.toLowerCase()
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(i), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 64))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Description")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Textarea), {
                                modelValue: info.value.description,
                                "onUpdate:modelValue": (v) => update("description", v),
                                placeholder: "Brief description of your business",
                                rows: 3
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Email")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  type: "email",
                                  modelValue: info.value.email,
                                  "onUpdate:modelValue": (v) => update("email", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Phone")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.phone,
                                  "onUpdate:modelValue": (v) => update("phone", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Website")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.website,
                                  "onUpdate:modelValue": (v) => update("website", v),
                                  placeholder: "https://"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tax ID / Registration Number")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.taxId,
                                disabled: "",
                                class: "disabled:bg-muted"
                              }, null, 8, ["modelValue"])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), { class: "pb-3" }, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode("Business Address")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Street Address")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.address,
                                "onUpdate:modelValue": (v) => update("address", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("City")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.city,
                                  "onUpdate:modelValue": (v) => update("city", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("State")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.state,
                                  "onUpdate:modelValue": (v) => update("state", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Country")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.country,
                                  "onUpdate:modelValue": (v) => update("country", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-1.5" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Zip Code")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: info.value.zipCode,
                                  "onUpdate:modelValue": (v) => update("zipCode", v)
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(unref(Button), { onClick: handleSave }, {
                        default: withCtx(() => [
                          createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Save Changes ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), { value: "branding" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$5)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), { value: "products-services" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), { value: "branches" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), { value: "hours" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), { value: "reviews" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1)
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
                    value: "details",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Info), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Details ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), {
                    value: "branding",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Palette), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Branding ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), {
                    value: "products-services",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Package), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Products & Services ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), {
                    value: "branches",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(MapPin), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Branches ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), {
                    value: "hours",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Clock), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Hours ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), {
                    value: "reviews",
                    class: "gap-1.5 text-xs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(MessageSquare), { class: "w-3.5 h-3.5" }),
                      createTextVNode(" Reviews ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), {
                value: "details",
                class: "space-y-6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), { class: "pb-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("General Information")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Business Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.name,
                                "onUpdate:modelValue": (v) => update("name", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Industry")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Select), {
                                modelValue: info.value.industry,
                                "onUpdate:modelValue": (v) => update("industry", v)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(SelectTrigger), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(SelectValue), { placeholder: "Select industry" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(SelectContent), null, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList([
                                        "Technology",
                                        "Retail",
                                        "Healthcare",
                                        "Food & Beverage",
                                        "Education",
                                        "Finance",
                                        "Other"
                                      ], (i) => {
                                        return createVNode(unref(SelectItem), {
                                          key: i,
                                          value: i.toLowerCase()
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(i), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 64))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Description")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Textarea), {
                              modelValue: info.value.description,
                              "onUpdate:modelValue": (v) => update("description", v),
                              placeholder: "Brief description of your business",
                              rows: 3
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                type: "email",
                                modelValue: info.value.email,
                                "onUpdate:modelValue": (v) => update("email", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Phone")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.phone,
                                "onUpdate:modelValue": (v) => update("phone", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Website")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.website,
                                "onUpdate:modelValue": (v) => update("website", v),
                                placeholder: "https://"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Tax ID / Registration Number")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: info.value.taxId,
                              disabled: "",
                              class: "disabled:bg-muted"
                            }, null, 8, ["modelValue"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Card), { class: "border-0 shadow-md shadow-foreground/5 bg-card" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), { class: "pb-3" }, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), { class: "text-base text-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode("Business Address")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-1.5" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Street Address")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: info.value.address,
                              "onUpdate:modelValue": (v) => update("address", v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("City")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.city,
                                "onUpdate:modelValue": (v) => update("city", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("State")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.state,
                                "onUpdate:modelValue": (v) => update("state", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Country")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.country,
                                "onUpdate:modelValue": (v) => update("country", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-1.5" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Zip Code")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: info.value.zipCode,
                                "onUpdate:modelValue": (v) => update("zipCode", v)
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex justify-end" }, [
                    createVNode(unref(Button), { onClick: handleSave }, {
                      default: withCtx(() => [
                        createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Save Changes ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), { value: "branding" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$5)
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), { value: "products-services" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4)
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), { value: "branches" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3)
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), { value: "hours" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2)
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), { value: "reviews" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/business-info.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=business-info-CQm6TqS0.mjs.map
