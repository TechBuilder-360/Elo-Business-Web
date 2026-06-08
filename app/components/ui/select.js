import { h, ref, provide, inject, computed } from "vue";

const SelectContext = Symbol("SelectContext");

export const Select = {
  name: "Select",
  props: {
    modelValue: [String, Number],
    value: [String, Number],
    onValueChange: Function,
  },
  emits: ["update:modelValue", "update:value"],
  setup(props, { emit, slots }) {
    const isOpen = ref(false);
    const selectedValue = computed(() =>
      props.modelValue !== undefined ? props.modelValue : props.value,
    );

    const selectOption = (val) => {
      emit("update:modelValue", val);
      emit("update:value", val);
      if (props.onValueChange) props.onValueChange(val);
      isOpen.value = false;
    };

    provide(SelectContext, {
      selectedValue,
      isOpen,
      selectOption,
      toggleOpen: () => {
        isOpen.value = !isOpen.value;
      },
    });

    return () =>
      h(
        "div",
        { class: "relative inline-block w-full text-foreground" },
        slots.default?.(),
      );
  },
};

export const SelectTrigger = {
  name: "SelectTrigger",
  props: { class: String },
  setup(props, { slots }) {
    const ctx = inject(SelectContext);
    return () =>
      h(
        "button",
        {
          type: "button",
          onClick: ctx?.toggleOpen,
          class: [
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-pointer",
            props.class,
          ],
        },
        [
          slots.default?.() || h("span", "Select..."),
          h("span", { class: "text-muted-foreground ml-2 text-xs" }, "▼"),
        ],
      );
  },
};

export const SelectValue = {
  name: "SelectValue",
  props: { placeholder: String },
  setup(props) {
    const ctx = inject(SelectContext);
    return () =>
      h(
        "span",
        { class: "truncate" },
        ctx?.selectedValue.value || props.placeholder || "",
      );
  },
};

export const SelectContent = {
  name: "SelectContent",
  props: { class: String },
  setup(props, { slots }) {
    const ctx = inject(SelectContext);
    return () =>
      ctx?.isOpen.value
        ? h(
            "div",
            {
              class: [
                "absolute z-50 min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md mt-1 max-h-60 overflow-y-auto bg-card border-border",
                props.class,
              ],
            },
            h("div", { class: "p-1" }, slots.default?.()),
          )
        : null;
  },
};

export const SelectItem = {
  name: "SelectItem",
  props: {
    value: { type: [String, Number], required: true },
    class: String,
  },
  setup(props, { slots }) {
    const ctx = inject(SelectContext);
    const isSelected = computed(
      () => ctx?.selectedValue.value === props.value,
    );

    return () =>
      h(
        "div",
        {
          onClick: () => ctx?.selectOption(props.value),
          class: [
            "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            isSelected.value &&
              "bg-accent text-accent-foreground font-semibold",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};
