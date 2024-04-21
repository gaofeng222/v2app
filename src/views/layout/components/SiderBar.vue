<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo :collapse="isCollapse" v-if="showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenus"
        class="el-menu-vertical-demo"
        :background-color="variables.menuBg"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <Menu
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/assets/styles/variables.module.scss'
import Menu from './menu'
import Logo from './Logo.vue'
export default {
  components: { Menu, Logo },
  computed: {
    ...mapGetters(['isCollapse', 'showLogo', 'permission_routes']),
    activeMenus() {
      const route = this.$route
      const { meta, path } = route
      console.log('🚀 ~ activeMenus ~ route:', route)
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border-right: 0;
}
</style>
