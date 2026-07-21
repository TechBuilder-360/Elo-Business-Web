import { computed, ref, watch, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrRenderAttr } from 'vue/server-renderer';
import { c as useRoute, f as useRouter } from './server.mjs';
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from './card-Cq6gP5nL.mjs';
import { I as Input } from './input-C1C1FSk7.mjs';
import { L as Label } from './label-CU-twOy-.mjs';
import { T as Textarea } from './textarea-CCpVUKiI.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from './select-BENuuoNZ.mjs';
import { B as Badge } from './badge-gp1MX3La.mjs';
import { u as useBusiness } from './useBusiness-BCRRRkfq.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { ArrowLeft, Building2, FolderOpen, Pencil, ShieldCheck, AlertCircle, Loader2, Save, UploadCloud, FileText, CheckCircle2, Trash2 } from 'lucide-vue-next';
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
      userBusinesses,
      businessDetail,
      uploadDocument,
      deleteDocument,
      kybDocuments,
      businessDocuments,
      getBusinessDetailQuery
    } = useBusiness();
    const activeBusinessId = ref(null);
    const { data: fullBusinessDataResult, isPending: isDetailPending } = getBusinessDetailQuery(activeBusinessId);
    const fullBusinessData = computed(
      () => fullBusinessDataResult.value?.business || null
    );
    const activeSection = ref("profile");
    const profileStep = ref(1);
    const isUploadingDoc = ref(false);
    const isEditingProfile = ref(false);
    const sections = [
      {
        id: "profile",
        label: "Business Profile",
        icon: Building2,
        desc: "General & Registration info"
      },
      {
        id: "documents",
        label: "Documents",
        icon: FolderOpen,
        desc: "Compliance files"
      }
    ];
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
    const activeBusinessData = computed(() => {
      const list = userBusinesses.data.value?.myBusinesses || [];
      if (activeBusinessId.value)
        return list.find((b) => b.id === activeBusinessId.value) || null;
      return list[0] || null;
    });
    watch(
      [activeBusinessData, fullBusinessData],
      ([active, full]) => {
        if (active) {
          infoData.value.name = active.name || businessName.value;
        }
        if (full) {
          infoData.value.name = full.name || infoData.value.name;
          infoData.value.about = full.about || "";
          infoData.value.industry = full.industry || "";
          infoData.value.website = full.email || "";
          if (full.number) {
            regData.value.number = full.number;
          }
          if (full.country_of_incorporation) {
            regData.value.country_of_incorporation = full.country_of_incorporation;
          }
          if (full.date_of_incorporation) {
            const dateParts = full.date_of_incorporation.split("-");
            if (dateParts.length === 3) {
              if (dateParts[0].length === 4) {
                regData.value.date_of_incorporation = full.date_of_incorporation;
              } else {
                regData.value.date_of_incorporation = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
              }
            } else {
              regData.value.date_of_incorporation = full.date_of_incorporation;
            }
          }
          if (full.tax_identification_number) {
            regData.value.tax_identification_number = full.tax_identification_number;
          }
        }
      },
      { immediate: true }
    );
    watch(
      isDetailPending,
      (pending) => {
        if (!pending) {
          if (!fullBusinessData.value || !fullBusinessData.value.number) {
            isEditingProfile.value = true;
          }
        }
      },
      { immediate: true }
    );
    const completionPercentage = computed(() => {
      let total = 8;
      let filled = 0;
      if (infoData.value.name) filled++;
      if (infoData.value.about) filled++;
      if (infoData.value.industry) filled++;
      if (infoData.value.website) filled++;
      if (regData.value.number) filled++;
      if (regData.value.country_of_incorporation) filled++;
      if (regData.value.date_of_incorporation) filled++;
      if (regData.value.tax_identification_number) filled++;
      total += 2;
      if (businessDocuments.data.value?.getDocuments?.length > 0) filled += 2;
      return Math.round(filled / total * 100);
    });
    const handleSaveProfile = async () => {
      if (!regData.value.number) {
        return toast.error("Registration Number (RC) is required");
      }
      if (!regData.value.country_of_incorporation) {
        return toast.error("Country of Incorporation is required");
      }
      if (!regData.value.date_of_incorporation) {
        return toast.error("Date of Incorporation is required");
      }
      try {
        const [year, month, day] = regData.value.date_of_incorporation.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        await businessDetail.mutateAsync({
          name: infoData.value.name,
          about: infoData.value.about,
          industry: infoData.value.industry,
          website: infoData.value.website,
          registration_detail: {
            number: regData.value.number,
            country_of_incorporation: regData.value.country_of_incorporation,
            date_of_incorporation: formattedDate,
            tax_identification_number: regData.value.tax_identification_number
          }
        });
        toast.success("Profile saved successfully");
        isEditingProfile.value = false;
        profileStep.value = 1;
      } catch (error) {
        toast.error(error.message || "Failed to save profile");
      }
    };
    const handleFileSelect = (e) => {
      if (e.target.files && e.target.files[0]) {
        uploadData.value.fileObj = e.target.files[0];
      }
    };
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
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
        isUploadingDoc.value = false;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-muted/30 text-foreground pb-12" }, _attrs))}><header class="border-b bg-background sticky top-0 z-20"><div class="container max-w-6xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Button), {
        variant: "ghost",
        size: "icon",
        onClick: navigateBack,
        class: "h-9 w-9 rounded-full bg-muted/50 hover:bg-muted"
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
      _push(`<div><h1 class="text-xl font-bold tracking-tight"> Compliance &amp; Settings </h1><p class="text-sm text-muted-foreground flex items-center gap-2">${ssrInterpolate(businessName.value)}</p></div></div><div class="hidden sm:flex items-center gap-3"><div class="text-sm text-right"><p class="font-medium">Profile Completion</p><p class="text-xs text-muted-foreground">${ssrInterpolate(completionPercentage.value)}% Complete </p></div><div class="w-24 h-2 bg-muted rounded-full overflow-hidden"><div class="h-full bg-primary transition-all duration-500 ease-in-out" style="${ssrRenderStyle({ width: `${completionPercentage.value}%` })}"></div></div></div></div></header><main class="container max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row gap-8"><aside class="md:w-64 shrink-0"><div class="sticky top-28 space-y-1"><div class="flex overflow-x-auto md:flex-col gap-2 pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"><!--[-->`);
      ssrRenderList(sections, (section) => {
        _push(`<button class="${ssrRenderClass([
          activeSection.value === section.id ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted text-muted-foreground",
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap md:whitespace-normal shrink-0"
        ])}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(section.icon), {
          class: [
            "w-5 h-5",
            activeSection.value === section.id ? "text-primary-foreground" : "text-foreground"
          ]
        }, null), _parent);
        _push(`<div><p class="${ssrRenderClass([
          activeSection.value === section.id ? "text-primary-foreground" : "text-foreground",
          "font-medium text-sm"
        ])}">${ssrInterpolate(section.label)}</p><p class="${ssrRenderClass([
          activeSection.value === section.id ? "text-primary-foreground/80" : "text-muted-foreground",
          "text-xs hidden md:block opacity-80"
        ])}">${ssrInterpolate(section.desc)}</p></div></button>`);
      });
      _push(`<!--]--></div><div class="mt-6 p-4 rounded-xl bg-card border shadow-sm md:hidden"><div class="flex justify-between items-center mb-2"><p class="text-sm font-medium">Completion</p><p class="text-sm font-bold text-primary">${ssrInterpolate(completionPercentage.value)}% </p></div><div class="w-full h-2 bg-muted rounded-full overflow-hidden"><div class="h-full bg-primary transition-all duration-500 ease-in-out" style="${ssrRenderStyle({ width: `${completionPercentage.value}%` })}"></div></div></div></div></aside><div class="flex-1 space-y-6 max-w-3xl">`);
      if (activeSection.value === "profile") {
        _push(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"><div class="flex items-center justify-between"><div><h2 class="text-2xl font-bold tracking-tight"> Business Profile </h2><p class="text-muted-foreground mt-1"> Update your general details and corporate registration information. </p></div>`);
        if (!isEditingProfile.value) {
          _push(ssrRenderComponent(unref(Button), {
            onClick: ($event) => {
              isEditingProfile.value = true;
              profileStep.value = 1;
            },
            variant: "outline",
            size: "sm",
            class: "gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(` Edit Profile `);
              } else {
                return [
                  createVNode(unref(Pencil), { class: "w-4 h-4" }),
                  createTextVNode(" Edit Profile ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(unref(Button), {
            variant: "ghost",
            size: "sm",
            onClick: ($event) => {
              isEditingProfile.value = false;
              profileStep.value = 1;
            }
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
        }
        _push(`</div>`);
        if (!isEditingProfile.value) {
          _push(`<div>`);
          _push(ssrRenderComponent(unref(Card), { class: "border shadow-sm mb-4" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(CardContent), { class: "p-6" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center gap-4 mb-6 pb-6 border-b"${_scopeId2}><div class="w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0"${_scopeId2}>`);
                      if (activeBusinessData.value?.logo) {
                        _push3(`<img${ssrRenderAttr("src", activeBusinessData.value.logo)}${ssrRenderAttr("alt", activeBusinessData.value?.name)} class="w-full h-full object-cover"${_scopeId2}>`);
                      } else {
                        _push3(ssrRenderComponent(unref(Building2), { class: "w-7 h-7 text-muted-foreground" }, null, _parent3, _scopeId2));
                      }
                      _push3(`</div><div${_scopeId2}><h3 class="text-lg font-bold"${_scopeId2}>${ssrInterpolate(activeBusinessData.value?.name || businessName.value)}</h3><span class="text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full"${_scopeId2}>${ssrInterpolate(activeBusinessData.value?.role || "Owner")}</span></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"${_scopeId2}> Industry </p><p class="text-sm"${_scopeId2}>${ssrInterpolate(infoData.value.industry || activeBusinessData.value?.industry || "—")}</p></div><div class="space-y-1"${_scopeId2}><p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"${_scopeId2}> Website </p><a${ssrRenderAttr("href", infoData.value.website)} target="_blank" class="text-sm text-primary hover:underline"${_scopeId2}>${ssrInterpolate(infoData.value.website || "—")}</a></div><div class="space-y-1 md:col-span-2"${_scopeId2}><p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"${_scopeId2}> About </p><p class="text-sm text-muted-foreground leading-relaxed"${_scopeId2}>${ssrInterpolate(infoData.value.about || "—")}</p></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center gap-4 mb-6 pb-6 border-b" }, [
                          createVNode("div", { class: "w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0" }, [
                            activeBusinessData.value?.logo ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: activeBusinessData.value.logo,
                              alt: activeBusinessData.value?.name,
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Building2), {
                              key: 1,
                              class: "w-7 h-7 text-muted-foreground"
                            }))
                          ]),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-lg font-bold" }, toDisplayString(activeBusinessData.value?.name || businessName.value), 1),
                            createVNode("span", { class: "text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full" }, toDisplayString(activeBusinessData.value?.role || "Owner"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Industry "),
                            createVNode("p", { class: "text-sm" }, toDisplayString(infoData.value.industry || activeBusinessData.value?.industry || "—"), 1)
                          ]),
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Website "),
                            createVNode("a", {
                              href: infoData.value.website,
                              target: "_blank",
                              class: "text-sm text-primary hover:underline"
                            }, toDisplayString(infoData.value.website || "—"), 9, ["href"])
                          ]),
                          createVNode("div", { class: "space-y-1 md:col-span-2" }, [
                            createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " About "),
                            createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(infoData.value.about || "—"), 1)
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(CardContent), { class: "p-6" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-4 mb-6 pb-6 border-b" }, [
                        createVNode("div", { class: "w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0" }, [
                          activeBusinessData.value?.logo ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: activeBusinessData.value.logo,
                            alt: activeBusinessData.value?.name,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Building2), {
                            key: 1,
                            class: "w-7 h-7 text-muted-foreground"
                          }))
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-bold" }, toDisplayString(activeBusinessData.value?.name || businessName.value), 1),
                          createVNode("span", { class: "text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full" }, toDisplayString(activeBusinessData.value?.role || "Owner"), 1)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Industry "),
                          createVNode("p", { class: "text-sm" }, toDisplayString(infoData.value.industry || activeBusinessData.value?.industry || "—"), 1)
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Website "),
                          createVNode("a", {
                            href: infoData.value.website,
                            target: "_blank",
                            class: "text-sm text-primary hover:underline"
                          }, toDisplayString(infoData.value.website || "—"), 9, ["href"])
                        ]),
                        createVNode("div", { class: "space-y-1 md:col-span-2" }, [
                          createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " About "),
                          createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(infoData.value.about || "—"), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(unref(Card), { class: "border shadow-sm" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(CardTitle), { class: "text-base font-semibold flex items-center gap-2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(ShieldCheck), { class: "w-4 h-4 text-primary" }, null, _parent4, _scopeId3));
                            _push4(` Registration Details `);
                          } else {
                            return [
                              createVNode(unref(ShieldCheck), { class: "w-4 h-4 text-primary" }),
                              createTextVNode(" Registration Details ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(CardTitle), { class: "text-base font-semibold flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(ShieldCheck), { class: "w-4 h-4 text-primary" }),
                            createTextVNode(" Registration Details ")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(CardContent), { class: "p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="space-y-1"${_scopeId2}><p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"${_scopeId2}> RC Number </p><p class="text-sm font-mono"${_scopeId2}>${ssrInterpolate(regData.value.number || "—")}</p></div><div class="space-y-1"${_scopeId2}><p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"${_scopeId2}> Tax ID (TIN) </p><p class="text-sm font-mono"${_scopeId2}>${ssrInterpolate(regData.value.tax_identification_number || "—")}</p></div><div class="space-y-1"${_scopeId2}><p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"${_scopeId2}> Country of Incorporation </p><p class="text-sm"${_scopeId2}>${ssrInterpolate(regData.value.country_of_incorporation || "—")}</p></div><div class="space-y-1"${_scopeId2}><p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide"${_scopeId2}> Date of Incorporation </p><p class="text-sm"${_scopeId2}>${ssrInterpolate(regData.value.date_of_incorporation || "—")}</p></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " RC Number "),
                          createVNode("p", { class: "text-sm font-mono" }, toDisplayString(regData.value.number || "—"), 1)
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Tax ID (TIN) "),
                          createVNode("p", { class: "text-sm font-mono" }, toDisplayString(regData.value.tax_identification_number || "—"), 1)
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Country of Incorporation "),
                          createVNode("p", { class: "text-sm" }, toDisplayString(regData.value.country_of_incorporation || "—"), 1)
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Date of Incorporation "),
                          createVNode("p", { class: "text-sm" }, toDisplayString(regData.value.date_of_incorporation || "—"), 1)
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(CardHeader), { class: "pb-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardTitle), { class: "text-base font-semibold flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(ShieldCheck), { class: "w-4 h-4 text-primary" }),
                          createTextVNode(" Registration Details ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardContent), { class: "p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " RC Number "),
                        createVNode("p", { class: "text-sm font-mono" }, toDisplayString(regData.value.number || "—"), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Tax ID (TIN) "),
                        createVNode("p", { class: "text-sm font-mono" }, toDisplayString(regData.value.tax_identification_number || "—"), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Country of Incorporation "),
                        createVNode("p", { class: "text-sm" }, toDisplayString(regData.value.country_of_incorporation || "—"), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("p", { class: "text-xs font-semibold text-muted-foreground uppercase tracking-wide" }, " Date of Incorporation "),
                        createVNode("p", { class: "text-sm" }, toDisplayString(regData.value.date_of_incorporation || "—"), 1)
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
        } else {
          _push(`<!---->`);
        }
        if (isEditingProfile.value) {
          _push(ssrRenderComponent(unref(Card), { class: "border shadow-sm relative overflow-hidden" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center absolute top-0 left-0 right-0 h-1 bg-muted"${_scopeId}><div class="h-full bg-primary transition-all duration-500" style="${ssrRenderStyle({ width: profileStep.value === 1 ? "50%" : "100%" })}"${_scopeId}></div></div>`);
                _push2(ssrRenderComponent(unref(CardContent), { class: "p-6 space-y-8 pt-8" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (profileStep.value === 1) {
                        _push3(`<div class="space-y-6 animate-in slide-in-from-right-8 duration-300"${_scopeId2}><div class="flex items-center justify-between border-b pb-2"${_scopeId2}><h3 class="text-lg font-semibold"${_scopeId2}> Step 1: General Information </h3><span class="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md"${_scopeId2}>1 of 2</span></div><div class="grid gap-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Business Name`);
                            } else {
                              return [
                                createTextVNode("Business Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Input), {
                          modelValue: infoData.value.name,
                          "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                          disabled: "",
                          placeholder: "Enter business name",
                          class: "max-w-md"
                        }, null, _parent3, _scopeId2));
                        _push3(`<p class="text-[11px] text-muted-foreground"${_scopeId2}> This is your official trading name (cannot be edited). </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Website`);
                            } else {
                              return [
                                createTextVNode("Website")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Input), {
                          modelValue: infoData.value.website,
                          "onUpdate:modelValue": ($event) => infoData.value.website = $event,
                          placeholder: "https://example.com"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Industry`);
                            } else {
                              return [
                                createTextVNode("Industry")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Input), {
                          modelValue: infoData.value.industry,
                          "onUpdate:modelValue": ($event) => infoData.value.industry = $event,
                          placeholder: "e.g. Technology, Retail"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`About Business`);
                            } else {
                              return [
                                createTextVNode("About Business")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Textarea), {
                          modelValue: infoData.value.about,
                          "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                          placeholder: "Describe your business...",
                          class: "min-h-[100px] resize-y"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div></div><div class="flex justify-end pt-6 border-t"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Button), {
                          onClick: ($event) => profileStep.value = 2,
                          class: "min-w-[140px]"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` Next Step: Registration `);
                              _push4(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 ml-2 rotate-180" }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createTextVNode(" Next Step: Registration "),
                                createVNode(unref(ArrowLeft), { class: "w-4 h-4 ml-2 rotate-180" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(`</div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (profileStep.value === 2) {
                        _push3(`<div class="space-y-6 animate-in slide-in-from-right-8 duration-300"${_scopeId2}><div class="flex items-center justify-between border-b pb-2"${_scopeId2}><h3 class="text-lg font-semibold"${_scopeId2}> Step 2: Registration Details </h3><span class="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md"${_scopeId2}>2 of 2</span></div><div class="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(AlertCircle), { class: "w-5 h-5 text-primary shrink-0 mt-0.5" }, null, _parent3, _scopeId2));
                        _push3(`<div${_scopeId2}><h4 class="text-sm font-semibold text-foreground"${_scopeId2}> Required for Compliance </h4><p class="text-xs text-muted-foreground mt-1 leading-relaxed"${_scopeId2}> These details are strictly required by the backend to verify your entity. You must fill out all required fields below before saving. </p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Registration Number (RC) <span class="text-destructive"${_scopeId3}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Registration Number (RC) "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Input), {
                          modelValue: regData.value.number,
                          "onUpdate:modelValue": ($event) => regData.value.number = $event,
                          placeholder: "e.g. RC-123456"
                        }, null, _parent3, _scopeId2));
                        _push3(`<p class="text-[11px] text-muted-foreground"${_scopeId2}> Your corporate affairs commission number. </p></div><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Tax ID (TIN)`);
                            } else {
                              return [
                                createTextVNode("Tax ID (TIN)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Input), {
                          modelValue: regData.value.tax_identification_number,
                          "onUpdate:modelValue": ($event) => regData.value.tax_identification_number = $event,
                          placeholder: "Enter TIN"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Country of Incorporation <span class="text-destructive"${_scopeId3}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Country of Incorporation "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Input), {
                          modelValue: regData.value.country_of_incorporation,
                          "onUpdate:modelValue": ($event) => regData.value.country_of_incorporation = $event,
                          placeholder: "e.g. Nigeria"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Date of Incorporation <span class="text-destructive"${_scopeId3}>*</span>`);
                            } else {
                              return [
                                createTextVNode("Date of Incorporation "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Input), {
                          type: "date",
                          modelValue: regData.value.date_of_incorporation,
                          "onUpdate:modelValue": ($event) => regData.value.date_of_incorporation = $event
                        }, null, _parent3, _scopeId2));
                        _push3(`</div></div><div class="flex items-center justify-between pt-6 border-t"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(Button), {
                          variant: "outline",
                          onClick: ($event) => profileStep.value = 1
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                              _push4(` Back `);
                            } else {
                              return [
                                createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Back ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(unref(Button), {
                          onClick: handleSaveProfile,
                          disabled: unref(businessDetail).isPending.value,
                          class: "min-w-[140px]"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              if (unref(businessDetail).isPending.value) {
                                _push4(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent4, _scopeId3));
                              } else {
                                _push4(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                              }
                              _push4(` Save Full Profile `);
                            } else {
                              return [
                                unref(businessDetail).isPending.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "w-4 h-4 mr-2 animate-spin"
                                })) : (openBlock(), createBlock(unref(Save), {
                                  key: 1,
                                  class: "w-4 h-4 mr-2"
                                })),
                                createTextVNode(" Save Full Profile ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(`</div></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        profileStep.value === 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-6 animate-in slide-in-from-right-8 duration-300"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between border-b pb-2" }, [
                            createVNode("h3", { class: "text-lg font-semibold" }, " Step 1: General Information "),
                            createVNode("span", { class: "text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md" }, "1 of 2")
                          ]),
                          createVNode("div", { class: "grid gap-6" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                                default: withCtx(() => [
                                  createTextVNode("Business Name")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: infoData.value.name,
                                "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                                disabled: "",
                                placeholder: "Enter business name",
                                class: "max-w-md"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-[11px] text-muted-foreground" }, " This is your official trading name (cannot be edited). ")
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode(unref(Label), { class: "text-sm font-semibold" }, {
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
                                createVNode(unref(Label), { class: "text-sm font-semibold" }, {
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
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                                default: withCtx(() => [
                                  createTextVNode("About Business")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Textarea), {
                                modelValue: infoData.value.about,
                                "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                                placeholder: "Describe your business...",
                                class: "min-h-[100px] resize-y"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end pt-6 border-t" }, [
                            createVNode(unref(Button), {
                              onClick: ($event) => profileStep.value = 2,
                              class: "min-w-[140px]"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Next Step: Registration "),
                                createVNode(unref(ArrowLeft), { class: "w-4 h-4 ml-2 rotate-180" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ])) : createCommentVNode("", true),
                        profileStep.value === 2 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-6 animate-in slide-in-from-right-8 duration-300"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between border-b pb-2" }, [
                            createVNode("h3", { class: "text-lg font-semibold" }, " Step 2: Registration Details "),
                            createVNode("span", { class: "text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md" }, "2 of 2")
                          ]),
                          createVNode("div", { class: "bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3" }, [
                            createVNode(unref(AlertCircle), { class: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                            createVNode("div", null, [
                              createVNode("h4", { class: "text-sm font-semibold text-foreground" }, " Required for Compliance "),
                              createVNode("p", { class: "text-xs text-muted-foreground mt-1 leading-relaxed" }, " These details are strictly required by the backend to verify your entity. You must fill out all required fields below before saving. ")
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                                default: withCtx(() => [
                                  createTextVNode("Registration Number (RC) "),
                                  createVNode("span", { class: "text-destructive" }, "*")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Input), {
                                modelValue: regData.value.number,
                                "onUpdate:modelValue": ($event) => regData.value.number = $event,
                                placeholder: "e.g. RC-123456"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode("p", { class: "text-[11px] text-muted-foreground" }, " Your corporate affairs commission number. ")
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
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
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                                default: withCtx(() => [
                                  createTextVNode("Country of Incorporation "),
                                  createVNode("span", { class: "text-destructive" }, "*")
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
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                                default: withCtx(() => [
                                  createTextVNode("Date of Incorporation "),
                                  createVNode("span", { class: "text-destructive" }, "*")
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
                          createVNode("div", { class: "flex items-center justify-between pt-6 border-t" }, [
                            createVNode(unref(Button), {
                              variant: "outline",
                              onClick: ($event) => profileStep.value = 1
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Back ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(Button), {
                              onClick: handleSaveProfile,
                              disabled: unref(businessDetail).isPending.value,
                              class: "min-w-[140px]"
                            }, {
                              default: withCtx(() => [
                                unref(businessDetail).isPending.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "w-4 h-4 mr-2 animate-spin"
                                })) : (openBlock(), createBlock(unref(Save), {
                                  key: 1,
                                  class: "w-4 h-4 mr-2"
                                })),
                                createTextVNode(" Save Full Profile ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ])
                        ])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode("div", { class: "flex items-center absolute top-0 left-0 right-0 h-1 bg-muted" }, [
                    createVNode("div", {
                      class: "h-full bg-primary transition-all duration-500",
                      style: { width: profileStep.value === 1 ? "50%" : "100%" }
                    }, null, 4)
                  ]),
                  createVNode(unref(CardContent), { class: "p-6 space-y-8 pt-8" }, {
                    default: withCtx(() => [
                      profileStep.value === 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-6 animate-in slide-in-from-right-8 duration-300"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between border-b pb-2" }, [
                          createVNode("h3", { class: "text-lg font-semibold" }, " Step 1: General Information "),
                          createVNode("span", { class: "text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md" }, "1 of 2")
                        ]),
                        createVNode("div", { class: "grid gap-6" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                              default: withCtx(() => [
                                createTextVNode("Business Name")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: infoData.value.name,
                              "onUpdate:modelValue": ($event) => infoData.value.name = $event,
                              disabled: "",
                              placeholder: "Enter business name",
                              class: "max-w-md"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-[11px] text-muted-foreground" }, " This is your official trading name (cannot be edited). ")
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
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
                              createVNode(unref(Label), { class: "text-sm font-semibold" }, {
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
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                              default: withCtx(() => [
                                createTextVNode("About Business")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Textarea), {
                              modelValue: infoData.value.about,
                              "onUpdate:modelValue": ($event) => infoData.value.about = $event,
                              placeholder: "Describe your business...",
                              class: "min-h-[100px] resize-y"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end pt-6 border-t" }, [
                          createVNode(unref(Button), {
                            onClick: ($event) => profileStep.value = 2,
                            class: "min-w-[140px]"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Next Step: Registration "),
                              createVNode(unref(ArrowLeft), { class: "w-4 h-4 ml-2 rotate-180" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])) : createCommentVNode("", true),
                      profileStep.value === 2 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-6 animate-in slide-in-from-right-8 duration-300"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between border-b pb-2" }, [
                          createVNode("h3", { class: "text-lg font-semibold" }, " Step 2: Registration Details "),
                          createVNode("span", { class: "text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md" }, "2 of 2")
                        ]),
                        createVNode("div", { class: "bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3" }, [
                          createVNode(unref(AlertCircle), { class: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                          createVNode("div", null, [
                            createVNode("h4", { class: "text-sm font-semibold text-foreground" }, " Required for Compliance "),
                            createVNode("p", { class: "text-xs text-muted-foreground mt-1 leading-relaxed" }, " These details are strictly required by the backend to verify your entity. You must fill out all required fields below before saving. ")
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                              default: withCtx(() => [
                                createTextVNode("Registration Number (RC) "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: regData.value.number,
                              "onUpdate:modelValue": ($event) => regData.value.number = $event,
                              placeholder: "e.g. RC-123456"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-[11px] text-muted-foreground" }, " Your corporate affairs commission number. ")
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
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
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                              default: withCtx(() => [
                                createTextVNode("Country of Incorporation "),
                                createVNode("span", { class: "text-destructive" }, "*")
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
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                              default: withCtx(() => [
                                createTextVNode("Date of Incorporation "),
                                createVNode("span", { class: "text-destructive" }, "*")
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
                        createVNode("div", { class: "flex items-center justify-between pt-6 border-t" }, [
                          createVNode(unref(Button), {
                            variant: "outline",
                            onClick: ($event) => profileStep.value = 1
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Back ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(Button), {
                            onClick: handleSaveProfile,
                            disabled: unref(businessDetail).isPending.value,
                            class: "min-w-[140px]"
                          }, {
                            default: withCtx(() => [
                              unref(businessDetail).isPending.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "w-4 h-4 mr-2 animate-spin"
                              })) : (openBlock(), createBlock(unref(Save), {
                                key: 1,
                                class: "w-4 h-4 mr-2"
                              })),
                              createTextVNode(" Save Full Profile ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ])) : createCommentVNode("", true)
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeSection.value === "documents") {
        _push(`<div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"><div><h2 class="text-2xl font-bold tracking-tight"> Compliance Documents </h2><p class="text-muted-foreground mt-1"> Upload and manage necessary verification files. </p></div>`);
        if (isUploadingDoc.value) {
          _push(ssrRenderComponent(unref(Card), { class: "border-2 border-dashed border-primary/20 shadow-none bg-primary/5 animate-in fade-in zoom-in-95 duration-200" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(CardHeader), { class: "pb-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(CardTitle), { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(UploadCloud), { class: "w-5 h-5 text-primary" }, null, _parent4, _scopeId3));
                            _push4(` Upload New Document `);
                          } else {
                            return [
                              createVNode(unref(UploadCloud), { class: "w-5 h-5 text-primary" }),
                              createTextVNode(" Upload New Document ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(CardTitle), { class: "text-lg flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(UploadCloud), { class: "w-5 h-5 text-primary" }),
                            createTextVNode(" Upload New Document ")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(CardContent), { class: "space-y-5" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-5"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Document Type <span class="text-destructive"${_scopeId3}>*</span>`);
                          } else {
                            return [
                              createTextVNode("Document Type "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(Select), {
                        modelValue: uploadData.value.document_id,
                        "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(SelectTrigger), { class: "bg-background" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(SelectValue), { placeholder: "Select document type" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(SelectValue), { placeholder: "Select document type" })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(SelectContent), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                    _push5(ssrRenderComponent(unref(SelectItem), {
                                      key: doc.id,
                                      value: doc.id
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`<div class="flex items-center justify-between w-full pr-2"${_scopeId5}><span${_scopeId5}>${ssrInterpolate(doc.name)}</span>`);
                                          if (doc.required) {
                                            _push6(ssrRenderComponent(unref(Badge), {
                                              variant: "secondary",
                                              class: "text-[9px] h-4 px-1 ml-2"
                                            }, {
                                              default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(`Req`);
                                                } else {
                                                  return [
                                                    createTextVNode("Req")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            _push6(`<!---->`);
                                          }
                                          _push6(`</div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "flex items-center justify-between w-full pr-2" }, [
                                              createVNode("span", null, toDisplayString(doc.name), 1),
                                              doc.required ? (openBlock(), createBlock(unref(Badge), {
                                                key: 0,
                                                variant: "secondary",
                                                class: "text-[9px] h-4 px-1 ml-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Req")
                                                ]),
                                                _: 1
                                              })) : createCommentVNode("", true)
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(kybDocuments).data.value?.getKYBDocuments || [], (doc) => {
                                      return openBlock(), createBlock(unref(SelectItem), {
                                        key: doc.id,
                                        value: doc.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center justify-between w-full pr-2" }, [
                                            createVNode("span", null, toDisplayString(doc.name), 1),
                                            doc.required ? (openBlock(), createBlock(unref(Badge), {
                                              key: 0,
                                              variant: "secondary",
                                              class: "text-[9px] h-4 px-1 ml-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Req")
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
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(SelectTrigger), { class: "bg-background" }, {
                                default: withCtx(() => [
                                  createVNode(unref(SelectValue), { placeholder: "Select document type" })
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
                                        createVNode("div", { class: "flex items-center justify-between w-full pr-2" }, [
                                          createVNode("span", null, toDisplayString(doc.name), 1),
                                          doc.required ? (openBlock(), createBlock(unref(Badge), {
                                            key: 0,
                                            variant: "secondary",
                                            class: "text-[9px] h-4 px-1 ml-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Req")
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
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Description (Optional)`);
                          } else {
                            return [
                              createTextVNode("Description (Optional)")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(Input), {
                        modelValue: uploadData.value.description,
                        "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                        placeholder: "Brief note about the file",
                        class: "bg-background"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Label), { class: "text-sm font-semibold" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`File <span class="text-destructive"${_scopeId3}>*</span>`);
                          } else {
                            return [
                              createTextVNode("File "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`<div class="border-2 border-dashed rounded-xl p-6 bg-background hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center group"${_scopeId2}><div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(FileText), { class: "w-6 h-6 text-primary" }, null, _parent3, _scopeId2));
                      _push3(`</div><p class="font-medium text-sm mb-1"${_scopeId2}>${ssrInterpolate(uploadData.value.fileObj ? uploadData.value.fileObj.name : "Click to select a file")}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(uploadData.value.fileObj ? `${(uploadData.value.fileObj.size / 1024 / 1024).toFixed(2)} MB` : "PDF, JPG, or PNG up to 5MB")}</p><input type="file" class="hidden" accept=".pdf,.jpg,.jpeg,.png"${_scopeId2}></div></div><div class="flex items-center justify-between pt-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Button), {
                        variant: "ghost",
                        onClick: ($event) => isUploadingDoc.value = false
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Cancel`);
                          } else {
                            return [
                              createTextVNode("Cancel")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(Button), {
                        onClick: handleUploadDocument,
                        disabled: unref(uploadDocument).isPending.value || !uploadData.value.fileObj,
                        class: "min-w-[120px]"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (unref(uploadDocument).isPending.value) {
                              _push4(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(unref(UploadCloud), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                            }
                            _push4(` Upload File `);
                          } else {
                            return [
                              unref(uploadDocument).isPending.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "w-4 h-4 mr-2 animate-spin"
                              })) : (openBlock(), createBlock(unref(UploadCloud), {
                                key: 1,
                                class: "w-4 h-4 mr-2"
                              })),
                              createTextVNode(" Upload File ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-5" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                              default: withCtx(() => [
                                createTextVNode("Document Type "),
                                createVNode("span", { class: "text-destructive" }, "*")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Select), {
                              modelValue: uploadData.value.document_id,
                              "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(SelectTrigger), { class: "bg-background" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(SelectValue), { placeholder: "Select document type" })
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
                                          createVNode("div", { class: "flex items-center justify-between w-full pr-2" }, [
                                            createVNode("span", null, toDisplayString(doc.name), 1),
                                            doc.required ? (openBlock(), createBlock(unref(Badge), {
                                              key: 0,
                                              variant: "secondary",
                                              class: "text-[9px] h-4 px-1 ml-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Req")
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
                            createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                              default: withCtx(() => [
                                createTextVNode("Description (Optional)")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Input), {
                              modelValue: uploadData.value.description,
                              "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                              placeholder: "Brief note about the file",
                              class: "bg-background"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                            default: withCtx(() => [
                              createTextVNode("File "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode("div", {
                            onClick: triggerFileInput,
                            class: "border-2 border-dashed rounded-xl p-6 bg-background hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center group"
                          }, [
                            createVNode("div", { class: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" }, [
                              createVNode(unref(FileText), { class: "w-6 h-6 text-primary" })
                            ]),
                            createVNode("p", { class: "font-medium text-sm mb-1" }, toDisplayString(uploadData.value.fileObj ? uploadData.value.fileObj.name : "Click to select a file"), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(uploadData.value.fileObj ? `${(uploadData.value.fileObj.size / 1024 / 1024).toFixed(2)} MB` : "PDF, JPG, or PNG up to 5MB"), 1),
                            createVNode("input", {
                              type: "file",
                              ref_key: "fileInput",
                              ref: fileInput,
                              onChange: handleFileSelect,
                              class: "hidden",
                              accept: ".pdf,.jpg,.jpeg,.png"
                            }, null, 544)
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-between pt-2" }, [
                          createVNode(unref(Button), {
                            variant: "ghost",
                            onClick: ($event) => isUploadingDoc.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(Button), {
                            onClick: handleUploadDocument,
                            disabled: unref(uploadDocument).isPending.value || !uploadData.value.fileObj,
                            class: "min-w-[120px]"
                          }, {
                            default: withCtx(() => [
                              unref(uploadDocument).isPending.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "w-4 h-4 mr-2 animate-spin"
                              })) : (openBlock(), createBlock(unref(UploadCloud), {
                                key: 1,
                                class: "w-4 h-4 mr-2"
                              })),
                              createTextVNode(" Upload File ")
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
                  createVNode(unref(CardHeader), { class: "pb-4" }, {
                    default: withCtx(() => [
                      createVNode(unref(CardTitle), { class: "text-lg flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(UploadCloud), { class: "w-5 h-5 text-primary" }),
                          createTextVNode(" Upload New Document ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardContent), { class: "space-y-5" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-5" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                            default: withCtx(() => [
                              createTextVNode("Document Type "),
                              createVNode("span", { class: "text-destructive" }, "*")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Select), {
                            modelValue: uploadData.value.document_id,
                            "onUpdate:modelValue": ($event) => uploadData.value.document_id = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(SelectTrigger), { class: "bg-background" }, {
                                default: withCtx(() => [
                                  createVNode(unref(SelectValue), { placeholder: "Select document type" })
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
                                        createVNode("div", { class: "flex items-center justify-between w-full pr-2" }, [
                                          createVNode("span", null, toDisplayString(doc.name), 1),
                                          doc.required ? (openBlock(), createBlock(unref(Badge), {
                                            key: 0,
                                            variant: "secondary",
                                            class: "text-[9px] h-4 px-1 ml-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Req")
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
                          createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                            default: withCtx(() => [
                              createTextVNode("Description (Optional)")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Input), {
                            modelValue: uploadData.value.description,
                            "onUpdate:modelValue": ($event) => uploadData.value.description = $event,
                            placeholder: "Brief note about the file",
                            class: "bg-background"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(Label), { class: "text-sm font-semibold" }, {
                          default: withCtx(() => [
                            createTextVNode("File "),
                            createVNode("span", { class: "text-destructive" }, "*")
                          ]),
                          _: 1
                        }),
                        createVNode("div", {
                          onClick: triggerFileInput,
                          class: "border-2 border-dashed rounded-xl p-6 bg-background hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center group"
                        }, [
                          createVNode("div", { class: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" }, [
                            createVNode(unref(FileText), { class: "w-6 h-6 text-primary" })
                          ]),
                          createVNode("p", { class: "font-medium text-sm mb-1" }, toDisplayString(uploadData.value.fileObj ? uploadData.value.fileObj.name : "Click to select a file"), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(uploadData.value.fileObj ? `${(uploadData.value.fileObj.size / 1024 / 1024).toFixed(2)} MB` : "PDF, JPG, or PNG up to 5MB"), 1),
                          createVNode("input", {
                            type: "file",
                            ref_key: "fileInput",
                            ref: fileInput,
                            onChange: handleFileSelect,
                            class: "hidden",
                            accept: ".pdf,.jpg,.jpeg,.png"
                          }, null, 544)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center justify-between pt-2" }, [
                        createVNode(unref(Button), {
                          variant: "ghost",
                          onClick: ($event) => isUploadingDoc.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(Button), {
                          onClick: handleUploadDocument,
                          disabled: unref(uploadDocument).isPending.value || !uploadData.value.fileObj,
                          class: "min-w-[120px]"
                        }, {
                          default: withCtx(() => [
                            unref(uploadDocument).isPending.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "w-4 h-4 mr-2 animate-spin"
                            })) : (openBlock(), createBlock(unref(UploadCloud), {
                              key: 1,
                              class: "w-4 h-4 mr-2"
                            })),
                            createTextVNode(" Upload File ")
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
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="pt-4"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold flex items-center gap-2"> Uploaded Files `);
        _push(ssrRenderComponent(unref(Badge), {
          variant: "secondary",
          class: "rounded-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(businessDocuments).data.value?.getDocuments?.length || 0)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(businessDocuments).data.value?.getDocuments?.length || 0), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h3>`);
        if (!isUploadingDoc.value) {
          _push(ssrRenderComponent(unref(Button), {
            onClick: ($event) => isUploadingDoc.value = true,
            size: "sm",
            class: "gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(UploadCloud), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(` Upload New Document `);
              } else {
                return [
                  createVNode(unref(UploadCloud), { class: "w-4 h-4" }),
                  createTextVNode(" Upload New Document ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(businessDocuments).isPending.value) {
          _push(`<div class="py-12 flex justify-center bg-card rounded-xl border shadow-sm">`);
          _push(ssrRenderComponent(unref(Loader2), { class: "w-8 h-8 animate-spin text-muted-foreground" }, null, _parent));
          _push(`</div>`);
        } else if (!unref(businessDocuments).data.value?.getDocuments?.length) {
          _push(`<div class="py-16 text-center border rounded-xl bg-card shadow-sm"><div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">`);
          _push(ssrRenderComponent(unref(FolderOpen), { class: "w-8 h-8 text-muted-foreground/60" }, null, _parent));
          _push(`</div><h3 class="text-lg font-semibold text-foreground"> No documents uploaded </h3><p class="text-sm text-muted-foreground max-w-xs mx-auto mt-1"> Files you upload will appear here securely for verification. </p></div>`);
        } else {
          _push(`<div class="grid gap-3"><!--[-->`);
          ssrRenderList(unref(businessDocuments).data.value?.getDocuments, (doc) => {
            _push(`<div class="flex items-center justify-between p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow group"><div class="flex items-center gap-4 overflow-hidden"><div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">`);
            _push(ssrRenderComponent(unref(CheckCircle2), { class: "w-6 h-6 text-primary" }, null, _parent));
            _push(`</div><div class="truncate"><p class="font-semibold text-sm text-foreground truncate">${ssrInterpolate(doc.description || doc.document_id)}</p><a${ssrRenderAttr("href", doc.url)} target="_blank" class="text-[11px] font-medium text-primary hover:underline mt-0.5 inline-flex items-center gap-1"> View Secure File ↗ </a></div></div>`);
            _push(ssrRenderComponent(unref(Button), {
              variant: "ghost",
              size: "icon",
              class: "text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
              onClick: ($event) => handleDeleteDocument(doc.id),
              disabled: unref(deleteDocument).isPending.value,
              title: "Delete document"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main></div>`);
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
//# sourceMappingURL=compliance-Coy2-FN8.mjs.map
