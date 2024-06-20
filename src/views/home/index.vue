<template>
  <g-container>
    <el-button type="primary" @click="showBigData">大数据</el-button>
  </g-container>
</template>

<script>
export default {
  methods: {
    showBigData() {
      this.$router.push("/bigDataView");
    },
  },
};
</script>

<style lang="scss" scoped></style>
