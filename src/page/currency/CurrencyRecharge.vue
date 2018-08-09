<template>
  <div class="p-currency-recharge">

    <common-header class="header">
      充值积分
      <router-link
        slot="right"
        to="/currency/detail">
        充值记录
      </router-link>
    </common-header>

    <section class="m-currency-panel">
      <h3>充值比率</h3>
      <p>1.0元=100.0积分</p>
    </section>

    <main class="m-box-model m-aln-center m-justify-center">
      <div class="m-box-model m-lim-width m-main">
        <div class="m-pinned-amount-btns">
          <p class="m-pinned-amount-label">选择充值金额</p>
          <div class="buttons">
            <button
              v-for="item in items"
              :key="item"
              :class="{ active: ~~amount === ~~item && !customAmount }"
              class="m-pinned-amount-btn"
              @click="chooseDefaultAmount(item)">{{ ~~item.toFixed(2) }}</button>
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

      <footer>
        <p @click="popupRule">
          <v-icon
            style="vertical-align: bottom;"
            type="wallet-alert-circle"/>
          用户充值协议
        </p>
      </footer>

      <popup-dialog
        ref="dialog"
        title="用户充值协议">
        <p v-html="rule"/>
      </popup-dialog>

    </main>
  </div>
</template>

<script>
import bus from "@/bus";
import { mapState } from "vuex";
import PopupDialog from "@/components/PopupDialog.vue";

export default {
  name: "CurrencyRecharge",
  components: { PopupDialog },
  data() {
    return {
      customAmount: null,
      amount: 0,
      disabled: true,
      loading: false
    };
  },
  computed: {
    ...mapState({
      currency: "currency"
    }),
    items() {
      return this.currency.recharge.items;
    },
    rule() {
      const rule = this.currency.recharge.rule || "";
      return rule.replace(/\n/g, "<br>");
    }
  },
  mounted() {
    if (!this.items.length) this.$store.dispatch("currency/getCurrencyInfo");
  },
  methods: {
    chooseDefaultAmount(amount) {
      this.customAmount && (this.customAmount = null);
      this.amount = amount;
    },
    selectRechargeType() {
      const actions = [];
      bus.$emit("actionSheet", actions, "取消", "当前未支持任何充值方式");
    },
    handleOk() {},
    popupRule() {
      this.$refs.dialog.show();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./currency.less";

.p-currency-recharge {
  .m-currency-panel p {
    font-size: 60px;
  }
  .m-pinned-amount-btns {
    padding-bottom: 0;
    .buttons {
      display: flex;
      flex-wrap: wrap;

      > button {
        margin: 0 20px 30px;
        width: calc(~"33% - 40px");
      }
    }
  }
  .m-entry {
    width: 100%;
    padding: 0 20px;
    background-color: #fff;
    margin-top: 20px;
  }
}
</style>
