import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Forbbiden from '@/views/errorPage/403.vue'
import NotFound from '@/views/errorPage/404.vue'
import Vue2FunctionalComp from './vue2-function.js'
import AuthTestPage from './auth.js'
Vue.use(VueRouter)
const Order = () => import('@/views/order-manage')
const Orderlist = () => import('@/views/order-manage/order-list/index.vue')
const ProductManage = () => import('@/views/order-manage/product-manage')
const ProductionList = () =>
  import('@/views/order-manage/product-manage/production-list')
const ReviewManage = () =>
  import('@/views/order-manage/product-manage/review-manage')

const ReturnGoods = () =>
  import('@/views/order-manage/product-manage/return-goods')
/* 产品管理 */
const Goods = () => import('@/views/goods-manage')
const GoodsList = () => import('@/views/goods-manage/goods-list')
const GoodsClassify = () => import('@/views/goods-manage/goods-classify')

//vue2页面测试

/**
 * 根据用户的权限不同，所看到的页面和可操作性不同
 * admin -> 所有的页面
 * vip -> 属于vip的权限
 * svip -> 更多的vip权限
 */

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    hidden: true,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/',
    component: Layout,
    name: 'container',
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home',
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  }
]

export const dynamicRoutes = [
  {
    path: '/order',
    component: Layout,
    name: 'order-manage',
    redirect: '/order/list',
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'el-icon-odometer'
      // roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: Orderlist,
        name: 'order-list',
        meta: {
          title: '订单列表',
          icon: 'el-icon-set-up',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        children: []
      },
      {
        path: 'product',
        component: ProductManage,
        name: 'product-manage',
        // hidden: true,
        meta: {
          title: '生产管理',
          icon: 'icon-service'
        },
        children: [
          {
            path: 'list',
            hidden: true,
            meta: {
              title: '生产列表',
              icon: 'icon-nav'
            },
            component: ProductionList,
            name: 'product-list'
          },
          {
            path: 'review',
            meta: {
              title: '审核管理',
              icon: 'el-icon-wallet'
            },
            component: ReviewManage,
            name: 'review-manage'
          }
        ]
      },
      {
        path: 'returnGoods',
        component: ReturnGoods,
        name: 'return-goods',
        meta: {
          title: '退货管理',
          icon: 'el-icon-collection'
        },
        children: []
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    meta: {
      title: '产品管理',
      icon: 'el-icon-reading'
    },
    redirect: '/goods/list',
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: GoodsList,
        name: 'goods-list',
        meta: {
          title: '产品列表',
          icon: 'el-icon-mobile'
        },
        children: []
      },
      {
        path: 'classify',
        component: GoodsClassify,
        name: 'goods-classify',
        meta: {
          title: '产品分类',
          icon: 'el-icon-c-scale-to-original'
        },
        children: []
      }
    ]
  },
  Vue2FunctionalComp,
  AuthTestPage
]

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
  })

const router = createRouter()

//重置所有的路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
// const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}
