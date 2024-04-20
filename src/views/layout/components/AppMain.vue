<template>
  <div class="app-main">
    <transition
      enter-active-class="animate__animated animate__backInRight"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  height: 100%;
}
</style>