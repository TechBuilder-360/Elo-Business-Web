import { h } from "vue";

export const Textarea = {
  name: "Textarea",
  props: {
    modelValue: [String, Number],
    class: String,
    placeholder: String,
    disabled: Boolean,
    rows: { type: Number, default: 3 },
    id: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit, attrs }) {
    return () =>
      h("textarea", {
        ...attrs,
        id: props.id,
        rows: props.rows,
        placeholder: props.placeholder,
        disabled: props.disabled,
        value: props.modelValue,
        onInput: (e) => emit("update:modelValue", e.target.value),
        class: [
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground",
          props.class,
        ],
      });
  },
};
