import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import setting from './modules/setting.js'
import permission from './modules/permission.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {
    roles: (state) => state.user.roles,
    isCollapse: (state) => state.setting.isCollapse,
    showLogo: (state) => state.setting.showLogo,
    permission_routes: (state) => state.permission.routes
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    permission,
    setting
  }
})
