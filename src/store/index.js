import { createStore } from "vuex";

export default createStore({
  state: {
    accessToken: "",
  },
  getters: {},
  mutations: {
    login(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    logout(state) {
      state.accessToken = accessToken;
      localStorage.removeItem("accessToken");
    },
    initializeStore() {
      if (localStorage.getItem("accessToken")) {
        state.accessToken = localStorage.getItem("accessToken");
      }
    },
  },
  actions: {},
  modules: {},
});
