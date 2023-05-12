export const login = (params: any) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
const menu = [
  {
    id: 1,
    pid: null,
    name: "审批管理",
  },
  {
    id: 2,
    pid: 1,
    name: "发布规则",
    path: "/relus",
  },
  {
    id: 4,
    pid: null,
    name: "排班值守",
  },
  {
    id: 5,
    pid: 4,
    name: "排班日历",
    path: "/orderCalendar",
  },
  {
    id: 6,
    pid: 4,
    name: "值班排班",
    path: "/dutyScheduling",
  },
];
export const getMenu = () =>
  new Promise<any[]>((resolve) => {
    resolve(menu);
  });
