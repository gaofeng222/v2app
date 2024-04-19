import router, { dynamicRoutes, CustomRoutes } from "@/router/index";

export default {
  state: {
    token: localStorage.getItem("token") || "",
    permissinLists: [],
    sideBarMenus: [],
    currentMenu: "",
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    REMOVE_TOKEN(state) {
      state.token = "";
    },
    SET_PERMISSIONLISTS(state, payload) {
      state.permissinLists = payload;
    },
    CLEAR_PERMISSIONLISTS(state) {
      state.permissinLists = [];
    },
    SET_MENUS(state, payload) {
      state.sideBarMenus = payload;
    },
    CLEAR_MENUS(state) {
      state.sideBarMenus = [];
    },
    SET_CURRENTMENUS(state, payload) {
      state.currentMenu = payload;
    },
  },
  actions: {
    async loginHandler({ commit }) {
      const res = await fetch("http://localhost:3000/login");
      const data = await res.json();
      commit("SET_TOKEN", data.token);
      localStorage.setItem("token", data.token);
      return data;
    },
    async getPermission({ commit }) {
      const res = await fetch("http://localhost:3000/admin_permission");
      const permissionLists = await res.json();
      console.log("🚀 ~ getPermission ~ data:", permissionLists);
      //对比路由拿到后端返回的全线路由
      const permissionRoutes = calcuRoutes(permissionLists.data, dynamicRoutes);
      const MainContainer = CustomRoutes.find((r) => r.path === "/");
      let children = MainContainer.children;
      children.push(...permissionRoutes);
      commit("SET_MENUS", children);
      setDefaultRoute([MainContainer]);
      let initRoutes = router.options.routes;
      CustomRoutes.forEach((r) => router.addRoute(r));
      console.log("🚀 ~ getPermission ~ router.options:", router.options);
      commit("SET_PERMISSIONLISTS", [...initRoutes, ...CustomRoutes]);
    },
  },
};
/**
 *
 * @param {[]} userRouter  后端返回的路由
 * @param {[]} allRoutes   全部的路由
 * @returns realRoutes 过滤之后复合条件的路由
 */
function calcuRoutes(userRouter = [], allRoutes = []) {
  let realRoutes = [];
  allRoutes.forEach((aRoute) => {
    userRouter.forEach((uRoute) => {
      if (aRoute.meta.name === uRoute.name) {
        if (uRoute.children && uRoute.children.length > 0) {
          aRoute.children = calcuRoutes(uRoute.children, aRoute.children);
        }
        realRoutes.push(aRoute);
      }
    });
  });
  return realRoutes;
}

function setDefaultRoute(routes) {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.redirect = { name: route.children[0].name };
      setDefaultRoute(route.children);
    }
  });
}
