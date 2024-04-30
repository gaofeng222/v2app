<template>
  <el-container :class="classObj" class="app-wrapper">
    <el-aside :width="!isCollapse ? '210px' : '50px'">
      <SiderBar class="sidebar-container" :style="{ width: !isCollapse ? '210px' : '50px' }" />
    </el-aside>
    <el-container>
      <el-header>
        <Heador />
      </el-header>
      <el-main class="main-container">
        <SettingBtn @showPannel="handleShowPannel" />
        <SettingPannel v-if="showPannel" :showPannel.sync="showPannel" />
        <AppMain />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import { AppMain, Heador, Footer, SiderBar } from "./components";
import SettingBtn from "@/components/setting";
import SettingPannel from "@/components/SettingPannel";
import { mapGetters } from "vuex";
export default {
  components: { AppMain, Heador, Footer, SiderBar, SettingBtn, SettingPannel },
  data() {
    return { showPannel: false };
  },
  computed: {
    ...mapGetters(["isCollapse"]),
    classObj() {
      return {
        hideSidebar: this.isCollapse,
        openSidebar: !this.isCollapse,
      };
    },
  },
  methods: {
    handleShowPannel() {
      this.showPannel = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-main {
  height: calc(100% - 70px);
  position: relative;
}
.el-footer {
  height: 40px !important;
}
</style>
