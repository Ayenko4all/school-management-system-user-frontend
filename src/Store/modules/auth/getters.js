export default {
    loginResponse(state){
        return state.loginResponse;
    },

    RegisterResponse(state){
        return state.RegisterResponse;
    },

    loginErrors(state){
        return state.loginErrors;
    },

    registerErrors(state){
        return state.registerErrors;
    },

    forgotPasswordResponse(state){
        return state.forgotPasswordResponse;
    },

    forgotPasswordError(state){
        return state.forgotPasswordError;
    },

    requestEmailResponse(state){
        return state.requestEmailResponse;
    },

    requestEmailError(state){
        return state.requestEmailError;
    },

    verifyTokenResponse(state){
        return state.verifyTokenResponse;
    },

    verifyTokenError(state){
        return state.verifyTokenError;
    },

    isLoggedIn(state){
        return !!state.token
    },

    didAutoLogout(state) {
        return state.didAutoLogout;
    }

}