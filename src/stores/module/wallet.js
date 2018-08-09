import * as api from "@/api/wallet";

const state = {
  list: [], // 充值纪录
  items: [], // 充值建议金额
  ratio: 100, // 充值比率
  type: [], // 充值类型
  rule: "" // 充值提现规则
};

const getters = {
  getWalletById: state => id => {
    return state.list.filter(wallet => wallet.id === id).pop() || {};
  },
  rechargeItems: state => {
    return state.items.map(item => item / 100);
  }
};

const TYPES = {
  UPDATE_WALLET: "UPDATE_WALLET"
};

const mutations = {
  [TYPES.UPDATE_WALLET](state, payload) {
    Object.assign(state, payload);
  }
};

const actions = {
  async getWalletOrders({ commit, state }, params) {
    let { data } = await api.getWalletOrders(params);
    if (params.after) data = [...state.list, ...data];
    commit(TYPES.UPDATE_WALLET, { list: data });
    return data || [];
  },
  async getWalletInfo({ commit }) {
    let {
      data: { labels: items, ratio, rule, recharge_type: type }
    } = await api.getWalletInfo();
    commit(TYPES.UPDATE_WALLET, { items, type, ratio, rule });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
