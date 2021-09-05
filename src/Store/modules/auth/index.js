import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state(){
        return {
            loginErrors: [],
            registerErrors: [],
            RegisterResponse: [],
            loginResponse: [],
            token: localStorage.getItem('token') || '',
            tokenExpiration: null,
            didAutoLogout: false,
            forgotPasswordResponse: null,
            forgotPasswordError: [],
            verifyTokenResponse: [],
            verifyTokenError: [],
            requestEmailResponse: null,
            requestEmailError: []
        }
    },
    mutations,
    actions,
    getters
}