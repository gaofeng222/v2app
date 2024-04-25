<template>
  <g-container>
    <h2>keep-alive</h2>
    <el-form inline>
      <el-form-item label="账户：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="form.passwword" type="password"></el-input>
      </el-form-item>
    </el-form>
  </g-container>
</template>

<script>
export default {
  name: 'KeepAliveTest',
  data() {
    return {
      form: {
        name: '',
        passwword: ''
      }
    }
  },

  mounted() {},

  methods: {}
}
</script>
