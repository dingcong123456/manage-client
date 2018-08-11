const state = {
  isLogin: false
};

const mutations = {
  SET_USER_ISLOGIN(state, login) {
    state.isLogin = login;
  }
};

const getters = {
};

export default {
  state,
  mutations,
  getters
};
