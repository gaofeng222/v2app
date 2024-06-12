<script>
export default {
  name: "GfTag",
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: {
      type: Boolean,
      default: true,
    },
    color: String,
    size: String,
    effect: {
      type: String,
      default: "light",
      validator(val) {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      },
    },
  },
  computed: {
    tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
    handleClose(e) {
      e.stopPropagation();
      this.$emit("close", e);
    },
  },
  render(h) {
    const { type, tagSize, hit, effect } = this;
    const classes = [
      "el-tag",
      type ? `el-tag--${type}` : "",
      tagSize ? `el-tag--${tagSize}` : "",
      hit && "is-hit",
      effect && `el-tag--${effect}`,
    ];
    const tagEle = (
      <span
        class={classes}
        style={{ backgroundColor: this.color }}
        onClick={this.handleClick}
      >
        {this.$slots.default ? this.$slots.default : this.text}
        {this.closable && (
          <i class="el-tag__close el-icon-close" onClick={this.handleClose}></i>
        )}
      </span>
    );
    return this.disableTransitions ? (
      tagEle
    ) : (
      <transitions name="el-zoom-in-center">{tagEle}</transitions>
    );
  },
};
</script>

<style>
</style>