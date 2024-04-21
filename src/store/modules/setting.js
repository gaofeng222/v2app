export default {
  namespaced: true,
  state: { isCollapse: false, showLogo: true },
  mutations: {
    TOGGLE_COLLAPSE(state, payload) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    toggleSiderBar({ commit }) {
      commit('TOGGLE_COLLAPSE')
    }
  }
}
