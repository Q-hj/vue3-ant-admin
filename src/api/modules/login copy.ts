export const login = (params: any) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });

const menu = [
  {
    id: 5,
    pid: null,
    name: "数据分析",
    icon: "icon-apps",
  },
  {
    id: 6,
    pid: 5,
    name: "查询表格",
    path: "/table",
    icon: "icon-search",
  },
  {
    id: 7,
    pid: 5,
    name: "统计图表",
    path: "/chart",
    icon: "icon-computer",
  },
  {
    id: 8,
    pid: null,
    name: "可视化",
    icon: "icon-bar-chart",
  },
  {
    id: 9,
    pid: 8,
    name: "分布图",
    path: "/map",
    icon: "icon-location",
  },
];
const projectMenu = [
  {
    id: 1,
    pid: null,
    name: "模块一",
    icon: "icon-search",
  },
  {
    id: 2,
    pid: 1,
    name: "城市活断层避让查询",
    path: "/search_city",
    icon: "icon-search",
  },
  {
    id: 3,
    pid: 1,
    name: "深部构造探测查询",
    path: "/search_deep",
    icon: "icon-search",
  },
  {
    id: 4,
    pid: null,
    name: "模块二",
    icon: "icon-apps",
  },
  {
    id: 5,
    pid: 4,
    name: "房屋建筑的风险评估监测",
    path: "/dange_house",
    icon: "icon-bar-chart",
  },
  {
    id: 6,
    pid: 4,
    name: "重点防患评估监测",
    path: "/dange_assess",
    icon: "icon-bar-chart",
  },
  {
    id: 7,
    pid: null,
    name: "模块三",
    icon: "icon-apps",
  },
  {
    id: 8,
    pid: 7,
    name: "超高层建筑（150米以上）震灾风险防治",
    path: "/service_building",
    icon: "icon-bar-chart",
  },
  {
    id: 9,
    pid: 7,
    name: "杭州亚运会场馆及周边震灾风险影响评估服务",
    path: "/dange_assess",
    icon: "icon-bar-chart",
  },
];
export const getMenu = () =>
  new Promise<any[]>((resolve) => {
    resolve(projectMenu);
  });
