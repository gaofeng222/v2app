<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#03034d"
    text-color="#fff"
    active-text-color="#ff0"
  ></el-menu>
</template>
<script>
import { mapGetters } from "vuex";

export default {
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