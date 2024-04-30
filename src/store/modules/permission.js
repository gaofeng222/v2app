import { dynamicRoutes, constantRoutes } from "@/router";
import Layout from "@/views/layout";
const Orderlist = () => import("@/views/order-manage/order-list/index.vue");

export default {
  namespaced: true,
  state: { routes: [], addRoutes: [] },
  mutations: {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes;
      state.routes = [...constantRoutes].concat(routes);
    },
  },
  actions: {
    generateRoutes({ commit }, roles) {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = dynamicRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(dynamicRoutes, roles);
      }
      commit("SET_ROUTES", accessedRoutes);
      return accessedRoutes;
    },
    generateBackRoutesRoutes({ commit }, routes) {
      let accessedRoutes = [];
      accessedRoutes = filterAsyncBackRoutes(routes, accessedRoutes);
      console.log(
        "🚀 ~ generateBackRoutesRoutes ~ accessedRoutes:",
        accessedRoutes
      );
      commit("SET_ROUTES", accessedRoutes);
      return accessedRoutes;
    },
  },
};

function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const temp = { ...route };
    if (hasPermisson(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles);
      }
      res.push(temp);
    }
  });
  return res;
}

function hasPermisson(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

// function filterAsyncBackRoutes(data, routes) {
//   data.forEach((datas, index) => {
//     console.log("🚀 ~ data.forEach ~ datas.component:", datas.component);
//     const Comp = () => import(`${datas.component}`);
//     // /views/order-manage/order-list/index.vue
//     // const Comp = (resolve) => require([`@${datas.component}`], resolve);
//     routes.push({
//       path: datas.path,
//       name: datas.name,
//       hidden: datas.hidden == "true" ? true : false,
//       // 当时这块踩坑了
//       component: datas.component === "Layout" ? Layout : Comp,
//       meta: {
//         title: datas.meta.title,
//         icon: datas.meta.icon,
//         // 用来存放按钮权限
//         button: datas.meta.button,
//       },
//       // redirect: datas.redirect,
//       id: datas.id,
//       // 子路由
//       children: [],
//     });
//     if (datas.children) {
//       const childArr = filterAsyncBackRoutes(datas.children, []);
//       routes[index].children = childArr;
//     }
//   });
//   return routes;
// }

// 路由拼接
/**
 *
 * @param {string} view
 * @returns
 * 这里有个大坑，路由拼接"@/views/"要单独写，不要写在配置文件里面，不然会有找不到理由的报错!!!!!
 * 此处排查了一个小时，wtf!!!!!!!!!!!,不知道你们遇到了没有!!
 */
function loadView(view) {
  return () => import("@/views/" + view);
}
// 路由过滤   遍历路由 转换为组件对象和路径
function filterAsyncBackRoutes(data) {
  const routes = data.filter((item) => {
    if (item["component"] === "Layout") {
      item.component = Layout;
    } else {
      item["component"] = loadView(item["component"]);
    }
    // 路由递归，转换组件对象和路径
    if (item["children"] && item["children"].length > 0) {
      item["children"] = filterAsyncBackRoutes(item.children);
    }
    return true;
  });
  // 排序
  routes.sort((a, b) => a["id"] - b["id"]);
  return routes;
}
