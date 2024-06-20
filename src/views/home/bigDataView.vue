<template>
  <div class="echart-container">
    <router-link to="/home">back</router-link>
    <el-button type="primary" @click="handleCHangeTheme">换肤</el-button>
    <el-button type="primary" @click="changeData">数据改变动画</el-button>
    <div>
      <!--返回图标 -->
    </div>
    <Bar type="1" :theme="theme" :customeOptions="options" ref="barChart" />
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
      options: {},
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
    changeData() {
      this.options = {
        animationDuration(arg) {
          console.log("🚀 ~ animationDuration ~ arg:", arg);
          return 5000;
        },
        yAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "裙子"],
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [20, 10, 16, 6, 10, 20, 30],
          },
        ],
      };
      this.$refs.barChart.updateBarchart(this.options);
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
