import { h, ref, provide, inject, computed } from "vue";

const TabsContext = Symbol("TabsContext");

export const Tabs = {
  name: "Tabs",
  props: {
    defaultValue: String,
    value: String,
    modelValue: String,
    onValueChange: Function,
    class: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const selectedTab = ref(
      props.modelValue || props.value || props.defaultValue,
    );

    const changeTab = (val) => {
      selectedTab.value = val;
      emit("update:modelValue", val);
      if (props.onValueChange) props.onValueChange(val);
    };

    provide(TabsContext, {
      selectedTab,
      changeTab,
    });

    return () => h("div", { class: [props.class] }, slots.default?.());
  },
};

export const TabsList = {
  name: "TabsList",
  props: { class: String },
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        {
          class: [
            "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};

export const TabsTrigger = {
  name: "TabsTrigger",
  props: {
    value: { type: String, required: true },
    class: String,
  },
  setup(props, { slots }) {
    const ctx = inject(TabsContext);
    const isActive = computed(() => ctx?.selectedTab.value === props.value);

    return () =>
      h(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": isActive.value,
          onClick: () => ctx?.changeTab(props.value),
          class: [
            "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
            isActive.value
              ? "bg-background text-foreground shadow font-semibold"
              : "text-muted-foreground hover:bg-muted/50",
            props.class,
          ],
        },
        slots.default?.(),
      );
  },
};

export const TabsContent = {
  name: "TabsContent",
  props: {
    value: { type: String, required: true },
    class: String,
  },
  setup(props, { slots }) {
    const ctx = inject(TabsContext);
    const isActive = computed(() => ctx?.selectedTab.value === props.value);

    return () =>
      isActive.value
        ? h(
            "div",
            {
              role: "tabpanel",
              class: [
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                props.class,
              ],
            },
            slots.default?.(),
          )
        : null;
  },
};
