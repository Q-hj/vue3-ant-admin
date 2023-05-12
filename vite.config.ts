import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv, UserConfig, PluginOption } from "vite";

import vue from "@vitejs/plugin-vue";

import Unocss from "unocss/vite";

// 自动引入组件
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

import { proxy } from "./src/api/http/proxy";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd()); //环境变量

  // * 打包去除 console.log && debugger
  const { VITE_CLEAR_CONSOLE, VITE_CLEAR_DEBUGGER } = env;
  const pure_console = VITE_CLEAR_CONSOLE === "true" ? "console.log" : "";
  const pure_debugger = VITE_CLEAR_DEBUGGER === "true" ? "debugger" : "";

  // const isDev = env.NODE_ENV === "development";
  // const isProd = env.NODE_ENV === "production";

  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      port: 8080,
      open: false,
      cors: true,
      // 跨域代理配置
      proxy,
    },
    plugins: [
      vue(),
      Unocss(),

      Components({
        resolvers: [AntDesignVueResolver()],
      }),

      // * 替换index.html内容
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE, //替换 <%- title %>内容
          },
        },
      }),

      // * 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),

      // * name 可以写在 script 标签上
      VueSetupExtend(),

      // * 压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),

      // * 生成包预览
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption,
    ],
    esbuild: { pure: [pure_console, pure_debugger].filter((e) => e) },
    build: {
      outDir: env.VITE_BUILD_OUTPUT,
      minify: "esbuild",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            arcoblue: "255,0 ,255",
          },
          // charset: false,
          // javascriptEnabled: true,
        },
      },
    },
  };
});
