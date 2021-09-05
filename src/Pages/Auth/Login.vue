<template>
   <div class="hold-transition d-flex  justify-content-center login-style">
      <div class="card col-md-4">
         <div class="card-body login-card-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <form @submit.prevent="login">
               <div class="row">
                  <div class="col-sm-12" v-if="errors && errors.message">
                     <span class="error-span d-flex justify-content-center" >
                        {{errors.message[0]}}
                     </span>
                     <router-link to="request-email-token" v-if="errors.message[0] === 'Please verify your email'"
                                  class="d-flex justify-content-center mb-4">
                        <small>Request for a new verification code</small>
                     </router-link>

                  </div>
                  <div class="col-sm-12">
                     <div class="form-label-group">
                        <label class="form-label" for="email">Email</label>
                     </div>
                     <div class="input-group mb-1">
                        <input type="email"  class="form-control" placeholder="Enter Email" v-model="email">
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
                        <router-link to="forgot-password" class="text-center float-right">Forgot password?</router-link>
                     </div>
                     <div class="input-group mb-1">
                        <input :type="passwordFieldType" class="form-control" placeholder="Enter Password" v-model="password" >
                        <div class="input-group-append">
                           <div class="input-group-text" @click="passwordVisibility">
                              <span class="fas fa-lock" v-if="passwordFieldType == 'password'"></span>
                              <span class="fas fa-lock-open" v-else></span>
                           </div>
                        </div>
                     </div>
                     <span class="error-span" v-if="errors && errors.password">{{errors.password[0]}}</span>
                  </div>
                  <div class="col-12 mt-3" >
                     <button v-if="!isLoading" type="submit" class="btn btn-primary btn-block">Sign In</button>
                     <div class="d-flex align-items-center mt-1" v-else>
                        <strong>Loading...</strong>
                        <div class="spinner-border spinner-border-sm ml-auto" role="status" aria-hidden="true"></div>
                     </div>
                  </div>

               </div>
            </form>
            <div class="form-note-s2 text-center pt-4">
               Don not hav an account?
               <router-link class="link link-primary link-sm" to="register">Create an account</router-link>
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
               isLoading: false,
                email: '',
                password: '',
                passwordFieldType: 'password',
               showErrors: ''
            }
        },

        computed: {
            errors() {
                return this.$store.getters['loginErrors'];
            }
        },

        methods: {
            passwordVisibility() {
                this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
            },
            async login(){
                //alert(123)
               this.isLoading = true;
                const form = {
                    email: this.email,
                    password: this.password
                };
                try {
                   await this.$store.dispatch('loginAction', form);
                   await this.$router.replace('/dashboard');
                } catch (error) {
                   this.isLoading = false;
                     console.log(error)
                }

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