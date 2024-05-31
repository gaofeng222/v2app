

<script>
export default {
  props: {
    inAutoWidth: Boolean,
    updateAll: Boolean,
  },
  inject: ["gfForm", "gfFormItem"],
  data() {
    return {
      computedWidth: 0,
    };
  },
  render() {
    const $slots = this.$slots.default;
    if (!$slots) return null;
    if (this.isAutoWidth) {
      const autoLabelWidth = this.gfForm.autoLabelWidth;
      const style = {};
      if (autoLabelWidth && autoLabelWidth != "auto") {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth;
        if (marginLeft) {
          style.marginLeft = marginLeft + "px";
        }
      }
      return (
        <div class="el-form-item__label-wrap" style={style}>
          {$slots}
        </div>
      );
    } else {
      return $slots[0];
    }
  },
};
</script>

<style>
</style>