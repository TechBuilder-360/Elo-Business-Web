import { h } from "vue";

export const Table = {
  name: "Table",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        { class: "relative w-full overflow-auto" },
        h(
          "table",
          { class: ["w-full caption-bottom text-sm", props.class] },
          slots.default?.(),
        ),
      );
  },
};

export const TableHeader = {
  name: "TableHeader",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h("thead", { class: ["[&_tr]:border-b", props.class] }, slots.default?.());
  },
};

export const TableBody = {
  name: "TableBody",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "tbody",
        { class: ["[&_tr:last-child]:border-0", props.class] },
        slots.default?.(),
      );
  },
};

export const TableRow = {
  name: "TableRow",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "tr",
        {
          class: [
            "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};

export const TableHead = {
  name: "TableHead",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "th",
        {
          class: [
            "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};

export const TableCell = {
  name: "TableCell",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "td",
        {
          class: [
            "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-foreground",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};
