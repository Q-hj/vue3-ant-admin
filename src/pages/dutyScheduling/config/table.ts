import type { Column } from "@/components/ProTable/ProTable.vue";
export const columns = [
  {
    label: "序号",
    prop: "id",
    width: 100,
  },
  {
    label: "名称",
    prop: "title",
  },
  {
    label: "负责人",
    prop: "name",
  },
  {
    label: "普查地区",
    prop: "city",
  },
  {
    label: "普查类型",
    prop: "type",
  },
  {
    label: "普查时间",
    prop: "date",
    // format: (val) => val + "秒",
  },
].map((e: Column) => ({ ...e, dataIndex: e.prop }));
