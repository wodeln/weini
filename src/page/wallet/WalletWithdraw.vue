<template lang="html">
  <div class="p-wallet-withdraw">

    <common-header>
      提现
      <!-- <router-link
        slot="right"
        style="width: 4em;"
        to="/wallet/withdraw/detail">
        提现明细
      </router-link> -->
    </common-header>

    <main class="m-box-model m-aln-center m-justify-center">
      <div class="m-box-model m-lim-width m-main">
        <div class="m-box m-aln-center m-justify-bet m-bb1 m-bt1 m-pinned-row plr20 m-pinned-amount-customize">
          <span>提现金额</span>
          <div class="m-box m-aln-center">
            <input
              v-model.number="form.amount"
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
        @click="selectWithdrawType">
        <span class="m-text-box m-flex-grow1">选择提现方式</span>
        <v-icon type="base-arrow-r"/>
      </div>

      <div class="m-box-model m-lim-width m-main">
        <div class="m-box m-aln-center m-justify-bet m-bb1 m-bt1 m-pinned-row plr20 m-pinned-amount-customize">
          <span>提现账户</span>
          <div class="m-box m-aln-center">
            <input
              v-model="form.account"
              type="text"
              class="m-text-r"
              placeholder="输入提现账户">
          </div>
        </div>
      </div>

      <div
        class="plr20 m-lim-width"
        style="margin-top: 0.6rem">
        <button
          :disabled="disabled || loading"
          class="m-long-btn m-signin-btn"
          @click="handleOk">
          <v-icon
            v-if="loading"
            type="base-loading"/>
          <span v-else>确定</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import bus from "@/bus";

export default {
  name: "WalletWithdraw",
  data() {
    return {
      form: {
        amount: "",
        account: ""
      },
      disabled: true,
      loading: false
    };
  },
  methods: {
    handleOk() {},
    selectWithdrawType() {
      const actions = [];
      bus.$emit("actionSheet", actions, "取消", "当前未支持任何提现方式");
    }
  }
};
</script>

<style lang="less" scoped>
.m-entry {
  width: 100%;
  padding: 0 20px;
  background-color: #fff;
}
</style>
