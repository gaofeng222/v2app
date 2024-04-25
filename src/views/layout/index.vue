<template>
  <el-container :class="classObj" class="app-wrapper">
    <el-aside :width="!isCollapse ? '210px' : '50px'">
      <SiderBar
        class="sidebar-container"
        :style="{ width: !isCollapse ? '210px' : '50px' }"
      />
    </el-aside>
    <el-container>
      <el-header>
        <Heador />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import { AppMain, Heador, Footer, SiderBar } from './components'
import { mapGetters } from 'vuex'
export default {
  components: { AppMain, Heador, Footer, SiderBar },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isCollapse']),
    classObj() {
      return {
        hideSidebar: this.isCollapse,
        openSidebar: !this.isCollapse
      }
    }
  },
  created() {
    this.$notify({
      type: 'success',
      title: '温馨提示',
      message: '欢迎体验本系统，好用的话，请多多转发分享，谢谢O(∩_∩)O',
      position: 'bottom-right'
    })
  }
}
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
}
.el-footer {
  height: 40px !important;
}
</style>
