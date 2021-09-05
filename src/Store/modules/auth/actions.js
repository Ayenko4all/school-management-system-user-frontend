import axiosHeader from "../../../axios.js";
import axios from "axios";

let timer;
export default {

    async registerAction(context, payload){
        await axiosHeader.post('register',{
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
            date_of_birth: payload.date_of_birth,
            first_name: payload.first_name,
            last_name: payload.last_name,
            gender: payload.gender,
            telephone: payload.telephone

        })
            .then(response => {
                localStorage.setItem('type', 'email');
                context.commit('RegisterMutations', {
                    RegisterResponse: response.data.data,
                });
            })
            .catch(err => {
                context.commit('RegisterMutations', {
                    registerErrors: err.response.data.errors,
                });
                const error = err.response.data;
                throw JSON.parse(JSON.stringify(error));
            })
    },

    async loginAction(context, payload){
        localStorage.removeItem('type');
        await axiosHeader.post('login',{
            email: payload.email,
            password: payload.password
        })
            .then(response => {
                //console.log(response.data.status);
                const expiresIn = +response.data.data.expires_in * 1000;
               const expirationDate = new Date().getTime() + expiresIn;
                //const expiresIn = response.data.data.expires_in;
                // const expiresIn = 20000

                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('tokenExpiration', expirationDate);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));

                timer = setTimeout(function () {
                    context.dispatch('autoLogout')
                }, expiresIn);


                context.commit('LoginMutations', {
                    loginResponse: response.data.data,
                    token: response.data.data.token,
                    tokenExpiration: response.data.data.expires_in
                });

            })
            .catch(err => {
                //console.log(err.response.data.errors)
                context.commit('LoginMutations', {
                    loginErrors: err.response.data.errors,
                });
                localStorage.removeItem('token');
                const error = err.response.data;
                throw JSON.parse(JSON.stringify(error));
            })
    },

    autoLogin(context){
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        let expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout')
        }, expiresIn);

        if(token && user){
            context.commit('LoginMutations',{
                loginResponse: user,
                token: token
            })
        }
    },

    logoutAction(context){
         axios.delete('logout',{
             baseURL: process.env.VUE_APP_ROOT_API,
             headers: {
                 "Accept": "application/json",
                 "Authorization":  'Bearer ' + localStorage.getItem('token') || ''
             }
         })
        .then(response => {
            console.log(response);
            context.commit('logoutMutation');
        })
         .catch( err => {
             console.log(err);
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpiration');
        clearTimeout(timer);
    },

    autoLogout(context){
        context.dispatch('logoutAction');
        context.commit('setAutoLogout');
    },

    async forgotPasswordAction(context, payload){
       await axiosHeader.post('request-password-token', {
            email: payload.email
        })
            .then(response => {
                localStorage.setItem('type', 'password');
                context.commit('forgotPasswordMutation', {
                    forgotPasswordResponse: response.data.data,
                })
            })
            .catch(err => {
                context.commit('forgotPasswordMutation', {
                    forgotPasswordError: err.response.data.errors,
                })
            })

    },

     async verifyEmailAction(context, payload){

        // try {
           await axiosHeader.post('request-email-token', {
                email: payload.email
            })
            .then(response => {
                //localStorage.setItem('type', 'email');
                context.commit('requestEmailMutation', {
                    requestEmailResponse: response.data.data,
                });
            })
           .catch(err => {
               //console.log( JSON.parse(JSON.stringify(err.response.data.errors)))
               context.commit('requestEmailMutation', {
                   requestEmailError: err.response.data.errors,
               });

               const error = err.response.data;
               throw JSON.parse(JSON.stringify(error));
           })
    },

    async verifyTokenAction(context, payload){
        await axiosHeader.post('verify-token', {
            email: payload.email,
            token: payload.token,
            type: payload.type
        })
            .then(response => {
                context.commit('verifyTokenMutation', {
                    verifyTokenResponse: response.data.data.message,
                })

            })
            .catch(err => {
                context.commit('verifyTokenMutation', {
                    verifyTokenError: err.response.data.errors,
                });

                const error = err.response.data;
                throw JSON.parse(JSON.stringify(error));
            })

    }

}