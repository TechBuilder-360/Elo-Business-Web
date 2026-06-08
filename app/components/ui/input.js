import { h } from "vue";

export const Input = {
  name: "Input",
  props: {
    modelValue: [String, Number],
    class: String,
    type: { type: String, default: "text" },
    placeholder: String,
    disabled: Boolean,
    id: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit, attrs }) {
    return () =>
      h("input", {
        ...attrs,
        id: props.id,
        type: props.type,
        placeholder: props.placeholder,
        disabled: props.disabled,
        value: props.modelValue,
        onInput: (e) => emit("update:modelValue", e.target.value),
        class: [
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
          props.class,
        ],
      });
  },
};
