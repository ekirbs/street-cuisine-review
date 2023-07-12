import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
});

export default store;
