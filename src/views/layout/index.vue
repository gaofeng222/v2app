<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside :width="isCollapse ? '200px':'60px'">
        <SiderBar />
      </el-aside>
      <el-container>
        <Heador />
        <el-main>
          <AppMain />
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { AppMain, Heador, Footer, SiderBar } from "./components";
import { mapGetters } from "vuex";
export default {
  components: { AppMain, Heador, Footer, SiderBar },
  data() {
    return {};
  },
  computed: { ...mapGetters(["isCollapse"]) },
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