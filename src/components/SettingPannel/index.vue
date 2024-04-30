<template>
  <el-drawer
    :title="settingPannelTitle"
    :visible.sync="drawer"
    :direction="settingPannelShowType"
    :before-close="handleClose"
  >
    <span>我来啦!</span>
  </el-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    showPannel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["settingPannelTitle", "settingPannelShowType"]),
    drawer: {
      get() {
        return this.showPannel;
      },
      set(value) {
        this.$emit("update:showPannel", !this.showPannel);
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("update:showPannel", !this.showPannel);
    },
  },
};
</script>