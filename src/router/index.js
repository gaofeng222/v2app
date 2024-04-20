import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/login";
import Home from "@/views/home";
import Layout from "@/views/layout";
import Forbbiden from "@/views/errorPage/403.vue";
import NotFound from "@/views/errorPage/404.vue";

const Order = () => import("@/views/order-manage");
const Orderlist = () => import("@/views/order-manage/order-list/index.vue");
const ProductManage = () => import("@/views/order-manage/product-manage");
const ProductionList = () =>
  import("@/views/order-manage/product-manage/production-list");
const ReviewManage = () =>
  import("@/views/order-manage/product-manage/review-manage");

const ReturnGoods = () =>
  import("@/views/order-manage/product-manage/return-goods");
/* 产品管理 */
const Goods = () => import("@/views/goods-manage");
const GoodsList = () => import("@/views/goods-manage/goods-list");
const GoodsClassify = () => import("@/views/goods-manage/goods-classify");

Vue.use(VueRouter);

/**
 * 根据用户的权限不同，所看到的页面和可操作性不同
 * admin -> 所有的页面
 * vip -> 属于vip的权限
 * svip -> 更多的vip权限
 */

export const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    hidden: true,
    meta: {
      name: "登录页",
    },
  },
  {
    path: "/",
    component: Layout,
    name: "container",
    redirect: "/home",
    meta: {
      name: "首页",
    },
    children: [
      {
        path: "home",
        component: Home,
        name: "home",
        meta: {
          name: "首页",
          icon: "icon-name",
        },
      },
    ],
  },
];

export const dynamicRoutes = [
  {
    path: "/order",
    component: Layout,
    name: "order-manage",
    // redirect: { name: "list" },
    redirect: "/order/list",
    meta: {
      name: "订单管理",
      icon: "icon-email",
      // roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "list",
        component: Orderlist,
        name: "order-list",
        meta: {
          name: "订单列表",
          icon: "icon-quit",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "product",
        component: ProductManage,
        name: "product-manage",
        meta: {
          name: "生产管理",
          icon: "icon-service",
        },
        children: [
          {
            path: "list",
            meta: {
              name: "生产列表",
              icon: "icon-nav",
            },
            component: ProductionList,
            name: "product-list",
          },
          {
            path: "review",
            meta: {
              name: "审核管理",
              icon: "icon-nav",
            },
            component: ReviewManage,
            name: "review-manage",
          },
        ],
      },
      {
        path: "returnGoods",
        component: ReturnGoods,
        name: "return-goods",
        meta: {
          name: "退货管理",
          icon: "icon-quit",
        },
      },
    ],
  },
  {
    path: "/goods",
    component: Layout,
    meta: {
      name: "产品管理",
      icon: "icon-order-manage",
    },
    redirect: "/goods/list",
    children: [
      {
        path: "list",
        component: GoodsList,
        name: "goods-list",
        meta: {
          name: "产品列表",
          icon: "icon-name",
        },
      },
      {
        path: "classify",
        component: GoodsClassify,
        name: "goods-classify",
        meta: {
          name: "产品分类",
          icon: "icon-name",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRoutes,
});

export default router;
// const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
