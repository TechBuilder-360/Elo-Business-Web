import { ref, mergeProps, unref, withCtx, openBlock, createBlock, createTextVNode, createVNode, toDisplayString, computed, Fragment, renderList, provide, h, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from './card-Cq6gP5nL.mjs';
import { B as Button } from './button-Bxu1RhCi.mjs';
import { t as toast } from './alert-D7s0TqQ8.mjs';
import { Moon, Sun, Loader2, Send } from 'lucide-vue-next';
import { I as Input } from './input-C1C1FSk7.mjs';
import { L as Label } from './label-CU-twOy-.mjs';
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from './select-BENuuoNZ.mjs';
import { T as Textarea } from './textarea-CCpVUKiI.mjs';
import { Country, State } from 'country-state-city';
import { u as useBusiness } from './useBusiness-DQCdHk0S.mjs';
import { u as useTheme } from './useTheme-CfcsnVmm.mjs';
import { n as navigateTo } from './server.mjs';
import 'sweetalert2';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'perfect-debounce';
import '@vue/shared';

const RadioGroupContext = /* @__PURE__ */ Symbol("RadioGroupContext");
const RadioGroup = {
  name: "RadioGroup",
  props: {
    modelValue: [String, Number],
    value: [String, Number],
    defaultValue: [String, Number],
    onValueChange: Function,
    class: String
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const selectedValue = ref(
      props.modelValue || props.value || props.defaultValue
    );
    const changeValue = (val) => {
      selectedValue.value = val;
      emit("update:modelValue", val);
      if (props.onValueChange) props.onValueChange(val);
    };
    provide(RadioGroupContext, {
      selectedValue,
      changeValue
    });
    return () => h("div", { class: ["grid gap-2", props.class] }, slots.default?.());
  }
};
const RadioGroupItem = {
  name: "RadioGroupItem",
  props: {
    value: { type: [String, Number], required: true },
    class: String,
    id: String
  },
  setup(props) {
    const ctx = inject(RadioGroupContext);
    const isChecked = computed(() => ctx?.selectedValue.value === props.value);
    return () => h(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": isChecked.value,
        id: props.id,
        onClick: () => ctx?.changeValue(props.value),
        class: [
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer",
          props.class
        ]
      },
      isChecked.value ? h(
        "span",
        { class: "flex items-center justify-center" },
        h("span", { class: "h-2 w-2 rounded-full bg-primary" })
      ) : null
    );
  }
};
const _sfc_main$1 = {
  __name: "OnboardingBusinessInfoStep",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const allCountries = Country.getAllCountries();
    const availableStates = computed(() => {
      if (!props.data.address.country) return [];
      return State.getStatesOfCountry(props.data.address.country);
    });
    const industries = [
      "Technology",
      "Food & Beverage",
      "Retail",
      "Healthcare",
      "Logistics",
      "Finance",
      "Education",
      "Manufacturing",
      "Entertainment",
      "Other"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="space-y-2">`);
      _push(ssrRenderComponent(unref(Label), { htmlFor: "businessName" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Business Name *`);
          } else {
            return [
              createTextVNode("Business Name *")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Input), {
        id: "businessName",
        placeholder: "Enter your business name",
        modelValue: __props.data.businessName,
        "onUpdate:modelValue": (val) => __props.onChange({ businessName: val })
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(unref(Label), { htmlFor: "services" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Services Offered *`);
          } else {
            return [
              createTextVNode("Services Offered *")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Textarea), {
        id: "services",
        placeholder: "Describe the services your business provides",
        modelValue: __props.data.services,
        "onUpdate:modelValue": (val) => __props.onChange({ services: val }),
        class: "min-h-[100px]"
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(unref(Label), { htmlFor: "email" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Business Email Address *`);
          } else {
            return [
              createTextVNode("Business Email Address *")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Input), {
        id: "email",
        type: "email",
        placeholder: "business@example.com",
        modelValue: __props.data.email,
        "onUpdate:modelValue": (val) => __props.onChange({ email: val })
      }, null, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(unref(Label), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Resident Country *`);
          } else {
            return [
              createTextVNode("Resident Country *")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Select), {
        modelValue: __props.data.residentCountry,
        "onUpdate:modelValue": (val) => __props.onChange({ residentCountry: val })
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectTrigger), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectValue), { placeholder: "Select country" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SelectValue), { placeholder: "Select country" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SelectContent), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(allCountries), (c) => {
                    _push3(ssrRenderComponent(unref(SelectItem), {
                      key: c.isoCode,
                      value: c.isoCode
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(c.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(c.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(allCountries), (c) => {
                      return openBlock(), createBlock(unref(SelectItem), {
                        key: c.isoCode,
                        value: c.isoCode
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(c.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SelectTrigger), null, {
                default: withCtx(() => [
                  createVNode(unref(SelectValue), { placeholder: "Select country" })
                ]),
                _: 1
              }),
              createVNode(unref(SelectContent), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(allCountries), (c) => {
                    return openBlock(), createBlock(unref(SelectItem), {
                      key: c.isoCode,
                      value: c.isoCode
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(c.name), 1)
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
      }, _parent));
      _push(`</div><div class="space-y-2">`);
      _push(ssrRenderComponent(unref(Label), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Industry *`);
          } else {
            return [
              createTextVNode("Industry *")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Select), {
        modelValue: __props.data.industry,
        "onUpdate:modelValue": (val) => __props.onChange({ industry: val })
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectTrigger), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectValue), { placeholder: "Select industry" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SelectValue), { placeholder: "Select industry" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SelectContent), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(industries, (ind) => {
                    _push3(ssrRenderComponent(unref(SelectItem), {
                      key: ind,
                      value: ind
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(ind)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(ind), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(industries, (ind) => {
                      return createVNode(unref(SelectItem), {
                        key: ind,
                        value: ind
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(ind), 1)
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
              createVNode(unref(SelectTrigger), null, {
                default: withCtx(() => [
                  createVNode(unref(SelectValue), { placeholder: "Select industry" })
                ]),
                _: 1
              }),
              createVNode(unref(SelectContent), null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(industries, (ind) => {
                    return createVNode(unref(SelectItem), {
                      key: ind,
                      value: ind
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(ind), 1)
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
      _push(ssrRenderComponent(unref(Label), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Business Type *`);
          } else {
            return [
              createTextVNode("Business Type *")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(RadioGroup), {
        modelValue: __props.data.businessType,
        "onUpdate:modelValue": (val) => __props.onChange({ businessType: val }),
        class: "flex gap-6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(RadioGroupItem), {
              value: "onsite",
              id: "onsite"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Label), {
              htmlFor: "onsite",
              class: "cursor-pointer"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Onsite`);
                } else {
                  return [
                    createTextVNode("Onsite")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(RadioGroupItem), {
              value: "offsite",
              id: "offsite"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Label), {
              htmlFor: "offsite",
              class: "cursor-pointer"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Offsite`);
                } else {
                  return [
                    createTextVNode("Offsite")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-2" }, [
                createVNode(unref(RadioGroupItem), {
                  value: "onsite",
                  id: "onsite"
                }),
                createVNode(unref(Label), {
                  htmlFor: "onsite",
                  class: "cursor-pointer"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Onsite")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex items-center space-x-2" }, [
                createVNode(unref(RadioGroupItem), {
                  value: "offsite",
                  id: "offsite"
                }),
                createVNode(unref(Label), {
                  htmlFor: "offsite",
                  class: "cursor-pointer"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Offsite")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.data.businessType === "onsite") {
        _push(`<div class="space-y-4 p-4 rounded-lg bg-accent/50 border border-accent"><h4 class="text-sm font-semibold text-accent-foreground"> Business Address </h4><div class="grid grid-cols-2 gap-4"><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(Label), { htmlFor: "addressNumber" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Number`);
            } else {
              return [
                createTextVNode("Number")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Input), {
          id: "addressNumber",
          placeholder: "123",
          modelValue: __props.data.address.number,
          "onUpdate:modelValue": (val) => __props.onChange({ address: { ...__props.data.address, number: val } })
        }, null, _parent));
        _push(`</div><div class="space-y-2 col-span-2">`);
        _push(ssrRenderComponent(unref(Label), { htmlFor: "street" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Street`);
            } else {
              return [
                createTextVNode("Street")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Input), {
          id: "street",
          placeholder: "Main Street",
          modelValue: __props.data.address.street,
          "onUpdate:modelValue": (val) => __props.onChange({ address: { ...__props.data.address, street: val } })
        }, null, _parent));
        _push(`</div><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(Label), { htmlFor: "country" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Country`);
            } else {
              return [
                createTextVNode("Country")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Select), {
          modelValue: __props.data.address.country,
          "onUpdate:modelValue": (val) => __props.onChange({
            address: { ...__props.data.address, country: val, state: "" }
          })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(SelectTrigger), { id: "country" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(SelectValue), { placeholder: "Select country" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(SelectValue), { placeholder: "Select country" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(SelectContent), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(allCountries), (c) => {
                      _push3(ssrRenderComponent(unref(SelectItem), {
                        key: c.isoCode,
                        value: c.isoCode
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(c.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(c.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(allCountries), (c) => {
                        return openBlock(), createBlock(unref(SelectItem), {
                          key: c.isoCode,
                          value: c.isoCode
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(c.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(SelectTrigger), { id: "country" }, {
                  default: withCtx(() => [
                    createVNode(unref(SelectValue), { placeholder: "Select country" })
                  ]),
                  _: 1
                }),
                createVNode(unref(SelectContent), null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(allCountries), (c) => {
                      return openBlock(), createBlock(unref(SelectItem), {
                        key: c.isoCode,
                        value: c.isoCode
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(c.name), 1)
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
        }, _parent));
        _push(`</div><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(Label), { htmlFor: "state" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`State`);
            } else {
              return [
                createTextVNode("State")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Select), {
          modelValue: __props.data.address.state,
          "onUpdate:modelValue": (val) => __props.onChange({ address: { ...__props.data.address, state: val } }),
          disabled: !__props.data.address.country
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(SelectTrigger), { id: "state" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(SelectValue), { placeholder: "Select state" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(SelectValue), { placeholder: "Select state" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(SelectContent), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(availableStates.value, (s) => {
                      _push3(ssrRenderComponent(unref(SelectItem), {
                        key: s.isoCode,
                        value: s.name
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(s.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(s.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(availableStates.value, (s) => {
                        return openBlock(), createBlock(unref(SelectItem), {
                          key: s.isoCode,
                          value: s.name
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(s.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(SelectTrigger), { id: "state" }, {
                  default: withCtx(() => [
                    createVNode(unref(SelectValue), { placeholder: "Select state" })
                  ]),
                  _: 1
                }),
                createVNode(unref(SelectContent), null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(availableStates.value, (s) => {
                      return openBlock(), createBlock(unref(SelectItem), {
                        key: s.isoCode,
                        value: s.name
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(s.name), 1)
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
        }, _parent));
        _push(`</div><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(Label), { htmlFor: "city" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`City`);
            } else {
              return [
                createTextVNode("City")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Input), {
          id: "city",
          placeholder: "e.g. Ikeja",
          modelValue: __props.data.address.city,
          "onUpdate:modelValue": (val) => __props.onChange({ address: { ...__props.data.address, city: val } })
        }, null, _parent));
        _push(`</div><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(Label), { htmlFor: "zipCode" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Zip Code`);
            } else {
              return [
                createTextVNode("Zip Code")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Input), {
          id: "zipCode",
          placeholder: "100001",
          modelValue: __props.data.address.zipCode,
          "onUpdate:modelValue": (val) => __props.onChange({ address: { ...__props.data.address, zipCode: val } })
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/onboarding/BusinessInfoStep.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "onboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark, toggleTheme } = useTheme();
    const { registerBusiness } = useBusiness();
    const isSubmitting = registerBusiness.isPending;
    const formData = ref({
      businessName: "",
      services: "",
      email: "",
      industry: "",
      residentCountry: "",
      businessType: "onsite",
      address: {
        number: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
      }
    });
    const updateFormData = (updates) => {
      formData.value = { ...formData.value, ...updates };
    };
    const validateForm = () => {
      if (!formData.value.businessName.trim()) return "Business name is required";
      if (!formData.value.services.trim())
        return "Services description is required";
      if (!formData.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email))
        return "A valid email is required";
      if (!formData.value.residentCountry) return "Please select a country";
      if (!formData.value.businessType) return "Please select business type";
      if (formData.value.businessType === "onsite") {
        if (!formData.value.address.street.trim())
          return "Street address is required";
        if (!formData.value.address.city.trim()) return "City is required";
        if (!formData.value.address.state.trim()) return "State is required";
        if (!formData.value.address.country.trim()) return "Country is required";
      }
      return null;
    };
    const handleSubmit = async () => {
      const error = validateForm();
      if (error) {
        toast.error(error);
        return;
      }
      const payload = {
        name: formData.value.businessName,
        about: formData.value.services,
        email: formData.value.email,
        industry: formData.value.industry,
        on_site: formData.value.businessType === "onsite",
        role: {
          authorized_representative: true,
          authorized_representative_email: formData.value.email
        },
        address: {
          number: formData.value.businessType === "onsite" ? formData.value.address.number : "",
          street: formData.value.businessType === "onsite" ? formData.value.address.street : "",
          city: formData.value.businessType === "onsite" ? formData.value.address.city : "",
          state: formData.value.businessType === "onsite" ? formData.value.address.state : "",
          country: formData.value.businessType === "onsite" ? formData.value.address.country : formData.value.residentCountry,
          zip_code: formData.value.businessType === "onsite" ? formData.value.address.zipCode : ""
        }
      };
      try {
        const data = await registerBusiness.mutateAsync(payload);
        toast.success("Business onboarded successfully!");
        await navigateTo({
          path: "/businesses"
        });
      } catch (error2) {
        const gqlMsg = error2?.graphQLErrors?.[0]?.message;
        const fallbackMsg = error2.message === "GraphQL error" ? "Failed to register business" : error2.message;
        toast.error(gqlMsg || fallbackMsg);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background" }, _attrs))}><header class="border-b bg-card"><div class="container max-w-4xl mx-auto flex items-center gap-3 py-4 px-4"><div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden"><img${ssrRenderAttr("src", "/favicon_io/favicon_io/apple-touch-icon.png")} class="w-full h-full object-cover" alt="ELO"></div><div class="flex-1"><h1 class="text-lg font-bold text-foreground">Business Onboarding</h1><p class="text-xs text-muted-foreground"> Complete your business registration </p></div>`);
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
      _push(`</div></header><main class="container max-w-2xl mx-auto py-8 px-4">`);
      _push(ssrRenderComponent(unref(Card), { class: "shadow-lg border-0 shadow-foreground/5 bg-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CardHeader), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CardTitle), { class: "text-xl text-foreground" }, {
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
                  _push3(ssrRenderComponent(unref(CardDescription), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>Enter your basic business information</span>`);
                      } else {
                        return [
                          createVNode("span", null, "Enter your basic business information")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CardTitle), { class: "text-xl text-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Business Info")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(CardDescription), null, {
                      default: withCtx(() => [
                        createVNode("span", null, "Enter your basic business information")
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
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    data: formData.value,
                    onChange: updateFormData
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-end mt-8 pt-6 border-t border-border"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Button), {
                    onClick: handleSubmit,
                    disabled: unref(isSubmitting)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(isSubmitting)) {
                          _push4(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(Send), { class: "w-4 h-4 mr-2" }, null, _parent4, _scopeId3));
                        }
                        _push4(` ${ssrInterpolate(unref(isSubmitting) ? "Submitting..." : "Complete Onboarding")}`);
                      } else {
                        return [
                          unref(isSubmitting) ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "w-4 h-4 mr-2 animate-spin"
                          })) : (openBlock(), createBlock(unref(Send), {
                            key: 1,
                            class: "w-4 h-4 mr-2"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isSubmitting) ? "Submitting..." : "Complete Onboarding"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_sfc_main$1, {
                      data: formData.value,
                      onChange: updateFormData
                    }, null, 8, ["data"]),
                    createVNode("div", { class: "flex justify-end mt-8 pt-6 border-t border-border" }, [
                      createVNode(unref(Button), {
                        onClick: handleSubmit,
                        disabled: unref(isSubmitting)
                      }, {
                        default: withCtx(() => [
                          unref(isSubmitting) ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "w-4 h-4 mr-2 animate-spin"
                          })) : (openBlock(), createBlock(unref(Send), {
                            key: 1,
                            class: "w-4 h-4 mr-2"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isSubmitting) ? "Submitting..." : "Complete Onboarding"), 1)
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
              createVNode(unref(CardHeader), null, {
                default: withCtx(() => [
                  createVNode(unref(CardTitle), { class: "text-xl text-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Business Info")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(CardDescription), null, {
                    default: withCtx(() => [
                      createVNode("span", null, "Enter your basic business information")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(CardContent), null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, {
                    data: formData.value,
                    onChange: updateFormData
                  }, null, 8, ["data"]),
                  createVNode("div", { class: "flex justify-end mt-8 pt-6 border-t border-border" }, [
                    createVNode(unref(Button), {
                      onClick: handleSubmit,
                      disabled: unref(isSubmitting)
                    }, {
                      default: withCtx(() => [
                        unref(isSubmitting) ? (openBlock(), createBlock(unref(Loader2), {
                          key: 0,
                          class: "w-4 h-4 mr-2 animate-spin"
                        })) : (openBlock(), createBlock(unref(Send), {
                          key: 1,
                          class: "w-4 h-4 mr-2"
                        })),
                        createTextVNode(" " + toDisplayString(unref(isSubmitting) ? "Submitting..." : "Complete Onboarding"), 1)
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
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/onboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=onboard-Bcs9uEp7.mjs.map
