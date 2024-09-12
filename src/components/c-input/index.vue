<template>
  <label>
    {{ label }}
    <input v-on="inputListeners" :value="value" />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'V2appIndex',
  props: ['label', 'value'],
  data() {
    return {}
  },

  mounted() {},
  computed: {
    inputListeners() {
      var vm = this
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit('input', event.target.value)
        }
      })
    }
  },
  methods: {}
}
</script>
