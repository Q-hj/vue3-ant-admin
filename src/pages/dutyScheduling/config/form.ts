import type { Mapping, Option } from "@/components/ProFrom/ProFrom.vue";

export const queryFormMap: Mapping[] = [
  { label: "关键字", type: "input", prop: "name" },

  {
    label: "普查类型",
    type: "select",
    prop: "format",
    options: ["类型一", "类型二", "类型三"],
  },
  {
    label: "普查地区",
    type: "select",
    prop: "city",
    options: ["杭州市"],
  },
];
