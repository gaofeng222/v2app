<template>
  <el-row>
    <el-col :span="12" align="center">后台管理系统</el-col>
    <el-col :span="6" offset="2">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item>
          <h3>登录</h3>
        </el-form-item>
        <el-form-item label="账户：" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: { username: "", password: "" },
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row,
.el-column {
  height: 100%;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>
