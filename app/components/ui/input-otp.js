import { h, ref, provide, inject, computed } from "vue";

const OTPContext = Symbol("OTPContext");

export const InputOTP = {
  name: "InputOTP",
  props: {
    maxLength: { type: Number, default: 6 },
    modelValue: { type: String, default: "" },
    value: { type: String, default: "" },
    onChange: Function,
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const inputRef = ref(null);
    const currentValue = computed(() =>
      props.modelValue !== undefined ? props.modelValue : props.value,
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
      focusInput,
    });

    return () =>
      h(
        "div",
        {
          onClick: focusInput,
          class: "relative cursor-text flex items-center justify-center",
        },
        [
          h("input", {
            ref: inputRef,
            type: "text",
            inputMode: "numeric",
            pattern: "[0-9]*",
            value: currentValue.value,
            onInput,
            class: "absolute inset-0 w-full h-full opacity-0 cursor-default z-10",
          }),
          slots.default?.(),
        ],
      );
  },
};

export const InputOTPGroup = {
  name: "InputOTPGroup",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        { class: ["flex items-center gap-2", props.class] },
        slots.default?.(),
      );
  },
};

export const InputOTPSlot = {
  name: "InputOTPSlot",
  props: {
    index: { type: Number, required: true },
    class: String,
  },
  setup(props) {
    const ctx = inject(OTPContext);
    const char = computed(() => ctx?.currentValue.value[props.index] || "");
    const isFocused = computed(
      () => ctx?.currentValue.value.length === props.index,
    );

    return () =>
      h(
        "div",
        {
          class: [
            "relative flex h-10 w-10 items-center justify-center border border-input text-sm transition-all rounded-md bg-transparent text-foreground",
            isFocused.value && "ring-1 ring-ring border-ring font-semibold",
            props.class,
          ],
        },
        char.value,
      );
  },
};
