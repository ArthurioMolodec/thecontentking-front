<!-- Register.vue -->
<template>
  <div class="full-content">
    <div class="bg-image">
      <Header/>
      <div class="content">
        <v-container >
          <h1 class="title">Sign up</h1>
          <div class="login-content">
            <v-form ref="form" @submit.prevent="() => submitForm()">
              <Input v-model="form.first_name" label="Name" type="string" class="input-placeholder" :rules="nameRules" />
              <Input v-model="form.email" label="Email" type="email" class="input-placeholder" :rules="emailRules"  />
              <Input v-model="form.password" label="Password" type="password" class="input-placeholder" :rules="passwordRules" />
              <Input v-model="form.pass_confirmation" label="Confirm password" type="password" class="input-placeholder" :rules="confirmPasswordRules" />
              <Button name="Sign up" type="submit" />
              <router-link to="/login" class="have-account">
                Already have an account?
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
                    email: null, password: null, pass_confirmation: null, first_name: null, last_name: null
                },
              valid: true,
              nameRules: [
                  value => {
                    if (value) return true

                    return 'Name is required'
                  },
                ],
              emailRules: [
                value => {
                  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (pattern.test(value)) return true

                  return 'Must be a valid e-mail.'
                },
              ],
              passwordRules: [
                (value) => !!value || 'Please type password.',
                (value) => (value && value.length >= 6) || 'minimum 6 characters',
              ],
              confirmPasswordRules: [
                (value) => !!value || 'Please type confirm password.',
                (value) =>
                    value === this.form.password || 'The password confirmation does not match.',
              ],
            }
        },

        methods: {
            async submitForm() {
              const { valid } = await this.$refs.form.validate()

              if (valid) {
                await store.dispatch('registration', this.form)
                  .then(result => {
                    if (!result) return;

                    this.$router.push({name: 'login'});
                  }).catch(error => {
                    switch (error) {
                      default:
                        this.$toast.error(error);
                        break;
                    }
                  });
              }
            }
        }
    }
</script>

<style type="scss">
main {
  padding-top: 0 !important;
}

.input-placeholder {
  color: #FFFFFF80;
  opacity: 1;
  margin-bottom: 5px;
}

.title {
  font-size: 96px;
  font-style: normal;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 70px;
  margin-top: 100px;
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
</style>