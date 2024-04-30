import setting from "@/setting";
console.log("🚀 ~ setting:", setting);
export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: localStorage.getItem("sidebarStatus")
        ? !!+localStorage.getItem("sidebarStatus")
        : true,
      withoutAnimation: false,
    },
    settingPannelTitle: setting.settingPannelTitle,
    settingPannelShowType: setting.settingPannelShowType,
    showSettingBtn: setting.showSettingBtn,
  },
  mutations: {},
  actions: {},
};
