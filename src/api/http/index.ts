import request from "./axios";
import Message from "./utils/message";
import { isProxyUrl } from "./proxy";

import { loginOut } from "@/hooks/auth";

const baseURL = import.meta.env.VITE_API_URL;

let baseApi = "";

/**
 * 设置请求根地址
 * @param api 根地址
 * @returns
 */
export const setBaseApi = (api: string) => (baseApi = api);

/**
 *
 * @param {string} url 请求路径
 * @param {string} method 请求方式
 * @param {object} params 请求参数
 * @param {string} word 请求描述关键字
 * @param {boolean} loading 是否请求中
 */
const handleRequest = (
  method: string,
  url: string,
  params?: any,
  word?: string,
  loading?: any
): Promise<any> => {
  if (loading?.value != undefined) loading.value = true;

  //可以在每个页面中设置请求根路径，以/结尾
  if (url[0] != "/") url = baseApi + url;

  //非代理api和绝对路径 加上根路径
  if (!isProxyUrl(url) && !url.includes("http")) url = baseURL + url;

  return new Promise((resolve, reject) => {
    request({
      url,
      method,
      // get与delete传参方式类似；post与put传参方式类似
      params: ["get", "delete"].includes(method) ? params : undefined,
      data: ["post", "put"].includes(method) ? params : undefined,
    })
      .then((result: any) => {
        resolve(result.result?.list ?? result.result ?? result);

        if (word) Message.success(word + "成功");
      })
      .catch((result) => {
        if (result.code === 401) loginOut();
        reject(result);
        if (word) Message.error(word + "失败");
      })
      .finally(() => {
        if (loading?.value) loading.value = false;
      });
  });
};

/**
 * * 供调用函数
 * * 以省去method参数
 */
const bindObj = {
  method: "get",
  request: function (...args: [string, any?, string?, any?]) {
    // console.log(args);
    return handleRequest(this.method, ...args);
  },
};

// export const get = bindObj.request.bind({ method: "get" });
// 简化：
const generateRequest = (method: string) => bindObj.request.bind({ method });

export const get = generateRequest("get");
export const post = generateRequest("post");
export const put = generateRequest("put");
export const del = generateRequest("delete");
