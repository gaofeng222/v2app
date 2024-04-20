<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#03034d"
    text-color="#fff"
    active-text-color="#ff0"
  >
    <Menu></Menu>
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
import Menu from "./menu";
export default {
  components: { Menu },
  computed: {
    ...mapGetters(["isCollapse"]),
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border-right: 0;
}
</style>