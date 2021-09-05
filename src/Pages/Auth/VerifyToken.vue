<template>
    <div class="hold-transition d-flex  justify-content-center mt-5">
        <div class="card col-md-4 mt-5" >
            <div class="card-body login-card-body">
                <div class="nk-block-head-content">
                    <h4 class="text-center">Token Verification</h4>
                    <div class="login-box-msg">
                        <p>Enter the token we sent to your mail.</p>
                    </div>
                    <div class="mb-4 d-flex justify-content-center">
                        <span class="alert alert-success" v-if="forgotPasswordResponse && forgotPasswordResponse.message !== null">
                            {{forgotPasswordResponse.message}}
                        </span>
                        <span class="alert alert-success" v-if="RegisterResponse && RegisterResponse.message !== null">
                            {{RegisterResponse.message}}
                        </span>
                    </div>
                </div>

                <form @submit.prevent="tokenVerify">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="email">Email Address</label>
                                </div>
                                <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter your register email address">
                                <span class="error-span" v-if="errors && errors.email">{{errors.email[0]}}</span>
                            </div>
                        </div>
                        <div class="mt-3 col-md-12">
                            <div class="form-label-group">
                                <label class="form-label" for="token">Verification Token</label>
                                <router-link class="link link-primary link-sm float-right" :to="newTokenRequest">Request new token?</router-link>
                            </div>
                            <div class="input-group mb-1">
                                <input :type="tokenFieldType" class="form-control" placeholder="Enter token" v-model="token" >
                                <div class="input-group-append">
                                    <div class="input-group-text" @click="tokenVisibility">
                                        <span class="fas fa-lock" v-if="tokenFieldType == 'password'"></span>
                                        <span class="fas fa-lock-open" v-else></span>
                                    </div>
                                </div>
                            </div>
                            <span class="error-span" v-if="errors && errors.token">{{errors.token[0]}}</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-12" >
                            <button class="btn btn-lg btn-primary btn-block" v-if="!isLoading">Verify Token</button>
                            <div class="d-flex align-items-center mt-1" v-if="isLoading">
                                <strong>Loading...</strong>
                                <div class="spinner-border spinner-border-sm ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                        </div>

                    </div>
                </form>
                <div class="form-note-s2 text-center pt-4">
                    Remember your password ?
                    <router-link class="link link-primary link-sm" to="login">Take me back to login</router-link>
                </div>
            </div>
            <!-- /.login-card-body -->
        </div>
    </div>

</template>

<script>


    export default {
        data(){
            return {
                tokenFieldType: 'password',
                email: '',
                token: '',
                isValid: true,
                isLoading: false,

            }
        },

        computed: {
            errors() {
                return this.$store.getters['verifyTokenError'];
            },
            newTokenRequest(){
                return localStorage.getItem('type') == 'password' ? 'forgot-password' : 'request-email-token';
            },
            forgotPasswordResponse(){
                return this.$store.getters.forgotPasswordResponse;
            },
            RegisterResponse() {
                return this.$store.getters['RegisterResponse'];
            },
        },
        // beforeRouteLeave: async (to, from, next) => {
        //
        //     if (this.errors.message !== null) {
        //         this.isLoading = false;
        //         next(false);
        //
        //     } else {
        //         next();
        //     }
        //     this.isLoading = false;
        // },
        methods: {
            tokenVisibility() {
                this.tokenFieldType = this.tokenFieldType === "password" ? "text" : "password";
            },

            async tokenVerify(){
                const form = {
                    email: this.email,
                    type:  localStorage.getItem('type'),
                    token: this.token
                };
                this.isLoading = true;
                try {
                    await  this.$store.dispatch('verifyTokenAction', form);
                    if(localStorage.getItem('type') === 'password'){
                        await this.$router.push('reset-password');
                    } else {
                        await this.$router.push('login');
                    }
                }catch (error) {
                    console.log(error);
                    this.isLoading = false;

                }
            }

        },
    }
</script>
<style scoped>
    .fa-lock-open,
    .fa-lock {
        cursor: pointer;
    }
    .login-style{
        margin-top: 10%;
    }
</style>