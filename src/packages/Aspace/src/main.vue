<script>
export default {
  name: "GfSpace",
  props: {
    flex: Boolean,
    gap: {
      type: Number,
      default: 10,
    },
    direction: {
      type: String,
      default: "row",
    },
  },
  computed: {
    style() {
      return {
        display: this.flex ? "flex" : "block",
        flexDirection: this.direction,
        gap: `${this.gap}px`,
      };
    },
  },
  render(h) {
    return <div style={this.style}>{this.$slots.default}</div>;
  },
};
</script>