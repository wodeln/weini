import wx from "weixin-js-sdk";
import { post } from "@/api/api.js";
import Message from "@/plugins/message-box";

/**
 * 初始化 微信分享 配置
 * @author jsonleex <jsonlseex@163.com>
 */
const __JsApiList = [
  "checkJsApi",
  "onMenuShareQQ",
  "onMenuShareWeibo",
  "onMenuShareTimeline",
  "onMenuShareAppMessage"
];

export default (url, options) => {
  if (!url) throw new Error("微信分享: 参数URL不能为空");
  post(`socialite/wxconfig`, { url }).then(
    ({ data: { timestamp, signature, appid, noncestr } }) => {
      const wxconfig = {
        debug: false,
        timestamp,
        signature,
        appId: appid,
        nonceStr: noncestr,
        jsApiList: __JsApiList
      };
      const shareObj = {
        imgUrl: "", // 分享图标
        desc: "ThinkSNS+", // 分享描述
        title: "ThinkSNS+", // 分享标题
        type: "link", //分享类型  [music, video, link]
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空,
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 默认当前路径,
        /**
         * 分享成功后的回调
         * @author jsonleex <jsonlseex@163.com>
         */
        success: () => {
          Message.success("分享成功");
        },
        /**
         * 取消时的回调
         * @author jsonleex <jsonlseex@163.com>
         */
        cancel: () => {
          Message.info("取消分享");
        }
      };

      options = Object.assign(shareObj, options);

      wx.config(wxconfig);
      wx.ready(() => {
        wx.onMenuShareQQ(options);
        wx.onMenuShareWeibo(options);
        wx.onMenuShareTimeline(options);
        wx.onMenuShareAppMessage(options);
      });
      wx.error(res => {
        console.warn(res);
      });
    },
    err => {
      console.warn(err);
      throw new Error("微信分享: 获取微信配置信息失败");
    }
  );
};
