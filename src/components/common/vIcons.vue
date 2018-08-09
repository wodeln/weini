<template>
  <i
    ref="icon"
    :style="{fill: wrapColor}"
    class="v-icon"
    @click="onClick">
    <svg
      :color="color"
      width="100%"
      height="100%">
      <use
        :xlink:href="`#${type}`"
        xmlns:xlink="http://www.w3.org/1999/xlink"/>
    </svg>
  </i>
</template>

<script>
export default {
  name: "VIcon",
  props: {
    type: { type: [String], required: true },
    color: { type: String, default: "" }
  },
  data() {
    return {
      wrapColor: this.color
    };
  },
  mounted() {
    if (!this.color) {
      const el = this.$refs.icon;
      this.wrapColor = window.getComputedStyle(el, null).color;
    }
  },
  methods: {
    onClick(args) {
      this.$emit("click", args);
    }
  }
};
</script>

<style lang="less" scoped>
.v-icon {
  display: inline-flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
