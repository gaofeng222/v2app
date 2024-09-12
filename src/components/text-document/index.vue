<template>
  <label>
    <input type="text" :value="$attrs.title" @input="changeHandle" />
    <input type="text" :value="$attrs.content" @input="changeHandle1" />
  </label>
</template>

<script>
export default {
  name: 'V2appIndex',
  //   props: ['value'],
  data() {
    return {}
  },

  mounted() {},

  methods: {
    changeHandle(event) {
      this.$emit('update:title', event.target.value)
    },
    changeHandle1(event) {
      this.$emit('update:content', event.target.value)
    }
  }
}
</script>
