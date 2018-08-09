<template>
  <div class="p-post-text m-box-model">
    <header class="m-box m-flex-shrink0 m-flex-grow0 m-justify-bet m-aln-center m-main m-bb1 m-head-top m-pos-f">
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0">
        <a
          href="javascript:;"
          @click="beforeGoBack">取消</a>
      </div>
      <div class="m-box-model m-flex-grow1 m-aln-center m-flex-base0 m-head-top-title">
        <span>私信TO {{this.$store.getters.getUserById(this.$route.params.userID, true).name}}</span>
      </div>
      <div class="m-box m-flex-grow1 m-aln-center m-flex-base0 m-justify-end">
        <svg
          v-if="loading"
          class="m-style-svg m-svg-def">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#base-loading"/>
        </svg>
        <a
          v-else
          :class="{ disabled }"
          class="m-send-btn"
          @click.prevent.stop="beforePost">发送</a>
      </div>
    </header>
    <main
      class="m-flex-grow1 m-flex-shrink1 m-reles-con"
      style="padding-top: 0.9rem"
      @click.self="areaFocus">
      <content-text
        ref="contentText"
        :rows="8"
        :maxlength="255"
        class="m-reles-txt-wrap" />
    </main>
  </div>
</template>
<script>
import bus from "@/bus.js";
import { mapGetters } from "vuex";
import ContentText from "./ContentText.vue";
export default {
  name: "PostText",
  components: {
    ContentText
  },
  data() {
    return {
      loading: false,
      contentText: "",
      curpos: 0,
      scrollHeight: 0,
      pinned: false,

      amount: 0,
      customAmount: null,

      appBackgroundColor: null
    };
  },
  computed: {
    ...mapGetters(["compose"]),
    currency_name() {
      return (
        (((this.$store.state.CONFIG || {}).site || {}).currency_name || {})
          .name || "积分"
      );
    },
    paycontrol() {
      return this.$store.state.CONFIG.feed.paycontrol;
    },
    disabled() {
      return !(this.compose.length > 0);
    },
    items() {
      return this.$store.state.CONFIG.feed.items || [];
    },
    limit() {
      return this.$store.state.CONFIG.feed.limit || 50;
    },
    to_user(){
        return
    }
  },
  watch: {
    customAmount(val) {
      if (val) this.amount = ~~val;
    }
  },
  mounted() {
    const app = document.querySelector("#app");
    this.appBackgroundColor = app.style.backgroundColor;
    app.style.backgroundColor = "#fff";
  },
  destroyed() {
    document.querySelector(
      "#app"
    ).style.backgroundColor = this.appBackgroundColor;
  },

  methods: {
    beforeGoBack() {
      this.contentText.length > 0
        ? bus.$emit(
            "actionSheet",
            [
              {
                text: "确定",
                method: () => {
                  this.goBack();
                  this.setContentText("");
                }
              }
            ],
            "取消",
            "你还有没有发布的内容,是否放弃发布?"
          )
        : this.goBack();
    },
    areaFocus() {
      this.$refs.contentText.areaFocus();
    },
    chooseDefaultAmount(amount) {
      this.customAmount = null;
      this.amount = amount;
    },
    beforePost() {
      this.postText();
    },
    setContentText(txt) {
      this.$refs.contentText.setContentText(txt);
    },
    successCallback() {
      this.$refs.contentText.clean();
      this.$router.push("/feeds?type=new");
    },
    postText() {
      if (this.loading) return;
      this.loading = true;
      this.$http
        .post(
          "private",
          {
            message: this.compose,
            from: 2,
            to: 2,
            message_mark:
              new Date().valueOf() + "" + this.$store.state.CURRENTUSER.id,
          },
          {
            validateStatus: s => s === 201
          }
        )
        .then(({ data }) => {
          this.$Message.success(data);
          this.successCallback();
          this.loading = false;
        })
        .catch(error => {
          this.$Message.error("发送失败，请稍后重试");
          console.warn(error);
          this.loading = false;
        });
    }
  }
};
</script>
