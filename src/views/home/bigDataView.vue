<template>
  <div class="echart-container">
    <router-link to="/home">back</router-link>
    {{ theme }}
    <el-button type="primary" @click="handleCHangeTheme">换肤</el-button>
    <div>
      <!--返回图标 -->
    </div>
    <Bar type="1" :theme="theme" />
    <Bar type="2" :theme="theme" />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <Bar type="1" v-if="activeName == 'first'" :theme="theme" />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <Bar type="2" v-if="activeName == 'second'" :theme="theme" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Bar from "./comps/bar.vue";
export default {
  data() {
    return {
      activeName: "first",
      theme: "light",
    };
  },
  components: {
    Bar,
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCHangeTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
};
</script>
<style lang="scss" scoped>
.echart-container {
  background: #fff;
  overflow: auto;
  height: 100%;
  padding: 20px;
}
</style>
