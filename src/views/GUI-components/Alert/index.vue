<template>
  <g-container>
    <GfAside width="600px">
      <GfAlert type="error" title="自定义警告提醒" description="这是一段自定义描述内容" showIcon @close="handleClose"></GfAlert>
      <el-alert type="info" title="普通的信息提示" showIcon></el-alert>
      <el-alert type="success" title="成功" description="这是一段自定义描述内容" showIcon></el-alert>
    </GfAside>
    <br />
    <br />
    <hr />
    <br />
    <br />
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
    <br />
    <br />
    <hr />
    <br />
    <br />
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
      :labelSuffix="'is a context'"
      status-icon
      inline
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

    <gf-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm1"
      label-width="auto"
      class="demo-ruleForm"
      :labelSuffix="'is a test'"
      status-icon
      inline
    >
      <gf-form-item label="活动名称" prop="name">
        <gf-input v-model="ruleForm.name"></gf-input>
      </gf-form-item>
      <gf-form-item label="场地" prop="position">
        <gf-input v-model="ruleForm.position"></gf-input>
      </gf-form-item>
      <gf-form-item>
        <el-button type="primary" @click="submit1">提交</el-button>
      </gf-form-item>
    </gf-form>
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
      ruleForm: {
        name: "",
        position: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        position: [
          { required: true, message: "请输入活动场地名称" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClose() {},
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        console.log("🚀 ~ this.$refs.ruleForm.validate ~ valid:", valid);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    submit1() {
      this.$refs.ruleForm1.validate((valid) => {
        console.log("🚀 ~ this.$refs.ruleForm.validate ~ valid:", valid);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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