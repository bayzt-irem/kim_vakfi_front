import { AUTH_API } from "@/api/auth";
import {
  removePersistenceData,
  setPersistenceData,
} from "@/utils/persistenceStorage";

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    logout(state) {
      state.user = {};
      removePersistenceData("token");
    },
  },
  actions: {
    async currentUser({ commit }) {
      return await AUTH_API.current().then((res) => {
        if (res.status === 200) {
          commit("setUser", res.data);
        }
        return res.status;
      });
    },
    async login({ commit }, payload) {
      return await AUTH_API.login(payload).then(async (result) => {
        const data = result.data;
        if (result.status === 200) {
          setPersistenceData("token", data.token, true);
          await commit("setUser", data.user);
          return true;
        } else return false;
      });
    },
    async register({ commit }, payload) {
      return await AUTH_API.register(payload).then(async (result) => {
        const data = result.data;
        if (result.status === 200) {
          setPersistenceData("token", data.token, true);
          await commit("setUser", data.user);
          return true;
        } else return false;
      });
    },
  },
};
