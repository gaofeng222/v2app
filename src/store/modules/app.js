export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: localStorage.getItem('sidebarStatus')
        ? !!+localStorage.getItem('sidebarStatus')
        : true,
      withoutAnimation: false
    }
  },
  mutations: {},
  actions: {}
}
