import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import setting from "./modules/setting.js";
import permission from "./modules/permission.js";
import app from "./modules/app.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {
    roles: (state) => state.user.roles,
    isCollapse: (state) => state.setting.isCollapse,
    permission_routes: (state) => state.permission.routes,
    userInfo: (state) => state.user.userInfo,
    settingPannelTitle: (state) => state.app.settingPannelTitle,
    settingPannelShowType: (state) => state.app.settingPannelShowType,
    showSettingBtn: (state) => state.app.showSettingBtn,
    showLogo: (state) => state.app.showLogo,
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    permission,
    setting,
    app,
  },
});
