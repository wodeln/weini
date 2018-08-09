<template>
  <header class="c-common-header">
    <div class="left">
      <slot name="left">
        <v-icon
          type="base-back"
          @click="goBack"/>
      </slot>
    </div>
    <div class="title">
      <div class="title-wrap"><slot/></div>
    </div>
    <div class="right">
      <slot name="right"/>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader"
};
</script>

<style lang="less" scoped>
@header-height: 90px;

.c-common-header {
  display: flex;
  position: relative;
  bottom: initial;
  width: 100%;
  height: @header-height;
  max-width: 1080px;
  margin: 0 auto;
  justify-content: space-between;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #ededed;
  font-size: 32px;
  color: inherit;
  z-index: 10;

  .left,
  .right,
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left,
  .right {
    flex: none;
    width: fit-content;
    min-width: @header-height;
    padding: 0 0.5em;
  }
  .title {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    width: 12em;
    margin: 0 auto;
    text-align: center;

    > .title-wrap {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
</style>
