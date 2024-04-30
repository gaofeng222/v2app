<template>
  <g-container>
    <h2 v-permission="['admin']">admin能看到的</h2>
    <div>
      <span v-permission="['admin']">我是管理员</span>
    </div>
    <h2 v-permission="['editor']">editor能看到的</h2>
    <div>
      <span v-permission="['editor']">我是编辑员</span>
    </div>
    <h2 v-permission="['admin', 'editor']">admin,editor都能看到的</h2>
    <div>
      <span v-permission="['admin', 'editor']">我是公共部分</span>
    </div>
  </g-container>
</template>

<script>
import { permission } from '@/directives/permission/index.js' // 权限判断指令
export default {
  directives: { permission }
}
</script>
