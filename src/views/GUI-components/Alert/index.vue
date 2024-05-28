<template>
  <g-container>
    <GfAside width="600px">
      <GfAlert type="error" title="自定义警告提醒" description="这是一段自定义描述内容" showIcon @close="handleClose"></GfAlert>
      <el-alert type="info" title="普通的信息提示" showIcon></el-alert>
      <el-alert type="success" title="成功" description="这是一段自定义描述内容" showIcon></el-alert>
    </GfAside>
    {{ username }}
    <gf-input v-model="username" size="24px" tabindex="3" placeholder="请输入内容" clearable />
    <gf-input size="24px" disabled showClear />
    <gf-input size="24px" showPassword tabindex="1" />
    <div class="demo-input">
      <gf-input size="24px" clearable v-model="elVal" showWordLimit maxlength="24" />
    </div>
    <gf-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="inputDate"></gf-input>
    <gf-input type="textarea" v-model="title" showWordLimit maxlength="10" />
    <el-input v-model="elVal" clearable></el-input>
    <div>
      <el-button type="primary" @click="showType = !showType">toggle</el-button>
      <gf-input v-if="showType" type="textarea" v-model="content" showWordLimit maxlength="10" />
      <gf-input v-else size="24px" v-model="content" />
    </div>
    <el-input type="textarea" v-model="elVal" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
    <gf-input type="textarea" v-model="title" :autosize="{ minRows: 6, maxRows: 8}" />
  </g-container>
</template>

<script>
export default {
  data() {
    return {
      title: "吞吞吐吐吞吞吐吐拖拖沓沓",
      username: "",
      inputDate: "",
      elVal: "",
      content: "",
      showType: true,
    };
  },
  methods: {
    handleClose() {
      alert("我被关闭了");
    },
  },
};
</script>

<style lang="scss">
.demo-input {
  .el-input {
    width: 180px;
  }
}
</style>