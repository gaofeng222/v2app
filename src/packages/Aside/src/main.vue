<template>
  <aside class="el-aside" :style="{width}">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: "GfAside",
  componentName: "GfAside",
  props: {
    width: {
      type: String,
      default: "300px",
    },
  },
};
</script>

<style>
</style>