<template>
  <div class="g-header">
    <div class="header-left">
      <i class="el-icon-s-unfold" />
    </div>
    <div class="header-right">
      <el-avatar :src="avatarUrl"></el-avatar>
      <el-dropdown @command="handlerClick">
        <span class="el-dropdown-link">
          欢迎回来,zs
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      avatarUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    };
  },
  methods: {
    ...mapActions({
      logoutHandle: "user/logoutHandle",
    }),
    async handlerClick(type) {
      if (type === "logout") {
        console.log("🚀 ~ handlerClick ~ type:", type);
        const status = await this.logoutHandle();
        if (status) {
          // this.$router.replace("/");
          location.reload();
        }
      }
    },
  },
};
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