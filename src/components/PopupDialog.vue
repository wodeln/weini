<template>
  <div
    :class="{show: isShow}"
    class="c-popup-dialog">
    <div class="panel">
      <header v-if="title">
        {{ title }}
      </header>
      <main>
        <slot/>
      </main>
      <footer @click="onConfirm">
        {{ confirmText }}
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupDialog",
  props: {
    title: { type: String, default: "" },
    confirmText: { type: String, default: "知道了" }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    onConfirm() {
      this.$emit("confirm");
      this.hide();
    }
  }
};
</script>

<style lang="less" scoped>
.c-popup-dialog {
  display: flex;
  align-items: center;
  position: fixed;
  top: -80px;
  height: calc(~"100% + 200px");
  left: -100px;
  right: -100px;
  padding: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  z-index: -1;
  transition: 0.3s;

  &.show {
    z-index: 100;
    opacity: 1;
    top: -100px;
  }

  .panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 0 38px;
    max-height: 70%;
  }

  header {
    flex: none;
    padding: 38px 0;
  }

  main {
    flex: auto;
    overflow: auto;
    border: 1px solid #ededed;
    border-width: 1px 0;
    padding: 20px 0;
  }

  footer {
    flex: none;
    color: #59b6d7;
    text-align: center;
    width: 100%;
    padding: 38px 0;
  }
}
</style>
