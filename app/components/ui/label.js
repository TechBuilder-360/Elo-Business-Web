import { h } from "vue";

export const Label = {
  name: "Label",
  props: {
    htmlFor: String,
    class: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        "label",
        {
          for: props.htmlFor,
          class: [
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};
