<script setup lang="ts">
import { ref, watch, computed, KeepAlive } from "vue";

import { useRouter, useRoute, RouterView } from "vue-router";
import { useAuthStore } from "@/stores";
import { verifyAuth } from "@/hooks/auth";
import { generateRoutes, toTree } from "@/router/utils";
const { menu, currentPath, setCurrentPath, userInfo } = useAuthStore();
const router = useRouter();
const route = useRoute();

// 校验是否登录
verifyAuth();

console.log(toTree(menu));
generateRoutes(menu);

router.push(currentPath || "/home");
watch(route, (current) => {
  setCurrentPath(current.fullPath);
});

const title = import.meta.env.VITE_APP_TITLE;

const collapsed = ref(false);
const onCollapse = () => {
  collapsed.value = !collapsed.value;
};

const onClickMenuItem = ({ key }: any) => {
  // console.log(key);
  router.push(key);
};

// const onDropdown = (value: any) => {
//   // console.log(value);
//   if (value === "loginout") {
//     router.push("/login");
//     sessionStorage.clear();
//   }
// };
</script>
<template>
  <a-layout class="h-100vh">
    <a-layout-header>
      <div class="flex-y-center p-l-20px text-white">
        <span class="text-20px font-bold">{{ title }}</span>
      </div>

      <div class="m-r-20px"></div>
    </a-layout-header>
    <a-layout class="bg-light-500">
      <a-layout-sider
        theme="light"
        class="layout-sider"
        collapsible
        :collapsed="collapsed"
        :trigger="null"
        breakpoint="xl"
      >
        <div class="m-x-12px m-y-8px flex-center min-h-40px">
          <!-- <span class="text-20px font-bold m-t-30px">{{ title }}</span> -->
        </div>
        <a-menu
          class="side-menu"
          mode="inline"
          :selectedKeys="[currentPath]"
          :openKeys="[currentPath]"
          :style="{ width: '100%' }"
          @click="onClickMenuItem"
        >
          <a-sub-menu
            class="sub-menu"
            v-for="item in toTree(menu)"
            :key="item.path"
          >
            <template #title>{{ item.name }}</template>
            <a-menu-item v-for="chirdren in item.chirdren" :key="chirdren.path">
              <!-- <component :is="chirdren.icon" /> -->
              <span class="">{{ chirdren.name }}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout class="p-x-24px">
        <!-- 面包屑导航 -->

        <a-breadcrumb class="!m-y-14px" :routes="toTree(menu)">
          <template #itemRender="{ route, path }">
            <router-link :to="`${path}`">
              {{ route.name }}
            </router-link>
          </template>
        </a-breadcrumb>

        <!-- 主路由视图 -->
        <a-layout-content class="">
          <div class="h-[calc(100vh-88px-38px)]">
            <!-- <div class="h-[calc(100vh-88px-28px)] overflow-y-scroll"> -->

            <RouterView />
          </div>
        </a-layout-content>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.ant-layout-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 1px solid #d7d3d3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url("@/assets/images/head-bg.png");
}
.layout-sider {
  background: linear-gradient(#aad7fb, #f2faff);
  .side-menu {
    // font-size: 16px;
    background-color: transparent;
    :deep(.ant-menu-sub.ant-menu-inline) {
      background-color: transparent;
    }
  }
}
</style>
