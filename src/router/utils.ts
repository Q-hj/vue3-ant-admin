import type { RouteRecordRaw } from "vue-router";
import type { Route } from "./interface";

// import { resolveComponent, h } from "vue";
import router from "./index";
const { routes } = router.options;

const allPages = import.meta.glob("@/pages/**/*.vue");

// 转为树形结构
export const toTree = (pages: any[]) => {
  const pre = pages.filter((e) => !e.pid);

  const tree = pre.map((preItem) => ({
    ...preItem,
    chirdren: pages.filter((e) => e.pid === preItem.id),
  }));
  return tree;
};

// 动态添加路由
export const generateRoutes = (pages: Route[]) => {
  const result = formatRoutes(pages).filter((e: Route) => e.pid);

  const layout = routes.filter((e) => e.name === "layout")[0];
  if (!layout) return console.error("不存在layout路由");

  for (let i = 0, len = result.length; i < len; i++) {
    // const item = result[i] as RouteRecordRaw;
    layout.children!.push(result[i]);

    router.addRoute("layout", result[i]);
  }
};

// 转为路由表形式
const formatRoutes: RouteRecordRaw = (pages: Route[]) =>
  pages.map((e) => ({
    ...e,
    path: e.path || "",
    name: e.name,
    component: allPages[`/src/pages${e.path}${e.path}.vue`],
  }));
