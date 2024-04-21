//vue2页面测试
import Layout from '@/views/layout'
const AuthRoleTest = () => import('@/views/auth-role/page-auth')
export default {
  path: '/auth',
  component: Layout,
  meta: {
    title: '权限测试页面',
    icon: 'el-icon-eleme'
  },
  children: [
    {
      path: 'page-auth',
      component: AuthRoleTest,
      name: 'page-auth',
      meta: {
        title: '页面权限',
        icon: 'el-icon-s-goods'
      },
      children: []
    }
  ]
}
