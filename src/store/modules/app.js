export default {
  namespaced: true,
  state: {
    sidebarVisible: true,
  },
  getters: {},
  mutations: {
    changeSidebarVisible(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
  },
  actions: {},
};
