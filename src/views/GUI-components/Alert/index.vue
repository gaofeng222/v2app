<template>
  <g-container>
    <GfAlert type="error" title="自定义警告提醒" description="这是一段自定义描述内容" showIcon @close="handleClose"></GfAlert>
    <el-alert type="info" title="普通的信息提示" showIcon></el-alert>
    <el-alert type="success" title="成功" description="这是一段自定义描述内容" showIcon></el-alert>
  </g-container>
</template>

<script>
export default {
  methods: {
    handleClose() {
      alert("我被关闭了");
    },
  },
};
</script>

<style>
</style>