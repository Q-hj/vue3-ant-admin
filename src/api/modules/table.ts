import { mock } from "@/utils/mock";

export const getTableData = (item: any) =>
  new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve(mock(item, 12));
    }, 300);
  });

const data1 = {
  id: "$",
  key: "$",
  title: "场地$",
  name: "场地$",
  // lonlat: [],
  lon: "120.$",
  lat: "30.$",
  city: "杭州市",
  type: "类别$",
  num: ["I", "II", "III", "IV", "V"] || "等级$",
  date: "2023-03-03 14:29:50",
};
export const getMapTableData1 = () => getTableData(data1);

const data2 = {
  id: "$",
  key: "$",
  title: "风险$",
  name: "风险$",
  // lonlat: [],
  lon: "120.$",
  lat: "30.$",
  city: "杭州市",
  type: "低",
  date: "2023-03-03 14:29:50",
};
export const getMapTableData2 = () => getTableData(data2);

const item1 = {
  id: "$",
  key: "$",
  title: "地震局日常普查$",
  name: "刘**",
  city: ["浙江省", "杭州市", "绍兴市", "宁波市"],
  type: "地震风险",
  date: "2023-03-03 14:29:50",
};
export const getTableData1 = () => getTableData(item1);

const item2 = {
  id: "$",
  key: "$",
  title: "震防建设$",
  city: ["浙江省", "杭州市", "绍兴市", "宁波市"],
  type: "知识科普",
  goal: "提高公众抗震意识",
  img: "server.jfif",
};
export const getTableData2 = () => getTableData(item2);

const item3 = {
  id: "$",
  key: "$",
  // title: "震防建设$",
  city: ["浙江省", "杭州市", "绍兴市", "宁波市"],
  num: 13 + "$0",
  date: "2023-03-03 14:29:50",
};
export const getTableData3 = () => getTableData(item3);

const item4 = {
  id: "$",
  key: "$",
  city: ["浙江省", "杭州市", "绍兴市", "宁波市"],
  type: "房屋建筑",
  date: "2023-03-03 14:29:50",
};
export const getTableData4 = () => getTableData(item4);
