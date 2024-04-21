<template>
  <div>
    <div style="margin-bottom: 15px">Your roles: {{ realRoles }}</div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['roles']),
    realRoles() {
      return this.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(value) {
        this.$store.dispatch('user/changeRoles', value).then((res) => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
