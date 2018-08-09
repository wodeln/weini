/**
 * 定位
 */
function switchError(error) {
  let message = "未知错误";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = "定位失败，系统拒绝了定位请求";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "定位失败，当前位置信息不可用";
      break;
    case error.TIMEOUT:
      message = "定位超时，请手动选择城市";
      break;
    case error.UNKNOWN_ERROR:
      message = "未知错误";
      break;
  }

  return message;
}

export default {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      const AMap = window.AMap;
      if (AMap) {
        /***************************************
        由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级你的站点到HTTPS。
        ***************************************/
        //加载地图，调用浏览器定位服务
        const map = new AMap.Map("gd_map");
        map.plugin("AMap.Geolocation", () => {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000 ,//超过10秒后停止定位，默认：无穷大
            extensions:"all"
          });

          geolocation.getCurrentPosition();
          // geolocation.getCityInfo();

          //返回定位信息
          AMap.event.addListener(geolocation, "complete", resolve);
          // 定位失败
          AMap.event.addListener(geolocation, "error", err => {
            reject({ message: switchError(err) });
          });
        });
      } else {
        reject(new Error("请配置定位插件"));
      }
    });
  }
};