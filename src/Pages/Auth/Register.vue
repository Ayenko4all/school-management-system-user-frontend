<template>
    <div class="hold-transition d-flex  justify-content-center">
        <div class="card col-md-6 mt-5" >
            <div class="card-body login-card-body">
                <h4 class="text-center text-capitalize">Register</h4>
                <p class="login-box-msg">Create New V-School Account</p>
                <form @submit.prevent="register">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="firstname">First Name</label>
                                </div>
                                <input type="text" class="form-control" id="firstname"
                                       @keyup="errors.first_name = false"
                                       placeholder="Enter your first name" v-model="first_name">
                                <span class="error-span" v-if="errors && errors.first_name">{{errors.first_name[0]}}</span>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="lastname">Last Name</label>
                                </div>
                                <input type="text" class="form-control" id="lastname"
                                       @keyup="errors.last_name = false"
                                       placeholder="Enter your last name" v-model="last_name">
                                <span class="error-span" v-if="errors && errors.last_name">{{errors.last_name[0]}}</span>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-label-group">
                                <label class="form-label" for="email">Email</label>
                            </div>
                            <div class="input-group mb-1">
                                <input type="email"  class="form-control"
                                       @keyup="errors.email = false"
                                       placeholder="Enter Email" v-model="email">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <span class="error-span" v-if="errors && errors.email">{{errors.email[0]}}</span>
                        </div>
                        <div class="mt-3 col-md-12">
                            <div class="form-label-group">
                                <label class="form-label" for="password">Password</label>
                            </div>
                            <div class="input-group mb-1">
                                <input :type="passwordFieldType" class="form-control"
                                       @keyup="errors.password = false"
                                       placeholder="Enter Password" v-model="password">
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
                                <label class="form-label" for="password_confirmation">Confirm Password</label>
                            </div>
                            <div class="input-group mb-1">
                                <input :type="cpasswordFieldType" class="form-control" placeholder="Enter Password" v-model="password_confirmation" >
                                <div class="input-group-append">
                                    <div class="input-group-text" @click="confirmPasswordVisibility">
                                        <span class="fas fa-lock" v-if="cpasswordFieldType == 'password'"></span>
                                        <span class="fas fa-lock-open" v-else></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-12 mt-2">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="telephone">Telephone</label>
                                </div>
                                <input type="text" class="form-control" id="telephone"
                                       @keyup="errors.telephone = false"
                                       v-model="telephone" placeholder="Enter telephone number">
                                <span class="error-span" v-if="errors && errors.telephone">{{errors.telephone[0]}}</span>
                            </div>
                        </div>
                        <div class="col-sm-6 mt-2">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="dob">Date of Birth</label>
                                </div>
                                <input type="date" class="form-control" id="dob"
                                       @keyup="errors.date_of_birth = false"
                                       v-model="date_of_birth">
                                <span class="error-span" v-if="errors && errors.date_of_birth">{{errors.date_of_birth[0]}}</span>
                            </div>
                        </div>
                        <div class="col-sm-6 mt-2">
                            <div class="form-group">
                                <div class="form-label-group">
                                    <label class="form-label" for="gender">Gender</label>
                                </div>
                                <select class=" form-control" v-model="gender"  @change="errors.gender = false">
                                    <option  selected   disabled>--Select--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <span class="error-span" v-if="errors && errors.gender">{{errors.gender[0]}}</span>
                            </div>
                        </div>

                    </div>

                    <div class="row mt-3">
                        <div class="col-12" >
                            <button v-if="!isLoading" type="submit" class="btn btn-primary btn-block">Create an account</button>
                            <div class="d-flex align-items-center mt-1" v-else>
                                <strong>Loading...</strong>
                                <div class="spinner-border spinner-border-sm ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                        </div>

                    </div>
                </form>
                <div class="form-note-s2 text-center pt-4">
                    Already have an account ?
                    <router-link class="link link-primary link-sm" to="login">Sign in</router-link>
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
                selected:[],
                isLoading: false,
                passwordFieldType: 'password',
                cpasswordFieldType: 'password',
                password_confirmation: '',
                password: '',
                email: '',
                first_name: '',
                last_name: '',
                date_of_birth: '',
                gender: '--Select--',
                telephone: null
            }
        },

        computed: {
            errors() {
                return this.$store.getters['registerErrors'];
            },

        },

        methods: {
            clearError(){
                //error.clear();
            },
            passwordVisibility() {
                this.passwordFieldType = this.passwordFieldType === "password"  ? "text" : "password";
            },
            confirmPasswordVisibility(){
                this.cpasswordFieldType = this.cpasswordFieldType === "password" ? "text" : "password";
            },
            async register(){
                this.isLoading=true;
                const form = {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    date_of_birth: this.date_of_birth,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    gender: this.gender,
                    telephone: this.telephone
                };
                //console.log(form)
                try {
                    await this.$store.dispatch('registerAction', form);
                    await this.$router.replace('verify-token');
                } catch (error) {
                    console.log(error);
                    this.isLoading = false;
                }
            }
        }
    }
</script>