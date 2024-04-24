<template>
  <div class="g-header">
    <div class="header-left">
      <div @click="toggleHandler">
        <i class="el-icon-s-unfold" v-if="isCollapse" />
        <i class="el-icon-s-fold" v-else />
      </div>
    </div>
    <div class="header-right">
      <el-avatar :src="avatarUrl"></el-avatar>
      <el-dropdown @command="handlerClick">
        <span class="el-dropdown-link">
          欢迎回来,{{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      avatarUrl:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'userInfo']),
    username() {
      console.log('🚀 ~ username ~ this.userInfo:', this.userInfo)
      return this.userInfo.name
    }
  },
  methods: {
    ...mapActions({
      logoutHandle: 'user/logoutHandle',
      toggleSiderBar: 'setting/toggleSiderBar'
    }),
    async handlerClick(type) {
      if (type === 'logout') {
        const status = await this.logoutHandle()
        if (status) {
          // this.$router.replace("/");
          location.reload()
        }
      }
    },
    toggleHandler() {
      this.toggleSiderBar()
    }
  }
}
</script>

<style lang="scss" scoped>
.g-header {
  background: #fff;
  height: 70px;
  line-height: 70px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  .header-left {
    i {
      cursor: pointer;
      padding: 10px;
      font-size: 18px;
    }
  }
  .header-right {
    display: flex;
    place-items: center;
  }
}
</style>
