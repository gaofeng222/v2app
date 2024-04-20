<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    console.log("🚀 ~ render ~ context:", context);
    const { icon, title } = context;
    const nodes = [];
    if (icon) {
      if (icon.includes("el-icon")) {
        nodes.push(<i class=""></i>);
      }
    }
    return nodes;
  },
};
</script>