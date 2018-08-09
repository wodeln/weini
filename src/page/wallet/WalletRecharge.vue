<template>
  <div class="m-box-model p-wallet-recharge m-pos-f">

    <common-header>充值</common-header>

    <main class="m-box-model m-aln-center m-justify-center">
      <div class="m-box-model m-lim-width m-main">
        <div class="m-pinned-amount-btns">
          <p class="m-pinned-amount-label">选择充值金额</p>
          <div class="m-box m-aln-center ">
            <button
              v-for="item in rechargeItems"
              :key="item"
              :style="{ width: `${1 / rechargeItems.length * 100}%` }"
              :class="{ active: ~~amount === ~~item && !customAmount }"
              class="m-pinned-amount-btn"
              @click="chooseDefaultAmount(item)">{{ item.toFixed(2) }}</button>
          </div>
        </div>
        <div class="m-box m-aln-center m-justify-bet m-bb1 m-bt1 m-pinned-row plr20 m-pinned-amount-customize">
          <span>自定义金额</span>
          <div class="m-box m-aln-center">
            <input
              v-model.number="customAmount"
              type="number"
              class="m-text-r"
              pattern="[0-9]*"
              placeholder="输入金额"
              oninput="value=value.slice(0,8)">
            <span>元</span>
          </div>
        </div>
      </div>

      <div
        class="m-entry"
        @click="selectRechargeType">
        <span class="m-text-box m-flex-grow1">选择充值方式</span>
        <svg class="m-style-svg m-svg-def m-entry-append">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#base-arrow-r"/>
        </svg>
      </div>

      <div
        class="plr20 m-lim-width"
        style="margin-top: 0.6rem">
        <button
          :disabled="disabled || loading"
          class="m-long-btn m-signin-btn"
          @click="handleOk">
          <svg
            v-if="loading"
            class="m-style-svg m-svg-def">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#base-loading"/>
          </svg>
          <span v-else>确定</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import bus from "@/bus";
import { mapGetters, mapState } from "vuex";

const supportTypes = [
  { key: "alipay_wap", title: "支付宝支付" },
  { key: "wx_wap", title: "微信支付" }
];

export default {
  name: "WalletRecharge",
  data() {
    return {
      customAmount: null,
      amount: 0,
      disabled: true,
      loading: false
    };
  },
  computed: {
    ...mapState({ rechargeType: state => state.wallet.type }),
    ...mapGetters({ rechargeItems: "wallet/rechargeItems" })
  },
  mounted() {
    if (!this.rechargeItems.length)
      this.$store.dispatch("wallet/getWalletInfo");
  },
  methods: {
    chooseDefaultAmount(amount) {
      this.customAmount && (this.customAmount = null);
      this.amount = amount;
    },
    selectRechargeType() {
      const actions = [];
      supportTypes.forEach(item => {
        if (this.rechargeType.includes(item.key)) {
          actions.push({
            text: item.title,
            method: () => {
              console.log(item.title);
            }
          });
        }
      });
      bus.$emit(
        "actionSheet",
        actions,
        "取消",
        actions.length ? undefined : "当前未支持任何充值方式"
      );
    },
    handleOk() {}
  }
};
</script>

<style lang="less" scoped>
.m-entry {
  width: 100%;
  padding: 0 20px;
  background-color: #fff;
  margin-top: 20px;
}
</style>
