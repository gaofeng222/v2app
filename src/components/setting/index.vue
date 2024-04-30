<template>
  <div class="seting-container">
    <div class="seting-container__content" @click="showSettingPannel">
      <i class="el-icon-s-tools" size="18px"></i>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    showSettingPannel() {
      this.$emit("showPannel");
    },
  },
};
</script>

<style lang="scss" scoped>
$prefix: seting-container;
.#{$prefix} {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 20;
  &__content {
    width: 40px;
    height: 60px;
    border-radius: 50px 0 0 50px;
    background-color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    transform: translateY(-30px);
  }
}
</style>