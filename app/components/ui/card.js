import { h } from "vue";

export const Card = {
  name: "Card",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        {
          class: [
            "rounded-xl border bg-card text-card-foreground shadow",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};

export const CardHeader = {
  name: "CardHeader",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        { class: ["flex flex-col space-y-1.5 p-6", props.class] },
        slots.default?.(),
      );
  },
};

export const CardTitle = {
  name: "CardTitle",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "h3",
        {
          class: [
            "font-semibold leading-none tracking-tight text-foreground",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};

export const CardDescription = {
  name: "CardDescription",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "p",
        { class: ["text-sm text-muted-foreground", props.class] },
        slots.default?.(),
      );
  },
};

export const CardContent = {
  name: "CardContent",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h("div", { class: ["p-6 pt-0", props.class] }, slots.default?.());
  },
};
