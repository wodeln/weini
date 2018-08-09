import axios from "axios";
import localEvent from "@/plugins/lstore/lstore.js";
import router from "./routers/";
import Message from "@/plugins/message";
import { plusMessageAnalyze } from "@/filters";
/**
 * 添加请求拦截器
 *     @author jsonleex <jsonlseex@163.com>
 */
let TOKEN;
axios.interceptors.request.use(
  config => {
    TOKEN = localEvent.getData("H5_ACCESS_TOKEN");
    if (TOKEN) {
      config.headers.Authorization = TOKEN;
    }
    return config;
  },
  error => {
    console.error("错误的传参", "fail");
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 *     @author jsonleex <jsonlseex@163.com>
 */
axios.interceptors.response.use(
  res => res,
  /* 错误处理 */
  error => {
    const callback = () => {
      router.push({
        path: "/signin",
        query: { redirect: router.currentRoute.fullPath }
      });
    };
    const setTimeoutCallback = () => {
      setTimeout(callback, 500);
    };
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          localEvent.removeData("CURRENTUSER");
          setTimeoutCallback();
          Message.error(TOKEN ? "登录失效, 请重新登录" : "你还没有登录");
          break;
        case 500:
          throw new Error("服务器错误");
        default:
          Message.error(plusMessageAnalyze(data));
          break;
      }
    } else if (error.request) {
      console.warn(error.request);
    } else {
      console.warn("Error", error.message);
    }

    return Promise.reject(error);
  }
);

axios.defaults.baseURL = "/api/v2";
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = `${process.env.VUE_APP_API_HOST}/api/${
    process.env.VUE_APP_API_VERSION
  }`;
}

export default axios;
