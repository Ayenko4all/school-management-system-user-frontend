<template>
    <div class="hold-transition d-flex  justify-content-center mt-5">
            <div class="card col-md-4 mt-5" >
                <div class="card-body login-card-body">
                    <div class="nk-block-head-content">
                        <h4 class="text-center">Forgot Password</h4>
                        <div class="login-box-msg">
                            <p>If you forgot your password, well then we’ll email you instructions to reset your password.</p>
                        </div>
                    </div>

                    <form @submit.prevent="forgotPassword">
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
                        </div>

                        <div class="row mt-3">
                            <div class="col-12" >
                                <button class="btn btn-lg btn-primary btn-block" v-if="!isLoading">Send Reset Token</button>
                                <div class="d-flex align-items-center mt-1" v-else>
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

<script >
    export default {
        data() {
            return {
                isLoading: false,
                email: ''
            }
        },

        computed: {
            errors() {
                return this.$store.getters.forgotPasswordError;
            }
        },

        methods: {
        async forgotPassword(){
                this.isLoading = true;
                localStorage.removeItem('type');
                try {
                   await this.$store.dispatch('forgotPasswordAction', {email: this.email});
                   await this.$router.push('verify-token');
                } catch (e) {
                    this.isLoading = false;
                    console.log(e);
                }
            }
        },
    }
</script>