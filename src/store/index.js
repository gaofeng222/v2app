import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import permission from "./modules/permission.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {
    roles: () => user.state.roles || [],
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    permission,
  },
});
