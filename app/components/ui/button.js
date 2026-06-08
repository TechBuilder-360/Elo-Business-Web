import { h } from "vue";

export const Button = {
  name: "Button",
  props: {
    variant: { type: String, default: "default" },
    size: { type: String, default: "default" },
    class: String,
    disabled: Boolean,
    type: { type: String, default: "button" },
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    const baseClass =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline:
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    };

    return () =>
      h(
        "button",
        {
          type: props.type,
          disabled: props.disabled,
          class: [
            baseClass,
            variants[props.variant] || variants.default,
            sizes[props.size] || sizes.default,
            props.class,
          ],
          onClick: (e) => {
            if (!props.disabled) emit("click", e);
          },
        },
        slots.default?.(),
      );
  },
};
