<template>
  <label>
    <input type="text" :value="value.title" @input="changeHandle" />
    <input type="text" :value="value.content" @input="changeHandle1" />
  </label>
</template>

<script>
export default {
  name: 'V2appIndex',
  props: ['value'],
  data() {
    return {}
  },

  mounted() {},

  methods: {
    changeHandle(event) {
      this.$emit('update:value', { ...this.value, title: event.target.value })
    },
    changeHandle1(event) {
      this.$emit('update:value', { ...this.value, content: event.target.value })
    }
  }
}
</script>
