<template>
  <div class="ma-auto text-center v-col-12 v-col-sm-7">
    <h2 class="subscribe-title mb-5">Subscribe for mailing list</h2>
    <p class="text-white mb-7">
      Subscribing to a mailing list is a way of opting-in to receive regular emails from an organization or company.
      Usually, this involves providing your email address on their website or through some other sign-up method.
      By subscribing, you will receive updates, news, promotional offers,
      and other information from the organization on a regular basis.
    </p>
      <v-form class="d-flex position-relative" ref="form">
        <v-text-field class="email-input" placeholder="Email" variant="outlined" :rules="emailRules"
        ></v-text-field>
        <v-btn rounded="xl" text v-text="'Subscribe'" @click="subscribe" class="subscribe-button"></v-btn>
      </v-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      emailRules: [
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
          if (pattern.test(value)) return true

          return 'Must be a valid e-mail.'
        },
      ],
    }
  },
  methods: {
    async subscribe() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        // Validated
      }
    }
  }
}
</script>

<style>
  .email-input .v-field__outline {
    border: 1px solid #D1A658;
    border-radius: 50px !important;
  }
  .email-input input {
    color: white !important;
  }
  .email-input .v-field__outline__start {
    border: none !important;
  }
  .email-input .v-field__outline__end {
    border: none !important;
  }
 .subscribe-title {
   font-size: 40px;
   color: #D1A658;
   line-height: 48.41px;
 }

 .subscribe-email-input .v-input__control  {
   background-color: #242424;
   border-radius: 12px;
   padding-left: 20px;
   border: 1px solid red;
 }

 .general-input input {
   padding-top: 3px;
 }

 .subscribe-button {
   position: absolute !important;
   right: 5px;
   top: 5px;
   padding: 13px 23px 13px 23px !important;
   min-height: 45px;
   background-color: #D1A658 !important;
   text-transform: none !important;
   font-size: 16px !important;
   color: #242424 !important;
   margin-left: 10px;
   text-decoration: none !important;
   border-radius: 71px !important;
 }
</style>