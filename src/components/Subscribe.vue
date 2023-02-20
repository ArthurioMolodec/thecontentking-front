<template>
  <div class="ma-auto text-center v-col-7">
    <h2 class="subscribe-title mb-5">Subscribe for mailing list</h2>
    <p class="text-white mb-7">
      Subscribing to a mailing list is a way of opting-in to receive regular emails from an organization or company.
      Usually, this involves providing your email address on their website or through some other sign-up method.
      By subscribing, you will receive updates, news, promotional offers,
      and other information from the organization on a regular basis.
    </p>
    <div class="d-flex position-relative">
      <v-text-field class="email-input" flat solo hide-details placeholder="Email" variant="outlined"
      ></v-text-field>
      <router-link to="#" rounded="xl" text v-text="'Subscribe'" class="subscribe-button"></router-link>
    </div>

  </div>
</template>

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
   position: absolute;
   right: 3px;
   top: 3px;
   padding: 13px 23px 13px 23px;
   min-height: 45px;
   background-color: #D1A658;
   text-transform: none;
   font-size: 16px;
   color: #242424;
   margin-left: 10px;
   text-decoration: none;
   border-radius: 71px;
 }
</style>