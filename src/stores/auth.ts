import type { Route } from "@/router/interface";

import { ref, computed } from "vue";
import { defineStore } from "pinia";

// *  在 Setup Store 中：
// * ref() 就是 state 属性
// * computed() 就是 getters
// * function() 就是 actions
export default defineStore(
  "auth",
  () => {
    const menu = ref<Route[]>([]);
    function setMenu(value: Route[]) {
      menu.value = value;
    }

    const currentPath = ref("");
    function setCurrentPath(value: string) {
      currentPath.value = value;
    }

    const userInfo: any = ref({});
    const setUserInfo = (value: any) => (userInfo.value = value);

    return {
      menu,
      setMenu,
      currentPath,
      setCurrentPath,
      userInfo,
      setUserInfo,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: "authStore",
          // storage: localStorage,
          // 声明哪些变量将会被持久化存储
          // paths: ["menu"],
        },
      ],
    },
  }
);
