import { h } from "vue";

export const Avatar = {
  name: "Avatar",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        {
          class: [
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};

export const AvatarFallback = {
  name: "AvatarFallback",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        {
          class: [
            "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};
