import store from "../store";
import { isSignIn } from '../api';

const m = {
  checkAuth() {
    return async function (to, from, next) {
      if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.state.userInfo.isLogin) {
          next();
        } else {
          try {
            let data = await isSignIn();
            let is_sign_in = data.data.data.is_sign_in;
            let username =  data.data.data.username;
            store.commit("SET_USER_ISLOGIN", is_sign_in);
            store.commit("SET_USERNAME", username);
            if(is_sign_in) {
              next();
            } else {
              next('/login')
            }          
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        next();
      }
    };
  }
};
export default m;
