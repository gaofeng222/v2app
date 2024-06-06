<template>
  <g-container>
    <gf-drawer
      :visible.sync="drawer1"
      :before-close="handleClose1"
      wrapperClosable
      appendToBody
      :title="title"
      :openDelay="3000"
      modalAppendToBody
    >
      <div>我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!</div>
    </gf-drawer>
    <el-button type="primary" @click="showDrawer1">showDrawer1</el-button>
    <el-button type="primary" @click="showDrawer">showDrawer</el-button>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      wrapperClosable
      @open="handleOpen"
      appendToBody
      @opened="handleOpened"
      :openDelay="3000"
      modalAppendToBody
    >
      <div>我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!我来啦!</div>
    </el-drawer>
  </g-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      drawer1: false,
      title: "弹窗标题",
    };
  },
  methods: {
    showDrawer1() {
      this.drawer1 = !this.drawer1;
    },
    showDrawer() {
      this.drawer = true;
    },
    handleClose() {
      this.drawer = false;
    },
    handleClose1() {
      this.drawer1 = false;
    },
    handleOpen() {
      alert("handleOpen");
    },
    handleOpened() {
      alert("handleOpened");
    },
  },
};
</script>

<style>
</style>