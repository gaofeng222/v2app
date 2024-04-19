import router from "./index";
import store from "@/store";

router.beforeEach(async (to, from, next) => {
  console.log("🚀 ~ store:", store);
  const { token, permissinLists } = store.state.user;
  console.log("🚀 ~ router.beforeEach ", !token && to.path != "/login");
  if (!token) {
    //未登录，且页面需要登录
    if (
      to.matched.length > 0 &&
      !to.matched.some((ele) => ele.meta.requiredAuth)
    ) {
      next();
    } else {
      next("/login");
    }
  } else {
    //用户已经登录了，
    //1.如果不存在权限路由则获取权限
    console.log(
      "🚀 ~ router.beforeEach ~ permissinLists.length:",
      permissinLists.length
    );
    !permissinLists.length && (await store.dispatch("getPermission"));
    next();
  }
});
