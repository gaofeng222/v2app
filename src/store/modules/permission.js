import { dynamicRoutes, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: { routes: [], addRoutes: [] },
  mutations: {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes
      state.routes = [...constantRoutes].concat(routes)
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = dynamicRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(dynamicRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      return accessedRoutes
    }
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const temp = { ...route }
    if (hasPermisson(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      res.push(temp)
    }
  })
  return res
}

function hasPermisson(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}
