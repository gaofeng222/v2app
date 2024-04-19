import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/login";
import Home from "@/views/home";
import Layout from "@/views/layout";
import Forbbiden from "@/views/errorPage/403.vue";
import NotFound from "@/views/errorPage/404.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/about",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/home"),
  },
];

/**
 * 根据用户的权限不同，所看到的页面和可操作性不同
 * admin -> 所有的页面
 * vip -> 属于vip的权限
 * svip -> 更多的vip权限
 */

export const DynamicRoutes = [
  {
    path: "/",
    component: Layout,
    name: "container",
    redirect: "/home",
    meta: {
      requireAuth: true,
      name: "首页",
    },
    childrens: [
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
  {
    path: "/403",
    component: Forbbiden,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
