<template lang="html">
  <div class="p-currency">

    <common-header class="header">
      我的积分
      <router-link
        slot="right"
        to="/currency/journal-detail">
        明细
      </router-link>
    </common-header>

    <section class="m-currency-panel">
      <h3>当前积分</h3>
      <p>{{ user.currency.sum || 0 }}</p>
    </section>

    <ul class="m-box-model m-entry-group padding">
      <router-link
        to="/currency/recharge"
        tag="li"
        class="m-entry">
        <v-icon
          class="m-entry-prepend"
          type="wallet-recharge"/>
        <span class="m-text-box m-flex-grow1">充值积分</span>
        <v-icon
          class="m-entry-append"
          type="base-arrow-r"/>
      </router-link>
      <router-link
        to="/currency/withdraw"
        tag="li"
        class="m-entry">
        <v-icon
          class="m-entry-prepend"
          type="wallet-withdraw"/>
        <span class="m-text-box m-flex-grow1">提取积分</span>
        <v-icon
          class="m-entry-append"
          type="base-arrow-r"/>
      </router-link>
    </ul>

    <detail-ad type="currency"/>

    <footer>
      <p @click="showRule">
        <v-icon
          style="vertical-align: bottom;"
          type="wallet-alert-circle"/>
        积分规则
      </p>
    </footer>

    <popup-dialog
      ref="dialog"
      title="积分规则">
      <p v-html="rule"/>
    </popup-dialog>

  </div>
</template>

<script>
import { mapState } from "vuex";
import PopupDialog from "@/components/PopupDialog.vue";
import DetailAd from "@/components/advertisement/DetailAd.vue";

export default {
  name: "Currency",
  components: { PopupDialog, DetailAd },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: "CURRENTUSER",
      currency: "currency"
    }),
    rule() {
      return this.currency.rule.replace(/\n/g, "<br>");
    }
  },
  mounted() {
    this.$store.dispatch("currency/getCurrencyInfo");
  },
  methods: {
    showRule() {
      this.$refs.dialog.show();
    }
  }
};
</script>

<style lang="less" scoped>
@import "./currency.less";
</style>
