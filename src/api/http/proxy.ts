export type ProxyUrl = string;

export interface Proxy {
  api: ProxyUrl;
  target: string;
}

// 代理配置
export const proxyList: Proxy[] = [
  {
    api: "/local",
    target: "http://localhost:3000",
  },
];

// 生成vite配置 代理对象
const _proxy: any = {};
for (const item of proxyList) {
  _proxy[item.api] = {
    target: item.target,
    changeOrigin: true,
    rewrite: (url: string) => url.replace(item.api, ""),
  };
}
export const proxy = _proxy;

export const isProxyUrl = (url: string): boolean =>
  proxyList.some((proxy: Proxy) => url.includes(proxy.api));
