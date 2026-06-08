import { h, ref, provide, inject, computed } from "vue";

const RadioGroupContext = Symbol("RadioGroupContext");

export const RadioGroup = {
  name: "RadioGroup",
  props: {
    modelValue: [String, Number],
    value: [String, Number],
    defaultValue: [String, Number],
    onValueChange: Function,
    class: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const selectedValue = ref(
      props.modelValue || props.value || props.defaultValue,
    );

    const changeValue = (val) => {
      selectedValue.value = val;
      emit("update:modelValue", val);
      if (props.onValueChange) props.onValueChange(val);
    };

    provide(RadioGroupContext, {
      selectedValue,
      changeValue,
    });

    return () =>
      h("div", { class: ["grid gap-2", props.class] }, slots.default?.());
  },
};

export const RadioGroupItem = {
  name: "RadioGroupItem",
  props: {
    value: { type: [String, Number], required: true },
    class: String,
    id: String,
  },
  setup(props) {
    const ctx = inject(RadioGroupContext);
    const isChecked = computed(() => ctx?.selectedValue.value === props.value);

    return () =>
      h(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": isChecked.value,
          id: props.id,
          onClick: () => ctx?.changeValue(props.value),
          class: [
            "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer",
            props.class,
          ],
        },
        isChecked.value
          ? h(
              "span",
              { class: "flex items-center justify-center" },
              h("span", { class: "h-2 w-2 rounded-full bg-primary" }),
            )
          : null,
      );
  },
};
