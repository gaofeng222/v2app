<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px">左边导航</el-aside>
      <el-container>
        <el-header>
          <Heador />
        </el-header>
        <el-main>
          <AppMain />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { AppMain, Heador } from "./components";
export default {
  components: { AppMain, Heador },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-main {
    height: calc(100% - 70px);
  }
}
</style>