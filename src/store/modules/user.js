import router, { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    roles: []
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    REMOVE_TOKEN(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    REMOVE_ROLES(state) {
      state.roles = []
    }
  },

  actions: {
    async loginHandler({ commit }) {
      const res = await fetch('http://localhost:3000/login')
      const data = await res.json()
      commit('SET_TOKEN', data.token)
      localStorage.setItem('token', data.token)
      return data
    },
    logoutHandle({ commit }) {
      return new Promise((resolve, rej) => {
        commit('REMOVE_TOKEN')
        commit('REMOVE_ROLES')
        resolve(true)
      })
    },
    async getInfo({ commit, state }) {
      const res = await fetch('http://localhost:3000/info')
      const data = await res.json()
      console.log('🚀 ~ getInfo ~ data:', data)
      commit('SET_ROLES', data.roles)
      return data
    },
    async getPermission({ commit }) {
      const res = await fetch('http://localhost:3000/admin_permission')
      const permissionLists = await res.json()
    },
    // remove token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('REMOVE_TOKEN')
        commit('SET_ROLES', [])
        resolve()
      })
    },
    async changeRoles({ commit, dispatch }, payload) {
      const token = payload + '-token'
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
      const { roles } = await dispatch('getInfo')
      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })
      // dynamically add accessible routes
      router.addRoutes(accessRoutes)
    }
  }
}
/**
 *
 * @param {[]} userRouter  后端返回的路由
 * @param {[]} allRoutes   全部的路由
 * @returns realRoutes 过滤之后复合条件的路由
 */
// function calcuRoutes(userRouter = [], allRoutes = []) {
//   let realRoutes = [];
//   allRoutes.forEach((aRoute) => {
//     userRouter.forEach((uRoute) => {
//       if (aRoute.meta.name === uRoute.name) {
//         if (uRoute.children && uRoute.children.length > 0) {
//           aRoute.children = calcuRoutes(uRoute.children, aRoute.children);
//         }
//         realRoutes.push(aRoute);
//       }
//     });
//   });
//   return realRoutes;
// }

// function setDefaultRoute(routes) {
//   routes.forEach((route) => {
//     if (route.children && route.children.length > 0) {
//       route.redirect = { name: route.children[0].name };
//       setDefaultRoute(route.children);
//     }
//   });
// }
