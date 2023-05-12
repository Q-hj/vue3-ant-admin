import type { Mapping, Option } from "@/components/ProFrom/ProFrom.vue";
export const queryFormMap: Mapping[] = [
  { label: "搜索", type: "input", prop: "name", col: 6 },

  //   { label: "性别", type: "radio", prop: "sex", options: ["男", "女"] },
  {
    label: "日期",
    type: "date-range",
    prop: "date",
    col: 10,
  },
];
