<!-- Login.vue -->
<template>
  <div class="full-content">
    <div class="bg-image">
      <Header/>
      <div class="content">
        <v-container>
          <h1 class="title">Login</h1>
          <div class="login-content">
            <v-form @submit.prevent="() => submitForm()" ref="form">
              <Input v-model="form.email" label="Email" type="email" class="input-placeholder" :rules="emailRules"/>
              <Input v-model="form.password" label="Password" type="password" class="input-placeholder" :rules="passwordRules"/>
              <Button name="Login" type="submit" />
              <router-link :to="{ name: 'register' }" class="have-account">
                Don't have an account yet?
              </router-link>
              <!-- <SignUpUsing /> -->
            </v-form>
          </div>
        </v-container>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import Input from '../components/general/Input'
    import Button from '../components/auth/Button'
    import SignUpUsing from '../components/auth/SignUpUsing'
    import store from '@/store';
    
    export default {
        components: {
            Button,
            Header,
            Input,
            SignUpUsing,
            Footer,
        },
        data() {
            return {
                form: {
                    email: null, password: null,
                },
                emailRules: [
                  value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (pattern.test(value)) return true

                    return 'Must be a valid e-mail.'
                  },
                ],
                passwordRules: [
                  (value) => !!value || 'Please type password.',
                ],
            }
        },
        methods: {
            async submitForm() {
              const { valid } = await this.$refs.form.validate()

              if (valid) {
                await store.dispatch('login', this.form)
                  .then(result => {
                    if (!result) return;

                    this.$router.push({name: 'ImageGenerator'});
                  }).catch(error => {
                    console.error(error);
                    switch (error) {
                      case 'INVALID_PASSWORD':
                        this.$toast.error('Password is incorrect');
                        break;
                      case 'EMAIL_NOT_FOUND':
                        this.$toast.error('Account is not found');
                        break;
                      default:
                        this.$toast.error(error);
                        break;
                    }
                  })
              }
            }
        }
    }
</script>

<style type="scss">
main {
  padding-top: 0 !important;
}

@media (max-width: 768px) {
  .title {
    font-size: 64px !important;
  }
  .login-content {
    width: 70% !important;
  }
}

@media (max-width: 600px) {
  .login-content {
    width: 80% !important;
  }
}

@media (max-width: 500px) {
  .login-content {
    width: 100% !important;
  }
  .title {
    font-size: 48px !important;
  }
}

.bg-image {
  background-image: url('../assets/bg.png');
  background-repeat: no-repeat;
  background-position: center top;
}

.input-placeholder {
  color: #FFFFFF80;
  opacity: 1;
  margin-bottom: 5px;
}

.input-placeholder .v-input--error .v-input__control {
  border: 1px solid red;
}

.v-input__details .v-messages__message {
  color: red;
}

.full-content {
  min-height: 100vh;
  background-color: #242424;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center center;
}

.content {
  background-repeat: no-repeat;
  background-position: center center;
}

.title {
  font-size: 96px;
  font-style: normal;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 70px;
  margin-top: 100px;
}

.login-content {
  width: 48%;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #2F2F2F;
  border-radius: 12px;
}

.have-account {
  text-decoration: none;
  margin-top: 17px;
  text-align: center;
  color: #ffffff;
  display: block;
  font-size: 16px;
  font-weight: 400;
}

.v-input--has-state .v-input__control {
  border-bottom: none;
}
.v-input--has-state:focus-within .v-input__control {
  border-bottom: none;
}
</style>
