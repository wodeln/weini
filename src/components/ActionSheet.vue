<template>
  <div @touchmove.prevent>
    <transition name="toast">
      <div
        v-if="show"
        class="m-pop-box"
        @click="cancel"/>
    </transition>
    <transition name="pop">
      <div
        v-if="show"
        class="m-acbtn-box">
        <h2
          v-if="tips"
          class="m-box m-text-box m-aln-center m-justify-center m-main m-acbtn-tips m-bb1">{{ tips }}</h2>
        <ul class="m-acbtn-list">
          <li
            v-for="(btn, index) in lists"
            v-if="btn.text"
            :key="btn.text"
            :style="btn.style"
            class="m-acbtn"
            @click="btn.methods(btn, index)">
            <a href="javascript:;">{{ btn.text }}</a>
          </li>
        </ul>
        <ul class="m-acbtn-list">
          <li
            class="m-acbtn"
            @click="cancel"><a href="javascript:;">{{ cancelBtn }}</a></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * @typedef {Object} ActionButton
 * @property {string} text - 按钮的文字
 * @property {Function} method - 按钮的回调方法
 * @property {Object} style - 按钮的样式
 */

import bus from "@/bus.js";
export default {
  name: "ActionSheet",
  data() {
    return {
      lists: [],
      tips: "",
      show: false,
      scrollTop: 0,
      cancelBtn: "取消"
    };
  },
  created: function() {
    /**
     * Call actionSheet
     * @author jsonleex <jsonlseex@163.com>
     * @param {ActionButton[]} btnLists [{ text: "确定", method: () => {} }, ...]
     * @param {string} cancelTxt "取消"
     * @param {string} tips 提示文字
     */
    bus.$on("actionSheet", (btnLists, cancelTxt, tips = null) => {
      this.tips = tips;
      this.call(btnLists, cancelTxt);
    });
  },
  methods: {
    call(btnLists, cancelTxt) {
      this.cancelBtn = cancelTxt || this.cancelBtn;
      if (btnLists.length > 0) {
        this.lists = btnLists.map(btn => {
          btn.method &&
            (btn.methods = (btn, index) => {
              btn.method(btn, index);
              this.show = false;
              this.scrollable = true;
            });
          return btn;
        });
      }
      this.show = true;
      this.scrollable = false;
    },
    cancel() {
      this.lists = [];
      this.tips = null;
      this.show = false;
      this.scrollable = true;
    }
  }
};
</script>

<style lang="less" scoped>
.m-acbtn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @gray-bg;
  .m-acbtn-tips {
    padding: 20px 30px;
    text-align: center;
    font-size: 28px;
  }
}

.m-acbtn-list {
  background-color: #fff;
  display: block;
  & + & {
    margin-top: 15px;
  }
  .m-acbtn {
    color: @text-color1;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border-bottom: 1px solid @border-color;
  }
  a {
    color: inherit;
  }
}
</style>
