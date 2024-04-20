import router from "./index";
import store from "@/store";
import NProgress from "nprogress";
import Forbbiden from "@/views/errorPage/403.vue";
import NotFound from "@/views/errorPage/404.vue";
import Message from "element-ui";
const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.name;
  // start progress bar
  NProgress.start();
  const { token } = store.state.user;
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      //获取用户信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      console.log("🚀 ~ router.beforeEach ~ store:", store);
      if (hasRoles) {
        next();
        NProgress.done();
      } else {
        try {
          const { roles } = await store.dispatch("user/getInfo");
          const acessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          const allRoutes = [
            ...acessRoutes,
            ...[
              {
                path: "/403",
                hidden: true,
                component: Forbbiden,
              },
              {
                path: "*",
                hidden: true,
                component: NotFound,
              },
            ],
          ];
          allRoutes.forEach((ele) => router.addRoute(ele));
          NProgress.done();
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
    NProgress.done();
  }
});