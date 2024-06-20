<template>
  <div ref="bar-box" id="bar"></div>
</template>

<script>
import * as echarts from "echarts";
import customer from "../theme/custome";
export default {
  props: {
    type: {
      type: String,
      default: "1",
    },
    theme: {
      type: String,
      default: "light",
    },
  },
  watch: {
    theme: {
      handler(val) {
        console.log("theme changed", val);
        //销毁实例重新创建，才能生效
        this.myChart.dispose();
        this.initChart();
      },
    },
  },
  computed: {
    computedTheme() {
      return this.theme === "light" ? customer : "dark";
    },
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  methods: {
    async initChart() {
      this.myChart = echarts.init(this.$refs["bar-box"], this.computedTheme);
      this.myChart.showLoading();
      const data = await this.option(this.type);
      this.myChart.setOption(data);
      this.myChart.hideLoading();
    },
    option(type) {
      //延时3s加载数据
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            title: {
              text: "ECharts 入门示例" + type,
            },
            tooltip: {},
            xAxis: {
              type: type == 1 ? "value" : "category",
            },
            yAxis: {
              type: type == 1 ? "category" : "value",
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            },
            series: [
              {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
              },
            ],
          });
        }, 3000);
      });
    },
  },
  beforeDestroy() {
    this.myChart.dispose();
  },
};
</script>

<style lang="scss" scoped>
#bar {
  width: 100%;
  height: 400px;
}
</style>