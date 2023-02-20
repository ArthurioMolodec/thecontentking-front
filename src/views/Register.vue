<!-- Register.vue -->
<template>
  <div class="full-content">
    <div class="bg-image">
      <Header/>
      <div class="content">
        <v-container >
          <h1 class="title">Sign up</h1>
          <div class="login-content">
            <v-form>
              <Input v-model="form.first_name" label="Name" type="string" class="input-placeholder" />
              <Input v-model="form.email" label="Email" type="email" class="input-placeholder" />
              <Input v-model="form.password" label="Password" type="password" class="input-placeholder" />
              <Input v-model="form.pass_confirmation" label="Conform password" type="password" class="input-placeholder" />
              <Button name="Sign up"  @click="submitForm()"  />
              <p class="have-account">
                Already have an account?
              </p>
              <SignUpUsing />
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
                }
            }
        },

        methods: {
            submitForm() {
                store.dispatch('registration', this.form);
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
  margin-bottom: 25px;
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
  margin-top: 17px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
}
</style>