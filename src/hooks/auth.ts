import router from "@/router/index";
import { useAuthStore } from "@/stores";

export const loginOut = () => {
  // Notification.warning({
  //   title: "提示",
  //   content: "权限不足",
  // });

  setTimeout(() => {
    sessionStorage.clear();
    router.push("/login");
  }, 500);
};

export const verifyAuth = () => {
  const { userInfo } = useAuthStore();

  if (userInfo.name) return;

  // Notification.info({
  //   title: "提示",
  //   content: "暂未登录",
  // });

  setTimeout(() => {
    sessionStorage.clear();
    router.push("/login");
  }, 500);
};
