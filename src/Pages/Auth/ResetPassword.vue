<template>
    <div class="hold-transition d-flex  justify-content-center login-style">
        <div class="card col-md-6">
            <div class="card-body login-card-body">
                <div class="nk-block-head-content">
                    <h4 class="text-center">Reset Password</h4>
                    <div class="login-box-msg">
                        <p>Create a new password of your choice.</p>
                    </div>
                </div>

                <form @submit.prevent="">
                    <div class="row">
                        <div class=" col-md-12">
                            <div class="form-label-group">
                                <label class="form-label" for="password">New Password</label>
                            </div>
                            <div class="input-group mb-1">
                                <input :type="passwordFieldType" class="form-control" placeholder="Enter new password" v-model="password">
                                <div class="input-group-append">
                                    <div class="input-group-text" @click="passwordVisibility">
                                        <span class="fas fa-lock" v-if="passwordFieldType == 'password'"></span>
                                        <span class="fas fa-lock-open" v-else></span>
                                    </div>
                                </div>
                            </div>
                            <span class="error-span" v-if="errors && errors.password">{{errors.password[0]}}</span>
                        </div>

                        <div class="mt-3 col-md-12">
                            <div class="form-label-group">
                                <label class="form-label" for="password">Confirm Password</label>
                            </div>
                            <div class="input-group mb-1">
                                <input :type="cpasswordFieldType" class="form-control" placeholder="Retype password" v-model="password_confirmation">
                                <div class="input-group-append">
                                    <div class="input-group-text" @click="confirmPasswordVisibility">
                                        <span class="fas fa-lock" v-if="cpasswordFieldType == 'password'"></span>
                                        <span class="fas fa-lock-open" v-else></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-3" >
                            <button v-if="!isLoading" type="submit" class="btn btn-primary btn-block">Reset Password</button>
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

<script>
    export default {
        data() {
            return {
                isLoading: false,
                passwordFieldType: 'password',
                cpasswordFieldType: 'password',
                password_confirmation: '',
                password: '',
            }
        },

        computed: {
            errors() {
                return this.$store.getters['errors'];
            }
        },

        methods: {
            passwordVisibility() {
                this.passwordFieldType = this.passwordFieldType === "password"  ? "text" : "password";
            },
            confirmPasswordVisibility(){
                this.cpasswordFieldType = this.cpasswordFieldType === "password" ? "text" : "password";
            }
        }
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