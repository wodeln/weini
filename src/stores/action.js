import Api from "@/api/api.js";
import * as bootApi from "@/api/bootstrappers.js";
import * as userApi from "@/api/user.js";
import * as groupApi from "@/api/group.js";

export default {
  /**
   * 获取启动信息
   * @author mutoe <mutoe@foxmail.com>
   */
  async BOOTSTRAPPERS({ commit }) {
    const promises = [bootApi.getBootstrappers(), bootApi.getAdvertiseType()];
    Promise.all(promises).then(res => {
      const [{ data: bootstrappers = {} }, { data: advertiseType = {} }] = res;
      commit("BOOTSTRAPPERS", bootstrappers);
      commit("ADVERTISEMENT", advertiseType);
    });
  },

  // 获取圈子分类数据
  async GET_GROUP_TYPES({ commit }) {
    const { data = [] } = await groupApi.getGroupCates();
    commit("SAVE_GROUP_CATES", data);
    return data;
  },

  // 获取用户验证信息
  FETCH_USER_VERIFY({ commit }) {
    return userApi.getUserVerifyInfo().then(({ data = {} }) => {
      commit("SAVE_USER_VERIFY", data);
      return data;
    });
  },

  // 注销登录
  SIGN_OUT({ commit }) {
    try {
      Api.post(`/auth/logout`);
      commit("SIGN_OUT");
    } catch (e) {
      console.warn(e);
    }
  },
  async refreshCurUserData({ state, commit }) {
    const localUser = state.CURRENTUSER;
    if (localUser && localUser.token) {
      const {
        data: { access_token: token }
      } = await Api.post("/auth/refresh");
      localUser.token = token;
    }
    commit("SAVE_CURRENTUSER", localUser);
  }
};
