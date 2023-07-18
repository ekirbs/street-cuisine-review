import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      currentUser: {
        city: "boston",
      },
    };
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setCity(state, city) {
      state.currentUser.city = city;
    },
  },
});

export default store;
