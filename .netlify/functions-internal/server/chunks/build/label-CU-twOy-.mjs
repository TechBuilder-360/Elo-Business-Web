import { h } from 'vue';

const Label = {
  name: "Label",
  props: {
    htmlFor: String,
    class: String
  },
  setup(props, { slots }) {
    return () => h(
      "label",
      {
        for: props.htmlFor,
        class: [
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground",
          props.class
        ]
      },
      slots.default?.()
    );
  }
};

export { Label as L };
//# sourceMappingURL=label-CU-twOy-.mjs.map
