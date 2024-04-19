<template>
  <el-row>
    <el-col :span="12" align="center">后台管理系统</el-col>
    <el-col :span="6" :offset="2">
      <el-form ref="loginForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item>
          <h3>登录</h3>
        </el-form-item>
        <el-form-item label="账户：" prop="username">
          <el-input v-model.trim="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" style="width: 100%;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
      ruleForm: { username: "", password: "" },
    };
  },
  methods: {
    ...mapActions(["loginHandler"]),
    async login() {
      await this.$refs.loginForm.validate();
      const data = await this.loginHandler();
      console.log("🚀 ~ login ~ data:", data);
      this.$router.replace("/");
    },
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
