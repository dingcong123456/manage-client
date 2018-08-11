const state = {
  isLogin: false,
  username: ''
};

const mutations = {
  SET_USER_ISLOGIN(state, login) {
    state.isLogin = login;
  },
  SET_USERNAME(state, username) {
    state.username = username;
  }
};

const getters = {
};

export default {
  state,
  mutations,
  getters
};
