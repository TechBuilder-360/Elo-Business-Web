import { computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { c as useRoute, f as useRouter } from './server.mjs';
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from './card-Cq6gP5nL.mjs';
import { I as Input } from './input-C1C1FSk7.mjs';
import { L as Label } from './label-CU-twOy-.mjs';
import { T as Textarea } from './textarea-CCpVUKiI.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from './select-BENuuoNZ.mjs';
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from './tabs-1FqyMY98.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { u as useBusiness } from './useBusiness-DUTOJ7No.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { ArrowLeft, Loader2, Save, UploadCloud, FileText, Trash2 } from 'lucide-vue-next';
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
import './useGraphQL-Bw_Hbd5v.mjs';
import 'sweetalert2';

const _sfc_main = {
  __name: "compliance",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const businessName = computed(() => route.query.name || "Business");
    const {
      businessDetail,
      uploadDocument,
      deleteDocument,
      kybDocuments,
      businessDocuments
    } = useBusiness();
    const infoData = ref({
      name: businessName.value,
      about: "",
      industry: "",
      website: ""
    });
    const regData = ref({
      number: "",
      country_of_incorporation: "",
      date_of_incorporation: "",
      tax_identification_number: ""
    });
    const uploadData = ref({
      document_id: "",
      description: "",
      fileObj: null
    });
    const fileInput = ref(null);
    const handleSaveInfo = async () => {
      try {
        await businessDetail.mutateAsync({
          name: infoData.value.name,
          about: infoData.value.about,
          industry: infoData.value.industry,
          website: infoData.value.website
        });
        toast.success("Business info updated successfully");
      } catch (error) {
        toast.error(error.message || "Failed to update business info");
      }
    };
    const handleSaveReg = async () => {
      try {
        await businessDetail.mutateAsync({
          registration_detail: {
            number: regData.value.number,
            country_of_incorporation: regData.value.country_of_incorporation,
            date_of_incorporation: regData.value.date_of_incorporation,
            tax_identification_number: regData.value.tax_identification_number
          }
        });
        toast.success("Registration details updated successfully");
      } catch (error) {
        toast.error(error.message || "Failed to update registration details");
      }
    };
    const handleFileSelect = (e) => {
      if (e.target.files && e.target.files[0]) {
        uploadData.value.fileObj = e.target.files[0];
      }
    };
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    const handleUploadDocument = async () => {
      if (!uploadData.value.document_id) {
        return toast.error("Please select a document type");
      }
      if (!uploadData.value.fileObj) {
        return toast.error("Please select a file to upload");
      }
      try {
        const base64File = await fileToBase64(uploadData.value.fileObj);
        await uploadDocument.mutateAsync({
          document_id: uploadData.value.document_id,
          description: uploadData.value.description || "Uploaded document",
          file: base64File
        });
        toast.success("Document uploaded successfully");
        uploadData.value.document_id = "";
        uploadData.value.description = "";
        uploadData.value.fileObj = null;
        if (fileInput.value) fileInput.value.value = "";
      } catch (error) {
        toast.error(error.message || "Failed to upload document");
      }
    };
    const handleDeleteDocument = async (id) => {
      try {
        await deleteDocument.mutateAsync({ id });
        toast.success("Document deleted successfully");
      } catch (error) {
        toast.error(error.message || "Failed to delete document");
      }
    };
    const navigateBack = () => {
      router.back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground pb-12" }, _attrs))}><header class="border-b bg-card sticky top-0 z-10"><div class="container max-w-5xl mx-auto flex items-center justify-between py-3 px-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        onClick: navigateBack,
        class: "h-8 w-8"
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
      _push(`<div><h1 class="text-lg font-bold leading-tight flex items-center gap-2"> Compliance &amp; Settings </h1><p class="text-xs text-muted-foreground">${ssrInterpolate(businessName.value)}</p></div></div></div></header><main class="container max-w-5xl mx-auto py-8 px-4">`);
      _push(ssrRenderComponent(unref(Tabs), {
        defaultValue: "info",
        class: "w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), { class: "mb-8 grid w-full grid-cols-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsTrigger), { value: "info" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Business Info`);
                      } else {
                        return [
                          createTextVNode("Business Info")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), { value: "registration" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Registration`);
                      } else {
                        return [
                          createTextVNode("Registration")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TabsTrigger), { value: "documents" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Documents`);
                      } else {
                        return [
                          createTextVNode("Documents")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TabsTrigger), { value: "info" }, {
                      default: withCtx(() => [
                        createTextVNode("Business Info")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), { value: "registration" }, {
                      default: withCtx(() => [
                        createTextVNode("Registration")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TabsTrigger), { value: "documents" }, {
                      default: withCtx(() => [
                        createTextVNode("Documents")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabsContent), {
              value: "info",
              class: "space-y-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Business Information`);
                                  } else {
                                    return [
                                      createTextVNode("Business Information")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(CardDescription), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Update your general business details`);
                                  } else {
                                    return [
                                      createTextVNode("Update your general business details")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Business Information")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(CardDescription), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Update your general business details")
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
                              _push5(`<div class="space-y-2"${_scopeId4}>`);
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
                                modelValue: infoData.value.name,
                                "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                                placeholder: "Enter business name"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2"${_scopeId4}>`);
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
                                modelValue: infoData.value.website,
                                "onUpdate:modelValue": ($event) => infoData.value.website = $event,
                                placeholder: "https://example.com"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2"${_scopeId4}>`);
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
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: infoData.value.industry,
                                "onUpdate:modelValue": ($event) => infoData.value.industry = $event,
                                placeholder: "e.g. Technology, Retail"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`About`);
                                  } else {
                                    return [
                                      createTextVNode("About")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Textarea), {
                                modelValue: infoData.value.about,
                                "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                                placeholder: "Describe your business",
                                class: "min-h-[120px]"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="flex justify-end pt-4 border-t"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Button), {
                                onClick: handleSaveInfo,
                                disabled: unref(businessDetail).isPending
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(businessDetail).isPending) {
                                      _push6(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    }
                                    _push6(` Save Changes `);
                                  } else {
                                    return [
                                      unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                        key: 0,
                                        class: "w-4 h-4 mr-2 animate-spin"
                                      })) : (openBlock(), createBlock(unref(Save), {
                                        key: 1,
                                        class: "w-4 h-4 mr-2"
                                      })),
                                      createTextVNode(" Save Changes ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Business Name")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: infoData.value.name,
                                    "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                                    placeholder: "Enter business name"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Website")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: infoData.value.website,
                                    "onUpdate:modelValue": ($event) => infoData.value.website = $event,
                                    placeholder: "https://example.com"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Industry")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: infoData.value.industry,
                                    "onUpdate:modelValue": ($event) => infoData.value.industry = $event,
                                    placeholder: "e.g. Technology, Retail"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("About")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Textarea), {
                                    modelValue: infoData.value.about,
                                    "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                                    placeholder: "Describe your business",
                                    class: "min-h-[120px]"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "flex justify-end pt-4 border-t" }, [
                                  createVNode(unref(Button), {
                                    onClick: handleSaveInfo,
                                    disabled: unref(businessDetail).isPending
                                  }, {
                                    default: withCtx(() => [
                                      unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                        key: 0,
                                        class: "w-4 h-4 mr-2 animate-spin"
                                      })) : (openBlock(), createBlock(unref(Save), {
                                        key: 1,
                                        class: "w-4 h-4 mr-2"
                                      })),
                                      createTextVNode(" Save Changes ")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CardHeader), null, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), null, {
                                default: withCtx(() => [
                                  createTextVNode("Business Information")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(CardDescription), null, {
                                default: withCtx(() => [
                                  createTextVNode("Update your general business details")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), { class: "space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Business Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: infoData.value.name,
                                  "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                                  placeholder: "Enter business name"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Website")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: infoData.value.website,
                                  "onUpdate:modelValue": ($event) => infoData.value.website = $event,
                                  placeholder: "https://example.com"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Industry")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: infoData.value.industry,
                                  "onUpdate:modelValue": ($event) => infoData.value.industry = $event,
                                  placeholder: "e.g. Technology, Retail"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("About")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Textarea), {
                                  modelValue: infoData.value.about,
                                  "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                                  placeholder: "Describe your business",
                                  class: "min-h-[120px]"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "flex justify-end pt-4 border-t" }, [
                                createVNode(unref(Button), {
                                  onClick: handleSaveInfo,
                                  disabled: unref(businessDetail).isPending
                                }, {
                                  default: withCtx(() => [
                                    unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                      key: 0,
                                      class: "w-4 h-4 mr-2 animate-spin"
                                    })) : (openBlock(), createBlock(unref(Save), {
                                      key: 1,
                                      class: "w-4 h-4 mr-2"
                                    })),
                                    createTextVNode(" Save Changes ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), null, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), null, {
                              default: withCtx(() => [
                                createTextVNode("Business Information")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(CardDescription), null, {
                              default: withCtx(() => [
                                createTextVNode("Update your general business details")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Business Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: infoData.value.name,
                                "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                                placeholder: "Enter business name"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Website")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: infoData.value.website,
                                "onUpdate:modelValue": ($event) => infoData.value.website = $event,
                                placeholder: "https://example.com"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Industry")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: infoData.value.industry,
                                "onUpdate:modelValue": ($event) => infoData.value.industry = $event,
                                placeholder: "e.g. Technology, Retail"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("About")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Textarea), {
                                modelValue: infoData.value.about,
                                "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                                placeholder: "Describe your business",
                                class: "min-h-[120px]"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "flex justify-end pt-4 border-t" }, [
                              createVNode(unref(Button), {
                                onClick: handleSaveInfo,
                                disabled: unref(businessDetail).isPending
                              }, {
                                default: withCtx(() => [
                                  unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                    key: 0,
                                    class: "w-4 h-4 mr-2 animate-spin"
                                  })) : (openBlock(), createBlock(unref(Save), {
                                    key: 1,
                                    class: "w-4 h-4 mr-2"
                                  })),
                                  createTextVNode(" Save Changes ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
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
            _push2(ssrRenderComponent(unref(TabsContent), {
              value: "registration",
              class: "space-y-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Registration Details`);
                                  } else {
                                    return [
                                      createTextVNode("Registration Details")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(CardDescription), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Manage your corporate registration and tax info`);
                                  } else {
                                    return [
                                      createTextVNode("Manage your corporate registration and tax info")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Registration Details")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(CardDescription), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Manage your corporate registration and tax info")
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
                              _push5(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId4}><div class="space-y-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Registration Number (RC)`);
                                  } else {
                                    return [
                                      createTextVNode("Registration Number (RC)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: regData.value.number,
                                "onUpdate:modelValue": ($event) => regData.value.number = $event,
                                placeholder: "RC-123456"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tax ID (TIN)`);
                                  } else {
                                    return [
                                      createTextVNode("Tax ID (TIN)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: regData.value.tax_identification_number,
                                "onUpdate:modelValue": ($event) => regData.value.tax_identification_number = $event,
                                placeholder: "Enter TIN"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Country of Incorporation`);
                                  } else {
                                    return [
                                      createTextVNode("Country of Incorporation")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: regData.value.country_of_incorporation,
                                "onUpdate:modelValue": ($event) => regData.value.country_of_incorporation = $event,
                                placeholder: "e.g. Nigeria"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Date of Incorporation`);
                                  } else {
                                    return [
                                      createTextVNode("Date of Incorporation")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                type: "date",
                                modelValue: regData.value.date_of_incorporation,
                                "onUpdate:modelValue": ($event) => regData.value.date_of_incorporation = $event
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="flex justify-end pt-4 border-t mt-6"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Button), {
                                onClick: handleSaveReg,
                                disabled: unref(businessDetail).isPending
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(businessDetail).isPending) {
                                      _push6(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    }
                                    _push6(` Save Details `);
                                  } else {
                                    return [
                                      unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                        key: 0,
                                        class: "w-4 h-4 mr-2 animate-spin"
                                      })) : (openBlock(), createBlock(unref(Save), {
                                        key: 1,
                                        class: "w-4 h-4 mr-2"
                                      })),
                                      createTextVNode(" Save Details ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Registration Number (RC)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: regData.value.number,
                                      "onUpdate:modelValue": ($event) => regData.value.number = $event,
                                      placeholder: "RC-123456"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tax ID (TIN)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: regData.value.tax_identification_number,
                                      "onUpdate:modelValue": ($event) => regData.value.tax_identification_number = $event,
                                      placeholder: "Enter TIN"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Country of Incorporation")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: regData.value.country_of_incorporation,
                                      "onUpdate:modelValue": ($event) => regData.value.country_of_incorporation = $event,
                                      placeholder: "e.g. Nigeria"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Date of Incorporation")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      type: "date",
                                      modelValue: regData.value.date_of_incorporation,
                                      "onUpdate:modelValue": ($event) => regData.value.date_of_incorporation = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "flex justify-end pt-4 border-t mt-6" }, [
                                  createVNode(unref(Button), {
                                    onClick: handleSaveReg,
                                    disabled: unref(businessDetail).isPending
                                  }, {
                                    default: withCtx(() => [
                                      unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                        key: 0,
                                        class: "w-4 h-4 mr-2 animate-spin"
                                      })) : (openBlock(), createBlock(unref(Save), {
                                        key: 1,
                                        class: "w-4 h-4 mr-2"
                                      })),
                                      createTextVNode(" Save Details ")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CardHeader), null, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), null, {
                                default: withCtx(() => [
                                  createTextVNode("Registration Details")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(CardDescription), null, {
                                default: withCtx(() => [
                                  createTextVNode("Manage your corporate registration and tax info")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), { class: "space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Registration Number (RC)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: regData.value.number,
                                    "onUpdate:modelValue": ($event) => regData.value.number = $event,
                                    placeholder: "RC-123456"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tax ID (TIN)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: regData.value.tax_identification_number,
                                    "onUpdate:modelValue": ($event) => regData.value.tax_identification_number = $event,
                                    placeholder: "Enter TIN"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Country of Incorporation")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: regData.value.country_of_incorporation,
                                    "onUpdate:modelValue": ($event) => regData.value.country_of_incorporation = $event,
                                    placeholder: "e.g. Nigeria"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Date of Incorporation")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    type: "date",
                                    modelValue: regData.value.date_of_incorporation,
                                    "onUpdate:modelValue": ($event) => regData.value.date_of_incorporation = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "flex justify-end pt-4 border-t mt-6" }, [
                                createVNode(unref(Button), {
                                  onClick: handleSaveReg,
                                  disabled: unref(businessDetail).isPending
                                }, {
                                  default: withCtx(() => [
                                    unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                      key: 0,
                                      class: "w-4 h-4 mr-2 animate-spin"
                                    })) : (openBlock(), createBlock(unref(Save), {
                                      key: 1,
                                      class: "w-4 h-4 mr-2"
                                    })),
                                    createTextVNode(" Save Details ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), null, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), null, {
                              default: withCtx(() => [
                                createTextVNode("Registration Details")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(CardDescription), null, {
                              default: withCtx(() => [
                                createTextVNode("Manage your corporate registration and tax info")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Registration Number (RC)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: regData.value.number,
                                  "onUpdate:modelValue": ($event) => regData.value.number = $event,
                                  placeholder: "RC-123456"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Tax ID (TIN)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: regData.value.tax_identification_number,
                                  "onUpdate:modelValue": ($event) => regData.value.tax_identification_number = $event,
                                  placeholder: "Enter TIN"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Country of Incorporation")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: regData.value.country_of_incorporation,
                                  "onUpdate:modelValue": ($event) => regData.value.country_of_incorporation = $event,
                                  placeholder: "e.g. Nigeria"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Date of Incorporation")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  type: "date",
                                  modelValue: regData.value.date_of_incorporation,
                                  "onUpdate:modelValue": ($event) => regData.value.date_of_incorporation = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-end pt-4 border-t mt-6" }, [
                              createVNode(unref(Button), {
                                onClick: handleSaveReg,
                                disabled: unref(businessDetail).isPending
                              }, {
                                default: withCtx(() => [
                                  unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                    key: 0,
                                    class: "w-4 h-4 mr-2 animate-spin"
                                  })) : (openBlock(), createBlock(unref(Save), {
                                    key: 1,
                                    class: "w-4 h-4 mr-2"
                                  })),
                                  createTextVNode(" Save Details ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
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
            _push2(ssrRenderComponent(unref(TabsContent), {
              value: "documents",
              class: "space-y-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card border-l-4 border-l-primary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Upload Document`);
                                  } else {
                                    return [
                                      createTextVNode("Upload Document")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(CardDescription), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Submit compliance documents for verification`);
                                  } else {
                                    return [
                                      createTextVNode("Submit compliance documents for verification")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Upload Document")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(CardDescription), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Submit compliance documents for verification")
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
                              _push5(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId4}><div class="space-y-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Document Type *`);
                                  } else {
                                    return [
                                      createTextVNode("Document Type *")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Select), {
                                modelValue: uploadData.value.document_id,
                                "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(SelectTrigger), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(SelectValue), { placeholder: "Select type" }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(SelectValue), { placeholder: "Select type" })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(SelectContent), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                            _push7(ssrRenderComponent(unref(SelectItem), {
                                              key: doc.id,
                                              value: doc.id
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="flex items-center gap-2"${_scopeId7}>${ssrInterpolate(doc.name)} `);
                                                  if (doc.required) {
                                                    _push8(ssrRenderComponent(unref(Badge), {
                                                      variant: "secondary",
                                                      class: "text-[10px]"
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`Required`);
                                                        } else {
                                                          return [
                                                            createTextVNode("Required")
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                  _push8(`</div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                                      createTextVNode(toDisplayString(doc.name) + " ", 1),
                                                      doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                        key: 0,
                                                        variant: "secondary",
                                                        class: "text-[10px]"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Required")
                                                        ]),
                                                        _: 1
                                                      })) : createCommentVNode("", true)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                              return openBlock(), createBlock(unref(SelectItem), {
                                                key: doc.id,
                                                value: doc.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                                    createTextVNode(toDisplayString(doc.name) + " ", 1),
                                                    doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                      key: 0,
                                                      variant: "secondary",
                                                      class: "text-[10px]"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Required")
                                                      ]),
                                                      _: 1
                                                    })) : createCommentVNode("", true)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["value"]);
                                            }), 128))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(SelectTrigger), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(SelectValue), { placeholder: "Select type" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(SelectContent), null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                            return openBlock(), createBlock(unref(SelectItem), {
                                              key: doc.id,
                                              value: doc.id
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createTextVNode(toDisplayString(doc.name) + " ", 1),
                                                  doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                    key: 0,
                                                    variant: "secondary",
                                                    class: "text-[10px]"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Required")
                                                    ]),
                                                    _: 1
                                                  })) : createCommentVNode("", true)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["value"]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Description (Optional)`);
                                  } else {
                                    return [
                                      createTextVNode("Description (Optional)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Input), {
                                modelValue: uploadData.value.description,
                                "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                                placeholder: "Add a note"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-2 md:col-span-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Label), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`File *`);
                                  } else {
                                    return [
                                      createTextVNode("File *")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="flex items-center gap-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Input), {
                                type: "file",
                                ref_key: "fileInput",
                                ref: fileInput,
                                onChange: handleFileSelect,
                                class: "flex-1 cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div><p class="text-xs text-muted-foreground mt-1"${_scopeId4}>Accepts images and PDF files up to 5MB.</p></div></div><div class="flex justify-end pt-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(Button), {
                                onClick: handleUploadDocument,
                                disabled: unref(uploadDocument).isPending
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(uploadDocument).isPending) {
                                      _push6(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(unref(UploadCloud), { class: "w-4 h-4 mr-2" }, null, _parent6, _scopeId5));
                                    }
                                    _push6(` Upload `);
                                  } else {
                                    return [
                                      unref(uploadDocument).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                        key: 0,
                                        class: "w-4 h-4 mr-2 animate-spin"
                                      })) : (openBlock(), createBlock(unref(UploadCloud), {
                                        key: 1,
                                        class: "w-4 h-4 mr-2"
                                      })),
                                      createTextVNode(" Upload ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Document Type *")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Select), {
                                      modelValue: uploadData.value.document_id,
                                      "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(SelectTrigger), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(SelectValue), { placeholder: "Select type" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(SelectContent), null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                              return openBlock(), createBlock(unref(SelectItem), {
                                                key: doc.id,
                                                value: doc.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                                    createTextVNode(toDisplayString(doc.name) + " ", 1),
                                                    doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                      key: 0,
                                                      variant: "secondary",
                                                      class: "text-[10px]"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Required")
                                                      ]),
                                                      _: 1
                                                    })) : createCommentVNode("", true)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["value"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-2" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Description (Optional)")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Input), {
                                      modelValue: uploadData.value.description,
                                      "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                                      placeholder: "Add a note"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                                    createVNode(unref(Label), null, {
                                      default: withCtx(() => [
                                        createTextVNode("File *")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "flex items-center gap-4" }, [
                                      createVNode(unref(Input), {
                                        type: "file",
                                        ref_key: "fileInput",
                                        ref: fileInput,
                                        onChange: handleFileSelect,
                                        class: "flex-1 cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                                      }, null, 512)
                                    ]),
                                    createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Accepts images and PDF files up to 5MB.")
                                  ])
                                ]),
                                createVNode("div", { class: "flex justify-end pt-4" }, [
                                  createVNode(unref(Button), {
                                    onClick: handleUploadDocument,
                                    disabled: unref(uploadDocument).isPending
                                  }, {
                                    default: withCtx(() => [
                                      unref(uploadDocument).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                        key: 0,
                                        class: "w-4 h-4 mr-2 animate-spin"
                                      })) : (openBlock(), createBlock(unref(UploadCloud), {
                                        key: 1,
                                        class: "w-4 h-4 mr-2"
                                      })),
                                      createTextVNode(" Upload ")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CardHeader), null, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), null, {
                                default: withCtx(() => [
                                  createTextVNode("Upload Document")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(CardDescription), null, {
                                default: withCtx(() => [
                                  createTextVNode("Submit compliance documents for verification")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), { class: "space-y-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Document Type *")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Select), {
                                    modelValue: uploadData.value.document_id,
                                    "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(SelectTrigger), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(SelectValue), { placeholder: "Select type" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(SelectContent), null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                            return openBlock(), createBlock(unref(SelectItem), {
                                              key: doc.id,
                                              value: doc.id
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createTextVNode(toDisplayString(doc.name) + " ", 1),
                                                  doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                    key: 0,
                                                    variant: "secondary",
                                                    class: "text-[10px]"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Required")
                                                    ]),
                                                    _: 1
                                                  })) : createCommentVNode("", true)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["value"]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Description (Optional)")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Input), {
                                    modelValue: uploadData.value.description,
                                    "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                                    placeholder: "Add a note"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                                  createVNode(unref(Label), null, {
                                    default: withCtx(() => [
                                      createTextVNode("File *")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "flex items-center gap-4" }, [
                                    createVNode(unref(Input), {
                                      type: "file",
                                      ref_key: "fileInput",
                                      ref: fileInput,
                                      onChange: handleFileSelect,
                                      class: "flex-1 cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                                    }, null, 512)
                                  ]),
                                  createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Accepts images and PDF files up to 5MB.")
                                ])
                              ]),
                              createVNode("div", { class: "flex justify-end pt-4" }, [
                                createVNode(unref(Button), {
                                  onClick: handleUploadDocument,
                                  disabled: unref(uploadDocument).isPending
                                }, {
                                  default: withCtx(() => [
                                    unref(uploadDocument).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                      key: 0,
                                      class: "w-4 h-4 mr-2 animate-spin"
                                    })) : (openBlock(), createBlock(unref(UploadCloud), {
                                      key: 1,
                                      class: "w-4 h-4 mr-2"
                                    })),
                                    createTextVNode(" Upload ")
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(CardHeader), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(CardTitle), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Uploaded Documents`);
                                  } else {
                                    return [
                                      createTextVNode("Uploaded Documents")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(CardTitle), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Uploaded Documents")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(CardContent), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(businessDocuments).isPending) {
                                _push5(`<div class="py-8 flex justify-center"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Loader2), { class: "w-8 h-8 animate-spin text-muted-foreground" }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else if (!unref(businessDocuments).data.value?.businessDocuments?.length) {
                                _push5(`<div class="py-12 text-center border-2 border-dashed rounded-lg bg-accent/20"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(FileText), { class: "w-12 h-12 text-muted-foreground/40 mx-auto mb-4" }, null, _parent5, _scopeId4));
                                _push5(`<h3 class="text-lg font-medium text-foreground"${_scopeId4}>No documents yet</h3><p class="text-sm text-muted-foreground"${_scopeId4}>Upload your first compliance document above</p></div>`);
                              } else {
                                _push5(`<div class="space-y-3"${_scopeId4}><!--[-->`);
                                ssrRenderList(unref(businessDocuments).data.value?.businessDocuments, (doc) => {
                                  _push5(`<div class="flex items-center justify-between p-4 rounded-lg border bg-accent/20 hover:bg-accent/40 transition-colors"${_scopeId4}><div class="flex items-center gap-4"${_scopeId4}><div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(FileText), { class: "w-5 h-5 text-primary" }, null, _parent5, _scopeId4));
                                  _push5(`</div><div${_scopeId4}><p class="font-medium text-sm text-foreground"${_scopeId4}>${ssrInterpolate(doc.description || doc.document_id)}</p><a${ssrRenderAttr("href", doc.url)} target="_blank" class="text-xs text-primary hover:underline mt-0.5 inline-block"${_scopeId4}> View Document </a></div></div>`);
                                  _push5(ssrRenderComponent(unref(Button), {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "text-destructive hover:bg-destructive/10",
                                    onClick: ($event) => handleDeleteDocument(doc.id),
                                    disabled: unref(deleteDocument).isPending
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
                                  _push5(`</div>`);
                                });
                                _push5(`<!--]--></div>`);
                              }
                            } else {
                              return [
                                unref(businessDocuments).isPending ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "py-8 flex justify-center"
                                }, [
                                  createVNode(unref(Loader2), { class: "w-8 h-8 animate-spin text-muted-foreground" })
                                ])) : !unref(businessDocuments).data.value?.businessDocuments?.length ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "py-12 text-center border-2 border-dashed rounded-lg bg-accent/20"
                                }, [
                                  createVNode(unref(FileText), { class: "w-12 h-12 text-muted-foreground/40 mx-auto mb-4" }),
                                  createVNode("h3", { class: "text-lg font-medium text-foreground" }, "No documents yet"),
                                  createVNode("p", { class: "text-sm text-muted-foreground" }, "Upload your first compliance document above")
                                ])) : (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "space-y-3"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(businessDocuments).data.value?.businessDocuments, (doc) => {
                                    return openBlock(), createBlock("div", {
                                      key: doc.id,
                                      class: "flex items-center justify-between p-4 rounded-lg border bg-accent/20 hover:bg-accent/40 transition-colors"
                                    }, [
                                      createVNode("div", { class: "flex items-center gap-4" }, [
                                        createVNode("div", { class: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0" }, [
                                          createVNode(unref(FileText), { class: "w-5 h-5 text-primary" })
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(doc.description || doc.document_id), 1),
                                          createVNode("a", {
                                            href: doc.url,
                                            target: "_blank",
                                            class: "text-xs text-primary hover:underline mt-0.5 inline-block"
                                          }, " View Document ", 8, ["href"])
                                        ])
                                      ]),
                                      createVNode(unref(Button), {
                                        variant: "ghost",
                                        size: "icon",
                                        class: "text-destructive hover:bg-destructive/10",
                                        onClick: ($event) => handleDeleteDocument(doc.id),
                                        disabled: unref(deleteDocument).isPending
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Trash2), { class: "w-4 h-4" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick", "disabled"])
                                    ]);
                                  }), 128))
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(CardHeader), null, {
                            default: withCtx(() => [
                              createVNode(unref(CardTitle), null, {
                                default: withCtx(() => [
                                  createTextVNode("Uploaded Documents")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardContent), null, {
                            default: withCtx(() => [
                              unref(businessDocuments).isPending ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "py-8 flex justify-center"
                              }, [
                                createVNode(unref(Loader2), { class: "w-8 h-8 animate-spin text-muted-foreground" })
                              ])) : !unref(businessDocuments).data.value?.businessDocuments?.length ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "py-12 text-center border-2 border-dashed rounded-lg bg-accent/20"
                              }, [
                                createVNode(unref(FileText), { class: "w-12 h-12 text-muted-foreground/40 mx-auto mb-4" }),
                                createVNode("h3", { class: "text-lg font-medium text-foreground" }, "No documents yet"),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, "Upload your first compliance document above")
                              ])) : (openBlock(), createBlock("div", {
                                key: 2,
                                class: "space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(businessDocuments).data.value?.businessDocuments, (doc) => {
                                  return openBlock(), createBlock("div", {
                                    key: doc.id,
                                    class: "flex items-center justify-between p-4 rounded-lg border bg-accent/20 hover:bg-accent/40 transition-colors"
                                  }, [
                                    createVNode("div", { class: "flex items-center gap-4" }, [
                                      createVNode("div", { class: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0" }, [
                                        createVNode(unref(FileText), { class: "w-5 h-5 text-primary" })
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(doc.description || doc.document_id), 1),
                                        createVNode("a", {
                                          href: doc.url,
                                          target: "_blank",
                                          class: "text-xs text-primary hover:underline mt-0.5 inline-block"
                                        }, " View Document ", 8, ["href"])
                                      ])
                                    ]),
                                    createVNode(unref(Button), {
                                      variant: "ghost",
                                      size: "icon",
                                      class: "text-destructive hover:bg-destructive/10",
                                      onClick: ($event) => handleDeleteDocument(doc.id),
                                      disabled: unref(deleteDocument).isPending
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), { class: "w-4 h-4" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick", "disabled"])
                                  ]);
                                }), 128))
                              ]))
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
                    createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card border-l-4 border-l-primary" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), null, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), null, {
                              default: withCtx(() => [
                                createTextVNode("Upload Document")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(CardDescription), null, {
                              default: withCtx(() => [
                                createTextVNode("Submit compliance documents for verification")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), { class: "space-y-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Document Type *")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Select), {
                                  modelValue: uploadData.value.document_id,
                                  "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(SelectTrigger), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(SelectValue), { placeholder: "Select type" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(SelectContent), null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                          return openBlock(), createBlock(unref(SelectItem), {
                                            key: doc.id,
                                            value: doc.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                createTextVNode(toDisplayString(doc.name) + " ", 1),
                                                doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                  key: 0,
                                                  variant: "secondary",
                                                  class: "text-[10px]"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Required")
                                                  ]),
                                                  _: 1
                                                })) : createCommentVNode("", true)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Description (Optional)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Input), {
                                  modelValue: uploadData.value.description,
                                  "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                                  placeholder: "Add a note"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                                createVNode(unref(Label), null, {
                                  default: withCtx(() => [
                                    createTextVNode("File *")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex items-center gap-4" }, [
                                  createVNode(unref(Input), {
                                    type: "file",
                                    ref_key: "fileInput",
                                    ref: fileInput,
                                    onChange: handleFileSelect,
                                    class: "flex-1 cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                                  }, null, 512)
                                ]),
                                createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Accepts images and PDF files up to 5MB.")
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-end pt-4" }, [
                              createVNode(unref(Button), {
                                onClick: handleUploadDocument,
                                disabled: unref(uploadDocument).isPending
                              }, {
                                default: withCtx(() => [
                                  unref(uploadDocument).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                    key: 0,
                                    class: "w-4 h-4 mr-2 animate-spin"
                                  })) : (openBlock(), createBlock(unref(UploadCloud), {
                                    key: 1,
                                    class: "w-4 h-4 mr-2"
                                  })),
                                  createTextVNode(" Upload ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                      default: withCtx(() => [
                        createVNode(unref(CardHeader), null, {
                          default: withCtx(() => [
                            createVNode(unref(CardTitle), null, {
                              default: withCtx(() => [
                                createTextVNode("Uploaded Documents")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(CardContent), null, {
                          default: withCtx(() => [
                            unref(businessDocuments).isPending ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "py-8 flex justify-center"
                            }, [
                              createVNode(unref(Loader2), { class: "w-8 h-8 animate-spin text-muted-foreground" })
                            ])) : !unref(businessDocuments).data.value?.businessDocuments?.length ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "py-12 text-center border-2 border-dashed rounded-lg bg-accent/20"
                            }, [
                              createVNode(unref(FileText), { class: "w-12 h-12 text-muted-foreground/40 mx-auto mb-4" }),
                              createVNode("h3", { class: "text-lg font-medium text-foreground" }, "No documents yet"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, "Upload your first compliance document above")
                            ])) : (openBlock(), createBlock("div", {
                              key: 2,
                              class: "space-y-3"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(businessDocuments).data.value?.businessDocuments, (doc) => {
                                return openBlock(), createBlock("div", {
                                  key: doc.id,
                                  class: "flex items-center justify-between p-4 rounded-lg border bg-accent/20 hover:bg-accent/40 transition-colors"
                                }, [
                                  createVNode("div", { class: "flex items-center gap-4" }, [
                                    createVNode("div", { class: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0" }, [
                                      createVNode(unref(FileText), { class: "w-5 h-5 text-primary" })
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(doc.description || doc.document_id), 1),
                                      createVNode("a", {
                                        href: doc.url,
                                        target: "_blank",
                                        class: "text-xs text-primary hover:underline mt-0.5 inline-block"
                                      }, " View Document ", 8, ["href"])
                                    ])
                                  ]),
                                  createVNode(unref(Button), {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "text-destructive hover:bg-destructive/10",
                                    onClick: ($event) => handleDeleteDocument(doc.id),
                                    disabled: unref(deleteDocument).isPending
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "disabled"])
                                ]);
                              }), 128))
                            ]))
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
              createVNode(unref(TabsList), { class: "mb-8 grid w-full grid-cols-3" }, {
                default: withCtx(() => [
                  createVNode(unref(TabsTrigger), { value: "info" }, {
                    default: withCtx(() => [
                      createTextVNode("Business Info")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), { value: "registration" }, {
                    default: withCtx(() => [
                      createTextVNode("Registration")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TabsTrigger), { value: "documents" }, {
                    default: withCtx(() => [
                      createTextVNode("Documents")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), {
                value: "info",
                class: "space-y-6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), null, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), null, {
                            default: withCtx(() => [
                              createTextVNode("Business Information")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardDescription), null, {
                            default: withCtx(() => [
                              createTextVNode("Update your general business details")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Business Name")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: infoData.value.name,
                              "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                              placeholder: "Enter business name"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Website")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: infoData.value.website,
                              "onUpdate:modelValue": ($event) => infoData.value.website = $event,
                              placeholder: "https://example.com"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("Industry")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: infoData.value.industry,
                              "onUpdate:modelValue": ($event) => infoData.value.industry = $event,
                              placeholder: "e.g. Technology, Retail"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), null, {
                              default: withCtx(() => [
                                createTextVNode("About")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Textarea), {
                              modelValue: infoData.value.about,
                              "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                              placeholder: "Describe your business",
                              class: "min-h-[120px]"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "flex justify-end pt-4 border-t" }, [
                            createVNode(unref(Button), {
                              onClick: handleSaveInfo,
                              disabled: unref(businessDetail).isPending
                            }, {
                              default: withCtx(() => [
                                unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "w-4 h-4 mr-2 animate-spin"
                                })) : (openBlock(), createBlock(unref(Save), {
                                  key: 1,
                                  class: "w-4 h-4 mr-2"
                                })),
                                createTextVNode(" Save Changes ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), {
                value: "registration",
                class: "space-y-6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), null, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), null, {
                            default: withCtx(() => [
                              createTextVNode("Registration Details")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardDescription), null, {
                            default: withCtx(() => [
                              createTextVNode("Manage your corporate registration and tax info")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Registration Number (RC)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: regData.value.number,
                                "onUpdate:modelValue": ($event) => regData.value.number = $event,
                                placeholder: "RC-123456"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tax ID (TIN)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: regData.value.tax_identification_number,
                                "onUpdate:modelValue": ($event) => regData.value.tax_identification_number = $event,
                                placeholder: "Enter TIN"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Country of Incorporation")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: regData.value.country_of_incorporation,
                                "onUpdate:modelValue": ($event) => regData.value.country_of_incorporation = $event,
                                placeholder: "e.g. Nigeria"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Date of Incorporation")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                type: "date",
                                modelValue: regData.value.date_of_incorporation,
                                "onUpdate:modelValue": ($event) => regData.value.date_of_incorporation = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end pt-4 border-t mt-6" }, [
                            createVNode(unref(Button), {
                              onClick: handleSaveReg,
                              disabled: unref(businessDetail).isPending
                            }, {
                              default: withCtx(() => [
                                unref(businessDetail).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "w-4 h-4 mr-2 animate-spin"
                                })) : (openBlock(), createBlock(unref(Save), {
                                  key: 1,
                                  class: "w-4 h-4 mr-2"
                                })),
                                createTextVNode(" Save Details ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(TabsContent), {
                value: "documents",
                class: "space-y-6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card border-l-4 border-l-primary" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), null, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), null, {
                            default: withCtx(() => [
                              createTextVNode("Upload Document")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(CardDescription), null, {
                            default: withCtx(() => [
                              createTextVNode("Submit compliance documents for verification")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), { class: "space-y-4" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Document Type *")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Select), {
                                modelValue: uploadData.value.document_id,
                                "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(SelectTrigger), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(SelectValue), { placeholder: "Select type" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(SelectContent), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                        return openBlock(), createBlock(unref(SelectItem), {
                                          key: doc.id,
                                          value: doc.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createTextVNode(toDisplayString(doc.name) + " ", 1),
                                              doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                key: 0,
                                                variant: "secondary",
                                                class: "text-[10px]"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Required")
                                                ]),
                                                _: 1
                                              })) : createCommentVNode("", true)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("Description (Optional)")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: uploadData.value.description,
                                "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                                placeholder: "Add a note"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                              createVNode(unref(Label), null, {
                                default: withCtx(() => [
                                  createTextVNode("File *")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex items-center gap-4" }, [
                                createVNode(unref(Input), {
                                  type: "file",
                                  ref_key: "fileInput",
                                  ref: fileInput,
                                  onChange: handleFileSelect,
                                  class: "flex-1 cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                                }, null, 512)
                              ]),
                              createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Accepts images and PDF files up to 5MB.")
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end pt-4" }, [
                            createVNode(unref(Button), {
                              onClick: handleUploadDocument,
                              disabled: unref(uploadDocument).isPending
                            }, {
                              default: withCtx(() => [
                                unref(uploadDocument).isPending ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "w-4 h-4 mr-2 animate-spin"
                                })) : (openBlock(), createBlock(unref(UploadCloud), {
                                  key: 1,
                                  class: "w-4 h-4 mr-2"
                                })),
                                createTextVNode(" Upload ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Card), { class: "border-0 shadow-lg shadow-foreground/5 bg-card" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardHeader), null, {
                        default: withCtx(() => [
                          createVNode(unref(CardTitle), null, {
                            default: withCtx(() => [
                              createTextVNode("Uploaded Documents")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(CardContent), null, {
                        default: withCtx(() => [
                          unref(businessDocuments).isPending ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-8 flex justify-center"
                          }, [
                            createVNode(unref(Loader2), { class: "w-8 h-8 animate-spin text-muted-foreground" })
                          ])) : !unref(businessDocuments).data.value?.businessDocuments?.length ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "py-12 text-center border-2 border-dashed rounded-lg bg-accent/20"
                          }, [
                            createVNode(unref(FileText), { class: "w-12 h-12 text-muted-foreground/40 mx-auto mb-4" }),
                            createVNode("h3", { class: "text-lg font-medium text-foreground" }, "No documents yet"),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Upload your first compliance document above")
                          ])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(businessDocuments).data.value?.businessDocuments, (doc) => {
                              return openBlock(), createBlock("div", {
                                key: doc.id,
                                class: "flex items-center justify-between p-4 rounded-lg border bg-accent/20 hover:bg-accent/40 transition-colors"
                              }, [
                                createVNode("div", { class: "flex items-center gap-4" }, [
                                  createVNode("div", { class: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0" }, [
                                    createVNode(unref(FileText), { class: "w-5 h-5 text-primary" })
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-medium text-sm text-foreground" }, toDisplayString(doc.description || doc.document_id), 1),
                                    createVNode("a", {
                                      href: doc.url,
                                      target: "_blank",
                                      class: "text-xs text-primary hover:underline mt-0.5 inline-block"
                                    }, " View Document ", 8, ["href"])
                                  ])
                                ]),
                                createVNode(unref(Button), {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "text-destructive hover:bg-destructive/10",
                                  onClick: ($event) => handleDeleteDocument(doc.id),
                                  disabled: unref(deleteDocument).isPending
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"])
                              ]);
                            }), 128))
                          ]))
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
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compliance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=compliance-DkEKTs-p.mjs.map
