<template>
    <div class="hold-transition d-flex  justify-content-center mt-5">
            <div class="card col-md-4 mt-5" >
                <div class="card-body login-card-body">
                    <div class="nk-block-head-content">
                        <h4 class="text-center">Request A New Email Verification Token</h4>
                        <div class="login-box-msg">
                            <p>Need new token, well then we’ll email you instructions to verify your email.</p>
                        </div>
                    </div>

                    <form @submit.prevent="emailToken">
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
                                <button class="btn btn-lg btn-primary btn-block" v-if="!isLoading">Send New Token</button>
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
                email: '',
                error: null
            }
        },

        computed: {
            errors() {
                return this.$store.getters.requestEmailError;
            }
        },

        methods: {
            async emailToken(){
                const form = {
                    email: this.email
                };
                this.isLoading = true;
                try {
                    await  this.$store.dispatch('verifyEmailAction', form);
                    await this.$router.replace('/verify-token');
                }catch (error) {
                    console.log(error);
                    this.isLoading = false;

                }
            }

        },


    }
</script>