<template>
  <el-row align="center" type="flex">
    <el-col class="login-left" :span="12" align="center" justify="center">
      <div class="login-logo"></div>
    </el-col>
    <el-col class="login-right" :span="12">
      <h2>火星计划CMS后台管理系统</h2>
      <div class="login-right--container">
        <h3>登录</h3>
        <el-form
          ref="loginForm"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
          @keyup.enter.native="login"
          size="medium"
        >
          <el-form-item label="账户：" prop="username">
            <el-input v-model.trim="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model.trim="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="login-tools">
              <el-checkbox v-model="ruleForm.checked">记住我</el-checkbox>
              <el-button type="text">忘记密码</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" style="width: 100%;" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
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
      ruleForm: { username: "", password: "", checked: false },
    };
  },
  methods: {
    ...mapActions("user", {
      loginHandler: "loginHandler",
    }),
    async login() {
      await this.$refs.loginForm.validate();
      const data = await this.loginHandler();
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row,
.el-col {
  height: 100%;
}
.login-left {
  .login-logo {
    height: 100%;
    background: url("@/assets/images/login-box-bg3.svg") no-repeat center / 80%;
  }
}
.login-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  &--container {
    background: #fff;
    width: 600px;
    min-height: 400px;
    padding: 20px;
    box-shadow: 2px 2px 50px #ccc;
    margin-top: 20px;
    h3 {
      font-size: 24px;
      margin: 20px 0;
      text-align: left;
    }
  }
  .login-tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
