<template>
  <div class="app-main">
    <transition
      enter-active-class="animate__animated animate__backInRight"
      leave-active-class="animate__animated animate__backOutLeft"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    cachedViews() {
      return ['KeepAliveTest']
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  height: 100%;
}
</style>
