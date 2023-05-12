import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

import Antd from "ant-design-vue";

import * as AntdIcon from "@ant-design/icons-vue";

import App from "./App.vue";
import router from "./router";

import "ant-design-vue/dist/antd.css";

// * svg icons
import "virtual:svg-icons-register";

// * UnoCSS
import "uno.css";

import "@/assets/style/global.less";

// 注册全局组件
import ProButton from "./components/ProButton";

const app = createApp(App);
app.component("ProButton", ProButton);

const icons: any = AntdIcon;
for (const name in icons) {
  app.component(name, icons[name]);
}
// * 按需引入组件无法利用component组件动态渲染Antd组件
app.use(Antd);

const store = createPinia();
store.use(piniaPluginPersist);

app.use(store);
app.use(router);

app.mount("#app");
