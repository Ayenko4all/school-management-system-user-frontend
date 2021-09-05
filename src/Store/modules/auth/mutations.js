export default {
    LoginMutations(state,payload){
        state.loginResponse = payload.loginResponse;
        state.loginErrors = payload.loginErrors;
        state.token = payload.token;
        state.tokenExpiration = payload.tokenExpiration;
    },

    RegisterMutations(state,payload){
        state.registerErrors = payload.registerErrors;
        state.RegisterResponse = payload.RegisterResponse
    },

    forgotPasswordMutation(state, payload){
        state.forgotPasswordResponse = payload.forgotPasswordResponse;
        state.forgotPasswordError = payload.forgotPasswordError;
    },

    requestEmailMutation(state, payload){
        state.requestEmailResponse = payload.requestEmailResponse;
        state.requestEmailError = payload.requestEmailError;
    },

    verifyTokenMutation(state, payload){
        state.verifyTokenResponse = payload.verifyTokenResponse;
        state.verifyTokenError = payload.verifyTokenError;
    },

    logoutMutation(state){
        state.token = '';
        state.loginResponse = '';
    },

    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
}