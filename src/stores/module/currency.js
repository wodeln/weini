import * as api from "@/api/currency";

const state = {
  rule: "", // 充值提现规则
  recharge: {
    rule: "",
    ratio: 1,
    type: [], // 充值类型
    items: [], // 充值建议金额
    min: 100,
    max: 10000000
  },
  cash: {
    rule: "",
    min: 100,
    max: 10000000
  }
};

const getters = {
  rechargeItems: state => {
    return state.recharge.items.map(item => item / 100);
  }
};

const TYPES = {
  UPDATE_CURRENCY: "UPDATE_CURRENCY"
};

const mutations = {
  [TYPES.UPDATE_CURRENCY](state, payload) {
    Object.assign(state, payload);
  }
};

const actions = {
  /**
   * 获取基础配置信息
   * @author mutoe <mutoe@foxmail.com>
   */
  async getCurrencyInfo({ commit }) {
    const { data } = await api.getCurrencyInfo();
    commit(TYPES.UPDATE_CURRENCY, {
      rule: data.rule,
      recharge: {
        rule: data["recharge-rule"],
        type: data["recharge-type"],
        ratio: data["recharge-ratio"],
        items: data["recharge-options"].split(",").map(v => ~~v),
        min: data["recharge-min"],
        max: data["recharge-max"]
      },
      cash: {
        rule: data["cash-rule"],
        min: data["cash-min"],
        max: data["cash-max"]
      }
    });
  },
  /**
   * 获取积分流水
   * @author mutoe <mutoe@foxmail.com>
   */
  async getCurrencyOrders(state, payload) {
    const { data = [] } = await api.getCurrencyOrders(payload);
    return data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
