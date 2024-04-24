<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    // console.log('🚀 ~ render ~ context:', context)
    const { icon, title } = context.props
    const nodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        nodes.push(<i class={[icon, 'sub-el-icon']}></i>)
      } else {
        nodes.push(<svg-icon icon-class={icon} />)
      }
    }
    if (title) {
      nodes.push(<span slot='title'>{title}</span>)
    }
    return nodes
  }
}
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
