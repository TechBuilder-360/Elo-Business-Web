import { h, ref, provide, inject, computed } from "vue";

const ChartContext = Symbol("ChartContext");

export const ChartContainer = {
  name: "ChartContainer",
  props: {
    config: { type: Object, default: () => ({}) },
    class: String,
  },
  setup(props, { slots }) {
    provide(ChartContext, { config: props.config });
    return () =>
      h("div", { class: ["relative w-full", props.class] }, slots.default?.());
  },
};

export const ChartTooltip = {
  name: "ChartTooltip",
  props: { content: Object },
  setup() {
    return () => null;
  },
};

export const ChartTooltipContent = {
  name: "ChartTooltipContent",
  setup() {
    return () => null;
  },
};

export const ResponsiveContainer = {
  name: "ResponsiveContainer",
  props: { width: [String, Number], height: [String, Number] },
  setup(props, { slots }) {
    return () => h("div", { class: "w-full h-full" }, slots.default?.());
  },
};

const drawGrid = (maxVal, yTicks) => {
  const lines = [];
  for (let i = 0; i <= yTicks; i++) {
    const y = 240 - (i / yTicks) * 200;
    lines.push(
      h("line", {
        key: `grid-${i}`,
        x1: 50,
        y1: y,
        x2: 480,
        y2: y,
        stroke: "currentColor",
        class: "text-muted/20 dark:text-muted/10",
        "stroke-dasharray": "3 3",
        "stroke-width": 1,
      }),
    );
  }
  return lines;
};

const drawYAxis = (maxVal, yTicks) => {
  const ticks = [];
  for (let i = 0; i <= yTicks; i++) {
    const val = Math.round((i / yTicks) * maxVal);
    const y = 240 - (i / yTicks) * 200;
    ticks.push(
      h(
        "text",
        {
          key: `ytick-${i}`,
          x: 40,
          y: y + 4,
          "text-anchor": "end",
          class: "text-[10px] fill-muted-foreground font-medium select-none",
        },
        val >= 1000 ? (val / 1000).toFixed(1) + "k" : val,
      ),
    );
  }
  return ticks;
};

export const BarChart = {
  name: "BarChart",
  props: {
    data: { type: Array, default: () => [] },
  },
  setup(props, { slots }) {
    const chartCtx = inject(ChartContext);

    return () => {
      const data = props.data;
      if (!data || data.length === 0) return h("svg");

      const barSlot = slots.default?.().find(
        (c) =>
          c.type && (c.type.name === "Bar" || c.type === Bar),
      ) || { props: { dataKey: "visits" } };
      const dataKey = barSlot.props?.dataKey || "visits";
      const configColor =
        chartCtx?.config?.[dataKey]?.color || "var(--primary)";

      const values = data.map((d) => Number(d[dataKey]) || 0);
      const maxVal = Math.max(...values, 10) * 1.1;
      const yTicks = 4;

      const xAxisSlot = slots.default?.().find(
        (c) =>
          c.type && (c.type.name === "XAxis" || c.type === XAxis),
      );
      const xKey = xAxisSlot?.props?.dataKey || "name";

      const N = data.length;
      const chartWidth = 430;
      const barWidth = Math.min(30, (chartWidth / N) * 0.6);
      const xStep = chartWidth / N;

      return h(
        "svg",
        {
          viewBox: "0 0 500 280",
          class: "w-full h-full text-foreground",
        },
        [
          ...drawGrid(maxVal, yTicks),
          ...drawYAxis(maxVal, yTicks),
          ...data.map((d, idx) => {
            const x = 50 + idx * xStep + xStep / 2;
            return h(
              "text",
              {
                key: `xtick-${idx}`,
                x,
                y: 265,
                "text-anchor": "middle",
                class:
                  "text-[10px] fill-muted-foreground font-medium select-none",
              },
              String(d[xKey]),
            );
          }),
          ...data.map((d, idx) => {
            const val = Number(d[dataKey]) || 0;
            const barHeight = (val / maxVal) * 200;
            const x = 50 + idx * xStep + (xStep - barWidth) / 2;
            const y = 240 - barHeight;

            return h("rect", {
              key: `bar-${idx}`,
              x,
              y,
              width: barWidth,
              height: Math.max(2, barHeight),
              rx: 4,
              ry: 4,
              fill: configColor,
              class:
                "transition-all duration-300 hover:opacity-80 cursor-pointer",
            });
          }),
        ],
      );
    };
  },
};

export const LineChart = {
  name: "LineChart",
  props: {
    data: { type: Array, default: () => [] },
  },
  setup(props, { slots }) {
    const chartCtx = inject(ChartContext);

    return () => {
      const data = props.data;
      if (!data || data.length === 0) return h("svg");

      const lineSlot = slots.default?.().find(
        (c) =>
          c.type && (c.type.name === "Line" || c.type === Line),
      ) || { props: { dataKey: "revenue" } };
      const dataKey = lineSlot.props?.dataKey || "revenue";
      const configColor =
        chartCtx?.config?.[dataKey]?.color || "var(--primary)";

      const values = data.map((d) => Number(d[dataKey]) || 0);
      const maxVal = Math.max(...values, 10) * 1.1;
      const yTicks = 4;

      const xAxisSlot = slots.default?.().find(
        (c) =>
          c.type && (c.type.name === "XAxis" || c.type === XAxis),
      );
      const xKey = xAxisSlot?.props?.dataKey || "name";

      const N = data.length;
      const xStep = 430 / (N - 1);

      const points = data.map((d, idx) => {
        const x = 50 + idx * xStep;
        const val = Number(d[dataKey]) || 0;
        const y = 240 - (val / maxVal) * 200;
        return { x, y };
      });

      const pathD = points
        .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");

      return h(
        "svg",
        {
          viewBox: "0 0 500 280",
          class: "w-full h-full text-foreground",
        },
        [
          ...drawGrid(maxVal, yTicks),
          ...drawYAxis(maxVal, yTicks),
          ...data.map((d, idx) => {
            const x = 50 + idx * xStep;
            return h(
              "text",
              {
                key: `xtick-${idx}`,
                x,
                y: 265,
                "text-anchor": "middle",
                class:
                  "text-[10px] fill-muted-foreground font-medium select-none",
              },
              String(d[xKey]),
            );
          }),
          h("path", {
            d: pathD,
            fill: "none",
            stroke: configColor,
            "stroke-width": 2.5,
            class: "transition-all duration-300",
          }),
          ...points.map((p, idx) =>
            h("circle", {
              key: `dot-${idx}`,
              cx: p.x,
              cy: p.y,
              r: 4,
              fill: configColor,
              stroke: "var(--background)",
              "stroke-width": 1.5,
              class: "hover:scale-125 transition-transform cursor-pointer",
            }),
          ),
        ],
      );
    };
  },
};

export const AreaChart = {
  name: "AreaChart",
  props: {
    data: { type: Array, default: () => [] },
  },
  setup(props, { slots }) {
    const chartCtx = inject(ChartContext);

    return () => {
      const data = props.data;
      if (!data || data.length === 0) return h("svg");

      const areaSlot = slots.default?.().find(
        (c) =>
          c.type && (c.type.name === "Area" || c.type === Area),
      ) || { props: { dataKey: "customers" } };
      const dataKey = areaSlot.props?.dataKey || "customers";
      const configColor =
        chartCtx?.config?.[dataKey]?.color || "var(--primary)";

      const values = data.map((d) => Number(d[dataKey]) || 0);
      const maxVal = Math.max(...values, 10) * 1.1;
      const yTicks = 4;

      const xAxisSlot = slots.default?.().find(
        (c) =>
          c.type && (c.type.name === "XAxis" || c.type === XAxis),
      );
      const xKey = xAxisSlot?.props?.dataKey || "name";

      const N = data.length;
      const xStep = 430 / (N - 1);

      const points = data.map((d, idx) => {
        const x = 50 + idx * xStep;
        const val = Number(d[dataKey]) || 0;
        const y = 240 - (val / maxVal) * 200;
        return { x, y };
      });

      const lineD = points
        .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
      const areaD = `${lineD} L ${points[N - 1].x} 240 L 50 240 Z`;

      return h(
        "svg",
        {
          viewBox: "0 0 500 280",
          class: "w-full h-full text-foreground",
        },
        [
          h("defs", [
            h(
              "linearGradient",
              { id: "areaGrad", x1: 0, y1: 0, x2: 0, y2: 1 },
              [
                h("stop", {
                  offset: "0%",
                  "stop-color": configColor,
                  "stop-opacity": 0.4,
                }),
                h("stop", {
                  offset: "100%",
                  "stop-color": configColor,
                  "stop-opacity": 0.02,
                }),
              ],
            ),
          ]),
          ...drawGrid(maxVal, yTicks),
          ...drawYAxis(maxVal, yTicks),
          ...data.map((d, idx) => {
            const x = 50 + idx * xStep;
            return h(
              "text",
              {
                key: `xtick-${idx}`,
                x,
                y: 265,
                "text-anchor": "middle",
                class:
                  "text-[10px] fill-muted-foreground font-medium select-none",
              },
              String(d[xKey]),
            );
          }),
          h("path", {
            d: areaD,
            fill: "url(#areaGrad)",
          }),
          h("path", {
            d: lineD,
            fill: "none",
            stroke: configColor,
            "stroke-width": 2.5,
          }),
        ],
      );
    };
  },
};

export const Bar = {
  name: "Bar",
  props: { dataKey: String, fill: String, radius: Array },
  setup() {
    return () => null;
  },
};
export const Line = {
  name: "Line",
  props: { dataKey: String, stroke: String, strokeWidth: Number, dot: Object },
  setup() {
    return () => null;
  },
};
export const Area = {
  name: "Area",
  props: { dataKey: String, stroke: String, fill: String },
  setup() {
    return () => null;
  },
};
export const XAxis = {
  name: "XAxis",
  props: { dataKey: String },
  setup() {
    return () => null;
  },
};
export const YAxis = {
  name: "YAxis",
  setup() {
    return () => null;
  },
};
export const CartesianGrid = {
  name: "CartesianGrid",
  props: { strokeDasharray: String },
  setup() {
    return () => null;
  },
};
