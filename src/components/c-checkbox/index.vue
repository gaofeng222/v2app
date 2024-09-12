<template>
  <div>
    <label>
      {{ value }}
      <input type="checkbox" :checked="checked" @change="handleChange" />
    </label>
  </div>
</template>

<script>
export default {
  name: "CCheckbox",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: Boolean,
    value: {
      type: String,
      default: "复选框",
    },
  },
  methods: {
    handleChange($event) {
      this.$emit("change", $event.target.checked);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
