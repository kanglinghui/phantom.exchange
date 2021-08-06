import { createStore } from "vuex";

export default createStore({
  state: {
    logShowStatus: false,
    loginShow: false,
    msgShow: true,
  },
  mutations: {
    SET_LOG_STATUS: (state, status) => {
      state.logShowStatus = status;
    },
    SET_LOGIN_SHOW: (state, status) => {
      state.loginShow = status;
    },
    SET_MSG_SHOW: (state, status) => {
      state.msgShow = status;
    },
  },
  actions: {},
  modules: {},
});
